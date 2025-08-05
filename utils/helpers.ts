export function mapProgress(actual: number, base = 0.2, min = 0.025): number {
  if (actual <= base) return min;
  const visual = min + ((actual - base) / (1 - base)) * (1 - min);
  return Math.min(visual, 1); // Cap at 1
}
