"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { CapacityInput } from "./capacity-input";

const formSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  locality: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(5, "Postal code must be at least 5 characters"),
  spaceType: z.string().min(1, "Space type is required"),
  storageCapacity: z.object({
    small: z.coerce.number().optional().default(0),
    regular: z.coerce.number().optional().default(0),
    oddSided: z.coerce.number().optional().default(0),
  }),
  operatingHours: z.string().min(1, "Operating hours are required"),
  securityFeatures: z.string().min(1, "Security features are required"),
  rent: z.number().min(1, "Rent amount is required"),
  amenities: z.string().optional(),
  termsAgreed: z
    .boolean()
    .refine((val) => val === true, "You must agree to the terms and conditions"),
  additionalNotes: z.string().optional(),
  referralSource: z.string().min(1, "Referral source is required"),
});

type FormData = z.infer<typeof formSchema>;

const mockSubmitForm = async (data: FormData): Promise<{ success: boolean; message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("Form submitted:", data);
  return { success: true, message: "Form submitted successfully" };
};

const mockSendEmail = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Email notification sent to Storoo team");
};

export const PartnerListingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const result = await mockSubmitForm(data);
      if (result.success) {
        await mockSendEmail();
        toast({
          title: "Success!",
          description: "Your application has been submitted. We'll be in touch soon.",
        });
      } else {
        throw new Error(result.message);
      }
    } catch (e) {
      console.log(e);
      toast({
        title: "Error",
        description: "There was a problem submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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

          <div>
            <Label htmlFor="locality">Street Address</Label>
            <Input id="locality" placeholder="123 Main St" {...register("locality")} />
            {errors.locality && (
              <p className="text-red-500 text-sm mt-1">{errors.locality.message}</p>
            )}
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
                <FormLabel className="flex flex-col font-normal">
                  <span className="text-sm font-medium">Small</span>
                  <span className="text-sm text-muted-foreground">Purses, tote bag</span>
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
                <FormLabel className="flex flex-col font-normal">
                  <span className="text-sm font-medium">Regular</span>
                  <span className="text-sm text-muted-foreground">Suitcases, backpacks</span>
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
                <FormLabel className="flex flex-col font-normal">
                  <span className="text-sm font-medium">Odd-sized</span>
                  <span className="text-sm text-muted-foreground">
                    Surfboards, bikes, golf bags
                  </span>
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
            <Label htmlFor="rent">Pricing Structure</Label>
            <Input id="rent" placeholder="e.g., $5 per bag per day" {...register("rent")} />
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

          <div>
            <Label htmlFor="photos">Photos of the Space</Label>
            <Input id="photos" type="file" multiple accept="image/*" />
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
        </div>

        <Button type="submit" variant={"brand"} className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </Form>
  );
};

const TermsAndConditions = () => (
  <ScrollArea className="h-[400px] w-full rounded-md border p-4">
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Terms and Conditions for Storoo Partners</h2>
      <p>Effective Date: November 24, 2024</p>
      <section>
        <h3 className="text-xl font-semibold">1. Introduction</h3>
        <p>
          By submitting an application to list your storage space on Storoo, you agree to comply
          with and be bound by these terms.
        </p>
      </section>
      <section>
        <h3 className="text-xl font-semibold">2. Eligibility</h3>
        <p>
          To be eligible, you must be at least 18 years old and have the legal right to list the
          storage space.
        </p>
      </section>
      <section>
        <h3 className="text-xl font-semibold">3. Listing Responsibilities</h3>
        <p>
          You are responsible for providing accurate information about your space and keeping it
          up-to-date.
        </p>
      </section>
      <section>
        <h3 className="text-xl font-semibold">4. Fees and Payments</h3>
        <p>
          Storoo may charge a service fee for each booking. You are responsible for setting your own
          prices.
        </p>
      </section>
      <section>
        <h3 className="text-xl font-semibold">5. User Interaction</h3>
        <p>You are responsible for managing interactions with users and resolving disputes.</p>
      </section>
      <section>
        <h3 className="text-xl font-semibold">6. Termination</h3>
        <p>
          Storoo reserves the right to terminate your partnership at any time for violations of
          these terms.
        </p>
      </section>
      <p>By accepting these terms, you agree to all conditions set forth in this agreement.</p>
    </div>
  </ScrollArea>
);
