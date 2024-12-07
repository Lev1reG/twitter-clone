import { Header } from "@/components/header";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NotificationsFeed } from "@/components/notifications-feed";
import { authOptions } from "@/auth";

const Notifications = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <Header label="Notifications" showBackArrow />
      <NotificationsFeed />
    </>
  );
};

export default Notifications;
