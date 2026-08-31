import {
  getRouteWithVias,
  type Coordinate,
  type Vehicle,
  type Route,
} from "../../map/services/graphhopper.service";

interface SelectedPOI {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface GenerateTripRouteInput {
  start: Coordinate;
  selectedPOIs: SelectedPOI[];
  vehicle?: Vehicle;
}

export async function generateTripRoute(
  data: GenerateTripRouteInput
) {
  const {
    start,
    selectedPOIs,
    vehicle = "driving-car",
  } = data;

  if (!start) {
    throw new Error("Start location is required");
  }

  if (
    typeof start.latitude !== "number" ||
    typeof start.longitude !== "number"
  ) {
    throw new Error("Invalid start location");
  }

  if (!Array.isArray(selectedPOIs)) {
    throw new Error("selectedPOIs must be an array");
  }

  if (selectedPOIs.length === 0) {
    throw new Error("At least one POI is required");
  }

  /*
   * User selection order is preserved.
   *
   * Example:
   *
   * Start -> POI 1
   * POI 1 -> POI 2
   * POI 2 -> POI 3
   *
   * We do NOT rearrange the POIs.
   */

  const routes: Route[] = [];

  let currentStart: Coordinate = {
    latitude: Number(start.latitude),
    longitude: Number(start.longitude),
  };

  for (const poi of selectedPOIs) {
    const currentEnd: Coordinate = {
      latitude: Number(poi.latitude),
      longitude: Number(poi.longitude),
    };

    const segmentRoutes = await getRouteWithVias(
      currentStart,
      currentEnd,
      [],
      vehicle
    );

    if (!segmentRoutes.length) {
      throw new Error(
        `No route found to POI: ${poi.name}`
      );
    }

    routes.push(segmentRoutes[0]);

    // Next segment starts from this POI
    currentStart = currentEnd;
  }

  /*
   * Combine all route segments into one route.
   */

  const coordinates: [number, number][] = [];

  let totalDistance = 0;
  let totalDuration = 0;

  routes.forEach((route, index) => {
    /*
     * Avoid duplicating the connection point
     * between two segments.
     */
    if (index === 0) {
      coordinates.push(...route.coordinates);
    } else {
      coordinates.push(...route.coordinates.slice(1));
    }

    totalDistance += route.distance;
    totalDuration += route.duration;
  });

  return {
    success: true,

    start,

    selectedPOIs,

    route: {
      coordinates,
      distance: totalDistance,
      duration: totalDuration,
    },
  };
}