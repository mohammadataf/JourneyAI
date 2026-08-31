 import axios from "axios";
import { Coordinate } from "./graphhopper.service";
import {searchOpenTripMap} from "./providers/opentripmap.provider"
import {searchGeoapify} from "./providers/geoapify.provider"


export const PROVIDERS = {
  scenic: searchOpenTripMap,
  heritage: searchOpenTripMap,
  photography: searchOpenTripMap,

  cafe: searchGeoapify,
  restaurant: searchGeoapify,
  hotel: searchGeoapify,
  petrol: searchGeoapify,
  food: searchGeoapify,
} as const;

export interface POI {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address?: string;
  rating?: number;
  category?: string;

   // OpenTripMap classification
  kinds?: string;
}

export type Theme =
  | "scenic"
  | "heritage"
  | "cafe"
  | "restaurant"
  | "hotel"
  | "petrol"
  | "food"
  | "photography";
 

/*
  Search POIs along an entire journey.
*/
export async function getPOIs(
  samplePoints: Coordinate[],
  theme: Theme
): Promise<POI[]> {
  const allPOIs: POI[] = [];

  for (const point of samplePoints) {


   const provider = PROVIDERS[theme];

   if(!provider){
    continue;
   }

  const pois = await provider(point, theme);

 

  allPOIs.push(...pois);
}
return Array.from(
        new Map(
            allPOIs.map((poi) => [poi.id, poi])
        ).values()
    );
}