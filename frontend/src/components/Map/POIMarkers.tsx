import { Marker } from "@vis.gl/react-google-maps";
import type { POI } from "../../services/poiService";

interface Props {
  pois: POI[];
  onSelectPOI: (poi: POI) => void;
  color?: "red" | "green" | "blue" | "yellow";
}

const POIMarkers = ({
  pois,
  onSelectPOI,
  color = "red",
}: Props) => {

  const iconUrl = `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`;

  return (
    <>
      {pois.map((poi) => (
        <Marker
          key={poi.id}
          position={{
            lat: poi.latitude,
            lng: poi.longitude,
          }}
          title={poi.name}
          icon={iconUrl}
          onClick={() => onSelectPOI(poi)}
        />
      ))}
    </>
  );
};

export default POIMarkers;