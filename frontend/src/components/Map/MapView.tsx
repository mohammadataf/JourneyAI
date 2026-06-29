// This component is responsible for displaying the map. It shows OpenStreetMap, the user's current location, destination marker, and later it will also display the route between two places. It acts as the main map component of JourneyAI.





import { MapContainer, TileLayer,Marker,Popup } from "react-leaflet";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import SearchBar from "../Search/SearchBar";
import { useState } from "react";
import type { Place } from "../../services/searchService";

const MapView = () => {
    const {location, loading, error} = useCurrentLocation();
    const [destination, setDestination] = useState<Place | null>(null);

    if (loading) return <h2>Getting your location...</h2>;
    if (error) return <h2>{error}</h2>;

  return (
    <>
     <SearchBar onPlaceSelect={setDestination} />
    <MapContainer
      center={[
        location!.latitude,
        location!.longitude,
      ]} 
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[
            location!.latitude,
            location!.longitude,
        ]}
        >
        <Popup>
            You are here bache hehehe
        </Popup>
        </Marker>
    </MapContainer>
    </>
  );
};

export default MapView;