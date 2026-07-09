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

export async function getScenicExperience(
  start: Coordinate,
  end: Coordinate,
  vehicle: Vehicle = "driving-car"
): Promise<ExperienceRoute[]> {
  try {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const { data } = await axios.post(
      `${BACKEND_URL}/api/experience/scenic`,
      {
        start,
        end,
        vehicle,
      }
    );

    return data.experiences;

  } catch (error) {
    console.error(error);
    return [];
  }
}