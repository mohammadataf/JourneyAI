import axios from "axios";
import type { POI, Theme } from "./experienceService";

export interface ExperienceSummary {
  headline: string;
  summary: string;
  tips: string[];
}

export async function getSummary(
  poi: POI,
  theme: Theme
): Promise<ExperienceSummary | null> {
  try {

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const { data } = await axios.post(
      `${BACKEND_URL}/api/summary`,
      {
        poi,
        theme,
      }
    );

    return data.summary;

  } catch (error) {

    console.error(error);

    return null;

  }
}