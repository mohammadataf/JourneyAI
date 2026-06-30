import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface FlyToLocationProps {
  latitude: number;
  longitude: number;
}

const FlyToLocation = ({
  latitude,
  longitude,
}: FlyToLocationProps) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo([latitude, longitude], 15, {
      animate: true,
      duration: 2,
    });
  }, [latitude, longitude, map]);

  return null;
};

export default FlyToLocation;