import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { trpc } from "@/lib/trpc";
import { getInstals } from "@/lib/utils";

export const UserAvatar = () => {
  const { data } = trpc.user.useQuery();
  return (
    <Avatar className="items-center">
      <AvatarFallback className="text-xs h-8 w-8">
        {data?.name ? getInstals(data.name) : ""}
      </AvatarFallback>
    </Avatar>
  );
};
