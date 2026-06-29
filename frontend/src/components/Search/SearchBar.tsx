// This component provides the search interface. It allows the user to search for a destination, displays matching place suggestions, and sends the selected place to the map component.


import { useEffect, useState } from "react";
import { searchPlaces, type Place } from "../../services/searchService";

interface SearchBarProps {
  onPlaceSelect: (place: Place) => void;
}

const SearchBar = ({ onPlaceSelect }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      // Don't search for empty or very short queries.
      // This reduces unnecessary API requests.
      if (query.trim().length < 2) {
        setPlaces([]);
        return;
      }

      try {
        setLoading(true);

        const results = await searchPlaces(query);

        setPlaces(results);
      } catch (error) {
        console.error("Search Error:", error);
      } finally {
        // Always stop loading, even if an error occurs.
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        background: "white",
        padding: "15px",
        
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        width: "500px",
      }}
    >
      <input
        type="text"
        placeholder="From"
        style={{
          width: "94%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <input
        type="text"
        placeholder="To"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "94%",
          padding: "10px",
        }}
      />

      {loading && <p>Searching...</p>}

      {!loading && query && places.length === 0 && (
        <p>No places found.</p>
      )}

      {places.map((place) => (
         <div
            key={place.place_id}
            onClick={() => {
              setQuery(place.display_name);
              setPlaces([]);
              onPlaceSelect(place);
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
    </div>
  );
};

export default SearchBar;