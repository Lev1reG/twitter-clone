"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { FollowBar } from "@/components/layout/follow-bar";
import { LoginModal } from "@/components/modals/login-modal";
import { RegisterModal } from "@/components/modals/register-modal";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export const ClientLayout: React.FC<ClientLayoutProps> = ({children}) => {
  return (
    <>
      <SessionProvider>
        <Toaster />
        <RegisterModal />
        <LoginModal />
        <div className="h-screen bg-black">
          <div className="container h-full mx-auto xl:px-30 max-w-6xl">
            <div className="grid grid-cols-4 h-full">
              <Sidebar />
              <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
                {children}
              </div>
              <FollowBar />
            </div>
          </div>
        </div>
      </SessionProvider>
    </>
  );
}
