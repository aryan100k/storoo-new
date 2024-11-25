import { z } from "zod";
import { PhoneNumberUtil } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();
export const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

const invalidMessage = "Please enter correct mobile number.";
export const phoneSchema = z
  .string({
    required_error: invalidMessage,
    invalid_type_error: invalidMessage,
  })
  .trim()
  .refine(isPhoneValid, invalidMessage);

export type PhoneSchema = z.infer<typeof phoneSchema>;

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .toLowerCase()
    .email({
      message: "Invalid email address",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .max(255, {
      message: "Password must be at most 255 characters",
    }),
});

export const signUpSchema = z.object({
  name: z
    .string({
      required_error: "Full name is required",
    })
    .min(2, {
      message: "Name must be at least 2 characters",
    }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .toLowerCase()
    .email({
      message: "Invalid email address",
    }),
  phone: phoneSchema,
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(3, {
      message: "Password must be at least 6 characters",
    })
    .max(255, {
      message: "Password must be at most 255 characters",
    }),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
