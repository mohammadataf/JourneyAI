// /*
//   This file sends the user's search query to Google Places API
//   and returns only the required information to the frontend.
// */

// import axios from "axios";

// export interface Place {
//   place_id: string;
//   display_name: string;
//   lat: string;
//   lon: string;
// }

// export const searchPlacesService = async (
//   query: string
// ): Promise<Place[]> => {
//   try {
//     console.log("heljwjnfjc")
//     const { data } = await axios.post(
//       "https://places.googleapis.com/v1/places:searchText",
//       {
//         textQuery: query,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY!,
//           "X-Goog-FieldMask":
//             "places.id,places.displayName,places.formattedAddress,places.location",
//         },
//       }
//     );

//     return (data.places || []).map((place: any) => ({
//       place_id: place.id,
//       display_name:
//         place.formattedAddress ||
//         place.displayName?.text ||
//         "",

//       lat: place.location.latitude.toString(),
//       lon: place.location.longitude.toString(),
//     }));
//   } catch (error: any) {
//     console.error(
//       "Google Search Error:",
//       error.response?.data || error.message
//     );

//     return [];
//   }
// };