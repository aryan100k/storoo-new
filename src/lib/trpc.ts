import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/server/trpc/trpc";
import { isProd } from "./utils";

export const trpc = createTRPCReact<AppRouter>({});

export const getTRPCBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }

  if (process.env.NEXT_PUBLIC_CLIENT_URL) {
    return isProd()
      ? `https://${process.env.NEXT_PUBLIC_CLIENT_URL}`
      : `http://${process.env.NEXT_PUBLIC_CLIENT_URL}`;
  }

  return `http://localhost:${process.env.PORT ?? 3000}`;
};
