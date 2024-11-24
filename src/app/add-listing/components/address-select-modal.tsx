import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { AutoCompleteInput } from "@/components/auto-complete-input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { googleMapAPIKey } from "@/lib/constants";
import { useState } from "react";

export const AddressSelectModal = (props: {
  onSelect: (p: google.maps.places.PlaceResult) => void;
}) => {
  const [open, setOpen] = useState(false);
  const { placesService } = usePlacesService({
    apiKey: googleMapAPIKey,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button type="button" className="text-sm font-medium underline">
          Add your address
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add address</DialogTitle>
          <DialogDescription>Start typing to search for an address</DialogDescription>
        </DialogHeader>

        <AutoCompleteInput
          onSelect={async (e) => {
            placesService?.getDetails({ placeId: e.place_id }, (place) => {
              if (place) {
                props.onSelect(place);
              }
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
