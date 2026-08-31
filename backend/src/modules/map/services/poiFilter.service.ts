// import { POI, Theme } from "./poi.service";

// /*
//   Cleans the POIs returned by Google Places.

//   Current filters:
//   1. Remove duplicate places.
//   2. Keep only categories relevant to the selected theme.
//   3. Remove places without ratings.
//   4. Sort by rating (highest first).

//   Later we will also:
//   - Filter by corridor
//   - Score POIs
//   - Consider detour cost
//   - Cluster nearby POIs
// */

// export function filterPOIs(
//   pois: POI[],
//   theme: Theme
// ): POI[] {
//   const allowedCategories: Record<Theme, string[]> = {
//     scenic: [
//       "tourist_attraction",
//       "garden",
//       "park",
//       "historical_landmark",
//     ],

//     adventure: [
//       "tourist_attraction",
//       "park",
//     ],

//     cafe: [
//       "cafe",
//       "coffee_shop",
//     ],

//     heritage: [
//       "historical_landmark",
//       "museum",
//       "tourist_attraction",
//     ],
//   };

//   // Remove duplicate places
//   const seen = new Set<string>();

//   const uniquePOIs = pois.filter((poi) => {
//     if (seen.has(poi.id)) {
//       return false;
//     }

//     seen.add(poi.id);
//     return true;
//   });

//   // Keep only categories related to the selected theme
//   const filteredPOIs = uniquePOIs.filter((poi) =>
//     allowedCategories[theme].includes(poi.category ?? "")
//   );

//   // Remove POIs that don't have ratings
//   const ratedPOIs = filteredPOIs.filter(
//     (poi) => poi.rating !== undefined
//   );

//   // Sort by rating (highest first)
//   ratedPOIs.sort(
//     (a, b) => (b.rating ?? 0) - (a.rating ?? 0)
//   );

//   return ratedPOIs;
// }


// for openTripMap

import { POI } from "./poi.service";

export function filterPOIs(
  pois: POI[]
): POI[] {

  // Remove duplicate places
  const seen = new Set<string>();

  const uniquePOIs = pois.filter((poi) => {
    if (seen.has(poi.id)) {
      return false;
    }

    seen.add(poi.id);
    return true;
  });

  // Remove unnamed places
  const namedPOIs = uniquePOIs.filter(
    (poi) => poi.name.trim().length > 0
  );

  return namedPOIs;
}