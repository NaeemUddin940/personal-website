"use client";
import DisplaySettings from "@/components/admin/attribute/create-component/tabs/attr-display-settings";
import AttrValidationAndOptions from "@/components/admin/attribute/create-component/tabs/attr-validation-and-options";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { attributeTabsTrigger } from "@/constant/admin/attribute-constants";
import { useEffect, useState } from "react"; // useEffect যোগ করা হয়েছে
import { useFormContext } from "react-hook-form";
import AttrBasicInfoTab from "../../../../components/admin/attribute/create-component/tabs/attr-basic-info-tab";
import { TabNavigation } from "../../../../components/admin/common/tab-navigation";

export default function AttributeCreateForm() {
  const [activeTab, setActiveTab] = useState<string>("basic-info");

  const {
    trigger,
    formState: { errors, submitCount }, // submitCount বের করে আনা হয়েছে
  } = useFormContext();

  // 🛠️ Updated: এরর চেক করার স্মার্ট ও ডিপ চেকিং লজিক
  const hasTabError = (fieldList: string[]) => {
    if (!fieldList) return false;

    return fieldList.some((field) => {
      // নেস্টেড ফিল্ড (যেমন: options.0.name) চেক করার নিরাপদ উপায়
      const fieldError = field
        .split(".")
        .reduce((obj, key) => obj?.[key], errors);

      if (!fieldError) return false;

      // যদি error একটি Object বা Array হয় (React hook form মাঝে মাঝে empty array/object রেখে দেয়)
      if (typeof fieldError === "object") {
        if (Array.isArray(fieldError)) {
          // Array এর ভেতরে কোনো বাস্তব error আছে কিনা চেক করা
          return fieldError.some((err) => err !== undefined && err !== null);
        }
        // অবজেক্টের ভেতরে কোনো প্রোপার্টি (মেসেজ) আছে কিনা চেক করা
        return Object.keys(fieldError).length > 0;
      }

      return !!fieldError;
    });
  };

  // 🚀 Bonus UX: ফর্ম সাবমিট করার সময় যদি অন্য কোনো ট্যাবে error থাকে,
  // তাহলে অটোমেটিক সেই ট্যাবে সুইচ করবে।
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      // যে ট্যাবে প্রথম এরর পাওয়া যাবে, সেটা খুঁজে বের করা
      const firstErrorTab = attributeTabsTrigger.find((tab) =>
        hasTabError(tab.fields as string[]),
      );

      if (firstErrorTab && firstErrorTab.id !== activeTab) {
        setActiveTab(firstErrorTab.id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitCount, errors]);

  const handleTabChange = async (newTab: string) => {
    const currentIndex = attributeTabsTrigger.findIndex(
      (t) => t.id === activeTab,
    );
    const targetIndex = attributeTabsTrigger.findIndex((t) => t.id === newTab);

    // শুধু সামনে যাওয়ার সময় ভ্যালিডেশন হবে
    if (targetIndex > currentIndex) {
      const currentTab = attributeTabsTrigger[currentIndex];
      const isValid = await trigger(currentTab.fields as any);
      if (!isValid) return;
    }
    setActiveTab(newTab);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <Tabs
          variant="underline"
          value={activeTab}
          onValueChange={handleTabChange}
        >
          <TabsList className="mb-6">
            {attributeTabsTrigger.map((tab) => {
              const isError = hasTabError(tab.fields as string[]);
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={
                    isError ? "text-destructive border-destructive" : ""
                  }
                >
                  {tab.label}
                  {isError && (
                    <span className="ml-2 animate-in zoom-in duration-300">
                      ⚠️
                    </span>
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value="basic-info">
            <AttrBasicInfoTab />
          </TabsContent>
          <TabsContent value="display-settings">
            <DisplaySettings />
          </TabsContent>
          <TabsContent value="validations">
            <AttrValidationAndOptions />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <TabNavigation
          tabs={attributeTabsTrigger}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </CardFooter>
    </Card>
  );
}
