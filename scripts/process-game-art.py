# -*- coding: utf-8 -*-
"""
process-game-art.py - turns the four AI-generated game illustrations at the
project root into clean, text-free, compressed arena backdrops in
public/games/, and prints the Grand Prix track centreline traced from
racing_track.png (normalized [x,y] pairs, ready to paste into the component).

Requires:  py -m pip install opencv-python-headless scikit-image pillow
Run:       py scripts/process-game-art.py     (any cwd; paths are absolute)
"""
import os, json
import numpy as np, cv2
from PIL import Image, ImageDraw, ImageFilter
from skimage.morphology import skeletonize

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
os.makedirs('public/games', exist_ok=True)

def find_src(name):
    for p in (name, os.path.join('Folder_for_trash', 'game-art-src', name)):
        if os.path.exists(p):
            return p
    raise SystemExit('source image not found: ' + name)

def inpaint(img, rects, r=8):
    mask = np.zeros(img.shape[:2], np.uint8)
    for (x0, y0, x1, y1) in rects:
        mask[y0:y1, x0:x1] = 255
    return cv2.inpaint(img, mask, r, cv2.INPAINT_TELEA)

def save_webp(img, path, q=82):
    im = img if isinstance(img, Image.Image) else Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
    im.convert('RGB').save(path, 'WEBP', quality=q, method=6)
    print('wrote', path, os.path.getsize(path) // 1024, 'KB')

# ---------- tugboat: remove the three baked text pills ----------
tug = cv2.imread(find_src('tugboat.png'))
PILLS = [(440, 8, 935, 135), (52, 562, 458, 706), (920, 562, 1324, 706)]
tug = inpaint(tug, PILLS, 12)
for (x0, y0, x1, y1) in PILLS:
    tug[y0:y1, x0:x1] = cv2.GaussianBlur(tug[y0:y1, x0:x1], (31, 31), 0)
save_webp(tug, 'public/games/tug-arena.webp')

# ---------- tank: remove title, blank the 4 screens, cover orb digit ----------
tank = cv2.imread(find_src('tank_game.png'))
tank = inpaint(tank, [(375, 35, 995, 240)], 12)
tank[35:240, 375:995] = cv2.GaussianBlur(tank[35:240, 375:995], (61, 61), 0)
pil = Image.fromarray(cv2.cvtColor(tank, cv2.COLOR_BGR2RGB)).convert('RGBA')

def blank_screen(img, cx, cy, w, h, ang):
    lay = Image.new('RGBA', (w + 40, h + 40), (0, 0, 0, 0))
    d = ImageDraw.Draw(lay)
    d.rounded_rectangle([20, 20, 20 + w, 20 + h], radius=int(h * .28), fill=(18, 30, 56, 255))
    d.rounded_rectangle([26, 26, 14 + w, 14 + h], radius=int(h * .24), fill=(10, 20, 40, 255))
    lay = lay.rotate(ang, expand=True, resample=Image.BICUBIC)
    img.alpha_composite(lay, (int(cx - lay.width / 2), int(cy - lay.height / 2)))

for args in [(262, 385, 128, 76, 5), (548, 337, 96, 58, 3), (820, 334, 96, 56, -2), (1112, 382, 130, 76, -5)]:
    blank_screen(pil, *args)

orb = Image.new('RGBA', (120, 120), (0, 0, 0, 0))
px = orb.load()
for yy in range(120):
    for xx in range(120):
        dist = ((xx - 60) ** 2 + (yy - 60) ** 2) ** .5
        if dist < 52:
            t = dist / 52
            a = 255 if dist < 42 else int(255 * (1 - (dist - 42) / 10))
            px[xx, yy] = (int(255 - 8 * t), int(247 - 60 * t), int(207 - 145 * t), a)
pil.alpha_composite(orb, (688 - 60, 558 - 60))
save_webp(pil, 'public/games/tank-arena.webp')

# ---------- scale: remove baked fruits, clean platters, blank LCDs ----------
sp = Image.open(find_src('scale_game.png')).convert('RGB')

def clone_fill(img, box, src_x0=446, src_x1=606, feather=8, blur=7):
    x0, y0, x1, y1 = box
    w, h = x1 - x0, y1 - y0
    src = img.crop((src_x0, y0, src_x1, y1)).resize((w, h), Image.BICUBIC).filter(ImageFilter.GaussianBlur(blur))
    m = Image.new('L', (w, h), 0)
    ImageDraw.Draw(m).rounded_rectangle([feather, feather, w - feather, h - feather], radius=16, fill=255)
    img.paste(src, (x0, y0), m.filter(ImageFilter.GaussianBlur(feather)))

clone_fill(sp, (222, 112, 452, 292))
clone_fill(sp, (600, 90, 830, 290))
arr = np.array(sp).astype(np.float32)

def rowclone_disc(a, cx, cy, rx, ry, margin):
    for y in range(cy - ry, cy + ry + 1):
        k = 1 - ((y - cy) / ry) ** 2
        if k <= 0:
            continue
        half = int(rx * k ** .5)
        x0, x1 = cx - half, cx + half
        src = a[y, x0 + 2:x0 + 2 + margin].copy()
        idx = np.linspace(0, margin - 1, x1 - x0).astype(int)
        a[y, x0:x1] = src[idx]
    return a

arr = rowclone_disc(arr, 313, 309, 133, 26, 34)
arr = rowclone_disc(arr, 734, 307, 146, 28, 26)
sp = Image.fromarray(arr.clip(0, 255).astype(np.uint8))
for (cx, cy, rx, ry) in [(313, 309, 133, 26), (734, 307, 146, 28)]:
    box = (cx - rx, cy - ry, cx + rx, cy + ry)
    reg = sp.crop(box).filter(ImageFilter.GaussianBlur(3))
    m = Image.new('L', reg.size, 0)
    ImageDraw.Draw(m).ellipse([2, 2, reg.size[0] - 3, reg.size[1] - 3], fill=255)
    sp.paste(reg, box[:2], m.filter(ImageFilter.GaussianBlur(4)))
sc = cv2.cvtColor(np.array(sp), cv2.COLOR_RGB2BGR)
mask = np.zeros(sc.shape[:2], np.uint8)
mask[262:291, 243:397] = 255
mask[258:289, 618:802] = 255
sc = cv2.inpaint(sc, mask, 6, cv2.INPAINT_TELEA)
for (x0, y0, x1, y1) in [(243, 262, 397, 291), (618, 258, 802, 289)]:
    sc[y0:y1, x0:x1] = cv2.GaussianBlur(sc[y0:y1, x0:x1], (13, 13), 0)

spil = Image.fromarray(cv2.cvtColor(sc, cv2.COLOR_BGR2RGB))
d = ImageDraw.Draw(spil)
d.rounded_rectangle([208, 360, 388, 424], radius=10, fill=(57, 72, 129))
d.rounded_rectangle([642, 364, 830, 428], radius=10, fill=(45, 66, 120))
save_webp(spil, 'public/games/scale-arena.webp')

# ---------- race track: export + trace the closed-circuit centreline ----------
im = cv2.imread(find_src('racing_track.png'))
save_webp(im, 'public/games/race-track.webp')
b, g, r = im[:, :, 0].astype(int), im[:, :, 1].astype(int), im[:, :, 2].astype(int)
mx = np.maximum(np.maximum(b, g), r); mn = np.minimum(np.minimum(b, g), r)
road = ((mx < 150) & (mx - mn < 30) & (mn > 25)).astype(np.uint8)
road[300:372, 410:545] = 0   # telescope stairs touching the road
road[295:352, 500:548] = 0   # sign post
road = cv2.morphologyEx(road, cv2.MORPH_CLOSE, np.ones((15, 15), np.uint8))
road = cv2.morphologyEx(road, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
n, lab = cv2.connectedComponents(road)
comp = (lab == max(range(1, n), key=lambda i: (lab == i).sum())).astype(np.uint8)
ff = comp.copy(); m2 = np.zeros((comp.shape[0] + 2, comp.shape[1] + 2), np.uint8)
cv2.floodFill(ff, m2, (0, 0), 1)
holes = ((ff == 0) & (comp == 0)).astype(np.uint8)
nh, hl = cv2.connectedComponents(holes)
for i in range(1, nh):
    if (hl == i).sum() < 6000:
        comp[hl == i] = 1
sk = skeletonize(comp.astype(bool))
pts = set(zip(*np.nonzero(sk.astype(np.uint8))))

def nbrs(p, S):
    y, x = p
    return [(y + dy, x + dx) for dy in (-1, 0, 1) for dx in (-1, 0, 1)
            if (dy or dx) and (y + dy, x + dx) in S]

for _ in range(600):
    ends = [p for p in pts if len(nbrs(p, pts)) <= 1]
    if not ends:
        break
    for e in ends:
        pts.discard(e)
thin = np.zeros(comp.shape, np.uint8)
for (y, x) in pts:
    thin[y, x] = 1
cnts, _ = cv2.findContours(thin, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
c = max(cnts, key=lambda cc: cv2.arcLength(cc, True)).reshape(-1, 2).astype(float)
dseg = np.sqrt(((np.roll(c, -1, 0) - c) ** 2).sum(1))
s = np.concatenate([[0], np.cumsum(dseg)]); total = s[-1]
N = 192; t = np.linspace(0, total, N, endpoint=False)
res = np.empty((N, 2)); j = 0
for i, ti in enumerate(t):
    while j < len(s) - 2 and s[j + 1] < ti:
        j += 1
    f = (ti - s[j]) / max(s[j + 1] - s[j], 1e-9)
    res[i] = c[j] * (1 - f) + c[(j + 1) % len(c)] * f
k = 3
pad = np.vstack([res[-k:], res, res[:k]]); ker = np.ones(2 * k + 1) / (2 * k + 1)
res = np.column_stack([np.convolve(pad[:, 0], ker, 'same'), np.convolve(pad[:, 1], ker, 'same')])[k:-k]

# 96 pts, clockwise, index 0 on the top straight
res = (res[::2] / [1376.0, 768.0])[::-1]
start = int(np.argmin(((res - [0.46, 0.325]) ** 2).sum(1)))
res = np.vstack([res[start:], res[:start]])
pts_js = ','.join('[%.4f,%.4f]' % (x, y) for x, y in res)
print('TRACK_START')
print(pts_js)
print('TRACK_END')
