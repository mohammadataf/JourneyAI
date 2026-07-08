/*
  This file sends the start location, destination,
  and one waypoint to the backend.

  The backend uses GraphHopper's getRouteWithVias()
  to generate a route that passes through the waypoint.
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

export interface Waypoint {
  latitude: number;
  longitude: number;
}

export type Vehicle =
  | "driving-car"
  | "cycling-regular"
  | "foot-walking"
  | "driving-hgv";

export const getViaRoute = async (
  start: Coordinate,
  end: Coordinate,
  waypoint: Waypoint,
  vehicle: Vehicle = "driving-car"
): Promise<Route[]> => {
  try {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const { data } = await axios.post(
      `${BACKEND_URL}/api/via-route`,
      {
        start,
        end,
        waypoint,
        vehicle,
      }
    );

    return data.routes;
  } catch (error) {
    console.error("Via Route Error:", error);
    return [];
  }
};