import { resolveThemes } from "./interestResolver";
import { discoverLocalPOIs } from "./poiDiscoveryService";
import type { Coordinate } from "../../map/services/graphhopper.service";
import type { Theme } from "../../map/services/poi.service";
import { extractTravelIntent } from "./aiIntentService";
import { filterPOIs } from "../../map/services/poiFilter.service";

import { indexPOIs } from "./poiVectorIndexer";

import { createEmbedding } from "./embeddingService";

import { searchSimilarPOIs } from "./vectorSearchService";
import { selectBestPOIs } from "./itinerarySelectionService";

import { buildItinerary } from "./itineraryBuilderService";
import type { Vehicle } from "../../map/services/graphhopper.service";
import { convertTimeToMinutes } from "./timeService";

interface TripPlannerRequest {
  location: Coordinate;
  time: string;
  budget: string;
  vehicle: string;
  interests: string[];
  userMessage?: string;
}

export const generateTrip = async (
  data: TripPlannerRequest
) => {

 
console.time("TOTAL");

  console.time("AI INTENT");

  const aiIntent = await extractTravelIntent(
    data.userMessage || "",
    {
      time: data.time,
      budget: data.budget,
      vehicle: data.vehicle,
      interests: data.interests,
    }
  );

  console.timeEnd("AI INTENT");

  const themes = [
    ...new Set([
      ...resolveThemes(data.interests),
      ...aiIntent.themes,
    ]),
  ];

  console.log("THEMES:", themes);

  console.time("POI DISCOVERY");

  const rawPOIs = await discoverLocalPOIs(
    data.location,
    themes as Theme[]
  );

  console.timeEnd("POI DISCOVERY");

  console.log("raw poi", rawPOIs.length);
  console.log("hello 0");

 
  const allPOIs = filterPOIs(rawPOIs);
  // console.log("filter poi",allPOIs);

  await indexPOIs(allPOIs);

console.log("hello 1")
 

 const relevantPOIsMap = new Map();

  for (const theme of themes as Theme[]) {

    const themeQueryText = `
      ${data.userMessage || ""}

      User interest:
      ${theme}

      Find places that are strongly relevant to this specific interest.

      Theme:
      ${theme}
    `;

    const themeEmbedding =
      await createEmbedding(themeQueryText);

    const themePOIs = searchSimilarPOIs(
      themeEmbedding,
      15,
      [theme]
    );

    for (const poi of themePOIs) {
      relevantPOIsMap.set(
        poi.metadata.id,
        poi
      );
    }
  }

  const relevantPOIs = Array.from(
    relevantPOIsMap.values()
  );
 


  const pois = relevantPOIs.map(
    (item) => item.metadata
  );

  console.log("hello 2")

  
 
  const selectedPOIs = await selectBestPOIs({
    pois,
    intent: {
      ...aiIntent,
      themes,
    },
    userMessage: data.userMessage,
  });

  console.log("hello 3");
  // console.log("selected poi data",selectedPOIs);

const itinerary = await buildItinerary({
  start: data.location,
  pois: selectedPOIs,
  vehicle: data.vehicle as Vehicle,
  availableMinutes: convertTimeToMinutes(data.time),
});

 


 

return {
  success: true,
  themes,
  aiIntent,
  selectedPOIs,
};

 
};   