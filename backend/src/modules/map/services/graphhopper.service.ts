import axios from "axios";

const GRAPHHOPPER_URL = process.env.GRAPHHOPPER_URL!;
 

export async function getRoute(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number
) {
  const url =
  `${GRAPHHOPPER_URL}/route` +
  `?profile=car` +
  `&point=${startLat},${startLng}` +
  `&point=${endLat},${endLng}` +
  `&algorithm=alternative_route` +
  `&alternative_route.max_paths=5` +
  `&alternative_route.max_weight_factor=2` +
  `&alternative_route.max_share_factor=0.9` +
  `&ch.disable=true`;

  const response = await axios.get(url);
  console.log(response.data.paths.length);
  return response.data;
   
}