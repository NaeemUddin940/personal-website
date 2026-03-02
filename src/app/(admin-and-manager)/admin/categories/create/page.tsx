"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateSlug } from "@/utils/slug-generator";
import {
  CategoryFullInput,
  categoryFullSchema,
} from "@/validation/category-management";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Settings2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiOutlineFolder, HiOutlinePhotograph } from "react-icons/hi";
import CategoryHeader from "./category-header";
import AttributeManagement from "./components/attribute-management";
import CategoryBasicInfo from "./components/category-basic-info";
import AttributesPreview from "./components/previews/attributes-preview";
import CategoryCardPreview from "./components/previews/category-card-preview";
import GoogleSerpPreview from "./components/previews/google-serp-preview";
import QuickTips from "./components/previews/quick-tips";
import SocialCardPreview from "./components/previews/social-card-preview";
import SeoSettings from "./components/seo-settings";

const AVAILABLE_ATTRIBUTES = [
  {
    id: "brand",
    name: "Brand",
    type: "text",
    description: "Product brand name",
  },
  {
    id: "color",
    name: "Color",
    type: "select",
    options: ["Red", "Blue", "Green", "Black", "White"],
    description: "Product color",
  },
  {
    id: "size",
    name: "Size",
    type: "select",
    options: ["XS", "S", "M", "L", "XL", "XXL"],
    description: "Product size",
  },
  {
    id: "weight",
    name: "Weight",
    type: "number",
    description: "Product weight in kg",
  },
  {
    id: "material",
    name: "Material",
    type: "text",
    description: "Product material composition",
  },
  {
    id: "warranty",
    name: "Warranty",
    type: "select",
    options: ["No Warranty", "6 Months", "1 Year", "2 Years", "Lifetime"],
    description: "Warranty period",
  },
  {
    id: "country",
    name: "Country of Origin",
    type: "text",
    description: "Manufacturing country",
  },
  {
    id: "rating",
    name: "Rating",
    type: "number",
    description: "Product rating (1-5)",
  },
  {
    id: "inStock",
    name: "In Stock",
    type: "boolean",
    description: "Availability status",
  },
  { id: "sku", name: "SKU", type: "text", description: "Stock keeping unit" },
];

type TabType = "basic-info" | "seo-settings" | "manage-attribute";

export default function CategoryCreatePage() {
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
      attributeManagement: {
        name: "",
        type: "TEXT",
        options: "",
        overrideLabel: "",
        overrideHelpText: "",
        isFilterable: true,
        isVisible: true,
        defaultValue: "",
      },
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

  const watchedValues = methods.watch();
  const { errors, isValid } = methods.formState;

  const name = methods.watch("basicInfo.name");
  useEffect(() => {
    if (name) {
      const slug = generateSlug(name);
      methods.setValue("basicInfo.slug", slug, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [name, methods]);

  const handleTabChange = async (tab: TabType) => {
    // বর্তমান ট্যাব ভালিডেট করুন
    if (activeTab === "basic-info") {
      const isValid = await methods.trigger("basicInfo");
      if (!isValid) {
        console.log("Basic Info তে এরর আছে");
        toast.error("Error On Basic Info Tab");
        return;
      }
    }
    if (activeTab === "manage-attribute") {
      const isValid = await methods.trigger("manage-attribute");
      if (!isValid) {
        console.log("Manage Attribute তে এরর আছে");
        return;
      }
    }

    // নতুন ট্যাবে যান
    setActiveTab(tab);
  };

  const onSubmit = (data: CategoryFullInput) => {
    console.log("✅ Form submitted successfully with data:", data);
    // এখানে API কল করুন
  };

  const onError = (errors: any) => {
    console.log("❌ Form validation errors:", errors);

    // কোন ট্যাবে এরর আছে তা দেখান
    if (errors.basicInfo) {
      setActiveTab("basic-info");
    } else if (errors.seoSettings) {
      setActiveTab("seo-settings");
    }
  };

  const getTabError = (tab: TabType) => {
    if (tab === "basic-info" && errors.basicInfo) return true;
    if (tab === "seo-settings" && errors.seoSettings) return true;
    return false;
  };

  return (
    <FormProvider {...methods}>
      <form
        id="category-form"
        onSubmit={methods.handleSubmit(onSubmit, onError)}
        className="space-y-4"
      >
        <main className="w-full">
          <CategoryHeader />

          <Card className="max-w-7xl mt-5 w-full mx-auto flex flex-col items-center justify-center">
            <Tabs
              value={activeTab}
              onValueChange={(value) => handleTabChange(value as TabType)}
              className="w-full px-3"
            >
              <TabsList className="flex bg-secondary py-2 rounded-xl items-center w-full">
                <TabsTrigger
                  icon={HiOutlineFolder}
                  value="basic-info"
                  className={
                    getTabError("basic-info")
                      ? "border-destructive text-destructive"
                      : ""
                  }
                >
                  Basic Info
                  {getTabError("basic-info") && (
                    <span className="ml-2 text-destructive">⚠️</span>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  icon={Settings2}
                  value="manage-attribute"
                  className={
                    getTabError("manage-attribute")
                      ? "border-destructive text-destructive"
                      : ""
                  }
                >
                  Manage Attribute
                  {getTabError("manage-attribute") && (
                    <span className="ml-2 text-destructive">⚠️</span>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  icon={HiOutlinePhotograph}
                  value="seo-settings"
                  className={
                    getTabError("seo-settings")
                      ? "border-destructive text-destructive"
                      : ""
                  }
                >
                  SEO Settings
                  {getTabError("seo-settings") && (
                    <span className="ml-2 text-destructive">⚠️</span>
                  )}
                </TabsTrigger>
              </TabsList>

              <section className="grid grid-cols-1 lg:grid-cols-7 gap-5 mb-5 w-full">
                <div className="col-span-5">
                  <TabsContent value="basic-info">
                    <CategoryBasicInfo />

                    {/* নেভিগেশন বাটন */}
                    <div className="flex justify-end mt-6">
                      <Button
                        type="button"
                        onClick={() => handleTabChange("manage-attribute")}
                        className="bg-primary text-white"
                      >
                        Next: Manage Attribute →
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="manage-attribute">
                    <AttributeManagement />
                  </TabsContent>

                  <TabsContent value="seo-settings">
                    <SeoSettings />

                    {/* নেভিগেশন বাটন */}
                    <div className="flex justify-between mt-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleTabChange("manage-attribute")}
                      >
                        ← Previous: Manage Attribute
                      </Button>

                      <Button
                        type="submit"
                        className="bg-primary text-white"
                        disabled={!isValid}
                      >
                        Submit Category
                      </Button>
                    </div>
                  </TabsContent>
                </div>

                {/* Preview Section */}
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="col-span-2 mt-5 space-y-3"
                >
                  <CategoryCardPreview preview={watchedValues} />
                  {/* Social Preview শুধু SEO ট্যাবে দেখান */}
                  {activeTab === "seo-settings" && (
                    <SocialCardPreview preview={watchedValues} />
                  )}
                  <GoogleSerpPreview preview={watchedValues} />
                  <AttributesPreview attributes={AVAILABLE_ATTRIBUTES} />

                  <QuickTips />
                </motion.div>
              </section>
            </Tabs>
          </Card>
        </main>
      </form>
    </FormProvider>
  );
}
