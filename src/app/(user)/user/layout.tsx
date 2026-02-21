"use client";
import "@/app/globals.css";
import Header from "@/components/Header/header";
import { ThemeProvider } from "@/components/ui/theme-provider";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider defaultTheme="dark">
      <Header />
      <div className="flex-1 mt-30">{children}</div>
    </ThemeProvider>
  );
}
