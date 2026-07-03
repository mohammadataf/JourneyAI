/*
  This component displays all available routes.
  The user can click any route to make it active.
*/

import type { Route } from "../../services/routeService";

interface RouteListProps {
  routes: Route[];
  selectedRoute: number;
  setSelectedRoute: (index: number) => void;
}

const RouteList = ({
  routes,
  selectedRoute,
  setSelectedRoute,
}: RouteListProps) => {
  return (
    <div
      style={{
        position: "absolute",
        right: 20,
        top: 20,
        zIndex: 1000,
        width: "260px",
        background: "white",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      }}
    >
      <h3>Available Routes</h3>

      {routes.map((route, index) => (
        <div
          key={index}
          onClick={() => {
            // alert(index)
            setSelectedRoute(index)}
          }
          style={{
            padding: "10px",
            marginBottom: "10px",
            border:
              selectedRoute === index
                ? "2px solid blue"
                : "1px solid #ddd",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          <strong>Route {index + 1}</strong>

          <p>
            {(route.distance / 1000).toFixed(2)} km
          </p>

          <p>
            {(route.duration / 60).toFixed(1)} mins
          </p>
        </div>
      ))}
    </div>
  );
};

export default RouteList;