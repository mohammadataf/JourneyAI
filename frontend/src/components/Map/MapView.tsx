// This component is responsible for displaying the map. It shows OpenStreetMap, the user's current location, destination marker, and later it will also display the route between two places. It acts as the main map component of JourneyAI.


import {Map,Marker,} from "@vis.gl/react-google-maps";


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
import { getPOIs, type POI } from "../../services/poiService";

import POIMarkers from "./POIMarkers";
import { getViaRoute } from "../../services/viaRouteService";
import { getExperienceRoutes,  type ExperienceRoute } from "../../services/experienceService";
import ScenicRouteList from "./ExperienceRouteList";

import ExperienceSelector from "./ExperienceSelector";

const MapView = () => {
    const {location, loading, error} = useCurrentLocation();
    const [start, setStart] = useState<Place | null>(null);
    const [destination, setDestination] = useState<Place | null>(null);

    const [routes, setRoutes] = useState<Route[]>([]);
    const [selectedRoute, setSelectedRoute] = useState(0);
    const [vehicle, setVehicle] = useState<"driving-car" |"cycling-regular" |"foot-walking" |"driving-hgv">("driving-car");
    const [theme, setTheme] = useState<"scenic" | "cafe" | "heritage" | "adventure" | "family">("cafe");

    const [pois, setPOIs] = useState<POI[]>([]);
    const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);
    const [experienceRoutes, setExperienceRoutes] = useState<ExperienceRoute[]>([]);
    const [selectedExperienceRoute, setSelectedExperienceRoute] = useState(0);

    


    useEffect(() => {
       
      const fetchRoute = async () => {
       
        if (!location || !destination) return;

        const startPoint = start
          ? { // if user select any other loc as start
              latitude: Number(start.lat),
              longitude: Number(start.lon),
            }
          : {
              latitude: location.latitude,
              longitude: location.longitude,
            };

        const endPoint = {
          latitude: Number(destination.lat),
          longitude: Number(destination.lon),
        };
       

        //  fetch routes
         const routeData = await getRoute(
              startPoint,
              endPoint,
              vehicle
            );


        // fetch scenic POIs
        const poiData = await getPOIs(
          startPoint,
          endPoint,
          theme
        );

        setRoutes(routeData);
        setPOIs(poiData);

        console.log("POIs:", poiData);
      };

      fetchRoute();
    }, [location, start, destination,vehicle,theme]);

    useEffect(() => {
        if (!selectedPOI || !location || !destination) return;

        const fetchViaRoute = async () => {
          const startPoint = start
            ? {
                latitude: Number(start.lat),
                longitude: Number(start.lon),
              }
            : {
                latitude: location.latitude,
                longitude: location.longitude,
              };

          const endPoint = {
            latitude: Number(destination.lat),
            longitude: Number(destination.lon),
          };

          const routeData = await getViaRoute(
            startPoint,
            endPoint,
            {
              latitude: selectedPOI.latitude,
              longitude: selectedPOI.longitude,
            },
            vehicle
          );

          setRoutes(routeData);
          setSelectedRoute(0);
        };

        fetchViaRoute();
      }, [selectedPOI, location,start,destination,vehicle]);

    useEffect(() => {
      // alert("hello")
       
        const fetchExperienceRoutes = async () => {
          if (!location || !destination) return;

          const startPoint = start
            ? {
                latitude: Number(start.lat),
                longitude: Number(start.lon),
              }
            : {
                latitude: location.latitude,
                longitude: location.longitude,
              };

          const endPoint = {
            latitude: Number(destination.lat),
            longitude: Number(destination.lon),
          };

          const experiences = await getExperienceRoutes(
            startPoint,
            endPoint,
            theme,
            vehicle,
             
            
          );

          console.log("Theme:", theme);
          console.log("Experiences:", experiences);

          setExperienceRoutes(experiences);
        };

        fetchExperienceRoutes();
      }, [location, start, destination, vehicle,theme]);

    useEffect(() => {
      setSelectedExperienceRoute(0);
      setSelectedPOI(null);
    }, [theme]);
    

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

         <POIMarkers pois={pois} onSelectPOI={setSelectedPOI}/>
        {destination && (
          <FlyToLocation
            latitude={Number(destination.lat)}
            longitude={Number(destination.lon)}
          /> )}


          {/* normal route that is fastest */}
         {/* {routes.length > 0 && (
          <RoutePath coordinates={routes[selectedRoute].coordinates}/>
          
          )} */}

          {experienceRoutes.length > 0 && (
            <RoutePath
              coordinates={experienceRoutes[selectedExperienceRoute].route.coordinates}
            />
          )}

          {/* {routes.map((route, index) => (
            <RoutePath
              key={index}
              coordinates={route.coordinates}
            />
          ))} */}

        </Map>
    <VehicleSelector vehicle={vehicle} setVehicle={setVehicle}/>
    <ExperienceSelector theme={theme} onThemeChange={setTheme}/>
    {/* {route && <RouteInfoCard route={route} />} */}
    

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

       

      {experienceRoutes.length > 0 && (
        <ScenicRouteList
          experiences={experienceRoutes}
          selected={selectedExperienceRoute}
          setSelected={setSelectedExperienceRoute}
          theme={theme}
        />
      )}
    </>
  );
};

export default MapView;