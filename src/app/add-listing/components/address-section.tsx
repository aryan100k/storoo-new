import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ListingSchema } from "@/lib/zod/listing";
import { useFormContext } from "react-hook-form";
import { AddressSelectModal } from "./address-select-modal";
import { Pen } from "lucide-react";
import { getGeoDetail } from "@/lib/google-places";

export const AddressSection = () => {
  const form = useFormContext<ListingSchema>();

  const {
    register,
    formState: { errors },
    watch,
  } = form;

  const placeId = watch("placeId");

  if (!placeId) {
    return (
      <div>
        <AddressSelectModal
          onSelect={(place) => {
            if (!place.place_id || !place.formatted_address || !place.address_components) {
              return;
            }

            const addressComponents = place.address_components;

            const route = getGeoDetail(addressComponents, "route").toLowerCase();
            const subLocal1 = getGeoDetail(addressComponents, "sublocality_level_1").toLowerCase();
            const subLocal2 = getGeoDetail(addressComponents, "sublocality_level_2").toLowerCase();
            const postalCode = getGeoDetail(addressComponents, "postal_code");
            const state = getGeoDetail(addressComponents, "administrative_area_level_1");
            const city = getGeoDetail(addressComponents, "locality");

            form.setValue("placeId", place.place_id);
            form.setValue("locality", subLocal1 || subLocal2 || route);
            form.setValue("city", city);
            form.setValue("state", state);
            form.setValue("postalCode", postalCode);

            form.setError("storageCapacity", { message: "" });
            form.setError("storageCapacity.small", { message: "" });
            form.setError("storageCapacity.regular", { message: "" });
            form.setError("storageCapacity.oddSided", { message: "" });
          }}
        />

        {errors.storageCapacity ||
        errors.locality ||
        errors.city ||
        errors.state ||
        errors.postalCode ? (
          <p className="text-red-500 text-sm mt-1">Please enter a valid address.</p>
        ) : null}
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="locality">Street Address</Label>
          <button
            type="button"
            onClick={() => form.setValue("placeId", "")}
            className="hover:underline underline-offset-2 text-sm ml-auto flex items-center"
          >
            <Pen className="w-3 h-3 mr-2 shrink-0" />
            Edit
          </button>
        </div>
        <Input id="locality" placeholder="123 Main St" {...register("locality")} />
        {errors.locality && <p className="text-red-500 text-sm mt-1">{errors.locality.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" placeholder="City" {...register("city")} />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input id="state" placeholder="State" {...register("state")} />
          {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
        </div>
        <div>
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input id="postalCode" placeholder="12345" {...register("postalCode")} />
          {errors.postalCode && (
            <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>
          )}
        </div>
      </div>
    </>
  );
};
