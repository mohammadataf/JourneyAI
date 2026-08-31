import RoutePath from "../Map/RoutePath";
import TripPlannerPOIMarkers from "../TripPlanner/TripPlannerPOIMarkers";
import type { POI } from "../../services/poiService";

interface Props {
  tripResult: any;
  selectedPOIs: POI[];
  onSelectPOI: (poi: POI) => void;
}

const TripResultLayer = ({
  tripResult,
  selectedPOIs,
  onSelectPOI,
}: Props) => {
  if (!tripResult) return null;

  return (
    <>
      {tripResult.itinerary?.route && (
        <RoutePath
          coordinates={tripResult.itinerary.route.coordinates}
        />
      )}

      {tripResult.selectedPOIs && (
        <TripPlannerPOIMarkers
          pois={tripResult.selectedPOIs}
          selectedPOIs={selectedPOIs}
          onSelectPOI={onSelectPOI}
        />
      )}
    </>
  );
};

export default TripResultLayer;