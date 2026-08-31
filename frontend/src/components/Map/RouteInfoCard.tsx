/*
  This component shows the route distance
  and estimated travel time.
*/

import type { Route } from "../../services/routeService"; // we import Route  so that we can use it as interface(blueprint) for  RouteInfoCardProps

interface RouteInfoCardProps {
  route: Route;
}

const RouteInfoCard = ({ route }: RouteInfoCardProps) => {
  const distance = (route.distance / 1000).toFixed(2);
  const duration = Math.ceil(route.duration / 60).toFixed(1);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 20,
        left: 4,
        zIndex: 1000,
        background: "white",
        padding: "12px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        minWidth: "150px",
      }}
    >
      <h3>Route Info</h3>

      <p>📏 Distance: {distance} km</p>

      <p>⏱ Time: {duration} min</p>
    </div>
  );
};

export default RouteInfoCard;