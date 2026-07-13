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

import { getPOIs, POI, Theme } from "../poi.service";
import { filterPOIs } from "../poiFilter.service";
import { isPOINearRoute } from "./corridor.service";
import { removeNearbyPOIs } from "./diversity.service";
import { sampleRoute } from "./routeSampler.service";
import { groupPOIsBySamplePoint } from "./zone.service";

export interface ExperienceRoute {
  poi: POI;
  route: Route;
}

// const MAX_EXPERIENCE_ROUTES = 4;

export async function getExperienceRoutes(
  start: Coordinate,
  end: Coordinate,
  vehicle: Vehicle,
  theme: Theme
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
 
// Fetch all  theme POIs along the journey from Google Places
const pois = await getPOIs(samplePoints, theme);

// Filter unwanted POIs
const filteredPOIs = filterPOIs(pois);

 

// Keep only POIs close to the fastest route
const nearbyPOIs = filteredPOIs.filter((poi) =>
  isPOINearRoute(
    poi,
    fastestRoute.coordinates,
    fastestRoute.distance
  )
);

// Group POIs by journey zones
const zones = groupPOIsBySamplePoint(
  nearbyPOIs,
  samplePoints
);

const topPOIs: POI[] = [];

for (const zone of zones) {

  if (zone.pois.length === 0) continue;

  // Sort POIs inside this zone
  const ranked = [...zone.pois].sort(
    (a, b) => calculateScore(b) - calculateScore(a)
  );

  // Remove nearby duplicate POIs
  const  diversePOIs = removeNearbyPOIs(ranked);

  // Pick the best POI from this zone
  topPOIs.push(diversePOIs[0]);
}

 

console.log("Total:", filteredPOIs.length);
console.log("Nearby:", nearbyPOIs.length);
console.log("Zones:", zones.length);
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