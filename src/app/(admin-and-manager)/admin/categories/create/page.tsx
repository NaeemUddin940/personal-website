"use client";
import { CategoryForm } from "@/@types/category-form.";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Settings2 } from "lucide-react";
import { useState } from "react";
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

const AVAILABLE_ATTRIBUTES: AvailableAttribute[] = [
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

export default function CategoryCreatePage() {
  

  const [formData, setFormData] = useState<CategoryForm>({
    name: "",
    slug: "",
    description: "",
    parentId: "",
    image: "",
    status: "draft",
    sortOrder: 0,
    seo: {
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      canonicalUrl: "",
      robots: "index,follow",
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
    },
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData({ ...formData, name, slug: generateSlug(name) });
  };

  const parentCategories = [
    { id: "1", name: "Electronics" },
    { id: "2", name: "Fashion" },
    { id: "3", name: "Home & Garden" },
  ];
  return (
    <main className="w-full">
      <CategoryHeader />
      <Card className="max-w-7xl mt-5 w-full mx-auto flex flex-col items-center justify-center">
        <Tabs
          defaultValue="basic-info"
          orientation="horizontal"
          variant="progress"
          className="w-full px-3"
        >
          <TabsList className="flex bg-secondary py-2 rounded-xl items-center w-full">
            <TabsTrigger icon={HiOutlineFolder} value="basic-info">
              Basic Info
            </TabsTrigger>
            <TabsTrigger icon={Settings2} value="manage-attribute">
              Manage Attribute
            </TabsTrigger>
            <TabsTrigger icon={HiOutlinePhotograph} value="seo-settings">
              SEO Settings
            </TabsTrigger>
          </TabsList>

          <section className="grid grid-cols-1 lg:grid-cols-7 gap-5 mb-5 w-full">
            <div className="col-span-5">
              <TabsContent value="basic-info">
                <CategoryBasicInfo
                  formData={formData}
                  setFormData={setFormData}
                  handleNameChange={handleNameChange}
                  parentCategories={parentCategories}
                />
              </TabsContent>
              <TabsContent value="manage-attribute">
                <AttributeManagement
                  formData={formData}
                  setFormData={setFormData}
                />
              </TabsContent>
              <TabsContent value="seo-settings">
                <SeoSettings formData={formData} setFormData={setFormData} />
              </TabsContent>
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="grid grid-cols-2 gap-5"
              >
                <SocialCardPreview formData={formData} />
                <QuickTips />
              </motion.div>
            </div>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="col-span-2 mt-5 space-y-3"
            >
              <CategoryCardPreview formData={formData} />

              <GoogleSerpPreview formData={formData} />

              <AttributesPreview attributes={AVAILABLE_ATTRIBUTES} />
            </motion.div>
          </section>
        </Tabs>
      </Card>
    </main>
  );
}
