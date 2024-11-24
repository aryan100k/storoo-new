"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { trpc } from "@/lib/trpc";
import { ListingSchema, listingSchema } from "@/lib/zod/listing";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CapacityInput } from "../../../components/capacity-input";
import { TermsAndConditions } from "./tnc";

import { capacityOddSizeImg, capacityRegularImg, capacitySmallImg } from "@/assets/images/capacity";
import { routes } from "@/lib/routes";
import { AddressSection } from "./address-section";

export const PartnerListingForm = () => {
  const router = useRouter();
  const { mutate, status } = trpc.addListing.useMutation({
    onSuccess: (data) => {
      if (data.status === "success") {
        router.replace(routes.partnerThankYou);
      }
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Error",
        description: "There was a problem submitting your application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const form = useForm<ListingSchema>({
    resolver: zodResolver(listingSchema),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: ListingSchema) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              placeholder="Enter your business name"
              {...register("businessName")}
            />
            {errors.businessName && (
              <p className="text-red-500 text-sm mt-1">{errors.businessName.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contactName">Contact Name</Label>
              <Input id="contactName" placeholder="Full name" {...register("contactName")} />
              {errors.contactName && (
                <p className="text-red-500 text-sm mt-1">{errors.contactName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                {...register("email")}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="(123) 456-7890" {...register("phone")} />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          <AddressSection />

          <div>
            <Label htmlFor="spaceType">Type of Space</Label>
            <Controller
              name="spaceType"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select space type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail Store</SelectItem>
                    <SelectItem value="cafe">Cafe</SelectItem>
                    <SelectItem value="hotel">Hotel Lobby</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.spaceType && (
              <p className="text-red-500 text-sm mt-1">{errors.spaceType.message}</p>
            )}
          </div>

          <div className="flex flex-col text-sm items-center">
            <span className="font-medium">Storage Capacity</span>
            <span className="text-muted-foreground">
              Total number of items you can accommodate in a day
            </span>
          </div>

          <FormField
            control={form.control}
            name="storageCapacity.small"
            render={({ field }) => (
              <FormItem className="space-y-0 flex justify-between gap-2">
                <FormLabel className="flex gap-4 font-normal">
                  <Image
                    src={capacitySmallImg.src}
                    height={capacitySmallImg.height}
                    width={capacitySmallImg.width}
                    alt="Small capacity"
                    className="md:w-8 w-6"
                  />
                  <div className="flex flex-col text-primary">
                    <span className="text-sm font-medium">Small</span>
                    <span className="text-sm text-muted-foreground">Purses, tote bag</span>
                  </div>
                </FormLabel>
                <FormControl>
                  <CapacityInput value={field.value} setValue={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="storageCapacity.regular"
            render={({ field }) => (
              <FormItem className="space-y-0 flex justify-between gap-2">
                <FormLabel className="flex gap-4 font-normal">
                  <Image
                    src={capacityRegularImg.src}
                    height={capacityRegularImg.height}
                    width={capacityRegularImg.width}
                    alt="Regular capacity"
                    className="md:w-8 w-6"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Regular</span>
                    <span className="text-sm text-muted-foreground">Suitcases, backpacks</span>
                  </div>
                </FormLabel>
                <FormControl>
                  <CapacityInput value={field.value} setValue={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="storageCapacity.oddSided"
            render={({ field }) => (
              <FormItem className="space-y-0 flex justify-between gap-2">
                <FormLabel className="flex gap-4 font-normal">
                  <Image
                    src={capacityOddSizeImg.src}
                    height={capacityOddSizeImg.height}
                    width={capacityOddSizeImg.width}
                    alt="Odd sized capacity"
                    className="md:w-8 w-6"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Odd-sized</span>
                    <span className="text-sm text-muted-foreground">
                      Surfboards, bikes, golf bags
                    </span>
                  </div>
                </FormLabel>
                <FormControl>
                  <CapacityInput value={field.value} setValue={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Label htmlFor="operatingHours">Operating Hours</Label>
            <Input
              id="operatingHours"
              placeholder="e.g., Mon-Fri 9AM-6PM, Sat-Sun 10AM-4PM"
              {...register("operatingHours")}
            />
            {errors.operatingHours && (
              <p className="text-red-500 text-sm mt-1">{errors.operatingHours.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="securityFeatures">Security Features</Label>
            <Textarea
              id="securityFeatures"
              placeholder="Describe security measures in place"
              {...register("securityFeatures")}
            />
            {errors.securityFeatures && (
              <p className="text-red-500 text-sm mt-1">{errors.securityFeatures.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="rent">Rent per day</Label>
            <Input id="rent" placeholder="rent" type="number" {...register("rent")} />
            {errors.rent && <p className="text-red-500 text-sm mt-1">{errors.rent.message}</p>}
          </div>

          <div>
            <Label htmlFor="amenities">Amenities Offered</Label>
            <Textarea
              id="amenities"
              placeholder="List additional services or amenities"
              {...register("amenities")}
            />
          </div>

          {/* <div>
            <Label htmlFor="photos">Photos of the Space</Label>
            <Input id="photos" type="file" multiple accept="image/*" />
          </div> */}

          <div>
            <Label htmlFor="additionalNotes">Additional Notes or Comments</Label>
            <Textarea
              id="additionalNotes"
              placeholder="Any other relevant information or special requirements"
              {...register("additionalNotes")}
            />
          </div>

          <div>
            <Label htmlFor="referralSource">How did you hear about Storoo?</Label>
            <Controller
              name="referralSource"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select referral source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="socialMedia">Social Media</SelectItem>
                    <SelectItem value="wordOfMouth">Word of Mouth</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.referralSource && (
              <p className="text-red-500 text-sm mt-1">{errors.referralSource.message}</p>
            )}
          </div>

          <FormField
            control={form.control}
            name="termsAgreed"
            render={({ field }) => (
              <FormItem className="gap-2 flex items-center space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>
                  I agree to the{" "}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button type="button" variant="link" className="p-0 h-auto">
                        terms and conditions
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Terms and Conditions</DialogTitle>
                      </DialogHeader>
                      <TermsAndConditions />
                    </DialogContent>
                  </Dialog>
                  .
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" variant={"brand"} className="w-full" disabled={status === "pending"}>
          {status === "pending" ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </Form>
  );
};
