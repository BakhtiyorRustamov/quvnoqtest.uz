import 'server-only';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

/**
 * Receipt plausibility check — heuristics only, no AI, no external calls.
 *
 * The goal is NOT to verify that a payment really happened; that is settled by
 * reconciling totals against the bank cards in the admin panel. The goal is to
 * cheaply reject obvious junk (a photo of a hand, a carpet, a wall, a blank
 * frame) and to block the same receipt being reused by several users.
 *
 * The discriminator that does most of the work is simple: a bank-app receipt is
 * a SCREENSHOT, and a photo of a physical object is a CAMERA PHOTO. Those two
 * look very different statistically:
 *
 *   screenshot                     camera photo
 *   ----------                     ------------
 *   no camera EXIF                 Make/Model/exposure/GPS tags
 *   large flat colour areas        almost no flat areas (sensor noise)
 *   mostly desaturated (UI chrome) broad mid-saturation
 *   few distinct colours           thousands of distinct colours
 *   tall phone aspect ratio        typically 4:3
 *
 * Scored 0-100 and deliberately permissive: only clear junk is refused, because
 * a false refusal costs a paying customer while a false accept costs 15 000 so'm
 * that shows up as a discrepancy in the monthly reconciliation anyway.
 */

/** Hard limits on the uploaded file. */
export const MAX_RECEIPT_BYTES = 8 * 1024 * 1024; // 8 MB
export const MIN_RECEIPT_BYTES = 8 * 1024; // 8 KB — below this it cannot be a readable receipt

/** Score at or below which the upload is refused outright. */
export const REJECT_BELOW = 25;
/** Score below which the payment is still accepted but flagged for review. */
export const FLAG_BELOW = 55;

export type ReceiptVerdict = {
  /** false → refuse the upload and ask the user to try again */
  ok: boolean;
  /** 0-100; higher means "more like a genuine bank-app screenshot" */
  score: number;
  /** machine-readable reason codes, stored on the payment row */
  reasons: string[];
  mime: string;
  bytes: number;
  width: number;
  height: number;
  /** exact-file fingerprint — a re-upload of the identical file is blocked */
  sha256: string;
  /** perceptual fingerprint — still matches after crop/resize/recompression */
  dhash: string | null;
  /**
   * Raw measurements, stored on every payment row. These thresholds were tuned
   * on synthetic images; keeping the numbers lets the cut-offs be re-tuned
   * against real receipts once there are a few hundred of them.
   */
  metrics: Record<string, number>;
};

/* -------------------------------------------------------------------------- */
/* File type — from magic bytes, never from the filename or the client's mime  */
/* -------------------------------------------------------------------------- */

type SniffedType = { mime: string; ext: string } | null;

export function sniffImageType(buf: Buffer): SniffedType {
  if (buf.length < 16) return null;

  // JPEG: FF D8 FF
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return { mime: 'image/jpeg', ext: 'jpg' };
  }
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47 &&
    buf[4] === 0x0d &&
    buf[5] === 0x0a &&
    buf[6] === 0x1a &&
    buf[7] === 0x0a
  ) {
    return { mime: 'image/png', ext: 'png' };
  }
  // WebP: "RIFF" .... "WEBP"
  if (buf.subarray(0, 4).toString('latin1') === 'RIFF' && buf.subarray(8, 12).toString('latin1') === 'WEBP') {
    return { mime: 'image/webp', ext: 'webp' };
  }
  // HEIC/HEIF: "....ftyp" + brand (iPhone default camera/screenshot format)
  if (buf.subarray(4, 8).toString('latin1') === 'ftyp') {
    const brand = buf.subarray(8, 12).toString('latin1');
    if (['heic', 'heix', 'hevc', 'heim', 'heis', 'mif1', 'msf1'].includes(brand)) {
      return { mime: 'image/heic', ext: 'heic' };
    }
  }
  return null;
}

/* -------------------------------------------------------------------------- */
/* EXIF — the strongest single "this is a camera photo" signal                 */
/* -------------------------------------------------------------------------- */

type ExifInfo = { make: string | null; model: string | null; hasGps: boolean; hasCameraTags: boolean };

const TAG_MAKE = 0x010f;
const TAG_MODEL = 0x0110;
const TAG_EXIF_IFD = 0x8769;
const TAG_GPS_IFD = 0x8825;
const CAMERA_TAGS = new Set([
  0x829a, // ExposureTime
  0x829d, // FNumber
  0x8827, // ISOSpeedRatings
  0x9201, // ShutterSpeedValue
  0x9202, // ApertureValue
  0x920a, // FocalLength
  0xa432, // LensSpecification
  0xa433 // LensMake
]);

