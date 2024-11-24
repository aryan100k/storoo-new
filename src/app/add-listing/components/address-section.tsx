import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ListingSchema } from "@/lib/zod/listing";
import { useFormContext } from "react-hook-form";

export const AddressSection = () => {
  const form = useFormContext<ListingSchema>();

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <>
      <div>
        <Label htmlFor="locality">Street Address</Label>
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
