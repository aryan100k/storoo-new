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
