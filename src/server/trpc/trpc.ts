import { mergeRouters } from "@/server/trpc";
import { publicRouter } from "./procedures/public";
import { adminRouter } from "./procedures/admin";

export const appRouter = mergeRouters(publicRouter, adminRouter);

export type AppRouter = typeof appRouter;
