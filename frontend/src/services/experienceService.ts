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

export interface POI {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  rating?: number;
  category: string;
}

export interface ExperienceRoute {
  poi: POI;
  route: Route;
}

export type Vehicle =
  | "driving-car"
  | "cycling-regular"
  | "foot-walking"
  | "driving-hgv";

export type Theme =
  | "scenic"
  | "cafe"
  | "heritage"
  | "adventure"
  | "family";

export async function getExperienceRoutes(
  start: Coordinate,
  end: Coordinate,
  theme:Theme,
  vehicle: Vehicle = "driving-car"
   
): Promise<ExperienceRoute[]> {
  try {
     
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const { data } = await axios.post(
      `${BACKEND_URL}/api/experience`,
      {
        start,
        end,
        vehicle,
        theme
      }
    );

    return data.experiences;

  } catch (error) {
    console.error(error);
    return [];
  }
}