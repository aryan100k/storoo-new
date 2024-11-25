import { toast } from "sonner";

export const apiErrors = {
  invalidCredentials: "auth/invalid-credentials",
  userExists: "auth/user-exists",

  listingInvalidAddress: "listing/invalid-address",
} as const;

export const apiErrorMap = {
  [apiErrors.invalidCredentials]: {
    title: "Invalid credentials",
    description: "Please check your email and password and try again",
  },
  [apiErrors.userExists]: {
    title: "User already exists",
    description: "User with this email or phone already exists",
  },
  [apiErrors.listingInvalidAddress]: {
    title: "Invalid address",
    description: "Please enter a valid address",
  },
};

export type ErrorKey = keyof typeof apiErrors;

export const getErrorMessage = (code?: string) => {
  return (
    apiErrorMap[code as keyof typeof apiErrorMap] || {
      title: "An error occurred",
      description: "Please try again",
    }
  );
};

export const showErrorToast = (code?: string) => {
  const { title, description } = getErrorMessage(code);
  toast(title, {
    description,
  });
};
