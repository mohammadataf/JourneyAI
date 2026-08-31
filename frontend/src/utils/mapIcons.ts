import L from "leaflet";
import redMarker from "../assets/marker-icon-2x-red.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

export const destinationIcon = new L.Icon({
  iconUrl: redMarker,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});