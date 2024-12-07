import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { SidebarLogo } from "@/components/layout/sidebar-logo";
import { SidebarItem } from "@/components/layout/sidebar-item";
import { BiLogOut } from "react-icons/bi";
import { SidebarTweetButton } from "@/components/layout/sidebar-tweet-button";
import { signOut, useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";

export const Sidebar = () => {
  const session = useSession();
  const { data: currentUser } = useCurrentUser();

  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Notification",
      href: "/notifications",
      icon: BsBellFill,
      auth: true,
      alert: currentUser?.hasNotification,
    },
    {
      label: "Profile",
      href: `/users/${currentUser?.id}`,
      icon: FaUser,
      auth: true,
    },
  ];
  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              auth={item?.auth}
              alert={item?.alert} 
            />
          ))}
          {session.status === "authenticated" && (
            <SidebarItem
              onClick={() => signOut()}
              icon={BiLogOut}
              label="Logout"
            />
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};
