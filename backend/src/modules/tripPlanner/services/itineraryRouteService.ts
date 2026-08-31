import type { POI } from "../../map/services/poi.service";

import {
  getRouteWithVias,
  type Coordinate,
  type Vehicle,
} from "../../map/services/graphhopper.service";

export async function buildRouteThroughPOIs(
  start: Coordinate,
  pois: POI[],
  vehicle: Vehicle
) {
  if (pois.length === 0) {
    return null;
  }

  const vias: Coordinate[] = pois.map((poi) => ({
    latitude: poi.latitude,
    longitude: poi.longitude,
  }));

  const end = vias[vias.length - 1];

  const routePois = vias.slice(0, -1);

  const routes = await getRouteWithVias(
    start,
    end,
    routePois,
    vehicle
  );

  if (routes.length === 0) {
    return null;
  }

  const bestRoute = routes.reduce((best, route) =>
    route.duration < best.duration ? route : best
  );

  return {
    pois,
    route: bestRoute,
  };
}