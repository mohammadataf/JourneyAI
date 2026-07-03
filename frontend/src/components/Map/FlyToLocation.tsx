/*
  This component moves the Google Map to the selected destination
  whenever the destination changes.
*/

import { useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";

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
    if (!map) return;

    map.panTo({
      lat: latitude,
      lng: longitude,
    });

    map.setZoom(15);
  }, [map, latitude, longitude]);

  return null;
};

export default FlyToLocation;