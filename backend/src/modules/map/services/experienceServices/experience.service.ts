/*
  This service creates complete travel experiences.

  It does not calculate routes itself.
  Instead, it coordinates different services:
  - Fetch POIs
  - Filter POIs
  - Generate routes through those POIs

  Later this service will also:
  - Rank routes
  - Generate summaries
  - Add experience scores
*/

import {Coordinate,Vehicle,getRoute,Route,getRouteWithVias} from "../graphhopper.service";
import { calculateScore } from "./scoring.service";

import { getPOIs, POI } from "../poi.service";
import { filterPOIs } from "../poiFilter.service";
import { isPOINearRoute } from "./corridor.service";
import { removeNearbyPOIs } from "./diversity.service";
import { sampleRoute } from "./routeSampler.service";

export interface ExperienceRoute {
  poi: POI;
  route: Route;
}

const MAX_SCENIC_ROUTES = 4;

export async function getScenicRoutes(
  start: Coordinate,
  end: Coordinate,
  vehicle: Vehicle
): Promise<ExperienceRoute[]> {

   
// Get the fastest route
const fastestRoutes = await getRoute(start, end, vehicle);

if (fastestRoutes.length === 0) {
  return [];
}

const fastestRoute = fastestRoutes[0];

// Pick sample points along the route
const samplePoints = sampleRoute(
  fastestRoute.coordinates,
  fastestRoute.distance
);
 
// Fetch all scenic POIs along the journey from Google Places
const pois = await getPOIs(samplePoints, "scenic");

// Filter unwanted POIs
const filteredPOIs = filterPOIs(pois, "scenic");

 

// Keep only POIs that are close to the fastest route
const nearbyPOIs = filteredPOIs.filter((poi) =>
  isPOINearRoute(
    poi,
    fastestRoute.coordinates,
    fastestRoute.distance
  )
);

// Rank nearby POIs
const rankedPOIs = [...nearbyPOIs].sort(
  (a, b) => calculateScore(b) - calculateScore(a)
);

// Remove nearby duplicate POIs
const diversePOIs = removeNearbyPOIs(rankedPOIs);

// Select top scenic POIs
const topPOIs = diversePOIs.slice(0, MAX_SCENIC_ROUTES);

console.log("Total:", filteredPOIs.length);
console.log("Nearby:", nearbyPOIs.length);
console.log("Diverse:", diversePOIs.length);
console.log("Selected:", topPOIs.length);

  const experienceRoutes: ExperienceRoute[] = [];

  // Generate one route for each scenic POI
  for (const poi of topPOIs) {

    const routes = await getRouteWithVias(
      start,
      end,
      [
        {
          latitude: poi.latitude,
          longitude: poi.longitude,
        },
      ],
      vehicle
    );

    // GraphHopper returns one route when using via-points.
    if (routes.length > 0) {
      experienceRoutes.push({
        poi,
        route: routes[0],
      });
    }
  }

  return experienceRoutes;
}