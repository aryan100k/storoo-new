"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { PhoneNumberInput } from "@/components/phone-number-input";
import { Loader2 } from "lucide-react";

import { trpc } from "@/lib/trpc";
import { signUpSchema, SignUpSchema } from "@/lib/zod/auth";
import { routes } from "@/lib/routes";
import { showErrorToast } from "@/lib/api-errors";

export const defaultValues = (): SignUpSchema => ({
  email: "",
  name: "",
  password: "",
  phone: "",
});

export const SignupForm = () => {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: defaultValues(),
  });

  const router = useRouter();
  const { status, mutate } = trpc.signup.useMutation({
    onSuccess: (data) => {
      router.push(routes.home);
    },
    onError: (error) => {
      showErrorToast(error.message);
    },
  });

  const isLoading = status === "pending" || status === "success";

  const handleSubmit = (values: SignUpSchema) => {
    mutate(values);
  };

  return (
    <Card className="mx-auto max-w-md my-4 w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>Fill in the below details to create an account.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <PhoneNumberInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput type="password" placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4">
              <Button type="submit" variant="brand" className="w-full" disabled={isLoading}>
                Submit
                {isLoading && <Loader2 className="animate-spin w-3 h-3" />}
              </Button>
            </div>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href={routes.login} className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
