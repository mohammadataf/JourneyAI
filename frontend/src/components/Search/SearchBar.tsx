// This component provides the search interface. It allows the user to search for a destination, displays matching place suggestions, and sends the selected place to the map component.


import { useEffect, useState } from "react";
import { searchPlaces, type Place } from "../../services/searchService";

interface SearchBarProps {
  onStartSelect: (place: Place) => void; // onStartSelect is actually pointing to setStart fun. like it is sayin i am expecting a fun that accepting place
  onDestinationSelect: (place: Place) => void;
}

const SearchBar = ({
  onStartSelect,
  onDestinationSelect,
}: SearchBarProps) => {
  const [startQuery, setStartQuery] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");

  const [startPlaces, setStartPlaces] = useState<Place[]>([]);
  const [destinationPlaces, setDestinationPlaces] = useState<Place[]>([]);

  const [loading, setLoading] = useState(false);

   // Search suggestions for the From/start input.
    useEffect(() => {
      const fetchStartPlaces = async () => {
        if (startQuery.trim().length < 2) {
          setStartPlaces([]);
          return;
        }

        try {
          setLoading(true);

          const results = await searchPlaces(startQuery);

          setStartPlaces(results);
        } catch (error) {
          console.error("Search Error:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchStartPlaces();
    }, [startQuery]);


// Search suggestions for the To/destination input.
    useEffect(() => {
      const fetchDestinationPlaces = async () => {
        if (destinationQuery.trim().length < 2) {
          setDestinationPlaces([]);
          return;
        }

        try {
          setLoading(true);

          const results = await searchPlaces(destinationQuery);

          setDestinationPlaces(results);
        } catch (error) {
          console.error("Search Error:", error);
        } finally {
          setLoading(false);
        }
      };

  fetchDestinationPlaces();
}, [destinationQuery]);

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
      {/* From Input */}
      <input
        type="text"
        placeholder="From"
        value={startQuery}
        onChange={(e) => setStartQuery(e.target.value)}
        style={{
          width: "94%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      {startPlaces.map((place) => (
        <div
          key={place.place_id}
          onClick={() => {
            setStartQuery(place.display_name);
            setStartPlaces([]);
            onStartSelect(place);
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

      {/* To Input */}
      <input
        type="text"
        placeholder="To"
        value={destinationQuery}
        onChange={(e) => setDestinationQuery(e.target.value)}
        style={{
          width: "94%",
          padding: "10px",
          marginTop: "10px",
        }}
      />

      {loading && <p>Searching...</p>}

      {!loading &&
        destinationQuery &&
        destinationPlaces.length === 0 && (
          <p>No places found.</p>
        )}

      {destinationPlaces.map((place) => (
        <div
          key={place.place_id}
          onClick={() => {
            setDestinationQuery(place.display_name);
            setDestinationPlaces([]);
            onDestinationSelect(place);
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