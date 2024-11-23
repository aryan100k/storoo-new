import { CSSProperties, PropsWithChildren } from "react";
import { useJsApiLoader, GoogleMap as Map, InfoWindow, Marker } from "@react-google-maps/api";

const GOOGLE_MAP_API_KEY = "AIzaSyBeF1EYSyAnhPTbycagaYmDM6nla5MYLd4";

type LatLong = google.maps.LatLng | google.maps.LatLngLiteral;
type Location = { id: number; position: LatLong };

export const GoogleMap = (
  props: PropsWithChildren<{
    positions: Location[];
    selectedLocation: Location | null;
    setSelectedLocation: (location: Location | null) => void;
    center: LatLong;
    mapContainerStyle: CSSProperties;
  }>
) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
  });

  if (!isLoaded) {
    return <></>;
  }

  return (
    <Map zoom={13} center={props.center} mapContainerStyle={props.mapContainerStyle}>
      {props.positions.map((location) => (
        <Marker
          key={location.id}
          position={location.position}
          onClick={() => props.setSelectedLocation(location)}
        />
      ))}

      {props.children && props.selectedLocation && (
        <InfoWindow
          position={props.selectedLocation.position}
          onCloseClick={() => props.setSelectedLocation(null)}
        >
          {props.children}
        </InfoWindow>
      )}
    </Map>
  );
};
