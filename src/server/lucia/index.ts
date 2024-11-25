import { Lucia } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "@/server/drizzle/db";
import { userTable, userSessionTable } from "@/server/drizzle/schema";

const adapter = new DrizzlePostgreSQLAdapter(db, userSessionTable, userTable);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return { ...attributes };
  },
});

export interface DatabaseUserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    UserId: string;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}
