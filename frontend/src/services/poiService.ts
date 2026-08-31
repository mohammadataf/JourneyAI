import axios from "axios";

export interface POI {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address?: string;
  rating?: number;
  category?: string;
}

interface Coordinate {
  latitude: number;
  longitude: number;
}

export async function getPOIs(
  start: Coordinate,
  end: Coordinate,
  theme: string
): Promise<POI[]> {
  const { data } = await axios.post("http://localhost:5000/api/pois",
    {
      start,
      end,
      theme,
    }
  );

  return data.pois;
}