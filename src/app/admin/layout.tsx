"use client";
import "@/app/globals.css";
import { authClient } from "@/utils/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminHeader from "./dashboard/components/admin-header";
import Sidebar from "./dashboard/components/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);
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

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 640);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

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
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar - Hidden on mobile, fixed on desktop */}
      <Sidebar
        onExpandChange={setSidebarExpanded}
        className={isDesktop ? "flex" : "hidden"}
      />

      {/* Main Content Area - margin only on desktop */}
      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={{
          marginLeft: isDesktop ? (sidebarExpanded ? "280px" : "80px") : "0px",
        }}
      >
        <AdminHeader />

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
