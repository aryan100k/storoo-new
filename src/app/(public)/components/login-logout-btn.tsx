"use client";

import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const LoginLogoutBtn = (props: { className?: string; size?: "sm" }) => {
  const router = useRouter();

  const { data, isLoading, refetch } = trpc.user.useQuery();
  const { status, mutate: logoutMutate } = trpc.logout.useMutation({
    onSettled: () => {
      refetch();
      router.refresh();
    },
  });

  if (isLoading) {
    return <></>;
  }

  if (data?.id) {
    const isLoading = status === "pending";
    return (
      <Button
        size={props.size}
        variant="outline"
        className={cn("[&_svg]:size-3 gap-2", props.className)}
        onClick={() => {
          logoutMutate();
        }}
        disabled={isLoading}
      >
        Logout
        {isLoading && <Loader2 className="animate-spin" size={16} />}
      </Button>
    );
  }

  return (
    <Button
      size={props.size}
      variant="outline"
      className={cn("[&_svg]:size-3", props.className)}
      asChild
    >
      <Link href={routes.login}>Login</Link>
    </Button>
  );
};
