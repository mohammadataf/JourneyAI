import { POI } from "../poi.service";
import { haversineDistance } from "./corridor.service";

// Minimum distance between two selected POIs
const MIN_POI_DISTANCE = 300;

/*
  Remove nearby POIs so that every selected place
  gives a different experience.
*/
export function removeNearbyPOIs(
  pois: POI[]
): POI[] {

  const selected: POI[] = [];

  for (const poi of pois) {

    let isTooClose = false;

    for (const chosen of selected) {

      const distance = haversineDistance(
        poi.latitude,
        poi.longitude,
        chosen.latitude,
        chosen.longitude
      );

      if (distance < MIN_POI_DISTANCE) {
        isTooClose = true;
        break;
      }
    }

    if (!isTooClose) {
      selected.push(poi);
    }
  }

  return selected;
}