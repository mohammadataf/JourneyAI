// This component is responsible for displaying the map. It shows OpenStreetMap, the user's current location, destination marker, and later it will also display the route between two places. It acts as the main map component of JourneyAI.


import {
  Map,
  Marker,} from "@vis.gl/react-google-maps";


// import { MapContainer, TileLayer,Marker,Popup } from "react-leaflet";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import SearchBar from "../Search/SearchBar";
import {useEffect,useState } from "react";
import type { Place } from "../../services/searchService";
import FlyToLocation from "./FlyToLocation";
import { getRoute, type Route } from "../../services/routeService";
import RoutePath from "./RoutePath";
import RouteInfoCard from "./RouteInfoCard";
// import { destinationIcon } from "../../utils/mapIcons";
import  VehicleSelector  from "./VehicleSelector"
import RouteList from "./RouteList";

const MapView = () => {
    const {location, loading, error} = useCurrentLocation();
    const [start, setStart] = useState<Place | null>(null);
    const [destination, setDestination] = useState<Place | null>(null);

    const [routes, setRoutes] = useState<Route[]>([]);
    const [selectedRoute, setSelectedRoute] = useState(0);
    const [vehicle, setVehicle] = useState<"driving-car" |"cycling-regular" |"foot-walking" |"driving-hgv">("driving-car");

    
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
              },
              vehicle
            );

        setRoutes(routeData);
      };

      fetchRoute();
    }, [location, start, destination,vehicle]);
    

    if (loading) return <h2>Getting your location...</h2>;
    if (error) return <h2>{error}</h2>;

    

  return (
    <>
     <SearchBar
      onStartSelect={setStart} // we are passing the function setStart as a prop to search bar.
//       we are saying to SearchBar  whenever you need to update the start location, call my       setStart function.
      onDestinationSelect={setDestination} // same here
    />

    
    <Map
      defaultCenter={{
        lat: location!.latitude,
        lng: location!.longitude,
      }}
      defaultZoom={16}
      style={{
        width: "100%",
        height: "100vh",
      }}
      gestureHandling="greedy"
      disableDefaultUI={false}
    >
      <Marker
       
        position={
          start
          ? {
              lat: Number(start.lat),
              lng: Number(start.lon),
            }
          :{
            lat:location!.latitude,
            lng:location!.longitude,
          }
        }
      />
         
        

        {destination && (
          <Marker
            position={{
              lat:Number(destination.lat),
              lng:Number(destination.lon),
            }}
            // icon={destinationIcon}
          />
             
         
        )}

        {destination && (
          <FlyToLocation
            latitude={Number(destination.lat)}
            longitude={Number(destination.lon)}
          /> )}

         {routes.length > 0 && (
          <RoutePath coordinates={routes[selectedRoute].coordinates}/>
          
          )}

          {routes.map((route, index) => (
            <RoutePath
              key={index}
              coordinates={route.coordinates}
            />
          ))}

        </Map>
    <VehicleSelector vehicle={vehicle} setVehicle={setVehicle}/>
    {/* {route && <RouteInfoCard route={route} />}
     */}

     {routes.length > 0 && (
        <RouteInfoCard
          route={routes[selectedRoute]}
        />
      )}

      {routes.length > 0 && (
        <RouteList
          routes={routes}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
        />
      )}
    </>
  );
};

export default MapView;