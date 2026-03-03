"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateSlug } from "@/utils/slug-generator";
import {
  CategoryFullInput,
  categoryFullSchema,
} from "@/validation/category-management";
import { zodResolver } from "@hookform/resolvers/zod";
import { Settings2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { HiOutlineDocument, HiOutlineFolder } from "react-icons/hi";
import { TabNavigation } from "../../components/tab-navigation";
import AttributeManagement from "../components/create-and-edit-file/attribute-management";
import BasicInfo from "../components/create-and-edit-file/basic-info";
import SeoSettings from "../components/create-and-edit-file/seo-settings";

// TabType ঠিক করুন - সব জায়গায় same নাম ব্যবহার করুন
type TabType = "basic-info" | "attribute-management" | "seo-settings";

const tabsTrigger = [
  {
    id: "basic-info",
    icon: HiOutlineFolder,
    label: "Basic Info",
    validationPath: "basicInfo",
  },
  {
    id: "attribute-management",
    icon: Settings2,
    label: "Attribute Management",
    validationPath: "attributeManagement",
  },
  {
    id: "seo-settings",
    icon: HiOutlineDocument,
    label: "SEO Settings",
    validationPath: "seoSettings",
  },
];

export default function CategoryCreateAndEditForm() {
  const [activeTab, setActiveTab] = useState<TabType>("basic-info");

const methods = useForm<CategoryFullInput>({
    resolver: zodResolver(categoryFullSchema),
    defaultValues: {
      basicInfo: {
        name: "",
        slug: "",
        description: "",
        parentId: "",
        image: "",
        status: "draft",
        sortOrder: 0,
      },
      attributeManagement: [
        {
          name: "",
          type: "TEXT",
          options: [], // 👈 array হতে হবে, string না
          overrideLabel: "",
          overrideHelpText: "",
          isFilterable: true,
          isVisible: true,
          defaultValue: "",
        },
      ],
      seoSettings: {
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
        canonicalUrl: "",
        robots: "index,follow",
        ogTitle: "",
        ogDescription: "",
        ogImage: "",
        structuredData: {},
        metaData: {},
      },
    },
    mode: "onChange",
  });

  const { errors, isValid } = methods.formState;
  const name = methods.watch("basicInfo.name");

  // Slug generate
  useEffect(() => {
    if (name) {
      const slug = generateSlug(name);
      methods.setValue("basicInfo.slug", slug, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [name, methods]);

  // 📌 ট্যাব চেঞ্জ হ্যান্ডলার - ভ্যালিডেশন সহ
  const handleTabChange = async (newTab: string) => {
    // current tab ভ্যালিডেট করুন
    let isValid = true;

    if (activeTab === "basic-info") {
      isValid = await methods.trigger("basicInfo");
    } else if (activeTab === "attribute-management") {
      isValid = await methods.trigger("attributeManagement");
    } else if (activeTab === "seo-settings") {
      isValid = await methods.trigger("seoSettings");
    }

    if (isValid) {
      setActiveTab(newTab as TabType);
    } else {
      toast.error(`Please fix errors in ${activeTab} first`);
    }
  };

  const onSubmit = (data: CategoryFullInput) => {
    console.log("✅ Final Data:", data);
    toast.success("Form submitted successfully!");
  };

  const onError = (errors: any) => {
    console.log("❌ Form validation errors:", errors);

    // প্রথম error যেখানে আছে সেই ট্যাবে যান
    if (errors.basicInfo) {
      setActiveTab("basic-info");
      toast.error("Please fix errors in Basic Info");
    } else if (errors.attributeManagement) {
      setActiveTab("attribute-management");
      toast.error("Please fix errors in Attribute Management");
    } else if (errors.seoSettings) {
      setActiveTab("seo-settings");
      toast.error("Please fix errors in SEO Settings");
    }
  };

  const getTabError = (tab: TabType) => {
    if (tab === "basic-info" && errors.basicInfo) return true;
    if (tab === "attribute-management" && errors.attributeManagement)
      return true;
    if (tab === "seo-settings" && errors.seoSettings) return true;
    return false;
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
        <Card>
          <CardContent className="p-6">
            <Tabs
              variant="underline"
              value={activeTab}
              onValueChange={handleTabChange} // 👈 কাস্টম হ্যান্ডলার ব্যবহার
            >
              <TabsList className="mb-6">
                {tabsTrigger.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    className={
                      getTabError(tab.id as TabType)
                        ? "border-destructive text-destructive"
                        : ""
                    }
                    icon={tab.icon}
                    value={tab.id}
                  >
                    {tab.label}
                    {getTabError(tab.id as TabType) && (
                      <span className="ml-2 text-destructive">⚠️</span>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="basic-info">
                <BasicInfo />
              </TabsContent>

              <TabsContent value="attribute-management">
                <AttributeManagement />
              </TabsContent>

              <TabsContent value="seo-settings">
                <SeoSettings />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <TabNavigation
              tabs={tabsTrigger}
              activeTab={activeTab}
              onTabChange={setActiveTab} // 👈 সরাসরি setActiveTab
            />
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}
