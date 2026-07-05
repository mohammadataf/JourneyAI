// import axios from "axios";
 

// const GRAPHHOPPER_URL = process.env.GRAPHHOPPER_URL!;

// export interface Coordinate {
//   latitude: number;
//   longitude: number;
// }

// export interface Route {
//   coordinates: [number, number][];
//   distance: number;
//   duration: number;
// }

// export type Vehicle =
//   | "driving-car"
//   | "cycling-regular"
//   | "foot-walking"
//   | "driving-hgv";


 

// export async function getRoute(
//   start: Coordinate,
//   end: Coordinate,
//   vehicle: Vehicle = "driving-car"
// ): Promise<Route[]> {
//   try {
//     // We'll map vehicles properly later
//     const profile = "car";
//     console.log("hello")

//     const url =
//       `${GRAPHHOPPER_URL}/route` +
//       `?profile=${profile}` +
//       `&point=${start.latitude},${start.longitude}` +
//       `&point=${end.latitude},${end.longitude}` +
//       `&algorithm=alternative_route` +
//       `&alternative_route.max_paths=5` +
//       `&alternative_route.max_weight_factor=4` +
//       `&alternative_route.max_share_factor=0.6` +
//       `&ch.disable=true`+
//       `&points_encoded=false`;

//     const { data } = await axios.get(url); // data is an object and  and inside it data.paths(paths) is an array of path

//     console.log("Routes:", data.paths.length);




//     // GraphHopper returns coordinates as longitude, latitude and  Leaflet expects coordinates as [latitude, longitude] So we swap their positions before sending to the frontend.

//     const routes: Route[] = data.paths.map((path: any) => ({ 
//       coordinates: path.points.coordinates.map(
//         ([lon, lat]: [number, number]) => [lat, lon]
//       ),
//       distance: path.distance,
//       duration: path.time / 1000,
//     }));

//     return routes;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.log(error.response?.data);
//     } else {
//       console.log(error);
//     }

//     return [];
//   }
// }




// data str
// {
//   "hints": { ... },
//   "info": { ... },
//   "paths": [
//     {
//       "distance": 13821,
//       "time": 1017116,
//       "points": { ... }
//     },
//     {
//       "distance": 14012,
//       "time": 1025000,
//       "points": { ... }
//     }
//   ]
// }


















//  new code


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

// GraphHopper returns [lon, lat]; Leaflet/frontend expects [lat, lon].
// Every path -> Route conversion goes through here so the swap only lives in one place.
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
 * Fetches GraphHopper's structural alternative routes (algorithm=alternative_route).
 * Useful as a baseline / fastest-path lookup, or when you just want GraphHopper's
 * own notion of "different enough" paths. Not experience-aware — see
 * getRouteWithVias / getCustomModelRoute for theme-driven routing.
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
 * Routes through an ordered list of via-points (e.g. POIs selected by the
 * waypoint-selection algorithm). This is how a themed route (Scenic, Heritage,
 * Cafe, etc.) actually gets built once its waypoints are chosen.
 */
export async function getRouteWithVias(
  start: Coordinate,
  end: Coordinate,
  vias: Coordinate[],
  vehicle: Vehicle = "driving-car"
): Promise<Route[]> {
  try {
    const profile = VEHICLE_TO_PROFILE[vehicle];

    const points = [start, ...vias, end]
      .map((p) => `point=${p.latitude},${p.longitude}`)
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
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else {
      console.log(error);
    }
    return [];
  }
}

/**
 * Routes using a GraphHopper custom_model — lets you bias the route toward
 * priority zones (e.g. a union of park/heritage-district polygons) instead of
 * forcing it through exact waypoint coordinates. Requires POST since
 * custom_model can't be expressed as query params.
 */
export async function getCustomModelRoute(
  start: Coordinate,
  end: Coordinate,
  customModel: object,
  vehicle: Vehicle = "driving-car"
): Promise<Route[]> {
  try {
    const profile = VEHICLE_TO_PROFILE[vehicle];

    const { data } = await axios.post(`${GRAPHHOPPER_URL}/route`, {
      profile,
      points: [
        [start.longitude, start.latitude],
        [end.longitude, end.latitude],
      ],
      points_encoded: false,
      "ch.disable": true,
      custom_model: customModel,
    });

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

