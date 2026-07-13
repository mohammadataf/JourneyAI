import axios from "axios";
import { Coordinate } from "../graphhopper.service";
import { POI, Theme } from "../poi.service";

export async function searchGeoapify(
  location: Coordinate,
  theme: Theme,
  radius: number = 6000
): Promise<POI[]> {
  try {
    const apiKey = process.env.GEOAPIFY_API_KEY!;

    const categories: Record<string, string> = {
      cafe: "catering.cafe",
      restaurant: "catering.restaurant",
      hotel: "accommodation.hotel",
      petrol: "service.vehicle.fuel",
    };

    const category = categories[theme];

    const { data } = await axios.get(
      "https://api.geoapify.com/v2/places",
      {
        params: {
          categories: category,
          filter: `circle:${location.longitude},${location.latitude},${radius}`,
          bias: `proximity:${location.longitude},${location.latitude}`,
          limit: 20,
          apiKey,
        },
      }
    );

    return (data.features ?? []).map((feature: any) => ({
      id: feature.properties.place_id,

      name:
        feature.properties.name ??
        "Unknown",

      latitude:
        feature.geometry.coordinates[1],

      longitude:
        feature.geometry.coordinates[0],

      address:
        feature.properties.formatted,

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