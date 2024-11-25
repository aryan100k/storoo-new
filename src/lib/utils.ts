import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isProd = () => process.env.NODE_ENV === "production";

export const truncateText = (text: string, length: number) => {
  return text.length > length ? text.slice(0, length) + "..." : text;
};

export const getInstals = (name: string) => {
  const components = name.split(" ");

  if (components.length === 1) {
    return components[0].slice(0, 2).toUpperCase();
  }

  return components
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
};
