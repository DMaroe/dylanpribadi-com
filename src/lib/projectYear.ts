// project.year is free text ("2024", "2022 — Now"): pull the first 4-digit
// year out of it as a sortable/comparable value rather than requiring a
// strict format.
export function yearValue(year: string): number {
  const match = year.match(/\d{4}/);
  return match ? Number(match[0]) : 0;
}
