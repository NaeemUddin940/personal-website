"use client";
import "@/app/globals.css";
import Header from "@/components/Header/header";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { authClient } from "@/utils/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession(); // better-auth hooks

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/");
    }
  }, [session, isPending, router]);

  if (isPending) return <div>Loading....</div>;

  if (!session) return null;
  return (
    <ThemeProvider defaultTheme="dark">
      <Header />
      <div className="flex-1 mt-30">{children}</div>
    </ThemeProvider>
  );
}
