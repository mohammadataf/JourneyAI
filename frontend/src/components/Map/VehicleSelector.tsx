/*
  This component lets the user choose
  which vehicle to use for route navigation.
*/

import type { Vehicle } from "../../services/routeService";

interface VehicleSelectorProps {
  vehicle: Vehicle;
  setVehicle: (vehicle: Vehicle) => void;
}

const VehicleSelector = ({
  vehicle,
  setVehicle,
}: VehicleSelectorProps) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 150,
        left: 4,
        zIndex: 1000,
        background: "white",
        padding: "10px",
        borderRadius: "10px",
        
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      }}
    >
      <label
        style={{
          display: "block",
          marginBottom: "5px",
          fontWeight: "bold",
        }}
      >
        Vehicle
      </label>

      <select
        value={vehicle}
        onChange={(e) => setVehicle(e.target.value as Vehicle)}
        style={{
          padding: "8px",
          width: "180px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        <option value="driving-car">🚗 Car</option>
        <option value="cycling-regular">🚲 Bike</option>
        <option value="foot-walking">🚶 Walk</option>
         
      </select>
    </div>
  );
};

export default VehicleSelector;