/**
 * Minimal, defensive TIFF/EXIF IFD walker. Only reads the handful of tags we
 * care about. Every offset is bounds-checked because this parses attacker-
 * supplied bytes.
 */
function parseExif(buf: Buffer): ExifInfo | null {
  try {
    let start = 0;
    if (buf.length > 6 && buf.subarray(0, 6).toString('latin1') === 'Exif\0\0') start = 6;
    if (buf.length < start + 8) return null;

    const bom = buf.subarray(start, start + 2).toString('latin1');
    const le = bom === 'II';
    if (!le && bom !== 'MM') return null;

    const u16 = (o: number) => (o + 2 <= buf.length ? (le ? buf.readUInt16LE(o) : buf.readUInt16BE(o)) : -1);
    const u32 = (o: number) => (o + 4 <= buf.length ? (le ? buf.readUInt32LE(o) : buf.readUInt32BE(o)) : -1);

    if (u16(start + 2) !== 42) return null;
    const ifd0 = start + u32(start + 4);
    if (ifd0 < start || ifd0 + 2 > buf.length) return null;

    const out: ExifInfo = { make: null, model: null, hasGps: false, hasCameraTags: false };

    const readAscii = (valueOffset: number, count: number): string | null => {
      const at = start + valueOffset;
      if (count <= 0 || count > 256 || at < 0 || at + count > buf.length) return null;
      return buf
        .subarray(at, at + count)
        .toString('latin1')
        .replace(/\0.*$/, '')
        .trim();
    };

    const walk = (ifdOffset: number, depth: number): void => {
      if (depth > 2 || ifdOffset + 2 > buf.length) return;
      const count = u16(ifdOffset);
      if (count < 0 || count > 512) return; // sane cap; malformed otherwise
      for (let i = 0; i < count; i++) {
        const e = ifdOffset + 2 + i * 12;
        if (e + 12 > buf.length) return;
        const tag = u16(e);
        const type = u16(e + 2);
        const n = u32(e + 4);
        const valOff = u32(e + 8);

        if (tag === TAG_MAKE && type === 2) out.make = readAscii(valOff, n);
        else if (tag === TAG_MODEL && type === 2) out.model = readAscii(valOff, n);
        else if (tag === TAG_GPS_IFD) out.hasGps = true;
        else if (tag === TAG_EXIF_IFD && valOff > 0) walk(start + valOff, depth + 1);
        else if (CAMERA_TAGS.has(tag)) out.hasCameraTags = true;
      }
    };

    walk(ifd0, 0);
    return out;
  } catch {
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/* Image statistics                                                            */
/* -------------------------------------------------------------------------- */

type ImageStats = {
  /** fraction of horizontally adjacent pixel pairs that are EXACTLY equal (0-1) */
  uniformRatio: number;
  /** mean absolute channel-sum difference between adjacent pixels */
  gradientMean: number;
  /** number of horizontal runs of ≥25 identical pixels */
  longRuns: number;
  /** fraction of near-grey pixels (0-1) */
  greyRatio: number;
  /** distinct colours after 4-bit-per-channel quantisation */
  distinctColours: number;
};

/**
 * Texture is measured on a centre crop at NATIVE resolution, never on a
 * downscaled copy. Resizing averages away the sensor noise that separates a
 * photograph from a rendered UI — measured on a 128px thumbnail, photos
 * actually look *flatter* than screenshots, which is the opposite of the truth.
 *
 * At native resolution the separation is stark: a rendered UI has vast areas of
 * bit-identical adjacent pixels, while a camera sensor almost never produces
 * two identical neighbours.
 */
const CROP = 700;
const THUMB = 128;

async function imageStats(img: sharp.Sharp, width: number, height: number): Promise<ImageStats> {
  const cw = Math.min(CROP, width);
  const ch = Math.min(CROP, height);

  const { data } = await img
    .clone()
    .removeAlpha()
    .extract({
      left: Math.max(0, (width - cw) >> 1),
      top: Math.max(0, (height - ch) >> 1),
      width: cw,
      height: ch
    })
    .raw()
    .toBuffer({ resolveWithObject: true });

  let exact = 0;
  let gradSum = 0;
  let pairs = 0;
  let longRuns = 0;

  for (let y = 0; y < ch; y++) {
    let run = 0;
    for (let x = 0; x < cw - 1; x++) {
      const o = (y * cw + x) * 3;
      const p = o + 3;
      const d =
        Math.abs(data[o] - data[p]) + Math.abs(data[o + 1] - data[p + 1]) + Math.abs(data[o + 2] - data[p + 2]);

      if (d === 0) {
        exact++;
        run++;
      } else {
        if (run >= 25) longRuns++;
        run = 0;
      }
      gradSum += d;
      pairs++;
    }
    if (run >= 25) longRuns++;
  }

  // Colour statistics are fine on a thumbnail — they are global properties.
  const { data: thumb } = await img
    .clone()
    .removeAlpha()
    .resize(THUMB, THUMB, { fit: 'fill' })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const n = THUMB * THUMB;
  const palette = new Set<number>();
  let greyCount = 0;
  for (let i = 0; i < n; i++) {
    const r = thumb[i * 3];
    const g = thumb[i * 3 + 1];
    const b = thumb[i * 3 + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    if ((max === 0 ? 0 : (max - min) / max) < 0.12) greyCount++;
    palette.add(((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4));
  }

  return {
    uniformRatio: pairs ? exact / pairs : 0,
    gradientMean: pairs ? gradSum / pairs : 0,
    longRuns,
    greyRatio: greyCount / n,
    distinctColours: palette.size
  };
}

/**
 * Blankness must be measured at FULL resolution. Downscaling averages away
 * high-frequency detail, so a noisy photo shrunk to 128px looks uniform and
 * would be misread as an empty frame.
 */
async function fullResStdDev(img: sharp.Sharp): Promise<number> {
  try {
    const s = await img.clone().stats();
    return Math.max(...s.channels.map((c) => c.stdev));
  } catch {
    return Infinity; // never reject on a stats failure
  }
}

/** 64-bit difference hash — survives cropping, resizing and recompression. */
async function computeDHash(img: sharp.Sharp): Promise<string> {
  const { data } = await img
    .clone()
    .removeAlpha()
    .greyscale()
    .resize(9, 8, { fit: 'fill' })
    .raw()
    .toBuffer({ resolveWithObject: true });

  let hex = '';
  let byte = 0;
  let bits = 0;
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const i = y * 9 + x;
      byte = (byte << 1) | (data[i] > data[i + 1] ? 1 : 0);
      if (++bits === 8) {
        hex += byte.toString(16).padStart(2, '0');
        byte = 0;
        bits = 0;
      }
    }
  }
  return hex;
}

/** Number of differing bits between two dHashes (≤10 ≈ the same image). */
export function hammingDistance(a: string, b: string): number {
  if (a.length !== b.length) return 64;
  let d = 0;
  for (let i = 0; i < a.length; i += 2) {
    let x = parseInt(a.slice(i, i + 2), 16) ^ parseInt(b.slice(i, i + 2), 16);
    while (x) {
      d += x & 1;
      x >>= 1;
    }
  }
  return d;
}

/** Two receipts are "the same picture" at or below this distance. */
export const DHASH_MATCH_DISTANCE = 10;

/* -------------------------------------------------------------------------- */
/* Main entry point                                                            */
/* -------------------------------------------------------------------------- */

export async function checkReceipt(buf: Buffer): Promise<ReceiptVerdict> {
  const sha256 = createHash('sha256').update(buf).digest('hex');
  const base = (extra: Partial<ReceiptVerdict>): ReceiptVerdict => ({
    ok: false,
    score: 0,
    reasons: [],
    mime: 'application/octet-stream',
    bytes: buf.length,
    width: 0,
    height: 0,
    sha256,
    dhash: null,
    metrics: {},
    ...extra
  });

  if (buf.length < MIN_RECEIPT_BYTES) return base({ reasons: ['file_too_small'] });
  if (buf.length > MAX_RECEIPT_BYTES) return base({ reasons: ['file_too_large'] });

  const sniffed = sniffImageType(buf);
  if (!sniffed) return base({ reasons: ['not_an_image'] });

  let img: sharp.Sharp;
  let meta: sharp.Metadata;
  try {
    // limitInputPixels guards against decompression-bomb images.
    img = sharp(buf, { limitInputPixels: 40_000_000, failOn: 'error' });
    meta = await img.metadata();
  } catch {
    return base({ mime: sniffed.mime, reasons: ['undecodable'] });
  }

  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  if (width < 200 || height < 200) {
    return base({ mime: sniffed.mime, width, height, reasons: ['too_low_resolution'] });
  }

  const [stats, dhash, stdDev] = await Promise.all([
    imageStats(img, width, height),
    computeDHash(img),
    fullResStdDev(img)
  ]);
  const exif = meta.exif ? parseExif(meta.exif) : null;

  const reasons: string[] = [];
  let score = 50;

  // --- blank / solid-colour frame -----------------------------------------
  if (stdDev < 8) {
    return base({
      mime: sniffed.mime,
      width,
      height,
      dhash,
      reasons: ['blank_image'],
      score: 0
    });
  }

  // --- rendered UI vs camera sensor: the primary signal --------------------
  if (stats.uniformRatio >= 0.55) {
    score += 35;
    reasons.push('rendered_ui');
  } else if (stats.uniformRatio >= 0.25) {
    score += 8;
    reasons.push('partly_rendered'); // photo of a screen, or a paper receipt
  } else if (stats.uniformRatio >= 0.08) {
    score -= 15;
    reasons.push('little_uniform_area');
  } else {
    score -= 40;
    reasons.push('camera_texture');
  }

  if (stats.gradientMean < 2) {
    score += 15;
    reasons.push('smooth_ui');
  } else if (stats.gradientMean < 8) {
    score += 5;
  } else if (stats.gradientMean > 25) {
    score -= 25;
    reasons.push('high_frequency_detail');
  }

  if (stats.longRuns >= 200) {
    score += 15;
    reasons.push('long_uniform_rows');
  } else if (stats.longRuns >= 40) {
    score += 6;
  } else if (stats.longRuns === 0) {
    score -= 12;
    reasons.push('no_uniform_rows');
  }

  // --- camera EXIF ---------------------------------------------------------
  // Only a modifier: forwarding an image through Telegram or WhatsApp strips
  // EXIF entirely, so its absence proves nothing.
  if (exif?.make || exif?.model) {
    score -= 15;
    reasons.push(`camera_exif:${[exif.make, exif.model].filter(Boolean).join(' ').slice(0, 60)}`);
  } else if (exif?.hasCameraTags) {
    score -= 10;
    reasons.push('camera_settings_exif');
  } else {
    score += 5;
    reasons.push('no_camera_exif');
  }
  if (exif?.hasGps) {
    score -= 10;
    reasons.push('gps_exif');
  }

  // --- colour: bank UIs are largely desaturated with 1-2 accent colours ----
  if (stats.greyRatio >= 0.5) {
    score += 10;
    reasons.push('mostly_greyscale');
  } else if (stats.greyRatio < 0.15) {
    // Mild: Click / Payme / Uzum receipts use bold brand colours.
    score -= 8;
    reasons.push('colourful');
  }

  if (stats.distinctColours < 300) {
    score += 8;
    reasons.push('few_colours');
  } else if (stats.distinctColours > 2500) {
    score -= 10;
    reasons.push('many_colours');
  }

  // --- aspect ratio: phone screenshots are tall ---------------------------
  const ratio = height / width;
  if (ratio >= 1.5 && ratio <= 2.6) {
    score += 10;
    reasons.push('phone_screenshot_ratio');
  } else if (ratio >= 0.6 && ratio <= 0.85) {
    score -= 8;
    reasons.push('landscape_photo_ratio');
  }

  score = Math.max(0, Math.min(100, Math.round(score)));

  return {
    ok: score > REJECT_BELOW,
    score,
    reasons,
    mime: sniffed.mime,
    bytes: buf.length,
    width,
    height,
    sha256,
    dhash,
    metrics: {
      uniformRatio: Number(stats.uniformRatio.toFixed(4)),
      gradientMean: Number(stats.gradientMean.toFixed(2)),
      longRuns: stats.longRuns,
      greyRatio: Number(stats.greyRatio.toFixed(3)),
      distinctColours: stats.distinctColours,
      stdDev: Number(stdDev.toFixed(2)),
      ratio: Number(ratio.toFixed(3))
    }
  };
}

/**
 * Re-encodes to JPEG and drops every metadata block. Two reasons: children's
 * camera photos can carry GPS coordinates we must not store, and normalising
 * the format keeps the admin panel fast.
 */
export async function normaliseReceipt(buf: Buffer): Promise<Buffer> {
  return sharp(buf, { limitInputPixels: 40_000_000 })
    .rotate() // apply EXIF orientation before stripping it
    .resize(1400, 2600, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
}
