import axios from "axios";
import { googleMapAPIKey } from "@/lib/constants";

export type AddressComponentTypes =
  | "subpremise"
  | "premise"
  | "landmark"
  | "route"
  | "plus_code"
  | "sublocality"
  | "sublocality_level_2"
  | "sublocality_level_1"
  | "locality"
  | "administrative_area_level_3"
  | "administrative_area_level_1"
  | "country"
  | "postal_code"
  | "establishment"
  | "point_of_interest";

type Viewport = {
  northeast: Location;
  southwest: Location;
};

type Location = {
  lat: number;
  lng: number;
};

export type Geometry = {
  location: Location;
  location_type: string;
  viewport: Viewport;
};

export const getGeoDetail = (
  addressComponent: google.maps.places.PlaceResult["address_components"],
  detailType: AddressComponentTypes
) => {
  if (!addressComponent) return "";

  for (const component of addressComponent) {
    if (component.types.includes(detailType)) {
      return component.long_name;
    }
  }

  return "";
};

export const getGeocodeFromPlaceId = async (placeId: string) => {
  try {
    const response = await axios.get("https://maps.googleapis.com/maps/api/place/details/json", {
      params: {
        fields: "geometry",
        place_id: placeId,
        key: googleMapAPIKey,
      },
    });

    if (response.data) {
      return response.data as { result: { geometry: Geometry } };
    }

    return null;
  } catch (error) {
    console.error("Error in getting geocode from placeId", error);
    return null;
  }
};
