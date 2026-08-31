import axios from "axios";

const GRAPHHOPPER_URL = process.env.GRAPHHOPPER_URL!;

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface Route {
  coordinates: [number, number][];
  distance: number;
  duration: number;
}

export type Vehicle =
  | "driving-car"
  | "cycling-regular"
  | "foot-walking"
  | "driving-hgv";

const VEHICLE_TO_PROFILE: Record<Vehicle, string> = {
  "driving-car": "car",
  "cycling-regular": "bike",
  "foot-walking": "foot",
  "driving-hgv": "truck",
};

/*
 * GraphHopper returns [lon, lat]
 * Leaflet/frontend expects [lat, lon].
 */
function parsePath(path: any): Route {
  return {
    coordinates: path.points.coordinates.map(
      ([lon, lat]: [number, number]) => [lat, lon]
    ),
    distance: path.distance,
    duration: path.time / 1000,
  };
}

function parsePaths(paths: any[]): Route[] {
  return paths.map(parsePath);
}

/**
 * Fetches GraphHopper's structural alternative routes.
 */
export async function getRoute(
  start: Coordinate,
  end: Coordinate,
  vehicle: Vehicle = "driving-car"
): Promise<Route[]> {
  try {
    const profile = VEHICLE_TO_PROFILE[vehicle];

    const url =
      `${GRAPHHOPPER_URL}/route` +
      `?profile=${profile}` +
      `&point=${start.latitude},${start.longitude}` +
      `&point=${end.latitude},${end.longitude}` +
      `&algorithm=alternative_route` +
      `&alternative_route.max_paths=5` +
      `&alternative_route.max_weight_factor=4` +
      `&alternative_route.max_share_factor=0.6` +
      `&ch.disable=true` +
      `&points_encoded=false`;

    const { data } = await axios.get(url);

    return parsePaths(data.paths);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else {
      console.log(error);
    }

    return [];
  }
}

/**
 * Routes through an ordered list of via-points.
 *
 * If GraphHopper cannot route through one of the POIs,
 * that POI is removed and the request is retried.
 *
 * This prevents one bad/unroutable POI from breaking
 * the complete route.
 */
export async function getRouteWithVias(
  start: Coordinate,
  end: Coordinate,
  vias: Coordinate[],
  vehicle: Vehicle = "driving-car"
): Promise<Route[]> {
  const profile = VEHICLE_TO_PROFILE[vehicle];

  // Work on a copy so the original POI array is not modified.
  const validVias = [...vias];

  while (true) {
    try {
      const points = [start, ...validVias, end]
        .map(
          (p) => `point=${p.latitude},${p.longitude}`
        )
        .join("&");

      const url =
        `${GRAPHHOPPER_URL}/route` +
        `?profile=${profile}` +
        `&${points}` +
        `&ch.disable=true` +
        `&points_encoded=false`;

      const { data } = await axios.get(url);

      return parsePaths(data.paths);
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        console.error(error);
        return [];
      }

      const errorData = error.response?.data;

      console.error(
        "GraphHopper route error:",
        errorData
      );

      const message =
        errorData?.hints?.[0]?.message ||
        errorData?.message ||
        "";

      /*
       * Example:
       *
       * Cannot find point 9: 34.1524,74.9872
       *
       * GraphHopper's point indexes are:
       *
       * 0       -> start
       * 1...N   -> via points
       * N + 1   -> end
       */

      const match = message.match(
        /point\s+(\d+)/i
      );

      if (!match) {
        return [];
      }

      const failedPointIndex = Number(match[1]);

      /*
       * Start and end cannot be removed.
       */
      if (
        failedPointIndex <= 0 ||
        failedPointIndex >= validVias.length + 1
      ) {
        return [];
      }

      /*
       * Convert GraphHopper point index
       * to the index inside validVias.
       *
       * GH point 1 -> vias[0]
       * GH point 2 -> vias[1]
       * etc.
       */
      const viaIndex = failedPointIndex - 1;

      const removedVia = validVias[viaIndex];

      console.warn(
        "Skipping unroutable via point:",
        removedVia
      );

      validVias.splice(viaIndex, 1);

      /*
       * If every via point was removed,
       * route directly from start to end.
       */
      if (validVias.length === 0) {
        try {
          const url =
            `${GRAPHHOPPER_URL}/route` +
            `?profile=${profile}` +
            `&point=${start.latitude},${start.longitude}` +
            `&point=${end.latitude},${end.longitude}` +
            `&ch.disable=true` +
            `&points_encoded=false`;

          const { data } = await axios.get(url);

          return parsePaths(data.paths);
        } catch (finalError) {
          if (axios.isAxiosError(finalError)) {
            console.error(
              "Final GraphHopper route error:",
              finalError.response?.data
            );
          } else {
            console.error(finalError);
          }

          return [];
        }
      }
    }
  }
}

/**
 * Routes using a GraphHopper custom_model.
 *
 * This allows the route to be biased toward
 * priority zones instead of forcing exact POI coordinates.
 */
export async function getCustomModelRoute(
  start: Coordinate,
  end: Coordinate,
  customModel: object,
  vehicle: Vehicle = "driving-car"
): Promise<Route[]> {
  try {
    const profile = VEHICLE_TO_PROFILE[vehicle];

    const { data } = await axios.post(
      `${GRAPHHOPPER_URL}/route`,
      {
        profile,

        points: [
          [start.longitude, start.latitude],
          [end.longitude, end.latitude],
        ],

        points_encoded: false,

        "ch.disable": true,

        custom_model: customModel,
      }
    );

    return parsePaths(data.paths);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else {
      console.log(error);
    }

    return [];
  }
}