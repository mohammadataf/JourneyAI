import type { Theme } from "../../map/services/poi.service";

const INTEREST_THEME_MAP: Record<string, Theme[]> = {
  scenic: ["scenic"],
  cafe: ["cafe"],
  food: ["restaurant"],
  photography: ["scenic", "heritage"],
};

export function resolveThemes(
  interests: string[]
): Theme[] {
  const themes = new Set<Theme>();

  for (const interest of interests) {
    const mappedThemes =
      INTEREST_THEME_MAP[interest];

    if (!mappedThemes) continue;

    mappedThemes.forEach((theme) =>
      themes.add(theme)
    );
  }

  return [...themes];
}