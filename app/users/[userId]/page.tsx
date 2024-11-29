"use client";

import { Header } from "@/components/header";
import { UserBio } from "@/components/users/user-bio";
import { UserHero } from "@/components/users/user-hero";
import useUser from "@/hooks/use-user";
import { ClipLoader } from "react-spinners";

const UserView = ({ params }: { params: { userId: string } }) => {
  const userId = params.userId;

  const { data: fetchedUser, isLoading } = useUser(userId);

  if (isLoading || !fetchedUser) {
    return (
      <div
        className="
        flex
        justify-center
        items-center
        h-full
      "
      >
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header showBackArrow label={fetchedUser?.name} />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
    </>
  );
};

export default UserView;
