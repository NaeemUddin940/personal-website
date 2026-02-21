import "@/app/globals.css";
import Header from "@/components/Header/header";
import { ThemeProvider } from "@/components/ui/theme-provider";

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <ThemeProvider defaultTheme="dark">
      <Header />
      <main className="flex-1 mt-33">
        {children}
        {modal}
      </main>
    </ThemeProvider>
  );
}
