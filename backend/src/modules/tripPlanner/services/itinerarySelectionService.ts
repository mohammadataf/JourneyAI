import { GoogleGenAI } from "@google/genai";

import type { POI } from "../../map/services/poi.service";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export interface SelectedPOI extends POI {
  summary: string;
  whySelected: string;
  whyBest: string;
  famousFor: string;
}

interface SelectPOIsInput {
  pois: POI[];
  intent: any;
  userMessage?: string;
}

interface GeminiSelectedPOI {
  id: string;
  summary?: string;
  whySelected?: string;
  whyBest?: string;
  famousFor?: string;
}

export async function selectBestPOIs(
  data: SelectPOIsInput
): Promise<SelectedPOI[]> {
  const userQuery = data.userMessage?.trim() || "";

  if (!data.pois.length) {
    return [];
  }

  // Remove obviously invalid / unknown POIs
  const validPOIs = data.pois.filter((poi: POI) => {
    const name = poi.name?.trim().toLowerCase();

    if (!name) {
      return false;
    }

    const invalidNames = [
      "unknown",
      "unnamed",
      "unnamed place",
      "place",
      "poi",
    ];

    return !invalidNames.includes(name);
  });

  if (!validPOIs.length) {
    return [];
  }

  const themes = Array.isArray(data.intent?.themes)
    ? data.intent.themes
    : [];

  /*
   * Keep the Gemini input small.
   *
   * Latitude/longitude are not needed for semantic selection.
   * Routing/distance is handled later by the itinerary system.
   */
  const availablePOIs = validPOIs.map((poi: POI) => ({
    id: poi.id,
    name: poi.name,
    category: poi.category,
    address: poi.address,
  }));

  const prompt = `
You are the POI selection engine for a travel application.

Select the most useful places for the user's trip and provide a short
explanation for every selected place.

USER QUERY:
${userQuery || "No specific query provided."}

USER THEMES:
${JSON.stringify(themes)}

AVAILABLE POIs:
${JSON.stringify(availablePOIs)}

THEME GUIDANCE:

photography:
- scenic
- heritage
- viewpoints
- gardens
- parks
- monuments
- cultural places
- architecture
- natural attractions
- beautiful landscapes

food:
- restaurant
- cafe
- bakery
- fast food
- food-related places

SELECTION RULES:

1. Understand the user's query semantically.
2. The user's query is more important than the provider category.
3. A POI does not need to have the exact same category as a theme.
4. Use name, category and address together.
5. If multiple themes are requested, maintain useful coverage across ALL themes.
6. If the user asks for multiple experiences, include genuinely relevant POIs satisfying any meaningful part of those experiences.
7. Do not allow one theme to completely dominate if another theme has genuinely relevant places.
8. Do not add unrelated POIs just to satisfy a theme.
9. Remove unknown, meaningless or invalid places.
10. Do not select a POI only because it is nearby.
11. Do not invent POIs.
12. Do not rename POIs.
13. Only return IDs that exist in AVAILABLE POIs.
14. Avoid obvious duplicate representations of the same place.
15. Prefer strong and useful matches over weak matches.
16. Return at most 25 POIs.
17. If fewer than 25 genuinely relevant POIs exist, return fewer.
18. Do not force a minimum number of POIs.

EXPLANATION RULES:

For every selected POI return:

summary:
- One short sentence.
- Maximum 15 words.

whySelected:
- Explain why it matches the user's request.
- Maximum 15 words.

whyBest:
- Explain why it is useful for this particular journey.
- Maximum 15 words.
- Do not claim it is objectively the best.

famousFor:
- Say what it is known for based only on available information.
- Maximum 12 words.
- Do not invent unsupported facts.

Keep explanations concise and different from each other.

Return ONLY valid JSON:

{
  "selectedPOIs": [
    {
      "id": "poi-id",
      "summary": "Short description",
      "whySelected": "Why it matches",
      "whyBest": "Why useful for this journey",
      "famousFor": "What it is known for"
    }
  ]
}
`;

  try {
      // console.log("SELECT: before Gemini");

      // const start = Date.now();

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });

      // console.log(
      //   "SELECT: Gemini took",
      //   ((Date.now() - start) / 1000).toFixed(2),
      //   "seconds"
      // );


    let text = response.text || "{}";

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const result = JSON.parse(text);

    if (!Array.isArray(result.selectedPOIs)) {
      return [];
    }

    // Map IDs to the original POI objects.
    const poiMap = new Map<string, POI>(
      validPOIs.map((poi: POI) => [poi.id, poi])
    );

    const selected: SelectedPOI[] = [];
    const seenIds = new Set<string>();

    /*
     * Hard backend safety limit.
     * Even if Gemini returns more than 25, we never expose more than 25.
     */
    for (
      const item of result.selectedPOIs as GeminiSelectedPOI[]
    ) {
       

      if (!item || typeof item.id !== "string") {
        continue;
      }

      const originalPOI = poiMap.get(item.id);

      // Ignore IDs that do not exist.
      if (!originalPOI) {
        continue;
      }

      // Prevent duplicate POIs.
      if (seenIds.has(item.id)) {
        continue;
      }

      seenIds.add(item.id);

      selected.push({
        ...originalPOI,

        summary:
          typeof item.summary === "string" ? item.summary.trim()  : "",

        whySelected:
          typeof item.whySelected === "string"  ? item.whySelected.trim() : "",

        whyBest:
          typeof item.whyBest === "string"  ? item.whyBest.trim() : "",

        famousFor:
          typeof item.famousFor === "string" ? item.famousFor.trim(): "",
      });
    }

    return selected;
  } catch (error) {
    console.error(
      "selectBestPOIs error:",
      error
    );

    return [];
  }
}