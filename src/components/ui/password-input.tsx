import * as React from "react";

import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const ICON_CLASS = "w-5 h-5 text-inherit opacity-60 shrink-0 text-sm";

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "password", ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    return (
      <div
        className={cn(
          "flex h-10 w-full gap-1 rounded-md border border-input bg-background pr-3 text-base shadow-sm placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
          !isPasswordVisible && "font-[Verdana] tracking-widest",
          className
        )}
      >
        <input
          ref={ref}
          type={isPasswordVisible ? "text" : type}
          className="grow border-none outline-none rounded-l-md placeholder-shown:font-sans px-3 py-1"
          {...props}
        />
        <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
          {isPasswordVisible ? <Eye className={ICON_CLASS} /> : <EyeOff className={ICON_CLASS} />}
        </button>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
