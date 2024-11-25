import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createUserContext } from "@/server/trpc/context";
import { appRouter } from "@/server/trpc/trpc";

const handler = (request: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: createUserContext,
  });
};

export { handler as GET, handler as POST };
