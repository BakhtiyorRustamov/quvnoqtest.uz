/** Asia/Tashkent is UTC+5 with no DST — the AI daily-limit reset timezone (FR-AI-8). */
export function tashkentToday(): string {
  return new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString().slice(0, 10);
}
