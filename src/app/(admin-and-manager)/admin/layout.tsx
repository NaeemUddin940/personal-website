"use client";
import "@/app/globals.css";
import AdminHeader from "./dashboard/components/admin-header";
import Sidebar from "./dashboard/components/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <AdminHeader />
        {children}
      </div>
    </div>
  );
}
