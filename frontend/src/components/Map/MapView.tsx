// This component is responsible for displaying the map. It shows OpenStreetMap, the user's current location, destination marker, and later it will also display the route between two places. It acts as the main map component of JourneyAI.





import { MapContainer, TileLayer,Marker,Popup } from "react-leaflet";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import SearchBar from "../Search/SearchBar";
import {useEffect,useState } from "react";
import type { Place } from "../../services/searchService";
import FlyToLocation from "./FlyToLocation";
import { getRoute, type Route } from "../../services/routeService";
import RoutePath from "./RoutePath";
import RouteInfoCard from "./RouteInfoCard";

const MapView = () => {
    const {location, loading, error} = useCurrentLocation();
    const [start, setStart] = useState<Place | null>(null);
    const [destination, setDestination] = useState<Place | null>(null);
    const [route, setRoute] = useState<Route | null>(null);


    useEffect(() => {
      const fetchRoute = async () => {
        if (!location || !destination) return;

         const routeData = await getRoute(
              start? { // if user enter start loc then use start else user curr loc
                    latitude: Number(start.lat),
                    longitude: Number(start.lon),
                  }
                : {
                    latitude: location.latitude, // user curr loc 
                    longitude: location.longitude,
                  },
              {
                latitude: Number(destination.lat),
                longitude: Number(destination.lon),
              }
            );

        setRoute(routeData);
      };

      fetchRoute();
    }, [location, start, destination]);

    if (loading) return <h2>Getting your location...</h2>;
    if (error) return <h2>{error}</h2>;

    console.log(route);

  return (
    <>
     <SearchBar
      onStartSelect={setStart} // we are passing the function setStart as a prop to search bar.
//       we are saying to SearchBar  whenever you need to update the start location, call my       setStart function.
      onDestinationSelect={setDestination} // same here
    />
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
          <Marker
            position={[
              Number(destination.lat),
              Number(destination.lon),
            ]}
          >
            <Popup>
              {destination.name || destination.display_name}
            </Popup>
          </Marker>
        )}

        {destination && (
          <FlyToLocation
            latitude={Number(destination.lat)}
            longitude={Number(destination.lon)}
          />
        )}
        {route && <RoutePath coordinates={route.coordinates} />}
    </MapContainer>
    {route && <RouteInfoCard route={route} />}
    </>
  );
};

export default MapView;