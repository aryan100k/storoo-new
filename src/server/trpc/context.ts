import { cookies } from "next/headers";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { lucia } from "@/server/lucia";

export const createUserContext = async (opt: FetchCreateContextFnOptions) => {
  const getUser = async () => {
    const cookiesObj = await cookies();

    const sessionId = cookiesObj.get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) return null;

    try {
      const { user } = await lucia.validateSession(sessionId);
      return user;
    } catch (error) {
      return null;
    }
  };

  const user = await getUser();
  return {
    user,
  };
};

export type UserContext = Awaited<ReturnType<typeof createUserContext>>;
