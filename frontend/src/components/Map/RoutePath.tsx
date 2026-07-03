// /*
//   This component takes the route coordinates and draws the line or route on the map.
// */
 

// import { Polyline } from "react-leaflet";

// interface RoutePathProps {
//   coordinates: [number, number][]; // array of many place coords like if path is A->B->C->D->E  and if destination is E then we have to pass  b c d 
// }

// const RoutePath = ({ coordinates }: RoutePathProps) => {
//   if (coordinates.length === 0) return null;
  

//   // Polyline takes the first point(like B) and starts drawing the route from start to A,
// // then connects it to the next point(C) one by one until all points are connected.
// return (
//   <Polyline
//     key={JSON.stringify(coordinates[0])}
//     positions={coordinates}
//     pathOptions={{
//       color: "blue",
//       weight: 5,
//     }}
//   />
// );
// };

// export default RoutePath;


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