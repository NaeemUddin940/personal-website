"use client";
import { useEffect, useRef, useState } from "react";
import MainHeader from "./main-header";
import TopHeader from "./top-header";

export default function Header() {
  const [isTopVisible, setIsTopVisible] = useState(true);
  const [isMainVisible, setIsMainVisible] = useState(true);

  const scrollTimer = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // ১. স্ক্রল শুরু করলেই টপ হেডার হাইড হবে
      setIsTopVisible(currentScrollY <= 40);

      // ২. স্ক্রল করার সময় মেইন হেডার সবসময় হাইড থাকবে
      setIsMainVisible(false);

      // ৩. স্ক্রল স্টপ ডিটেকশন (স্ক্রল থামলে মেইন হেডার শো হবে)
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }

      scrollTimer.current = setTimeout(() => {
        setIsMainVisible(true);
      }, 150); // ১৫০ মিলি-সেকেন্ড স্ক্রল না হলে শো হবে
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Top Header Section */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          isTopVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <TopHeader />
      </div>

      {/* Main Header Section */}
      <div
        className={`transition-all duration-300 ease-out shadow-md bg-white w-full absolute left-0 ${
          isMainVisible
            ? isTopVisible
              ? "translate-y-0"
              : "-translate-y-[49px]" // TopHeader হাইড হলে এটি একদম উপরে থাকবে
            : "-translate-y-[162%]" // স্ক্রল করার সময় পুরোপুরি হাইড থাকবে
        }`}
      >
        <MainHeader />
      </div>
    </header>
  );
}
