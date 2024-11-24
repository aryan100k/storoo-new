"use client";

import { useEffect, useRef, useState } from "react";
import { useDebounceValue, useOnClickOutside } from "usehooks-ts";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { Input } from "./ui/input";
import { googleMapAPIKey } from "@/lib/constants";
import { XIcon } from "lucide-react";
import { truncateText } from "@/lib/utils";

export const AutoCompleteInput = (props: {
  placeholder?: string;
  onSelect: (prediction: google.maps.places.AutocompletePrediction) => void;
}) => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [state, setState] = useState("");
  const [debouncedValue] = useDebounceValue(state, 500);
  const containerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside([containerRef], () => {
    setState("");
  });

  const { placePredictions, getPlacePredictions } = usePlacesService({
    apiKey: googleMapAPIKey,
    options: {
      input: debouncedValue,
      componentRestrictions: { country: "IN" },
      types: [
        "route",
        "sublocality",
        "sublocality_level_1",
        "sublocality_level_2",
        "point_of_interest",
      ],
    },
  });

  useEffect(() => {
    getPlacePredictions({ input: debouncedValue });
  }, [debouncedValue]);

  return (
    <div ref={containerRef} className="relative w-full">
      {selectedAddress ? (
        <div className="flex items-center truncate  overflow-auto justify-between h-9 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors md:text-sm w-full">
          {truncateText(selectedAddress, 45)}
          <button
            type="button"
            onClick={() => {
              setSelectedAddress("");
              setState("");
            }}
          >
            <XIcon className="w-4 h-4 ml-2 shrink-0" />
          </button>
        </div>
      ) : (
        <Input
          value={state}
          placeholder={props.placeholder || "Search for an address"}
          className="w-full"
          onChange={(e) => {
            setState(e.target.value);
          }}
        />
      )}

      {state && placePredictions.length > 0 && (
        <div className="absolute top-10 border rounded-md shadow-sm bg-background left-0 right-0 max-h-52 overflow-auto scroll-thin text-sm flex flex-col">
          {placePredictions.map((prediction) => (
            <button
              type="button"
              key={prediction.place_id}
              className="hover:bg-muted text-start py-1 px-2"
              onClick={() => {
                props.onSelect(prediction);
                setSelectedAddress(prediction.description);
              }}
            >
              <div>{prediction.description}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
