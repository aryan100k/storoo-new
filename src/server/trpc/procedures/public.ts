import { router, procedure } from "@/server/trpc";

export const publicRouter = router({
  test: procedure.query(async () => {
    return "hello world";
  }),
});
