"use client";
import Input from "@/components/common/input";
import InputField from "@/components/common/input-field";
import { SectionHeader } from "@/components/common/section-header";
import { Card } from "@/components/ui/card";
import { Option, Select } from "@/components/ui/select";
import { CategoryFullInput } from "@/validation/category-management";
import { motion } from "framer-motion";
import { Controller, useFormContext } from "react-hook-form";
import { HiOutlineDocumentText } from "react-icons/hi";

export default function SeoSettings() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CategoryFullInput>();

  return (
    <motion.div
      key="step2"
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 80, opacity: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      <Card className="p-6">
        <SectionHeader
          title="Search Engine Optimization"
          subtitle="Control how this category appears in search results"
          icon={HiOutlineDocumentText}
        />
        <div className="grid grid-cols-2 gap-5">
          <div>
            <h4 className="text-sm font-semibold text-card-foreground mb-4">
              SEO Basic and Important Details
            </h4>
            <InputField
              label="Meta Title"
              {...register("seoSettings.metaTitle")}
              error={errors?.seoSettings?.metaTitle}
              placeholder="SEO-optimized title"
            />

            <InputField
              label="Meta Description"
              {...register("seoSettings.metaDescription")}
              error={errors?.seoSettings?.metaDescription}
              placeholder="Concise description for search engines (max 160 chars)"
            />

            <InputField
              label="Meta Keywords"
              {...register("seoSettings.metaKeywords")}
              error={errors?.seoSettings?.metaKeywords}
              placeholder="keyword1, keyword2, keyword3"
            />

            <InputField
              label="Canonical URL"
              {...register("seoSettings.canonicalUrl")}
              error={errors?.seoSettings?.canonicalUrl}
              placeholder="https://example.com/canonical-url"
            />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-card-foreground mb-4">
              Open Graph (Social Sharing)
            </h4>
            <InputField
              label="OG Title"
              {...register("seoSettings.ogTitle")}
              error={errors?.seoSettings?.ogTitle}
              placeholder="Title for social media shares"
            />
            <InputField
              label="OG Description"
              {...register("seoSettings.ogDescription")}
              error={errors?.seoSettings?.ogDescription}
              placeholder="Description for social media shares"
            />
            <InputField
              label="OG Image URL"
              {...register("seoSettings.ogImage")}
              error={errors?.seoSettings?.ogImage}
              placeholder="https://example.com/og-image.jpg"
            />
            <Controller
              name="seoSettings.robots"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  label="Robots Directive"
                  value={value}
                  onChange={(selectedValue) => onChange(selectedValue)}
                >
                  <Option value="index,follow">index, follow</Option>
                  <Option value="noindex,follow">noindex, follow</Option>
                  <Option value="index,nofollow">index, nofollow</Option>
                  <Option value="noindex,nofollow">noindex, nofollow</Option>
                </Select>
              )}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
