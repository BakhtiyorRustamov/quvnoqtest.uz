export type UserRecord = {
  id: string;
  publicId: string;
  grade: number;
  locale: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  paidUntil: string | null; // ISO
  /** Set when an admin shuts the account down; blocks access regardless of paidUntil. */
  disabledAt?: string | null;
  createdAt: string;
};

export type ProgressRow = {
  subjectKey: string;
  topicKey: string;
  status: 'in_progress' | 'completed';
  score: number;
  completedAt: string | null;
  answers?: boolean[];
};

export type AiUsage = { messages: number; tokens: number };

export type MagicLinkResult =
  | { sent: true }
  | { devLink: string }
  | { error: 'not_configured' | 'invalid' };

/**
 * Per-request data store bound to the current visitor (device cookie).
 * Two implementations: Supabase (production) and signed-cookie (zero-config demo).
 */
export interface QTStore {
  mode: 'cookie' | 'supabase';
  getCurrent(): Promise<UserRecord | null>;
  /** Silent registration (SRS §6.6.1) — creates the record if missing. */
  ensureUser(init: { grade: number; locale: string }): Promise<UserRecord>;
  updateUser(
    patch: Partial<Pick<UserRecord, 'grade' | 'locale' | 'name' | 'phone' | 'email'>>
  ): Promise<UserRecord | null>;
  setPaid(days: number): Promise<UserRecord | null>;
  listProgress(): Promise<ProgressRow[]>;
  saveProgress(entry: {
    subjectKey: string;
    topicKey: string;
    score: number;
    answers: boolean[];
  }): Promise<void>;
  getAiUsage(date: string): Promise<AiUsage>;
  addAiUsage(date: string, messages: number, tokens: number): Promise<void>;
  createMagicLink(email: string): Promise<{ token: string } | null>;
  /** Returns true when the token was valid and the account was claimed/merged. */
  claimMagicLink(token: string): Promise<boolean>;
  /**
   * Parent lookup (parents' page): finds a child by public ID AND name — both
   * must match, so the ID alone is not enough to read someone's progress.
   */
  findChild(publicId: string, name: string): Promise<{ user: UserRecord; progress: ProgressRow[] } | null>;
}

/** Loose name equality for the parent lookup (case/space/apostrophe tolerant). */
export function namesMatch(a: string | null | undefined, b: string | null | undefined): boolean {
  const norm = (s: string) =>
    s.toLowerCase().replace(/['’ʻʼ`]/g, '').replace(/\s+/g, ' ').trim();
  if (!a || !b) return false;
  return norm(a) === norm(b);
}

export function isPaid(user: UserRecord | null): boolean {
  return !!user?.paidUntil && new Date(user.paidUntil).getTime() > Date.now();
}

export function isDisabled(user: UserRecord | null): boolean {
  return !!user?.disabledAt;
}

/**
 * The check that actually gates content: a paid subscription AND an account
 * that has not been shut down. Always prefer this over `isPaid` at an access
 * boundary — `isPaid` alone would let a disabled account keep its content.
 */
export function isActive(user: UserRecord | null): boolean {
  return isPaid(user) && !isDisabled(user);
}

export function makePublicId(): string {
  return `QT-${Math.floor(10000 + Math.random() * 90000)}`;
}
