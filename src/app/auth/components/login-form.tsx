"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

import { trpc } from "@/lib/trpc";
import { loginSchema } from "@/lib/zod/auth";
import { adminRoutes, routes } from "@/lib/routes";

export const LoginForm = () => {
  const router = useRouter();
  const { status, mutate } = trpc.login.useMutation({
    onSuccess: () => {
      router.push(adminRoutes.dashboard);
    },
    onError: (error) => {
      toast("Invalid credentials", {
        description: "Please check your email and password",
      });
    },
  });

  const isLoading = status === "pending" || status === "success";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      email: form.email.value,
      password: form.password.value,
    };

    const parsed = loginSchema.safeParse(data);
    if (!parsed.success) {
      toast("Invalid credentials", {
        description: "Please check your email and password",
      });
      return;
    }

    mutate(data);
  };

  return (
    <Card className="mx-auto max-w-sm my-4">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" variant={"brand"} className="w-full" disabled={isLoading}>
            Login
            {isLoading && <Loader2 className="animate-spin h-3.5 w-3.5" />}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href={routes.signup} className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
