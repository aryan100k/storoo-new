import { useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { trpc } from "@/lib/trpc";

export const LogoutBtn = () => {
  const router = useRouter();
  const { status, mutate } = trpc.logout.useMutation({
    onSuccess: () => {
      router.push(routes.home);
    },
  });

  const isLoading = status === "pending" || status === "success";

  return (
    <Button
      size="sm"
      variant="outline"
      className="[&_svg]:size-3"
      onClick={() => mutate()}
      disabled={isLoading}
    >
      Logout
      {isLoading ? <Loader2 className="animate-spin" /> : <LogOut />}
    </Button>
  );
};
