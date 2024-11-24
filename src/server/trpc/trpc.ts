import { mergeRouters } from "@/server/trpc";
import { publicRouter } from "./procedures/public";

export const appRouter = mergeRouters(publicRouter);

export type AppRouter = typeof appRouter;
