import axios from "axios";
import { Coordinate } from "./graphhopper.service";

export interface POI {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address?: string;
  rating?: number;
  category?: string;
}

export type Theme =
  | "scenic"
  | "adventure"
  | "cafe"
  | "heritage";

const THEME_QUERY: Record<Theme, string> = {
  scenic: "tourist attraction",
  adventure: "hiking area",
  cafe: "cafe",
  heritage: "historical landmark",
};

/*
  Generic nearby search.
  Can be used by Experience and Explore modules.
*/
export async function searchNearbyPlaces(
  location: Coordinate,
  query: string,
  radius: number = 6000
): Promise<POI[]> {
  try {
    const { data } = await axios.post(
      "https://places.googleapis.com/v1/places:searchText",
      {
        textQuery: query,

        locationBias: {
          circle: {
            center: {
              latitude: location.latitude,
              longitude: location.longitude,
            },
            radius,
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY!,
          "X-Goog-FieldMask":
            "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.primaryType",
        },
      }
    );

    return (data.places ?? []).map((place: any) => ({
      id: place.id,
      name: place.displayName.text,
      latitude: place.location.latitude,
      longitude: place.location.longitude,
      address: place.formattedAddress,
      rating: place.rating,
      category: place.primaryType,
    }));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
    } else {
      console.error(error);
    }

    return [];
  }
}

/*
  Search POIs along an entire journey.
  Used by Experience module.
*/
export async function getPOIs(
  samplePoints: Coordinate[],
  theme: Theme
): Promise<POI[]> {
  const allPOIs: POI[] = [];

  for (const point of samplePoints) {
    const pois = await searchNearbyPlaces(
      point,
      THEME_QUERY[theme]
    );

    allPOIs.push(...pois);
  }

  // Remove duplicate POIs
  return Array.from(
    new Map(allPOIs.map((poi) => [poi.id, poi])).values()
  );
}