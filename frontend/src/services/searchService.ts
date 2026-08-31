// // This file handles all search-related API calls. It sends the user's search query
// // to the Nominatim API, receives the search results, and returns only the required
// // information to the application.

// export interface Place {
//   place_id: number;
//   display_name: string;
//   lat: string;
//   lon: string;
//   name?: string;
//   type?: string;
//   category?: string;
//   importance?: number;
// }

// export const searchPlaces = async (
//   query: string,
//   signal?: AbortSignal
// ): Promise<Place[]> => {
//   if (!query.trim()) return [];

//   try {
//     const response = await fetch(
//       `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
//         query
//       )}&format=jsonv2&limit=5`,
//       {
//         signal,
//         headers: {
//           Accept: "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch places");
//     }

//     const data = await response.json();
//     console.log("data are",data)

//     return data.map((place: any) => ({
//       place_id: place.place_id,
//       display_name: place.display_name,
//       lat: place.lat,
//       lon: place.lon,
//       name: place.name,
//       type: place.type,
//       category: place.class,
//       importance: place.importance,
//     }));
//   } catch (error) {
//     if ((error as Error).name !== "AbortError") {
//       console.error("Search Error:", error);
//     }
//     return [];
//   }
// };














// google map search

// This file handles all search-related API calls. It sends the user's search
// query to our backend, which calls Google Places API and returns the results.

// export interface Place {
//   place_id: string;
//   display_name: string;
//   lat: string;
//   lon: string;
// }

// export const searchPlaces = async (
//   query: string
// ): Promise<Place[]> => {
//   if (!query.trim()) return [];

//   try {
   
//     const response = await fetch(
//       "http://localhost:5000/api/v1/search",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           query,
//         }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch places");
//     }

//     const data = await response.json();

//     return data.places;
//   } catch (error) {
//     console.error("Search Error:", error);
//     return [];
//   }
// };




// geoapify search

export interface Place {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  name?: string;
  type?: string;
  category?: string;
  importance?: number;
}

const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

export const searchPlaces = async (
  query: string,
  signal?: AbortSignal
): Promise<Place[]> => {
  if (!query.trim()) return [];

  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
        query
      )}&filter=countrycode:in&limit=5&apiKey=${API_KEY}`,
      {
        signal,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch places");
    }

    const data = await response.json();

    return data.features.map((feature: any) => ({
      place_id: feature.properties.place_id ?? feature.properties.result_type + feature.properties.lat + feature.properties.lon,

      display_name: feature.properties.formatted,

      lat: feature.properties.lat.toString(),

      lon: feature.properties.lon.toString(),

      name: feature.properties.name,

      type: feature.properties.result_type,

      category: feature.properties.result_type,

      importance: feature.properties.rank?.importance ?? 0,
    }));
  } catch (error) {
    if ((error as Error).name !== "AbortError") {
      console.error(error);
    }

    return [];
  }
};