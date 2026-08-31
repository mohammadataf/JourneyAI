import type { POI } from "../../map/services/poi.service";
import type { Coordinate, Vehicle } from "../../map/services/graphhopper.service";

import { getVisitDuration } from "./visitDurationService";
import { buildRouteThroughPOIs } from "./itineraryRouteService";

 

interface BuildItineraryInput {
  start: Coordinate;
  pois: POI[];
  vehicle: Vehicle;
  availableMinutes: number;
}

export async function buildItinerary(
  data: BuildItineraryInput
) {
  const selectedPOIs = data.pois;

  

  if (selectedPOIs.length === 0) {
    return null;
  }

  const result = await buildRouteThroughPOIs(
    data.start,
    selectedPOIs,
    data.vehicle
  );

  if (!result) {
    return null;
  }

  const totalVisitTime = selectedPOIs.reduce(
    (total, poi) => total + getVisitDuration(poi),
    0
  );

  const totalTravelTime =
    result.route.duration / 60;

  const totalDuration =
    totalTravelTime + totalVisitTime;

  if (totalDuration > data.availableMinutes) {
    return null;
  }

  return {
    stops: selectedPOIs.map((poi) => ({
      poi,
      visitDuration: getVisitDuration(poi),
    })),
    route: result.route,
    totalTravelTime,
    totalVisitTime,
    totalDuration,
  };
}