import Image from "next/image";

import useUser from "@/hooks/use-user";
import { Avatar } from "@/components/avatar";

interface UserHeroProps {
  userId: string;
}

export const UserHero = ({ userId }: UserHeroProps) => {
  const { data: fetchedUser } = useUser(userId);

  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {fetchedUser?.coverImage && (
          <Image
            src={fetchedUser.coverImage}
            fill
            alt="Cover Image"
            className="object-cover"
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};
