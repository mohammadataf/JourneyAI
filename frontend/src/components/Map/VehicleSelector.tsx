import type { Vehicle } from "../../services/routeService";

interface VehicleSelectorProps {
  vehicle: Vehicle;
  setVehicle: (vehicle: Vehicle) => void;
}

const vehicles: {
  value: Vehicle;
  label: string;
  icon: string;
}[] = [
  {
    value: "driving-car",
    label: "Car",
    icon: "🚗",
  },
  {
    value: "cycling-regular",
    label: "Bike",
    icon: "🚲",
  },
  {
    value: "foot-walking",
    label: "Walk",
    icon: "🚶",
  },
  
];

const VehicleSelector = ({
  vehicle,
  setVehicle,
}: VehicleSelectorProps) => {
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          fontWeight: 600,
          marginBottom: "12px",
          color: "#374151",
          fontSize: "16px",
        }}
      >
        Vehicle Type
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
        }}
      >
        {vehicles.map((item) => {
          const active = vehicle === item.value;

          return (
            <button
              key={item.value}
              onClick={() => setVehicle(item.value)}
              style={{
                border: active
                  ? "2px solid #2563EB"
                  : "1px solid #E5E7EB",
                background: active ? "#EFF6FF" : "#FFFFFF",
                borderRadius: "12px",
                padding: "12px 8px",
                cursor: "pointer",
                transition: "0.2s",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span style={{ fontSize: "22px" }}>
                {item.icon}
              </span>

              <span
                style={{
                  fontSize: "12px",
                  fontWeight: active ? 600 : 500,
                  color: active ? "#2563EB" : "#374151",
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default VehicleSelector;