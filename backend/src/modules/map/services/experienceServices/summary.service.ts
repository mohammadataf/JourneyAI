import { GoogleGenAI } from "@google/genai";
import { POI, Theme } from "../poi.service";
import {  getCachedSummary, saveSummary} from "./summaryCache.service";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export interface ExperienceSummary {
  headline: string;
  summary: string;
  tips: string[];
}

export async function generateSummary(
  poi: POI,
  theme: Theme
): Promise<ExperienceSummary> {

  const cacheKey = `${theme}:${poi.id}`;

  const cachedSummary = getCachedSummary(cacheKey);

  if (cachedSummary) {
    console.log("Summary Cache Hit:", poi.name);
    return cachedSummary;
  }

  console.log("Generating Summary:", poi.name);

  try {

    const prompt = `
You are JourneyAI, an intelligent travel assistant.

Your task is to generate a helpful travel summary for a place.

Place Information

Name:
${poi.name}

Category:
${poi.category}

Full Address:
${poi.address}

Latitude:
${poi.latitude}

Longitude:
${poi.longitude}

Selected Theme:
${theme}

Instructions:

- First try to identify this place using its name and full address.
- If you recognize the place, briefly mention what it is known for.
- If you are not confident, NEVER invent facts.
- Instead write a useful recommendation based on its category and location.
- Keep the summary friendly and travel focused.
- Headline should be short (maximum 6 words).
- Summary should be under 50 words.
- Give exactly 3 useful travel tips.
- Return ONLY valid JSON.
- Do not use markdown.
- Do not wrap JSON inside \`\`\`.

Return exactly:

{
  "headline": "",
  "summary": "",
  "tips": [
    "",
    "",
    ""
  ]
}
`;

    const response = await ai.models.generateContent({
      // model: "gemini-3.5-flash",
      model: "gemini-3.1-flash-lite",
      contents: prompt,
    });

    const text = response.text ?? "";

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const summary: ExperienceSummary = JSON.parse(cleaned);

    saveSummary(
      cacheKey,
      summary
    );

    return summary;

  } catch (error) {

    console.error("Gemini Summary Error:", error);

    return {
      headline: poi.name,
      summary: "No summary available.",
      tips: [],
    };
  }
}

 