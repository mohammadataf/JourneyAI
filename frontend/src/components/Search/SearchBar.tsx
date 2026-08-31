import { useEffect, useState } from "react";
import { searchPlaces, type Place } from "../../services/searchService";
import ExperienceSelector from "../Map/ExperienceSelector";
import VehicleSelector from "../Map/VehicleSelector";


type Theme =
  | "scenic"
  | "cafe"
  | "heritage"
  | "adventure"
  | "hotel"
  | "restaurant";

type Vehicle =
  | "driving-car"
  | "cycling-regular"
  | "foot-walking";
  

interface SearchBarProps {
  onFindRoute: (
    start: Place | null,
    destination: Place | null
  ) => void;

  panelOpen: boolean;
  onClose: () => void;

  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;

  vehicle: Vehicle;
  setVehicle: React.Dispatch<React.SetStateAction<Vehicle>>;
}

const SearchBar = ({
  onFindRoute,
  panelOpen,
  onClose,
  theme,
  setTheme,
  vehicle,
  setVehicle,
}: SearchBarProps) => {
  const [startQuery, setStartQuery] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");

  const [startPlaces, setStartPlaces] = useState<Place[]>([]);
  const [destinationPlaces, setDestinationPlaces] = useState<Place[]>([]);

  const [startLoading, setStartLoading] = useState(false);
  const [destinationLoading, setDestinationLoading] = useState(false);

  const [selectedStart, setSelectedStart] =
    useState<Place | null>(null);

  const [selectedDestination, setSelectedDestination] =
    useState<Place | null>(null);

  const [startSelected, setStartSelected] =
    useState(false);

  const [destinationSelected, setDestinationSelected] =
    useState(false);

  useEffect(() => {
    if (startSelected) return;

    if (startQuery.trim().length < 3) {
      setStartPlaces([]);
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        setStartLoading(true);

        const results = await searchPlaces(
          startQuery,
          controller.signal
        );

        setStartPlaces(results);
      } catch (error) {
        console.error(error);
      } finally {
        setStartLoading(false);
      }
    }, 350);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [startQuery]);

  useEffect(() => {
    if (destinationSelected) return;

    if (destinationQuery.trim().length < 3) {
      setDestinationPlaces([]);
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        setDestinationLoading(true);

        const results = await searchPlaces(
          destinationQuery,
          controller.signal
        );

        setDestinationPlaces(results);
      } catch (error) {
        console.error(error);
      } finally {
        setDestinationLoading(false);
      }
    }, 350);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [destinationQuery]);

  return (
    <div
       style={{
      position: "absolute",
      top: "20px",
      bottom:"20px",
      left: panelOpen ? "6px" : "-370px",
      width: "320px",
      maxHeight: "calc(100vh - 40px)",
      overflowY: "auto",
      overflowX: "hidden",
      WebkitOverflowScrolling: "touch",
      background: "#ffffff",
      borderRadius: "16px",
      padding: "24px",
      boxShadow: "0 20px 60px rgba(0,0,0,.15)",
      zIndex: 1000,
      transition: "left 0.35s ease",
      scrollbarWidth: "none",
}}
 
    >

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#2563EB",
            marginTop:"10px"
          }}
        >
          JourneyAI
        </div>

        <button
        onClick={onClose}
        style={{
          border: "none",
          background: "transparent",
          fontSize: "22px",
          cursor: "pointer",
          color: "#6B7280",
          marginTop: "10px",
        }}
      >
        ✕
      </button>
      </div>

       
      <input
        type="text"
        placeholder="From"
        value={startQuery}
        onChange={(e) => {
          setStartSelected(false);
          setStartQuery(e.target.value);
        }}
        style={{
          width: "100%",
          padding: "13px",
          borderRadius: "12px",
          border: "1px solid #E5E7EB",
          fontSize: "15px",
          boxSizing: "border-box",
          marginBottom: "14px",
        }}
      />

      {startLoading && <p>Searching...</p>}

      {startPlaces.map((place) => (
        <div
          key={place.place_id}
          onClick={() => {
            setSelectedStart(place);
            setStartSelected(true);
            setStartQuery(place.display_name);
            setStartPlaces([]);
          }}
          style={{
            padding: "10px",
            borderBottom: "1px solid #ddd",
            cursor: "pointer",
          }}
        >
          {place.display_name}
        </div>
      ))}

      <input
        type="text"
        placeholder="To"
        value={destinationQuery}
        onChange={(e) => {
          setDestinationSelected(false);
          setDestinationQuery(e.target.value);
        }}
        style={{
          width: "100%",
          padding: "13px",
          borderRadius: "12px",
          border: "1px solid #E5E7EB",
          fontSize: "15px",
          boxSizing: "border-box",
          marginBottom: "14px",
        }}
      />

      {destinationLoading && <p>Searching...</p>}

      {!destinationLoading &&
        !selectedDestination &&
        destinationQuery.length >= 3 &&
        destinationPlaces.length === 0 && (
          <p>No places found.</p>
        )}

      {destinationPlaces.map((place) => (
        <div
          key={place.place_id}
          onClick={() => {
            setSelectedDestination(place);
            setDestinationSelected(true);
            setDestinationQuery(place.display_name);
            setDestinationPlaces([]);
          }}
          style={{
            padding: "10px",
            borderBottom: "1px solid #ddd",
            cursor: "pointer",
          }}
        >
          {place.display_name}
        </div>
      ))}

      <button
        onClick={() =>
          onFindRoute(
            selectedStart,
            selectedDestination
          )
        }
        style={{
          width: "100%",
          marginTop: "5px",
          padding: "14px",
          borderRadius: "14px",
          border: "none",
          background: "#2563EB",
          color: "#fff",
          fontSize: "16px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Find Route
      </button>

      <div style={{ marginTop: "20px" }}>
         

        <ExperienceSelector
          theme={theme}
          onThemeChange={setTheme}
        />

        <div style={{ height: "16px" }} />

         

        <VehicleSelector
          vehicle={vehicle}
          setVehicle={setVehicle}
        />
      </div>
    </div>
  );
};

export default SearchBar;