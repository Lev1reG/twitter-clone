import { 
  BsBellFill, 
  BsHouseFill 
} from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { SidebarLogo } from "@/components/layout/sidebar-logo";
import { SidebarItem } from "@/components/layout/sidebar-item";
import { BiLogOut } from "react-icons/bi";
import { SidebarTweetButton } from "@/components/layout/sidebar-tweet-button";

export const Sidebar = () => {
  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Notification",
      href: "/notification",
      icon: BsBellFill,
    },
    {
      label: "Profile",
      href: "user/123",
      icon: FaUser
    }
  ]
  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
        {
          items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
            />
          ))
        }
        <SidebarItem
          onClick={() => console.log("Logout")}
          icon={BiLogOut}
          label="Logout"
        />
        <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
}
