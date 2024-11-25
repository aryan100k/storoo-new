import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { db } from "@/server/drizzle/db";
import { User, userTable } from "@/server/drizzle/schema";
import { lucia } from "@/server/lucia";
import { SignUpSchema } from "@/lib/zod/auth";
import { apiErrors } from "@/lib/api-errors";
import { getUid } from "@/lib/uid";

const saltRounds = 10;
const generateHash = (plainText: string) => bcrypt.hashSync(plainText, saltRounds);
const validateHash = (plainText: string, hash: string) => bcrypt.compareSync(plainText, hash);

export const login = async (email: string, password: string) => {
  const user = await db.query.userTable.findFirst({
    where: eq(userTable.email, email.toLowerCase()),
  });

  if (!user?.password) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: apiErrors.invalidCredentials,
    });
  }

  const validPassword = validateHash(password, user.password);

  if (!validPassword) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: apiErrors.invalidCredentials,
    });
  }

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  return { sessionCookie, id: user.id, email: user.email, role: user.role };
};

export const signUp = async (config: SignUpSchema) => {
  const existingUser = await db.query.userTable.findFirst({
    where: (table, { eq, or }) => or(eq(table.email, config.email), eq(table.phone, config.phone)),
    columns: {
      id: true,
    },
  });

  if (existingUser?.id) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: apiErrors.userExists,
    });
  }

  const hashedPassword = generateHash(config.password);

  const userData: User = {
    id: getUid(),
    email: config.email,
    password: hashedPassword,
    name: config.name,
    phone: config.phone,
    createdAt: new Date(),
    emailVerified: false,
    phoneVerified: false,
    role: "user",
  };
  const user = await db.insert(userTable).values(userData).returning({
    userId: userTable.id,
  });
  const userId = user[0].userId;

  const session = await lucia.createSession(userId.toString(), {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  return sessionCookie;
};
