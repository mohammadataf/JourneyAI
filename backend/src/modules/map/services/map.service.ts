/*
  This file takes the start and destination locations,
  calls the OpenRouteService API, and returns the route between them.
*/

import axios from "axios";

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

export const getRouteService = async (
  start: Coordinate,
  end: Coordinate,
  vehicle: Vehicle = "driving-car"
): Promise<Route[]> => {
  try {
    

    const { data } = await axios.post(
      `https://api.openrouteservice.org/v2/directions/${vehicle}/geojson`,
      {
        coordinates: [
          [start.longitude, start.latitude],
          [end.longitude, end.latitude],
        ],
        alternative_routes: { // These parameters tell ORS to try to compute up to top 3 distinct routes.
          target_count: 3,
          weight_factor: 1.6,
          share_factor: 0.4,
        },
      },
      {
        headers: {
          Authorization: process.env.ORS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("vehicle type",vehicle)
    console.log("len is",data.features.length);

     const routes: Route[] = data.features.map((feature: any) => ({
      // ORS returns [longitude, latitude]
      // Leaflet needs [latitude, longitude]
      coordinates: feature.geometry.coordinates.map(
        ([lon, lat]: [number, number]) => [lat, lon]
      ),

      distance: feature.properties.summary.distance,
      duration: feature.properties.summary.duration,
    }));
    
    
    return routes;
  } catch (error) {
    // console.error("Route Error:", error);
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      } else {
        console.log(error);
      }
      console.log("done")
    return [];
  }
};

// str of data and features is an array of multiple routes
// coordinates is an array of all coords(lon,lat)
// {
//   "features": [
//     {
//       "geometry": {
//         "coordinates": [
//           [74.79, 34.08],
//           [74.80, 34.09],
//           [74.81, 34.10]
//         ]
//       },
//       "properties": {
//         "summary": {
//           "distance": 12543,
//           "duration": 1120
//         }
//       }
//     }
//   ]
// }




 