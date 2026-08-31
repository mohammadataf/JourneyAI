// import { searchNearbyPlaces } from "../../map/services/poi.service";
import { NearbySearchRequest } from "../types/explore.types";

const CATEGORY_QUERY: Record<string, string> = {
  cafe: "cafe",
  restaurant: "restaurant",
  hotel: "hotel",
  scenic: "tourist attraction",
  heritage: "historical landmark",
  shopping: "shopping mall",
  hospital: "hospital",
  atm: "ATM",
  petrol_pump: "petrol pump",
};

export async function health() {
  return {
    message: "Explore module is working",
  };
}

export async function getNearby(data: NearbySearchRequest) {
  const query = CATEGORY_QUERY[data.category] ?? data.category;

  // return await searchNearbyPlaces(
  //   {
  //     latitude: data.lat,
  //     longitude: data.lng,
  //   },
  //   query,
  //   data.radius
  // );
}