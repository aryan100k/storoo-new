export const routes = {
  home: "/",
  addListing: "/add-listing",
  partnerTerms: "/partner-terms",
  partnerThankYou: "/partner-thank-you",
  bookingThankYou: "/booking-thank-you",
  login: "/auth/login",
  signup: "/auth/signup",
  becomeAPartner: "/become-a-partner",
};

export const adminRoutes = {
  dashboard: "/admin/dashboard",
  bookingRequests: "/admin/booking-requests",
  storagePoints: "/admin/storage-points",
  partnerRequests: "/admin/partner-requests",
  partnerListings: "/admin/partner-listings",
  partnerListingDetails: (id: string | number) => `/admin/partner-listings/${id}`,
};
