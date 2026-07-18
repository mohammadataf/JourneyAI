import { useEffect, useState } from "react";
import { searchPlaces, type Place } from "../../services/searchService";

interface SearchBarProps {
  onFindRoute: (
    start: Place | null,
    destination: Place | null
  ) => void;
}

const SearchBar = ({
  onFindRoute,
}: SearchBarProps) => {
  const [startQuery, setStartQuery] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");

  const [startPlaces, setStartPlaces] = useState<Place[]>([]);
  const [destinationPlaces, setDestinationPlaces] = useState<Place[]>([]);

  const [startLoading, setStartLoading] = useState(false);
  const [destinationLoading, setDestinationLoading] = useState(false);

   

  const [selectedStart, setSelectedStart] = useState<Place | null>(null);
const [selectedDestination, setSelectedDestination] = useState<Place | null>(null);

const [startSelected, setStartSelected] = useState(false);
const [destinationSelected, setDestinationSelected] = useState(false);

  // Search suggestions for Start
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

  // Search suggestions for Destination
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
        top: 1,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        background: "white",
        padding: "3px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        width: "800px",
        alignItems: "center",
      }}
    >
      {/* From */}
      <input
        type="text"
        placeholder="From"
        value={startQuery}
        onChange={(e) => {
          setStartSelected(false);
          setStartQuery(e.target.value);
        }}
        style={{
          width: "94%",
          padding: "8px",
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

      {/* Destination */}
      <input
        type="text"
        placeholder="To"
        value={destinationQuery}
        onChange={(e) => {
          setDestinationSelected(false);
          setDestinationQuery(e.target.value);
        }}
        style={{
          width: "94%",
          padding: "8px",
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
          marginTop: "10px",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        Find Route
      </button>
    </div>
  );
};

export default SearchBar;