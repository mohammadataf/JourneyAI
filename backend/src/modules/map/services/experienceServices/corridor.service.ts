import { POI } from "../poi.service";

/*
  Returns the straight-line distance (in meters)
  between two latitude/longitude points.
*/
export function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371000;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/*
  Returns the minimum distance (in meters)
  between a POI and any point on the route.
*/
export function distanceFromRoute(
  poi: POI,
  routeCoordinates: [number, number][]
): number {
  let minDistance = Number.MAX_VALUE;

  for (const [lat, lon] of routeCoordinates) {
    const distance = haversineDistance(
      poi.latitude,
      poi.longitude,
      lat,
      lon
    );

    minDistance = Math.min(minDistance, distance);
  }

  return minDistance;
}

// const ROUTE_CORRIDOR_METERS = 2000;

export function getCorridorWidth(routeDistance: number): number {
  const width = routeDistance * 0.02;

  return Math.max(500, Math.min(width, 5000));
}

/*
  Returns true if the POI lies close enough
  to the user's current route.
*/
export function isPOINearRoute(
  poi: POI,
  routeCoordinates: [number, number][],
  routeDistance: number
): boolean {

  const corridorWidth = getCorridorWidth(routeDistance);

  return (
    distanceFromRoute(poi, routeCoordinates) <= corridorWidth
  );
}