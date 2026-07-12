// import axios from "axios";
// import { Coordinate } from "./graphhopper.service";

// export interface POI {
//   id: string;
//   name: string;
//   latitude: number;
//   longitude: number;
//   address?: string;
//   rating?: number;
//   category?: string;
// }

// export type Theme =
//   | "scenic"
//   | "adventure"
//   | "cafe"
//   | "heritage";

// const THEME_QUERY: Record<Theme, string> = {
//   scenic: "tourist attraction",
//   adventure: "hiking area",
//   cafe: "cafe",
//   heritage: "historical landmark",
// };

// /*
//   Generic nearby search.
//   Can be used by Experience and Explore modules.
// */
// export async function searchNearbyPlaces(
//   location: Coordinate,
//   query: string,
//   radius: number = 6000
// ): Promise<POI[]> {
//   try {
//     const { data } = await axios.post(
//       "https://places.googleapis.com/v1/places:searchText",
//       {
//         textQuery: query,

//         locationBias: {
//           circle: {
//             center: {
//               latitude: location.latitude,
//               longitude: location.longitude,
//             },
//             radius,
//           },
//         },
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY!,
//           "X-Goog-FieldMask":
//             "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.primaryType",
//         },
//       }
//     );

//     return (data.places ?? []).map((place: any) => ({
//       id: place.id,
//       name: place.displayName.text,
//       latitude: place.location.latitude,
//       longitude: place.location.longitude,
//       address: place.formattedAddress,
//       rating: place.rating,
//       category: place.primaryType,
//     }));
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error(error.response?.data);
//     } else {
//       console.error(error);
//     }

//     return [];
//   }
// }

// /*
//   Search POIs along an entire journey.
//   Used by Experience module.
// */
// export async function getPOIs(
//   samplePoints: Coordinate[],
//   theme: Theme
// ): Promise<POI[]> {
//   const allPOIs: POI[] = [];

//   for (const point of samplePoints) {
//     const pois = await searchNearbyPlaces(
//       point,
//       THEME_QUERY[theme]
//     );

//     allPOIs.push(...pois);
//   }

//   // Remove duplicate POIs
//   return Array.from(
//     new Map(allPOIs.map((poi) => [poi.id, poi])).values()
//   );
// }


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
  | "heritage"
  | "cafe"
  | "restaurant"
  | "hotel"
  | "petrol";
 

/*
  Generic nearby search.
*/
export async function searchOpenTripMap(
  location: Coordinate,
  theme:Theme,
  radius: number = 6000
): Promise<POI[]> {
  try {
    const apiKey = process.env.OPENTRIPMAP_API_KEY!;

    const { data } = await axios.get(
      "https://api.opentripmap.com/0.1/en/places/radius",
      {
        params: {
          radius,
          lon: location.longitude,
          lat: location.latitude,
          format: "json",
          limit: 20,
          apikey: apiKey,
        },
      }
    );

    return (data ?? []).map((place: any) => ({
      id: place.xid,
      name: place.name || "Unknown",
      latitude: place.point.lat,
      longitude: place.point.lon,
      address: "",
      rating: undefined,
      category: theme,
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


async function searchOverpass(
  location: Coordinate,
  theme: Theme,
  radius: number = 6000
): Promise<POI[]> {

  const OVERPASS_QUERY: Record<string, string> = {
    cafe: "cafe",
    restaurant: "restaurant",
    hotel: "hotel",
    petrol: "fuel",
  };

  const tag = OVERPASS_QUERY[theme];

  const query = `
    [out:json];
    (
      node["amenity"="${tag}"](around:${radius},${location.latitude},${location.longitude});
      way["amenity"="${tag}"](around:${radius},${location.latitude},${location.longitude});
      relation["amenity"="${tag}"](around:${radius},${location.latitude},${location.longitude});
    );
    out center;
  `;

  try {
    console.log("call")

     const { data } = await axios.get(
    "https://overpass.kumi.systems/api/interpreter",
    {
      params: {
        data: query,
      },
    }
  );

    return (data.elements ?? []).map((place: any) => ({

      id: place.id.toString(),

      name:
        place.tags?.name ??
        "Unknown",

      latitude:
        place.lat ??
        place.center?.lat,

      longitude:
        place.lon ??
        place.center?.lon,

      address: "",

      rating: undefined,

      category: theme,

    }));

  } catch (error) {

    console.error(error);

    return [];

  }
}

/*
  Search POIs along an entire journey.
*/
export async function getPOIs(
  samplePoints: Coordinate[],
  theme: Theme
): Promise<POI[]> {
  const allPOIs: POI[] = [];

  for (const point of samplePoints) {

  let pois: POI[] = [];

  switch (theme) {

    case "scenic":
    case "heritage":
    case "adventure":
      pois = await searchOpenTripMap(point,theme);
      break;

    case "cafe":
    case "restaurant":
    case "hotel":
    case "petrol":
      pois = await searchOverpass(point, theme);
      break;
  }

  allPOIs.push(...pois);
}
return Array.from(
        new Map(
            allPOIs.map((poi) => [poi.id, poi])
        ).values()
    );
}