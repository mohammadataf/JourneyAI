import { ExperienceSummary } from "./summary.service";

const summaryCache = new Map<string, ExperienceSummary>();

export function getCachedSummary(
  key: string
): ExperienceSummary | null {

  return summaryCache.get(key) ?? null;

}

export function saveSummary(
  key: string,
  summary: ExperienceSummary
): void {

  summaryCache.set(key, summary);

}