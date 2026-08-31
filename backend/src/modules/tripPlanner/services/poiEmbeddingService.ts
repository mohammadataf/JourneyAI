import type { POI } from "../../map/services/poi.service";

export function createPOIText(poi: POI): string {
  return [
    `Name: ${poi.name === "Unknown" ? "Unnamed place" : poi.name}`,
    `Category: ${poi.category || "unknown"}`,
    `Address: ${poi.address || "unknown"}`,
    `Rating: ${poi.rating ?? "unknown"}`,
  ].join(". ");
}

export function createPOIDocuments(pois: POI[]) {
  return pois.map((poi) => ({
    id: poi.id,
    text: createPOIText(poi),
    poi,
  }));
}