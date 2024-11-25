import { initTRPC } from "@trpc/server";
import { UserContext } from "./context";

const t = initTRPC.context<UserContext>().create();

export const router = t.router;
export const procedure = t.procedure;
export const mergeRouters = t.mergeRouters;
