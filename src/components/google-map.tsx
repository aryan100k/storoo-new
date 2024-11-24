import { CSSProperties, PropsWithChildren } from "react";
import { useJsApiLoader, GoogleMap as Map, InfoWindow, Marker } from "@react-google-maps/api";
import { Skeleton } from "./ui/skeleton";
import { googleMapAPIKey } from "@/lib/constants";

type LatLong = google.maps.LatLng | google.maps.LatLngLiteral;
type Location = { id: number; position: LatLong };

export const GoogleMap = (
  props: PropsWithChildren<{
    positions: Location[];
    selectedPosition: LatLong | null;
    setSelectedLocation: (location: Location | null) => void;
    center: LatLong;
    mapContainerStyle: CSSProperties;
  }>
) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleMapAPIKey!,
  });

  if (!isLoaded) {
    return <Skeleton style={props.mapContainerStyle} />;
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

      {props.children && props.selectedPosition && (
        <InfoWindow
          position={props.selectedPosition}
          onCloseClick={() => props.setSelectedLocation(null)}
        >
          {props.children}
        </InfoWindow>
      )}
    </Map>
  );
};
