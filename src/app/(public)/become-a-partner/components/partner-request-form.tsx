"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneNumberInput } from "@/components/phone-number-input";
import { Loader2 } from "lucide-react";

import { trpc } from "@/lib/trpc";
import { routes } from "@/lib/routes";
import { showErrorToast } from "@/lib/api-errors";
import { partnerRequestSchema, PartnerRequestSchema } from "@/lib/zod/partner-request";
import { AddressAutoCompleteInput } from "@/components/address-auto-complete-input";

export const PartnerRequestForm = () => {
  const router = useRouter();
  const { status, mutate: sendRequest } = trpc.addPartnershipRequest.useMutation({
    onSuccess: () => {
      router.push(routes.partnerThankYou);
    },
    onError: (error) => {
      showErrorToast(error.message);
    },
  });

  const form = useForm<PartnerRequestSchema>({
    resolver: zodResolver(partnerRequestSchema),
  });

  const handleSubmit = (values: PartnerRequestSchema) => {
    sendRequest(values);
  };

  const isLoading = status === "pending" || status === "success";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid md:grid-cols-2 grid-cols-1 gap-4 border shadow-sm p-3 rounded-md"
      >
        <FormField
          control={form.control}
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactPerson"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Person</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <PhoneNumberInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <AddressAutoCompleteInput
                  onSelect={(v) => {
                    field.onChange(v.description);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="businessType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Type</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hotel">Hotel / Hostel</SelectItem>
                    <SelectItem value="retail">Retail Store</SelectItem>
                    <SelectItem value="cafe">Cafe / Restaurant</SelectItem>
                    <SelectItem value="souvenir">Souvenir Shop</SelectItem>
                    <SelectItem value="local">Local Business</SelectItem>
                    <SelectItem value="tourist">Tourist Information Center</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="storageSpace"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Available Storage Space (sqft)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currentMonthlyVisitors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Monthly Visitors</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading} type="submit" variant="brand" className="col-span-full mt-2">
          Apply Now
          {isLoading && <Loader2 className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};
