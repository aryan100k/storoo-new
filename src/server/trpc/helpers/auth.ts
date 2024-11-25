import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { db } from "@/server/drizzle/db";
import { User, users } from "@/server/drizzle/schema";
import { lucia } from "@/server/lucia";
import { SignUpSchema } from "@/lib/zod/auth";

const saltRounds = 10;

export const generateHash = (plainText: string) => bcrypt.hashSync(plainText, saltRounds);

export const validateHash = (plainText: string, hash: string) =>
  bcrypt.compareSync(plainText, hash);

export const login = async (email: string, password: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user?.password) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Invalid email or password",
    });
  }

  const validPassword = validateHash(user.password, password);

  if (!validPassword) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Invalid email or password",
    });
  }

  const session = await lucia.createSession(user.id.toString(), {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  return sessionCookie;
};

export const signUp = async (config: SignUpSchema) => {
  // check for duplicate email or phone
  const existingUser = await db.query.users.findFirst({
    where: (table, { eq, or }) => or(eq(table.email, config.email), eq(table.phone, config.phone)),
    columns: {
      id: true,
    },
  });

  if (existingUser?.id) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "User with this email or phone already exists",
    });
  }

  const hashedPassword = generateHash(config.password);

  const userData: User = {
    email: config.email,
    password: hashedPassword,
    name: config.name,
    phone: config.phone,
    createdAt: new Date().toISOString(),
    emailVerified: false,
    phoneVerified: false,
    role: "user",
  };
  const user = await db.insert(users).values(userData).returning({
    userId: users.id,
  });
  const userId = user[0].userId;

  const session = await lucia.createSession(userId.toString(), {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  return sessionCookie;
};
