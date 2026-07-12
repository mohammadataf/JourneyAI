// import { Coordinate } from "../graphhopper.service";
// import { haversineDistance } from "./corridor.service";

// /*
//   Decide how far apart sample points should be.
// */
// function getSampleInterval(routeDistance: number): number {
//   if (routeDistance <= 10000) return 2000;      // 2 km
//   if (routeDistance <= 50000) return 5000;      // 5 km
//   if (routeDistance <= 150000) return 10000;    // 10 km

//   return 20000;                                 // 20 km
// }

// /*
//   Pick sample points along the route.
// */
// export function sampleRoute(
//   coordinates: [number, number][],
//   routeDistance: number
// ): Coordinate[] {

//   const interval = getSampleInterval(routeDistance);

//   const samples: Coordinate[] = [];

//   let travelled = 0;

//   // Always include the start
//   samples.push({
//     latitude: coordinates[0][0],
//     longitude: coordinates[0][1],
//   });

//   let lastSample = coordinates[0];

//   for (let i = 1; i < coordinates.length; i++) {

//     travelled += haversineDistance(
//       lastSample[0],
//       lastSample[1],
//       coordinates[i][0],
//       coordinates[i][1]
//     );

//     if (travelled >= interval) {

//       samples.push({
//         latitude: coordinates[i][0],
//         longitude: coordinates[i][1],
//       });

//       lastSample = coordinates[i];
//       travelled = 0;
//     }
//   }

//   // Always include destination
//   const last = coordinates[coordinates.length - 1];

//   samples.push({
//     latitude: last[0],
//     longitude: last[1],
//   });

//   return samples;
// }


// for fixed sample points

import { Coordinate } from "../graphhopper.service";

/*
  Pick sample points along the route.

  We use:
  - Start
  - 25%
  - 50%
  - 75%
  - Destination

  This keeps the number of Google Places API calls small
  while still covering the whole journey.
*/
export function sampleRoute(
  coordinates: [number, number][],
  routeDistance: number
): Coordinate[] {

  const n = coordinates.length;

  if (n === 0) return [];

  let indices: number[];

  // < 20 km → 1 sample (middle)
  if (routeDistance <= 20_000) {
    indices = [
      0,
      Math.floor(n * 0.50),
      n - 1,
    ];
  }

  // 20–80 km → 2 samples
  else if (routeDistance <= 80_000) {
    indices = [
      0,
      Math.floor(n * 0.33),
      Math.floor(n * 0.66),
      n - 1,
    ];
  }

  // > 80 km → 3 samples
  else {
    indices = [
      0,
      Math.floor(n * 0.25),
      Math.floor(n * 0.50),
      Math.floor(n * 0.75),
      n - 1,
    ];
  }

  return indices.map((index) => {
    const [latitude, longitude] = coordinates[index];

    return {
      latitude,
      longitude,
    };
  });
}