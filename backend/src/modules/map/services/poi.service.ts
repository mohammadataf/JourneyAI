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
  Fetch nearby places based on the selected theme.

  NOTE:
  Right now we search around the midpoint of the journey.
  Later we will replace this with our corridor algorithm,
  which will search only along the actual route.
*/

export async function getPOIs(
  start: Coordinate,
  end: Coordinate,
  theme: Theme
): Promise<POI[]> {
  try {
    // Midpoint of the journey (temporary)
    const latitude = (start.latitude + end.latitude) / 2;
    const longitude = (start.longitude + end.longitude) / 2;

    const { data } = await axios.post(
      "https://places.googleapis.com/v1/places:searchText",
      {
        textQuery: THEME_QUERY[theme],

        locationBias: {
          circle: {
            center: {
              latitude,
              longitude,
            },
            radius: 8000,
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

    const pois: POI[] = (data.places ?? []).map((place: any) => ({
      id: place.id,
      name: place.displayName.text,
      latitude: place.location.latitude,
      longitude: place.location.longitude,
      address: place.formattedAddress,
      rating: place.rating,
      category: place.primaryType,
    }));

    return pois;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else {
      console.log(error);
    }

    return [];
  }
}