import { useState } from "react";
import axios from "axios";

import type { Place } from "../../services/searchService";
import type { POI } from "../../services/poiService";

import TimeSelector from "./TimeSelector";
import BudgetSelector from "./BudgetSelector";
import VehicleSelector from "../Map/VehicleSelector";
import InterestSelector from "./InterestSelector";
import GenerateTripButton from "./GenerateTripButton";

import TripPlannerMap from "./TripPlannerMap";
import TripPlannerLocation from "./TripPlannerLocation";
import TripPlannerPOISelection from "./TripPlannerPOISelection";
import POISummaryCard from "./TripPlannerPOISummary";

const TripPlannerPanel = () => {
  // =========================
  // START LOCATION
  // =========================

  const [selectedPlace, setSelectedPlace] =
    useState<Place | null>(null);

  const [choosingLocation, setChoosingLocation] =
    useState(false);

  const [locationLoading, setLocationLoading] =
    useState(false);

  // =========================
  // TRIP SETTINGS
  // =========================

  const [selectedTime, setSelectedTime] =useState("3 Hours");

  const [selectedBudget, setSelectedBudget] =useState("₹1000");

  const [vehicle, setVehicle] = useState<
    "driving-car" | "cycling-regular" | "foot-walking"
  >("driving-car");

  const [selectedInterests, setSelectedInterests] =
    useState<string[]>([]);

  const [aiDescription, setAiDescription] =
    useState("");

  // =========================
  // TRIP RESULT
  // =========================

  const [loading, setLoading] =
    useState(false);

  const [tripResult, setTripResult] =
    useState<any>(null);

  // =========================
  // SELECTED POIs
  // =========================

  const [selectedPOIs, setSelectedPOIs] =
    useState<POI[]>([]);

  // =========================
  // ACTIVE POI SUMMARY
  // =========================

  const [activePOI, setActivePOI] =
    useState<POI | null>(null);

  // =========================
  // ROUTE LOADING
  // =========================

  const [routeLoading, setRouteLoading] =
    useState(false);

  // =========================
  // RESET
  // =========================

  const resetTripForNewLocation = () => {
    setTripResult(null);
    setSelectedPOIs([]);
    setActivePOI(null);
  };

  // =========================
  // USE MY LOCATION
  // =========================

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert(
        "Geolocation is not supported by your browser."
      );
      return;
    }

    resetTripForNewLocation();

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        const place: Place = {
          place_id: `current-location-${Date.now()}`,
          display_name: "My Current Location",
          lat: String(latitude),
          lon: String(longitude),
        };

        setSelectedPlace(place);
        setChoosingLocation(false);
        setLocationLoading(false);
      },

      (error) => {
        console.error(
          "Location Error:",
          error
        );

        alert(
          "Unable to get your current location. Please allow location access."
        );

        setLocationLoading(false);
      }
    );
  };

  // =========================
  // CHOOSE ON MAP
  // =========================

  const handleChooseOnMap = () => {
    setChoosingLocation(true);
    resetTripForNewLocation();
  };

  // =========================
  // MAP LOCATION SELECTED
  // =========================

  const handleMapLocationSelect = (
    latitude: number,
    longitude: number
  ) => {
    const place: Place = {
      place_id: `map-location-${Date.now()}`,
      display_name: "Selected Location",
      lat: String(latitude),
      lon: String(longitude),
    };

    setSelectedPlace(place);
    setChoosingLocation(false);
  };

  // =========================
  // SELECT POI
  // =========================

  const handleSelectPOI = (poi: POI) => {
    // Open summary card
    setActivePOI(poi);

    setSelectedPOIs((prev) => {
      const alreadySelected = prev.some(
        (selected) =>
          selected.id === poi.id
      );

      if (alreadySelected) {
        return prev.filter(
          (selected) =>
            selected.id !== poi.id
        );
      }

      // Preserve user selection order
      return [...prev, poi];
    });
  };

  // =========================
  // GENERATE POIs
  // =========================

  const handleGenerateTrip = async () => {
    if (!selectedPlace) {
      alert(
        "Please select your starting location first."
      );
      return;
    }

    if (selectedInterests.length === 0) {
      alert(
        "Please select at least one interest."
      );
      return;
    }

    try {
      setLoading(true);
      resetTripForNewLocation();

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/trip-planner/generate`,
        {
          location: {
            latitude: Number(
              selectedPlace.lat
            ),
            longitude: Number(
              selectedPlace.lon
            ),
          },

          time: selectedTime,
          budget: selectedBudget,
          vehicle,
          interests: selectedInterests,
          userMessage: aiDescription,
        }
      );

      console.log(
        "Trip Planner Response:",
        response.data
      );

      setTripResult(response.data);

      // Reset previous selections
      setSelectedPOIs([]);

      // Close previous summary
      setActivePOI(null);
    } catch (error) {
      console.error(
        "Trip Planner Error:",
        error
      );

      alert(
        "Failed to generate trip."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CREATE ROUTE
  // =========================

  const handleCreateRoute = async () => {
    if (!selectedPlace) {
      alert(
        "Please select your starting location."
      );
      return;
    }

    if (selectedPOIs.length === 0) {
      alert(
        "Please select at least one place from the map."
      );
      return;
    }

    try {
      setRouteLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/trip-planner/create-route`,
        {
          start: {
            latitude: Number(
              selectedPlace.lat
            ),
            longitude: Number(
              selectedPlace.lon
            ),
          },

          pois: selectedPOIs.map((poi) => ({
            id: poi.id,
            name: poi.name,
            latitude: Number(
              poi.latitude
            ),
            longitude: Number(
              poi.longitude
            ),
          })),

          vehicle,
        }
      );

      console.log(
        "Created Route:",
        response.data
      );

      setTripResult((prev: any) => ({
        ...prev,
        itinerary: response.data,
      }));
    } catch (error) {
      console.error(
        "Create Route Error:",
        error
      );

      alert(
        "Failed to create route."
      );
    } finally {
      setRouteLoading(false);
    }
  };

  return (
    <>
      {/* =========================
          MAP
      ========================= */}

      <TripPlannerMap
        tripResult={tripResult}
        selectedPOIs={selectedPOIs}
        onSelectPOI={handleSelectPOI}
        choosingLocation={choosingLocation}
        onMapLocationSelect={
          handleMapLocationSelect
        }
      />

      {/* =========================
          POI SUMMARY
      ========================= */}

      {activePOI && (
        <POISummaryCard
          poi={activePOI}
          onClose={() =>
            setActivePOI(null)
          }
        />
      )}

      {/* =========================
          PANEL
      ========================= */}

      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          width: "360px",
          maxHeight:
            "calc(100vh - 40px)",
          background: "#ffffff",
          borderRadius: "22px",
          padding: "24px",
          boxShadow:
            "0 20px 60px rgba(0,0,0,.15)",
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "none",
          zIndex: 1000,
        }}
        className="trip-planner-panel"
      >
        {/* HEADER */}

        <h2
          style={{
            margin: 0,
            fontSize: "28px",
            fontWeight: 700,
            color: "#111827",
          }}
        >
          ✨ Plan My Local Trip
        </h2>

        <p
          style={{
            marginTop: "8px",
            marginBottom: "28px",
            color: "#6B7280",
            lineHeight: 1.6,
            fontSize: "15px",
          }}
        >
          Tell us how much time you have and
          what you love. JourneyAI will build
          the perfect local experience.
        </p>

        {/* START LOCATION */}

        <TripPlannerLocation
          selectedPlace={selectedPlace}
          choosingLocation={choosingLocation}
          locationLoading={locationLoading}
          onUseMyLocation={
            handleUseMyLocation
          }
          onChooseOnMap={
            handleChooseOnMap
          }
        />

        {/* VEHICLE */}

        <VehicleSelector
          vehicle={vehicle}
          setVehicle={setVehicle}
        />

        {/* INTERESTS */}

        <InterestSelector
          selectedInterests={
            selectedInterests
          }
          setSelectedInterests={
            setSelectedInterests
          }
        />

        {/* AI DESCRIPTION */}

        <div
          style={{
            marginTop: "20px",
          }}
        >
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: 600,
              color: "#111827",
            }}
          >
            ✨ Or describe your perfect trip
          </label>

          <textarea
            value={aiDescription}
            onChange={(e) =>
              setAiDescription(
                e.target.value
              )
            }
            placeholder="Example: I want peaceful scenic places, good photography spots and a cafe at the end..."
            rows={4}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "12px",
              border:
                "1px solid #D1D5DB",
              resize: "vertical",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* GENERATE */}

        <div
          style={{
            marginTop: "20px",
          }}
        >
          <GenerateTripButton
            loading={loading}
            onClick={
              handleGenerateTrip
            }
          />
        </div>

        {/* POI SELECTION */}

        {tripResult?.selectedPOIs
          ?.length > 0 && (
          <TripPlannerPOISelection
            selectedPOIs={selectedPOIs}
            routeLoading={routeLoading}
            onCreateRoute={
              handleCreateRoute
            }
          />
        )}
      </div>
    </>
  );
};

export default TripPlannerPanel;