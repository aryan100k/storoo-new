"use client";

import { useMemo, useState } from "react";
import { BookNowDialog } from "@/components/book-storage-dialog";
import { GoogleMap } from "@/components/google-map";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

const mapContainerStyle = {
  width: "100%",
  borderRadius: "0.5rem",
  height: "calc(100vh - 6rem)",
};

const LocationsPage = () => {
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
  const { data, isLoading } = trpc.getAvailableListings.useQuery();
  const selectedLocation = useMemo(
    () => data?.find((d) => d.id === selectedLocationId),
    [data, selectedLocationId]
  );
  const center = {
    lat: parseFloat(data?.[0].latitude!) || 17.385,
    lng: parseFloat(data?.[0].longitude!) || 78.4867,
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 justify-center my-40">
        Loading locations
        <Loader2 className="animate-spin w-4 h-4" />
      </div>
    );
  }

  if (!data?.length) {
    return <div className="flex items-center gap-2 justify-center my-40">No locations found</div>;
  }

  return (
    <main className="container min-h-screen">
      <div className="mx-auto py-4 flex flex-col-reverse md:flex-row gap-4">
        {/* Location List */}
        <div className="flex flex-col w-96 gap-2">
          {data.map((location) => (
            <div
              key={location.id}
              className="bg-white p-6 rounded-md hover:shadow-sm border transition-shadow cursor-pointer capitalize"
              onClick={() => setSelectedLocationId(location.id)}
            >
              <span className="text-sm">{location.spaceType}</span>
              <h3 className="font-medium">{location.businessName}</h3>
              <p className="text-gray-600 text-sm">
                {location.locality}, {location.city}
              </p>

              <p className="font-semibold text-blue-600 mt-2">₹{location.rent}/day</p>

              <BookNowDialog />
            </div>
          ))}
        </div>

        <GoogleMap
          center={center}
          mapContainerStyle={mapContainerStyle}
          positions={data.map((d) => ({
            id: d.id,
            position: { lat: parseFloat(d.latitude), lng: parseFloat(d.longitude) },
          }))}
          selectedPosition={
            selectedLocation
              ? {
                  lat: parseFloat(selectedLocation.latitude),
                  lng: parseFloat(selectedLocation.longitude),
                }
              : null
          }
          setSelectedLocation={(l) =>
            setSelectedLocationId(l ? data.find((loc) => loc.id === l.id)!.id : null)
          }
        >
          <div className="p-2">
            <h3 className="font-bold">{selectedLocation?.businessName}</h3>
            <p className="text-sm">
              {selectedLocation?.locality}, {selectedLocation?.city}
            </p>
            <p className="text-sm font-semibold mt-1">{selectedLocation?.rent}</p>
            <BookNowDialog />
          </div>
        </GoogleMap>
      </div>
    </main>
  );
};

export default LocationsPage;
