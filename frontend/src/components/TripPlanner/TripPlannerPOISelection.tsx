import type { POI } from "../../services/poiService";

interface Props {
  selectedPOIs: POI[];
  routeLoading: boolean;
  onCreateRoute: () => void;
}

const TripPlannerPOISelection = ({
  selectedPOIs,
  routeLoading,
  onCreateRoute,
}: Props) => {
  if (selectedPOIs.length === 0) {
    return (
      <div
        style={{
          marginTop: "20px",
        }}
      >
        <div
          style={{
            padding: "14px",
            borderRadius: "12px",
            background: "#EFF6FF",
            color: "#1D4ED8",
            fontSize: "14px",
            lineHeight: 1.5,
          }}
        >
          📍 Select the places you want to
          explore from the map in the order
          you want to visit them.
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "24px" }}>
      <div
        style={{
          height: "1px",
          background: "#E5E7EB",
          marginBottom: "24px",
        }}
      />

      <div
        style={{
          padding: "16px",
          borderRadius: "14px",
          background: "#F9FAFB",
          border: "1px solid #E5E7EB",
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: "16px",
            color: "#111827",
            marginBottom: "12px",
          }}
        >
          📍 Your Route
        </div>

        {selectedPOIs.map((poi, index) => (
          <div
            key={poi.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 0",
              borderBottom:
                index !== selectedPOIs.length - 1
                  ? "1px solid #E5E7EB"
                  : "none",
            }}
          >
            <div
              style={{
                width: "26px",
                height: "26px",
                borderRadius: "50%",
                background: "#1D6BE6",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {index + 1}
            </div>

            <div
              style={{
                fontSize: "14px",
                color: "#374151",
              }}
            >
              {poi.name}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onCreateRoute}
        disabled={routeLoading}
        style={{
          width: "100%",
          marginTop: "16px",
          padding: "14px 18px",
          border: "none",
          borderRadius: "12px",
          background: "#1D6BE6",
          color: "#ffffff",
          fontSize: "15px",
          fontWeight: 700,
          cursor: routeLoading
            ? "not-allowed"
            : "pointer",
          opacity: routeLoading ? 0.7 : 1,
        }}
      >
        {routeLoading
          ? "Creating Route..."
          : "🗺️ Create Route"}
      </button>
    </div>
  );
};

export default TripPlannerPOISelection;