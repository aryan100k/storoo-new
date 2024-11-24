"use client";

import { useEffect, useRef, useState } from "react";
import { useDebounceValue, useOnClickOutside } from "usehooks-ts";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { Input } from "./ui/input";
import { googleMapAPIKey } from "@/lib/constants";

export const AutoCompleteInput = () => {
  const [state, setState] = useState("");
  const [debouncedValue] = useDebounceValue(state, 500);
  const containerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside([containerRef], () => {
    setState("");
  });

  const { placePredictions, getPlacePredictions, placesService } = usePlacesService({
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

  console.log({
    state,
    debouncedValue,
    placePredictions,
  });

  return (
    <div ref={containerRef} className="relative">
      <Input
        className="w-full"
        value={state}
        onChange={(e) => {
          setState(e.target.value);
        }}
      />

      {state && placePredictions.length > 0 && (
        <div className="absolute top-10 border rounded-md shadow-sm bg-background left-0 right-0 max-h-52 overflow-auto scroll-thin text-sm flex flex-col">
          {placePredictions.map((prediction) => (
            <button key={prediction.place_id} className="hover:bg-muted text-start py-1 px-2">
              <div>{prediction.description}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
