import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Notifications from "@/components/Notifications";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
    include: {
      notifications: true,
    }
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <div className="stickyNavbar">
        <Navbar />
      </div>
      {store.notifications.length > 0 && (
        <div className="w-[100%] flex flex-col items-center justify-center">
          <Notifications params={params.storeId} />
        </div>
      )}
      {children}

      <Footer />
    </>
  );
}