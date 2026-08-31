import { POI } from "../poi.service";

/*
  Calculate a score for a POI.
  Currently we use only the rating.
  Later we will also include:
  - Distance from route
  - Detour cost
  - Popularity
*/

export function calculateScore(poi: POI): number {
  return poi.rating ?? 0;
}