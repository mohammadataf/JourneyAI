// This component is responsible for displaying the map. It shows OpenStreetMap, the user's current location, destination marker, and later it will also display the route between two places. It acts as the main map component of JourneyAI.


import BaseMap from "./BaseMap";


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
// import  VehicleSelector  from "./VehicleSelector"
// import RouteList from "./RouteList";
import { getPOIs, type POI } from "../../services/poiService";

import POIMarkers from "./POIMarkers";
// import { getViaRoute } from "../../services/viaRouteService";
import { getExperienceRoutes,  type ExperienceRoute } from "../../services/experienceService";
import ScenicRouteList from "./ExperienceRouteList";

// import ExperienceSelector from "./ExperienceSelector";
import ExperienceSummaryCard from "./ExperienceSummaryCard";
import {getSummary, type ExperienceSummary,} from "../../services/summaryService";
import FloatingToggleButton from "../Layout/FloatingToggleButton";
 



interface Props {
    tripResult:any;
}




const MapView = ({tripResult}:Props) => {
    const {location, loading, error} = useCurrentLocation();
    const [start, setStart] = useState<Place | null>(null);
    const [destination, setDestination] = useState<Place | null>(null);
    const [startError, setStartError] = useState("");

    const [routes, setRoutes] = useState<Route[]>([]);
    const [selectedRoute, setSelectedRoute] = useState(0);
    const [vehicle, setVehicle] = useState<"driving-car" |"cycling-regular" |"foot-walking" >("driving-car");
    const [theme, setTheme] = useState<"scenic" | "cafe" | "heritage" | "adventure"  | "hotel" | "restaurant">("cafe");

    const [pois, setPOIs] = useState<POI[]>([]);
    const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);
    const [experienceRoutes, setExperienceRoutes] = useState<ExperienceRoute[]>([]);
    const [selectedExperienceRoute, setSelectedExperienceRoute] = useState(0);


    const [summary, setSummary] = useState<ExperienceSummary | null>(null);
    const [panelOpen, setPanelOpen] = useState(true);

     


     

    

 




  const handleFindRoute = async (
  startPlace: Place | null,
  destinationPlace: Place | null
) => {
  if (!destinationPlace) return;

  if (!location && !startPlace) {
    setStartError("Enter start location");
    return;
  }

  setStart(startPlace);
  setDestination(destinationPlace);
  setStartError("");

  const startPoint = startPlace
    ? {
        latitude: Number(startPlace.lat),
        longitude: Number(startPlace.lon),
      }
    : {
        latitude: location!.latitude,
        longitude: location!.longitude,
      };

  const endPoint = {
    latitude: Number(destinationPlace.lat),
    longitude: Number(destinationPlace.lon),
  };

  const experiences = await getExperienceRoutes(
    startPoint,
    endPoint,
    theme,
    vehicle
  );

  setExperienceRoutes(experiences);
};
    
    useEffect(() => {
      if (!destination) return;

      handleFindRoute(start, destination);
    }, [vehicle, theme]);

    useEffect(() => {
      setSelectedExperienceRoute(0);
      setSelectedPOI(null);
    }, [theme]);

    useEffect(() => {

  if (experienceRoutes.length === 0) {
    setSummary(null);
    return;
  }

  const fetchSummary = async () => {

    const experience =
      experienceRoutes[selectedExperienceRoute];

    const data = await getSummary(
      experience.poi,
      theme
    );

    setSummary(data);

  };

  fetchSummary();

}, [experienceRoutes, selectedExperienceRoute, theme]);
    

    if (loading) return <h2>Getting your location...</h2>;
    // if (error) return <h2>{error}</h2>;

    

  return (
    <>

      <FloatingToggleButton
        onClick={() => setPanelOpen(!panelOpen)}
        panelOpen={panelOpen}
      />
    
      <SearchBar
      onFindRoute={handleFindRoute}
      panelOpen={panelOpen}
      onClose={() => setPanelOpen(false)}
      theme={theme}
      setTheme={setTheme}
      vehicle={vehicle}
      setVehicle={setVehicle}
    />
    {startError && <p>{startError}</p>}

     
    <BaseMap>

      {(start || location) && (
        <POIMarkers
          pois={[
            {
              id: "start",
              name: "Start",
              latitude: start
                ? Number(start.lat)
                : location!.latitude,
              longitude: start
                ? Number(start.lon)
                : location!.longitude,
              category: "start",
            },
          ]}
          onSelectPOI={() => {}}
          color="green"
        />
      )}

      {destination && (
        <POIMarkers
          pois={[
            {
              id: "destination",
              name: "Destination",
              latitude: Number(destination.lat),
              longitude: Number(destination.lon),
              category: "destination",
            },
          ]}
          onSelectPOI={() => {}}
          color="red"
        />
      )}

      <POIMarkers 
        pois={pois}
        onSelectPOI={setSelectedPOI}
      />

      {experienceRoutes.length > 0 && (
        <POIMarkers
          pois={[experienceRoutes[selectedExperienceRoute].poi]}
          color="yellow"
          onSelectPOI={()=>{}}
        />
      )}

      {destination && (
        <FlyToLocation
          latitude={Number(destination.lat)}
          longitude={Number(destination.lon)}
        />
      )}

       

      {experienceRoutes.length > 0 && (
        <RoutePath
          coordinates={
            experienceRoutes[selectedExperienceRoute]
            .route.coordinates
          }
        />
      )}

    </BaseMap>
    
     
    {/* <VehicleSelector vehicle={vehicle} setVehicle={setVehicle}/> */}
    {/* <ExperienceSelector theme={theme} onThemeChange={setTheme}/> */}
    {/* {route && <RouteInfoCard route={route} />} */}
    

     {routes.length > 0 && (
        <RouteInfoCard
          route={routes[selectedRoute]}
        />
      )}

      {/* {routes.length > 0 && (
        <RouteList
          routes={routes}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
        />
      )} */}

       

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