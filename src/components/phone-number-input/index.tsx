import { forwardRef } from "react";
import {
  PhoneInput,
  type PhoneInputProps,
  type PhoneInputRefType,
} from "react-international-phone";
import "react-international-phone/style.css";
import { cn } from "@/lib/utils";
import "./styles.css";

export type PhoneNumberInputRef = PhoneInputRefType;

export const PhoneNumberInput = forwardRef<PhoneInputRefType, PhoneInputProps>((props, ref) => {
  return (
    <PhoneInput
      {...props}
      ref={ref}
      inputClassName="w-full !border-none placeholder:text-muted-foreground"
      defaultCountry="in"
      className={cn(
        "flex h-10 w-full gap-1 rounded-md border border-input bg-background px-3 py-2 text-base shadow-sm tracking-widest ring-offset-background placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-1 focus-within:ring-ring sm:text-sm",
        props.disabled && "cursor-not-allowed opacity-50"
      )}
    />
  );
});
