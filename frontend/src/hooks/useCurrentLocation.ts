// This custom hook gets the user's current location using the browser's Geolocation API. It returns the location, loading state, and any error, so different components can easily access the current location.


import { useEffect, useState } from "react";

type Location = {
  latitude: number;
  longitude: number;
};

const useCurrentLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setLoading(false);
      },
      () => {
        setError("Unable to fetch location.");
        setLoading(false);
      }
    );
  }, []);

  return { location, loading, error };
};

export default useCurrentLocation;