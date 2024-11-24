"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { getTRPCBaseUrl, trpc } from "@/trpc";

export const queryClient = new QueryClient();
export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${getTRPCBaseUrl()}/api/trpc`,
    }),
  ],
});

export const TRPCProvider = (props: React.PropsWithChildren) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
    </trpc.Provider>
  );
};
