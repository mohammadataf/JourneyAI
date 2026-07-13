import axios from "axios";
import { Coordinate } from "../graphhopper.service";
import { POI, Theme } from "../poi.service";

export async function searchOpenTripMap(
  location: Coordinate,
  theme: Theme,
  radius: number = 6000
): Promise<POI[]> {
  try {
    const apiKey = process.env.OPENTRIPMAP_API_KEY!;

    const kinds: Record<string, string> = {
      scenic: "interesting_places",
      heritage: "historic",
      adventure: "natural",
    };

    const { data } = await axios.get(
      "https://api.opentripmap.com/0.1/en/places/radius",
      {
        params: {
          radius,
          lon: location.longitude,
          lat: location.latitude,
          format: "json",
          limit: 20,
          kinds: kinds[theme],
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