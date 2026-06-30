// This component is responsible for displaying the map. It shows OpenStreetMap, the user's current location, destination marker, and later it will also display the route between two places. It acts as the main map component of JourneyAI.





import { MapContainer, TileLayer,Marker,Popup } from "react-leaflet";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import SearchBar from "../Search/SearchBar";
import {useEffect,useState } from "react";
import type { Place } from "../../services/searchService";
import FlyToLocation from "./FlyToLocation";
import { getRoute, type Route } from "../../services/routeService";
import RoutePath from "./RoutePath";

const MapView = () => {
    const {location, loading, error} = useCurrentLocation();
    const [destination, setDestination] = useState<Place | null>(null);
    const [route, setRoute] = useState<Route | null>(null);


    useEffect(() => {
      const fetchRoute = async () => {
        if (!location || !destination) return;

        const routeData = await getRoute(
          {
            latitude: location.latitude, // start lat 
            longitude: location.longitude,// start lon
          },
          {
            latitude: Number(destination.lat), //destination lat
            longitude: Number(destination.lon), // dest lon
          }
        );

        setRoute(routeData);
      };

      fetchRoute();
    }, [location, destination]);

    if (loading) return <h2>Getting your location...</h2>;
    if (error) return <h2>{error}</h2>;

    console.log(route);

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

        {destination && (
          <FlyToLocation
            latitude={Number(destination.lat)}
            longitude={Number(destination.lon)}
          />
        )}
        {route && <RoutePath coordinates={route.coordinates} />}
    </MapContainer>
    </>
  );
};

export default MapView;