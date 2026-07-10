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
  Search nearby places around one location.
*/
async function searchPOIs(
  location: Coordinate,
  theme: Theme
): Promise<POI[]> {
  try {
    const { data } = await axios.post(
      "https://places.googleapis.com/v1/places:searchText",
      {
        textQuery: THEME_QUERY[theme],

        locationBias: {
          circle: {
            center: {
              latitude: location.latitude,
              longitude: location.longitude,
            },
            radius: 6000,
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
      console.log(error.response?.data);
    } else {
      console.log(error);
    }

    return [];
  }
}

/*
  Search POIs along the whole journey.
*/
export async function getPOIs(
  samplePoints: Coordinate[],
  theme: Theme
): Promise<POI[]> {

  const allPOIs: POI[] = [];

  for (const point of samplePoints) {
    const pois = await searchPOIs(point, theme);
    allPOIs.push(...pois);
  }

  // Remove duplicate POIs
  const uniquePOIs = Array.from(
    new Map(
      allPOIs.map((poi) => [poi.id, poi])
    ).values()
  );

  return uniquePOIs;
}