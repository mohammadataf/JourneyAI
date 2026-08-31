 

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

   // < 10 km → 2 sample (middle)
if (routeDistance <= 10_000) {
  indices = [
    0,
    Math.floor(n * 0.33),
    Math.floor(n * 0.66),

    n - 1,
  ];
}

// 10–20 km → 3 samples
else if (routeDistance <= 20_000) {
  indices = [
    0,
    Math.floor(n * 0.25),
    Math.floor(n * 0.50),
    Math.floor(n * 0.75),
    n - 1,
  ];
}

// 20–40 km → 4 samples
else if (routeDistance <= 40_000) {
  indices = [
    0,
    Math.floor(n * 0.20),
    Math.floor(n * 0.40),
    Math.floor(n * 0.60),
    Math.floor(n * 0.80),
    n - 1,
  ];
}

// 40–80 km → 5 samples
else if (routeDistance <= 80_000) {
  indices = [
    0,
    Math.floor(n * 0.16),
    Math.floor(n * 0.33),
    Math.floor(n * 0.50),
    Math.floor(n * 0.66),
    Math.floor(n * 0.83),
    n - 1,
  ];
}

// > 80 km → 8 samples
else {
  indices = [
    0,
    Math.floor(n * 0.10),
    Math.floor(n * 0.20),
    Math.floor(n * 0.30),
    Math.floor(n * 0.40),
    Math.floor(n * 0.50),
    Math.floor(n * 0.60),
    Math.floor(n * 0.70),
    Math.floor(n * 0.80),
    Math.floor(n * 0.90),
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