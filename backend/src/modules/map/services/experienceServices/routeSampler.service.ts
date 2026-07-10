import { Coordinate } from "../graphhopper.service";
import { haversineDistance } from "./corridor.service";

/*
  Decide how far apart sample points should be.
*/
function getSampleInterval(routeDistance: number): number {
  if (routeDistance <= 10000) return 2000;      // 2 km
  if (routeDistance <= 50000) return 5000;      // 5 km
  if (routeDistance <= 150000) return 10000;    // 10 km

  return 20000;                                 // 20 km
}

/*
  Pick sample points along the route.
*/
export function sampleRoute(
  coordinates: [number, number][],
  routeDistance: number
): Coordinate[] {

  const interval = getSampleInterval(routeDistance);

  const samples: Coordinate[] = [];

  let travelled = 0;

  // Always include the start
  samples.push({
    latitude: coordinates[0][0],
    longitude: coordinates[0][1],
  });

  let lastSample = coordinates[0];

  for (let i = 1; i < coordinates.length; i++) {

    travelled += haversineDistance(
      lastSample[0],
      lastSample[1],
      coordinates[i][0],
      coordinates[i][1]
    );

    if (travelled >= interval) {

      samples.push({
        latitude: coordinates[i][0],
        longitude: coordinates[i][1],
      });

      lastSample = coordinates[i];
      travelled = 0;
    }
  }

  // Always include destination
  const last = coordinates[coordinates.length - 1];

  samples.push({
    latitude: last[0],
    longitude: last[1],
  });

  return samples;
}