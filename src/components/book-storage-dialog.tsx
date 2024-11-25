"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneNumberInput } from "./phone-number-input";
import { CalendarInput } from "./calendar-input";

import { trpc } from "@/lib/trpc";
import { routes } from "@/lib/routes";
import { showErrorToast } from "@/lib/api-errors";
import { bookingRequestSchema, BookingRequestSchema } from "@/lib/zod/booking";

export const BookNowDialog = (
  props: React.PropsWithChildren<{
    storageId?: number;
  }>
) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {props.children || (
          <Button type="button" className="w-full mt-2 bg-blue-500 text-white">
            Book Now
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="!bg-white">
        <DialogHeader className="!bg-white">
          <DialogTitle className="text-black">Storoo</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Book your luggage storage
          </DialogDescription>
        </DialogHeader>

        <BookingForm storageId={props.storageId} />
      </DialogContent>
    </Dialog>
  );
};

const defaultValues = (): BookingRequestSchema => ({
  name: "",
  phone: "",
  luggageType: "regular",
  endDate: new Date(),
  startDate: new Date(),
});

const BookingForm = (props: { storageId?: number }) => {
  const router = useRouter();
  const { status, mutate: addBooking } = trpc.addNewBookingRequest.useMutation({
    onSuccess: () => {
      router.push(routes.bookingThankYou);
    },
    onError: (error) => {
      showErrorToast(error.message);
    },
  });

  const form = useForm<BookingRequestSchema>({
    resolver: zodResolver(bookingRequestSchema),
    defaultValues: defaultValues(),
  });

  const onSubmit = (values: BookingRequestSchema) => {
    values.storageId = props.storageId;
    addBooking(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <PhoneNumberInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start date</FormLabel>
              <FormControl>
                <CalendarInput {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>End date</FormLabel>
              <FormControl>
                <CalendarInput {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="luggageType"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Luged Type</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Luggage Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small Bag (e.g. backpack, purse)</SelectItem>
                    <SelectItem value="regular">Regular Suitcase (e.g. 24" suitcase)</SelectItem>
                    <SelectItem value="odd_size">
                      Odd Size (e.g. musical instruments, Surfboards)
                    </SelectItem>
                    <SelectItem value="other">Other (e.g. large items)</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="brand"
          className="w-full mt-2 col-span-full"
          disabled={status === "pending"}
        >
          Submit
          {status === "pending" && <Loader2 className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};
