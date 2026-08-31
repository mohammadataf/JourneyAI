import { Map } from "@vis.gl/react-google-maps";

interface Props {
  children: React.ReactNode;
}

const BaseMap = ({ children }: Props) => {
  return (
    <Map
      defaultCenter={{
        lat: 34.0837,
        lng: 74.7973,
      }}
      defaultZoom={16}
      style={{
        width: "100%",
        height: "100vh",
      }}
      gestureHandling="greedy"
      disableDefaultUI={false}
    >
      {children}
    </Map>
  );
};

export default BaseMap;