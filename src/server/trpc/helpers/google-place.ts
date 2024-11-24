export const getGroCodeFromPlaceId = async (placeId: string) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${process.env.GOOGLE_MAPS_API_KEY}`
  );
  const data = await response.json();
  return data.results[0].address_components.find((component: any) =>
    component.types.includes("postal_code")
  ).short_name;
};
