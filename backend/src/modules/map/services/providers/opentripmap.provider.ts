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

    const kinds: Record<string, string[]> = {
      // Existing scenic logic — DON'T CHANGE
      scenic: [
        "natural",
        "gardens_and_parks",
        "view_points",
        "water",
      ],

      heritage: [
        "historic",
        "cultural",
        "religion",
        "architecture",
        "monuments",
      ],

      photography: [
        "view_points",
        "natural",
        "gardens_and_parks",
        "water",
        "architecture",
        "historic",
      ],
    };

    const themeKinds = kinds[theme];

    if (!themeKinds) {
      return [];
    }

    const allPlaces: any[] = [];

    for (const kind of themeKinds) {
      const { data } = await axios.get(
        "https://api.opentripmap.com/0.1/en/places/radius",
        {
          params: {
            radius,
            lon: location.longitude,
            lat: location.latitude,
            format: "json",
            limit: 20,
            kinds: kind,
            apikey: apiKey,
          },
        }
      );

      allPlaces.push(...(data ?? []));
    }

    const uniquePlaces = Array.from(
      new Map(
        allPlaces
          .filter(
            (place: any) =>
              place.name &&
              place.point &&
              typeof place.point.lat === "number" &&
              typeof place.point.lon === "number"
          )
          .map((place: any) => [place.xid, place])
      ).values()
    );

    return uniquePlaces.map((place: any) => ({
      id: place.xid,
      name: place.name,
      latitude: place.point.lat,
      longitude: place.point.lon,
      address: "",
      rating: undefined,
      category: theme,
      kinds: place.kinds || "",
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