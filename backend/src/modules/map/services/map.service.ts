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
): Promise<Route> => {
  try {

    const { data } = await axios.post(
      `https://api.openrouteservice.org/v2/directions/${vehicle}/geojson`,
      {
        coordinates: [
          [start.longitude, start.latitude],
          [end.longitude, end.latitude],
        ],
      },
      {
        headers: {
          Authorization: process.env.ORS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const feature = data.features[0]; //  features is an array of multiple path b/w start and end point so for now we need only top path

    return {
      // ORS returns [longitude, latitude]
      // Leaflet needs [latitude, longitude]
      // so just chnage their position, map will pick one point coords at a time then change it then next
      coordinates: feature.geometry.coordinates.map(
        ([lon, lat]: [number, number]) => [lat, lon]
      ),

      distance: feature.properties.summary.distance,
      duration: feature.properties.summary.duration,
    };
  } catch (error) {
    console.error("Route Error:", error);

    return {
      coordinates: [],
      distance: 0,
      duration: 0,
    };
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




 