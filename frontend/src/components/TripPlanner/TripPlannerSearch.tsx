import { useEffect, useState } from "react";
import {
  searchPlaces,
  type Place,
} from "../../services/searchService";

interface Props {
  selectedPlace: Place | null;
  setSelectedPlace: (place: Place | null) => void;
}

const TripPlannerSearch = ({
  selectedPlace,
  setSelectedPlace,
}: Props) => {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [placeSelected, setPlaceSelected] = useState(false);

  useEffect(() => {
    if (placeSelected) return;

    if (query.trim().length < 3) {
      setPlaces([]);
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const results = await searchPlaces(
          query,
          controller.signal
        );

        setPlaces(results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  return (
    <div style={{ marginBottom: "28px" }}>
      <h3
        style={{
          margin: "0 0 12px",
          fontSize: "17px",
          fontWeight: 600,
          color: "#111827",
        }}
      >
        📍 Current Location
      </h3>

      <input
        type="text"
        placeholder="Search your location..."
        value={query}
        onChange={(e) => {
          setPlaceSelected(false);
          setQuery(e.target.value);
        }}
        style={{
          width: "100%",
          padding: "13px",
          borderRadius: "12px",
          border: "1px solid #E5E7EB",
          fontSize: "15px",
          boxSizing: "border-box",
        }}
      />

      {loading && (
        <p
          style={{
            marginTop: "12px",
            color: "#6B7280",
          }}
        >
          Searching...
        </p>
      )}

      {!loading &&
        !selectedPlace &&
        query.length >= 3 &&
        places.length === 0 && (
          <p
            style={{
              marginTop: "12px",
              color: "#6B7280",
            }}
          >
            No places found.
          </p>
        )}

      {places.map((place) => (
        <div
          key={place.place_id}
          onClick={() => {
            setSelectedPlace(place);
            setPlaceSelected(true);
            setQuery(place.display_name);
            setPlaces([]);
          }}
          style={{
            padding: "12px",
            borderBottom: "1px solid #E5E7EB",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          {place.display_name}
        </div>
      ))}
    </div>
  );
};

export default TripPlannerSearch;