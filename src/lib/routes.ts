export const routes = {
  home: "/",
  addListing: "/add-listing",
  partnerTerms: "/partner-terms",
  partnerThankYou: "/partner-thank-you",
  bookingThankYou: "/booking-thank-you",
  login: "/auth/login",
  signup: "/auth/signup",
};

export const adminRoutes = {
  dashboard: "/admin/dashboard",
  bookingRequests: "/admin/booking-requests",
  storagePoints: "/admin/storage-points",
  partnerListings: "/admin/partner-listings",
  partnerListingDetails: (id: string | number) => `/admin/partner-listings/${id}`,
};
