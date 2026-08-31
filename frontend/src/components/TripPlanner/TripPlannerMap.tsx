import { Map } from "@vis.gl/react-google-maps";
import TripResultLayer from "./TripResultLayer";
import type { POI } from "../../services/poiService";

interface Props {
  tripResult: any;
  selectedPOIs: POI[];
  onSelectPOI: (poi: POI) => void;

  // NEW
  choosingLocation: boolean;
  onMapLocationSelect: (
    latitude: number,
    longitude: number
  ) => void;
}

const TripPlannerMap = ({
  tripResult,
  selectedPOIs,
  onSelectPOI,
  choosingLocation,
  onMapLocationSelect,
}: Props) => {
  return (
    <Map
      defaultCenter={{
        lat: 34.0837,
        lng: 74.7973,
      }}
      defaultZoom={14}
      style={{
        width: "100%",
        height: "100vh",
      }}
      gestureHandling="greedy"
      disableDefaultUI={false}
      onClick={(event) => {
        // Only detect map click when
        // user has selected "Choose on map"
        if (!choosingLocation) return;

        if (!event.detail.latLng) return;

        const latitude = event.detail.latLng.lat;
        const longitude = event.detail.latLng.lng;

        console.log(
          "📍 Map location selected:",
          latitude,
          longitude
        );

        onMapLocationSelect(latitude, longitude);
      }}
    >
      {tripResult && (
        <TripResultLayer
          tripResult={tripResult}
          selectedPOIs={selectedPOIs}
          onSelectPOI={onSelectPOI}
        />
      )}
    </Map>
  );
};

export default TripPlannerMap;