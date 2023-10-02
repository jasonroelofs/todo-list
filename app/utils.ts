
/**
 * Given a floating point number, turn it into a percentage string.
 * e.g. 1 -> 100%, 2 -> 200%, 3.5 -> 350%, etc.
 */
export function formatAsPercent(percent: number): string {
  return `${percent * 100}%`;
}
