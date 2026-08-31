import type { POI } from "../../map/services/poi.service";

const DEFAULT_VISIT_DURATION: Record<string, number> = {
  scenic: 30,
  heritage: 45,
  adventure: 60,
  cafe: 40,
  restaurant: 60,
  hotel: 30,
  petrol: 15,
};

export function getVisitDuration(poi: POI): number {
  const category = poi.category?.toLowerCase();

  if (category && DEFAULT_VISIT_DURATION[category]) {
    return DEFAULT_VISIT_DURATION[category];
  }

  return 30;
}