/*
  This file sends the start and destination locations
  to our backend and gets the route between them.
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

export const getRoute = async (
  start: Coordinate,
  end: Coordinate,
  vehicle: Vehicle = "driving-car"
): Promise<Route[]> => {
  try {
    

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const { data } = await axios.post(`${BACKEND_URL}/api/v1/map/route`,
      {
        start,
        end,
        vehicle,
      }
    );
    

    return data.routes;

  } catch (error) {
    console.error("Route Error:", error);

    return [];
  }
};