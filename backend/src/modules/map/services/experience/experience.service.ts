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

import {Coordinate,Vehicle,Route,getRouteWithVias} from "../graphhopper.service";

import { getPOIs, POI } from "../poi.service";
import { filterPOIs } from "../poiFilter.service";

export interface ExperienceRoute {
  poi: POI;
  route: Route;
}

const MAX_SCENIC_ROUTES = 3;

export async function getScenicRoutes(
  start: Coordinate,
  end: Coordinate,
  vehicle: Vehicle
): Promise<ExperienceRoute[]> {

  // Fetch scenic POIs from Google Places
  const pois = await getPOIs(start, end, "scenic");

  // Remove unwanted / duplicate POIs
  const filteredPOIs = filterPOIs(pois, "scenic");

  // For now use only the top scenic places.
  // Later this will be replaced by a scoring algorithm.
  const topPOIs = filteredPOIs.slice(0, MAX_SCENIC_ROUTES);

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