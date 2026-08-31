import "dotenv/config";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

interface TravelFilters {
  time?: string;
  budget?: string;
  vehicle?: string;
  interests?: string[];
}

export async function extractTravelIntent(
  userMessage: string,
  filters: TravelFilters
) {
  const prompt = `
You are the travel-intent engine for JourneyAI.

Your job is to understand ANY natural-language travel request from the user
and convert it into structured JSON.

The user can type anything. Do NOT restrict the user's request to predefined
categories.

Structured filters provided by the UI:

Time:
${filters.time || "not provided"}

Budget:
${filters.budget || "not provided"}

Vehicle:
${filters.vehicle || "not provided"}

Interests:
${
  filters.interests?.length
    ? filters.interests.join(", ")
    : "not provided"
}

Additional user description:
${userMessage || "not provided"}


IMPORTANT RULES:

1. Understand the complete meaning of the user's request.

2. Structured UI filters are authoritative when they are provided.

3. Use the natural-language description to extract additional preferences.

4. Never invent information that the user did not provide.

5. If information is not provided, use null or an empty array.

6. Do not discard useful requirements just because they are not in the
   predefined fields.

7. Put unusual, specific, or additional requirements inside
   "specialRequests".

8. Allowed application themes are:
   scenic, heritage, adventure, cafe, restaurant, hotel, petrol

9. Understand concepts such as:
   sunset, sunrise, lake, mountains, peaceful places,
   photography, local food, Kashmiri food, family friendly,
   avoid crowded places, nature, shopping, historical places,
   viewpoints, waterfalls, hidden places, gardens, parks, etc.

10. Preserve the meaning of these requests even when there is no predefined
    application field.

11. The "poiSearch" object is specifically for discovering POIs from
    map/POI providers such as OpenTripMap and Geoapify.

12. Convert the user's natural-language preferences into BROAD,
    provider-independent POI types that would help discover relevant places.

13. Do NOT use provider-specific category names inside "poiSearch".
    For example, do NOT return "leisure.park" or "gardens_and_parks".
    Those will be converted to provider-specific categories by the backend.

14. "poiSearch.categories" should contain concrete real-world place types,
    not abstract feelings.

    Good examples:
    park
    garden
    lake
    viewpoint
    nature
    waterfall
    beach
    scenic_attraction
    historical_site
    museum
    cafe
    restaurant
    hotel

    Bad examples:
    peaceful
    beautiful
    relaxing
    enjoyable

15. Put subjective preferences such as "peaceful", "quiet", "beautiful",
    "photography", "avoid crowds", etc. into "poiSearch.keywords" or
    "preferences" when useful.

16. If the user asks for scenic places, include the different concrete
    POI types that can represent scenic experiences, such as parks, gardens,
    lakes, viewpoints, nature areas, and scenic attractions.

17. If the user asks for peaceful places, prefer nature-oriented places,
    parks, gardens, lakes, viewpoints, etc., but do NOT invent specific
    places.

18. "excludeCategories" should only contain categories that should genuinely
    be avoided based on the user's request.

19. If the user does not provide a natural-language query but selects an
    interest such as "scenic", still generate useful poiSearch categories
    based on that interest.

20. The purpose of poiSearch is DISCOVERY, not final POI selection.
    Return broad categories so the map providers can return a good candidate
    pool. Do not select individual POIs.


Return ONLY valid JSON.

Use exactly this structure:

{
  "time": null,
  "budget": null,
  "vehicle": null,
  "themes": [],
  "preferences": {},
  "specialRequests": [],
  "poiSearch": {
    "categories": [],
    "keywords": [],
    "excludeCategories": []
  }
}


Example 1:

User:
"I want peaceful scenic places and a cafe at the end."

Return:

{
  "time": null,
  "budget": null,
  "vehicle": null,
  "themes": ["scenic", "cafe"],
  "preferences": {
    "peaceful": true,
    "cafeAtEnd": true
  },
  "specialRequests": [],
  "poiSearch": {
    "categories": [
      "park",
      "garden",
      "lake",
      "viewpoint",
      "nature",
      "scenic_attraction",
      "cafe"
    ],
    "keywords": [
      "scenic",
      "peaceful",
      "quiet",
      "nature"
    ],
    "excludeCategories": []
  }
}


Example 2:

User:
"I have 4 hours and want to see a beautiful lake during sunset,
take photos and eat Kashmiri food."

Return:

{
  "time": "4 hours",
  "budget": null,
  "vehicle": null,
  "themes": ["scenic", "restaurant"],
  "preferences": {
    "photography": true
  },
  "specialRequests": [
    "beautiful lake",
    "sunset",
    "Kashmiri food"
  ],
  "poiSearch": {
    "categories": [
      "lake",
      "viewpoint",
      "nature",
      "scenic_attraction",
      "restaurant"
    ],
    "keywords": [
      "lake",
      "scenic",
      "sunset",
      "photography",
      "Kashmiri food"
    ],
    "excludeCategories": []
  }
}


Example 3:

User:
"No description."

UI interest:
scenic

Return:

{
  "time": null,
  "budget": null,
  "vehicle": null,
  "themes": ["scenic"],
  "preferences": {},
  "specialRequests": [],
  "poiSearch": {
    "categories": [
      "park",
      "garden",
      "lake",
      "viewpoint",
      "nature",
      "scenic_attraction"
    ],
    "keywords": [
      "scenic",
      "nature",
      "peaceful"
    ],
    "excludeCategories": []
  }
}


Example 4:

User:
"I want historical places and beautiful views."

Return:

{
  "time": null,
  "budget": null,
  "vehicle": null,
  "themes": ["heritage", "scenic"],
  "preferences": {},
  "specialRequests": [],
  "poiSearch": {
    "categories": [
      "historical_site",
      "monument",
      "fort",
      "heritage_site",
      "viewpoint",
      "scenic_attraction"
    ],
    "keywords": [
      "historical",
      "heritage",
      "beautiful views",
      "scenic"
    ],
    "excludeCategories": []
  }
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  const text = response.text;

  if (!text) {
    throw new Error("AI returned empty response");
  }

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}