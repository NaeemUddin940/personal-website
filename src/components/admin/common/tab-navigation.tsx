"use client";
import { Button } from "@/components/common/advanced-button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useFormContext } from "react-hook-form";

export const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  const currentIndex = tabs.findIndex((t) => t.id === activeTab);
  const prevTab = tabs[currentIndex - 1];
  const nextTab = tabs[currentIndex + 1];

  /**
   * এখানে সরাসরি trigger কল না করে প্যারেন্ট কম্পোনেন্টের
   * onTabChange (যা handleTabChange ফাংশন) কে কল করা হচ্ছে।
   * এতে ভ্যালিডেশন এবং এরর ক্লিনিং এক জায়গা থেকে কন্ট্রোল হবে।
   */
  const handleNavigation = (tabId: string) => {
    onTabChange(tabId);
  };

  return (
    <div className="flex justify-between w-full">
      {/* Previous Button */}
      <Button
        type="button"
        variant="outline" // প্রিভিয়াস বাটন আউটলাইন দিলে দেখতে ভালো লাগে
        icon={<ChevronLeft size={16} />}
        onClick={() => prevTab && handleNavigation(prevTab.id)}
        className={!prevTab ? "invisible" : ""}
      >
        {prevTab?.label}
      </Button>

      {/* Next or Submit Button */}
      {nextTab ? (
        <Button
          type="button"
          onClick={() => handleNavigation(nextTab.id)}
          variant="primary"
          icon={<ChevronRight size={16} />}
        >
          {nextTab.label}
        </Button>
      ) : (
        <Button
          type="submit"
          variant="glow" // আপনার পেজ হেডারের সাথে মিল রেখে
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Create Attribute"}
        </Button>
      )}
    </div>
  );
};
