import React from "react";
import { SidebarLogo } from "../../../metronic/layout/components/sidebar/SidebarLogo";
import { SidebarAdmin } from "./components/sidebar";
import { Divider } from "@nextui-org/react";
import Header from "../../ui/Header";
import { getCurrentUser } from "../../lib/firebase/firebase-admin";

export default async function DashboardLayout({ children }) {
  const currentUser = await getCurrentUser();
  return (
    <div className="grid grid-cols-12">
      <aside className="hidden lg:block lg:col-span-3 xl:col-span-3 1.5xl:col-span-2 2xl:col-span-2 self-start sticky top-0 h-screen  bg-[#1E1E2D] px-2">
        <SidebarLogo />
        <Divider className={"bg-gray-800 mb-6"} />
        <SidebarAdmin />
      </aside>

      <main className="col-span-12  lg:col-span-9 xl:col-span-9 1.5xl:col-span-10 2xl:col-span-10 bg-[#FCFCFC] space-y-1">
        <header className="bg-white">
          <Header />
        </header>
        <section className="container mx-auto">{children}</section>
      </main>
    </div>
  );
}
