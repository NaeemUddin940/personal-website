// components/ui/theme-provider.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({
  children,
  defaultTheme = "light",
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
}) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [isLoaded, setIsLoaded] = useState(false);

  // ১. মাউন্ট হওয়ার সময় এবং defaultTheme পরিবর্তন হলে রান হবে
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;

    // যদি আগে সেভ করা থিম থাকে এবং সেটা আপনার পাঠানো নতুন defaultTheme থেকে আলাদা হয়,
    // তবে আপনি চাইলে ডিফল্টকে প্রায়োরিটি দিতে পারেন অথবা সেভ করাটাকে।
    // এখানে আপনার রিকোয়েস্ট অনুযায়ী defaultTheme চেঞ্জ হলে সেটা সেট করা হচ্ছে:

    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme(defaultTheme);
    }

    setIsLoaded(true);
  }, [defaultTheme]); // defaultTheme চেঞ্জ হলে এটি আবার ট্রিগার হবে

  // ২. থিম অ্যাপ্লাই এবং লোকাল স্টোরেজে সেভ করা
  useEffect(() => {
    if (!isLoaded) return;

    const root = window.document.documentElement;
    let activeTheme = theme;

    if (theme === "system") {
      activeTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    root.classList.remove("light", "dark");
    root.classList.add(activeTheme);

    // যখনই ইউজার বা সিস্টেম থিম চেঞ্জ করবে, স্টোরেজে আপডেট হবে
    localStorage.setItem("theme", theme);
  }, [theme, isLoaded]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
