import type { POI } from "../../map/services/poi.service";
import type { Coordinate } from "../../map/services/graphhopper.service";

export interface ItineraryStop {
  poi: POI;
  visitDuration: number;
  arrivalTime: number;
}

export interface ItineraryLeg {
  from: Coordinate;
  to: Coordinate;
  distance: number;
  duration: number;
}

export interface Itinerary {
  stops: ItineraryStop[];
  legs: ItineraryLeg[];
  totalDistance: number;
  totalTravelTime: number;
  totalVisitTime: number;
  totalDuration: number;
}