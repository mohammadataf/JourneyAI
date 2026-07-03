// This file handles all search-related API calls. It sends the user's search query to the Nominatim API, receives the search results, and returns only the required information to the application.


export interface Place { // struct
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  name?: string;
  type?: string;
  category?: string;
  importance?: number;
}

export const searchPlaces = async (query: string): Promise<Place[]> => {
  if (!query.trim()) return [];

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        query
      )}&format=jsonv2`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch places");
    }

    const data = await response.json();  
    // response.json() returns an array because the search query can match
    // multiple places. We use map() to go through each place one by one and
    // create a new object in the format our application expects. This also
    // gives us the flexibility to rename fields (for example, class -> category),
    // remove unnecessary fields, or add new ones later without changing the
    // rest of the application.

    return data.map((place: any) => ({
      place_id: place.place_id,
      display_name: place.display_name,
      lat: place.lat,
      lon: place.lon,
      name: place.name,
      type: place.type,
      category: place.class,      
      importance: place.importance,
    }));
  } catch (error) {
    console.error("Search Error:", error);
    return [];
  }
};














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