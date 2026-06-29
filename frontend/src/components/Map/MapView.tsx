import { MapContainer, TileLayer } from "react-leaflet";

const MapView = () => {
  return (
    <MapContainer
      center={[34.0837, 74.7973]} // Srinagar
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default MapView;