import type { Place } from "../../services/searchService";

interface Props {
  selectedPlace: Place | null;
  choosingLocation: boolean;
  locationLoading: boolean;
  onUseMyLocation: () => void;
  onChooseOnMap: () => void;
}

const TripPlannerLocation = ({
  selectedPlace,
  choosingLocation,
  locationLoading,
  onUseMyLocation,
  onChooseOnMap,
}: Props) => {
  return (
    <div style={{ marginBottom: "24px" }}>
      <h3
        style={{
          margin: "0 0 12px",
          fontSize: "17px",
          fontWeight: 600,
          color: "#111827",
        }}
      >
        📍 Starting Location
      </h3>

      {selectedPlace && (
        <div
          style={{
            padding: "12px",
            marginBottom: "12px",
            borderRadius: "12px",
            background: "#EFF6FF",
            border: "1px solid #BFDBFE",
            color: "#1D4ED8",
            fontSize: "14px",
          }}
        >
          <strong>Selected:</strong>{" "}
          {selectedPlace.display_name}

          <div
            style={{
              marginTop: "5px",
              fontSize: "12px",
              color: "#6B7280",
            }}
          >
            {Number(selectedPlace.lat).toFixed(6)},{" "}
            {Number(selectedPlace.lon).toFixed(6)}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={onUseMyLocation}
        disabled={locationLoading}
        style={{
          width: "100%",
          padding: "13px",
          borderRadius: "12px",
          border: "1px solid #D1D5DB",
          background: "#ffffff",
          color: "#111827",
          fontSize: "14px",
          fontWeight: 600,
          cursor: locationLoading
            ? "not-allowed"
            : "pointer",
          marginBottom: "10px",
        }}
      >
        {locationLoading
          ? "Getting Location..."
          : "📍 Use My Location"}
      </button>

      <button
        type="button"
        onClick={onChooseOnMap}
        style={{
          width: "100%",
          padding: "13px",
          borderRadius: "12px",
          border: "none",
          background: choosingLocation
            ? "#1D6BE6"
            : "#F3F4F6",
          color: choosingLocation
            ? "#ffffff"
            : "#111827",
          fontSize: "14px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        {choosingLocation
          ? "📍 Click on Map..."
          : "🗺️ Choose on Map"}
      </button>

      {choosingLocation && (
        <div
          style={{
            marginTop: "10px",
            padding: "12px",
            borderRadius: "10px",
            background: "#EFF6FF",
            color: "#1D4ED8",
            fontSize: "13px",
            lineHeight: 1.5,
          }}
        >
          👆 Click anywhere on the map to
          select your starting location.
        </div>
      )}
    </div>
  );
};

export default TripPlannerLocation;