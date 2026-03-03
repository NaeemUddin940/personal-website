// components/tab-navigation.tsx (Best Version)
"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-hot-toast";

interface TabItem {
  id: string;
  label: string;
  validationPath?: string; // RHF validation path
}

interface TabNavigationProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const TabNavigation = ({
  tabs,
  activeTab,
  onTabChange,
}: TabNavigationProps) => {
  const { trigger } = useFormContext();

  const currentIndex = tabs.findIndex((t) => t.id === activeTab);
  const currentTab = tabs[currentIndex];
  const prevTab = tabs[currentIndex - 1];
  const nextTab = tabs[currentIndex + 1];

  const handleNext = async () => {
    if (!nextTab || !currentTab) return;

    // ✅ validationPath থাকলে সেটা use করুন, না হলে id use করুন
    const pathToValidate = currentTab.validationPath || currentTab.id;
    const isValid = await trigger(pathToValidate);

    if (isValid) {
      onTabChange(nextTab.id);
    } else {
      toast.error(`Please fix errors in ${currentTab.label} first`);
    }
  };

  const handlePrev = () => {
    if (prevTab) {
      onTabChange(prevTab.id);
    }
  };

  // শেষ ট্যাব
  if (!nextTab) {
    return (
      <div className="flex justify-between">
        {prevTab && (
          <Button
            type="button"
            variant="outline"
            icon={<ChevronLeft size={15} />}
            onClick={handlePrev}
          >
            {prevTab.label}
          </Button>
        )}
        <Button variant="primary" type="submit">
          Submit Category
        </Button>
      </div>
    );
  }

  // প্রথম ট্যাব
  if (!prevTab) {
    return (
      <div className="flex justify-end">
        <Button
          type="button"
          variant="primary"
          icon={<ChevronRight size={15} />}
          onClick={handleNext}
        >
          {nextTab.label}
        </Button>
      </div>
    );
  }

  // মাঝের ট্যাব
  return (
    <div className="flex justify-between">
      <Button
        type="button"
        variant="outline"
        icon={<ChevronLeft size={15} />}
        onClick={handlePrev}
      >
        {prevTab.label}
      </Button>
      <Button
        type="button"
        variant="primary"
        icon={<ChevronRight size={15} />}
        onClick={handleNext}
      >
        {nextTab.label}
      </Button>
    </div>
  );
};
