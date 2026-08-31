import {
  POI,
  Theme,
  PROVIDERS,
} from "../../map/services/poi.service";

export async function discoverLocalPOIs(
  location: {
    latitude: number;
    longitude: number;
  },
  themes: Theme[]
): Promise<POI[]> {
  // Fixed search radius: 10 km
  const radius = 10000;

  // Run all theme/provider calls in parallel
  const themeResults = await Promise.all(
    themes.map(async (theme) => {
      const provider = PROVIDERS[theme];

      if (!provider) {
        return [];
      }

      try {
        return await provider(
          location,
          theme,
          radius
        );
      } catch (error) {
        console.error(
          `Failed to fetch ${theme} POIs:`,
          error
        );

        return [];
      }
    })
  );

  // Combine POIs from all themes
  const allPOIs = themeResults.flat();

  // Remove duplicate POIs
  const uniquePOIs = Array.from(
    new Map(
      allPOIs.map((poi) => [poi.id, poi])
    ).values()
  );

  console.log(
    `Radius: ${radius}m | POIs: ${uniquePOIs.length}`
  );

  return uniquePOIs;
}