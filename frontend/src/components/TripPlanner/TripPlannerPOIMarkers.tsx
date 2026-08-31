import { Marker } from "@vis.gl/react-google-maps";
import type { POI } from "../../services/poiService";

interface Props {
  pois: POI[];
  selectedPOIs: POI[];
  onSelectPOI: (poi: POI) => void;
}

const TripPlannerPOIMarkers = ({
  pois,
  selectedPOIs,
  onSelectPOI,
}: Props) => {
  return (
    <>
      {pois.map((poi) => {
        const selectedIndex = selectedPOIs.findIndex(
          (selected) => selected.id === poi.id
        );

        const isSelected = selectedIndex !== -1;

        return (
          <Marker
            key={poi.id}
            position={{
              lat: poi.latitude,
              lng: poi.longitude,
            }}
            title={
              isSelected
                ? `${selectedIndex + 1}. ${poi.name}`
                : poi.name
            }
            label={
              isSelected
                ? {
                    text: String(selectedIndex + 1),
                    color: "white",
                    fontWeight: "bold",
                  }
                : undefined
            }
            icon={
              isSelected
                ? "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
                : "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
            }
            onClick={() => onSelectPOI(poi)}
          />
        );
      })}
    </>
  );
};

export default TripPlannerPOIMarkers;