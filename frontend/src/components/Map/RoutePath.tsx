/*
  This component takes the route coordinates and draws the line or route on the map.
*/
 

import { Polyline } from "react-leaflet";

interface RoutePathProps {
  coordinates: [number, number][]; // array of many place coords like if path is A->B->C->D->E  and if destination is E then we have to pass  b c d 
}

const RoutePath = ({ coordinates }: RoutePathProps) => {
  if (coordinates.length === 0) return null;
  

  // Polyline takes the first point(like B) and starts drawing the route from start to A,
// then connects it to the next point(C) one by one until all points are connected.
return (
  <Polyline
    positions={coordinates}
    pathOptions={{
      color: "blue",
      weight: 5,
    }}
  />
);
};

export default RoutePath;