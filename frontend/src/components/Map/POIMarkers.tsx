import { Marker } from "@vis.gl/react-google-maps";
import type { POI } from "../../services/poiService";

interface Props {
  pois: POI[];
  onSelectPOI: (poi: POI) => void;
}

const POIMarkers = ({ pois, onSelectPOI }: Props) => {
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
          onClick={() => onSelectPOI(poi)}
        />
      ))}
    </>
  );
};

export default POIMarkers;