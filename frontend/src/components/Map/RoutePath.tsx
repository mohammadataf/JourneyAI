 


/*
  This component takes the route coordinates and draws the line or route on the map.
*/

import { useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";

interface RoutePathProps {
  coordinates: [number, number][];
}

const RoutePath = ({ coordinates }: RoutePathProps) => {
  const map = useMap();

  useEffect(() => {
    
    if (!map || coordinates.length === 0) return;

    const polyline = new google.maps.Polyline({
      path: coordinates.map(([lat, lng]) => ({
        lat,
        lng,
      })),
      strokeColor: "#2563EB",
      strokeOpacity: 1,
      strokeWeight: 5,
      map,
    });

    return () => {
      polyline.setMap(null);
    };
  }, [map, coordinates]);

  return null;
};

export default RoutePath;