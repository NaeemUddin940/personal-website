"use client";
import "@/app/globals.css";
import { authClient } from "@/utils/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminHeader from "./dashboard/components/admin-header";
import Sidebar from "./dashboard/components/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  // Define who is allowed to be here
  const isAuthorized =
    session?.user?.role === "admin" || session?.user?.role === "manager";

  useEffect(() => {
    if (!isPending && !isAuthorized) {
      router.push("/");
    }
  }, [isAuthorized, isPending, router]);

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  // If not authorized, return null to prevent layout "flashing" while redirecting
  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <AdminHeader />
        <main>{children}</main>
      </div>
    </div>
  );
}
