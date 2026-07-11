import { Coordinate } from "../graphhopper.service";
import { POI } from "../poi.service";
import { haversineDistance } from "./corridor.service";

export interface Zone {
  samplePoint: Coordinate;
  pois: POI[];
}

/*
  Group POIs by the nearest sample point.
*/
export function groupPOIsBySamplePoint(
  pois: POI[],
  samplePoints: Coordinate[]
): Zone[] {

  // Create one empty zone for each sample point
  const zones: Zone[] = samplePoints.map((point) => ({
    samplePoint: point,
    pois: [],
  }));

  // Assign every POI to its nearest sample point
  for (const poi of pois) {

    let nearestZone = 0;
    let minDistance = Number.MAX_VALUE;

    for (let i = 0; i < samplePoints.length; i++) {

      const point = samplePoints[i];

      const distance = haversineDistance(
        poi.latitude,
        poi.longitude,
        point.latitude,
        point.longitude
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestZone = i;
      }
    }

    zones[nearestZone].pois.push(poi);
  }

  return zones;
}