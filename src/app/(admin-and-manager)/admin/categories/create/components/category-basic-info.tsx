"use client";
import InputField from "@/components/common/input-field";
import { SectionHeader } from "@/components/common/section-header";
import { UniversalImageUploader } from "@/components/common/universal-image-uploader";
import { Card } from "@/components/ui/card";
import { Option, Select } from "@/components/ui/select";
import { CategoryFullInput } from "@/validation/category-management";
import { motion } from "framer-motion";
import { Controller, useFormContext } from "react-hook-form";
import { HiOutlineFolder } from "react-icons/hi";

export default function CategoryBasicInfo() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CategoryFullInput>();

  return (
    <div>
      <motion.div
        key="step1"
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 80, opacity: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="space-y-6"
      >
        <Card className="p-6">
          <SectionHeader
            title="Basic Information"
            subtitle="Core details for your category"
            icon={HiOutlineFolder}
          />
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-5">
              <InputField
                label="Category Name"
                required
                {...register("basicInfo.name")} // Changed: added basicInfo.
                error={errors?.basicInfo?.name} // Changed: updated error path
                placeholder="e.g. Summer Collection"
              />
              <InputField
                label="URL Slug"
                required
                disabled
                {...register("basicInfo.slug")} // Changed: added basicInfo.
                error={errors?.basicInfo?.slug} // Changed: updated error path
                placeholder="summer-collection"
              />
            </div>

            <div className="flex items-center justify-between gap-5">
              <InputField
                type="textarea"
                label="Description"
                rows={9}
                {...register("basicInfo.description")} // Changed: added basicInfo.
                error={errors?.basicInfo?.description} // Changed: updated error path
                placeholder="Briefly describe what this category contains..."
              />

              <Controller
                name="basicInfo.image" // Changed: added basicInfo. and using Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <UniversalImageUploader
                    label="Category Image"
                    maxFile={1}
                    variant="medium"
                    value={value}
                    errors={errors?.basicInfo?.image}
                    onImageUpload={(imageUrl) => onChange(imageUrl)} // Assuming this prop exists
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Parent Category Select */}
              <div className="flex flex-col gap-1.5">
                <Controller
                  name="basicInfo.parentId" // Changed: added basicInfo.
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label="Parent Category"
                      errors={errors?.basicInfo?.parentId}
                      onChange={(selectedValue) => onChange(selectedValue)}
                      value={value}
                    >
                      {[
                        { id: "1", name: "Electronics" },
                        { id: "2", name: "Fashion" },
                        { id: "3", name: "Home & Garden" },
                      ].map((cat: any) => (
                        <Option key={cat.id} value={cat.id}>
                          {cat.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                />
              </div>

              <InputField
                label="Sort Order"
                type="number"
                {...register("basicInfo.sortOrder", { valueAsNumber: true })} // Changed: added basicInfo.
                error={errors?.basicInfo?.sortOrder}
                placeholder="0"
                min={0}
              />

              {/* Status Select */}
              <div className="flex flex-col gap-1.5">
                <Controller
                  name="basicInfo.status" // Changed: added basicInfo.
                  control={control}
                  defaultValue="draft"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label="Status"
                      onChange={(selectedValue) => onChange(selectedValue)}
                      value={value}
                    >
                      <Option value="active">Active</Option>
                      <Option value="inactive">Inactive</Option>
                      <Option value="draft">Draft</Option>
                      <Option value="archive">Archive</Option>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
