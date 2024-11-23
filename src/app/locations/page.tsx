"use client";

import { useState } from "react";
import { BookNowDialog } from "@/components/book-storage-dialog";
import { GoogleMap } from "@/components/google-map";

const storageLocations = [
  {
    id: 1,
    name: "ISB SV Storage",
    position: { lat: 17.436234886872576, lng: 78.34213988465545 },
    address: "Gachibowli Hyderabad Central",
    price: "₹399/day",
  },
  {
    id: 2,
    name: "Ella Hotel Storage",
    position: { lat: 17.442713072742833, lng: 78.34445837724357 },
    address: "Inorbit Mall, HITEC City",
    price: "₹699/day",
  },
  {
    id: 3,
    name: "Sweet Shop Storage",
    position: { lat: 17.25735708291055, lng: 78.38303415128254 },
    address: "Hyderabad Airport",
    price: "₹999/day",
  },
];

const mapContainerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 17.385,
  lng: 78.4867,
};

const LocationsPage = () => {
  const [selectedLocation, setSelectedLocation] = useState<
    (typeof storageLocations)[number] | null
  >(null);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Storage Locations</h1>

        <GoogleMap
          center={center}
          mapContainerStyle={mapContainerStyle}
          positions={storageLocations}
          selectedLocation={selectedLocation}
          setSelectedLocation={(l) =>
            setSelectedLocation(l ? storageLocations.find((loc) => loc.id === l.id)! : null)
          }
        >
          <div className="p-2">
            <h3 className="font-bold">{selectedLocation?.name}</h3>
            <p className="text-sm">{selectedLocation?.address}</p>
            <p className="text-sm font-semibold mt-1">{selectedLocation?.price}</p>
            <BookNowDialog />
          </div>
        </GoogleMap>

        {/* Location List */}
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storageLocations.map((location) => (
            <div
              key={location.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedLocation(location)}
            >
              <h3 className="font-bold text-lg">{location.name}</h3>
              <p className="text-gray-600">{location.address}</p>
              <p className="font-semibold text-blue-600 mt-2">{location.price}</p>

              <BookNowDialog />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationsPage;
