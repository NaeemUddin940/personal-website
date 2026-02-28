"use client";
import Input from "@/components/common/input";
import { SectionHeader } from "@/components/common/section-header";
import { UniversalImageUploader } from "@/components/common/universal-image-uploader";
import { Card, CardHeader } from "@/components/ui/card";
import { Option, Select } from "@/components/ui/select";
import { motion } from "framer-motion";
import { HiOutlineFolder } from "react-icons/hi";

export default function CategoryBasicInfo({
  formData,
  setFormData,
  handleNameChange,
  parentCategories,
}) {
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
              <Input
                label="Category Name"
                required
                name="name"
                value={formData.name}
                onChange={handleNameChange}
                placeholder="e.g. Summer Collection"
              />
              <Input
                label="URL Slug"
                required
                name="slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                placeholder="summer-collection"
              />
            </div>
            <div className="flex items-center justify-between gap-5">
              <Input
                type="textarea"
                label="Description"
                name="description"
                rows={9}
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                placeholder="Briefly describe what this category contains..."
              />
              <UniversalImageUploader
                label="Category Image"
                maxFile={1}
                variant="medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Parent Category"
                name="parentId"
                value={formData.parentId}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    parentId: value,
                  })
                }
              >
                <Option value="">None (Top Level)</Option>
                {parentCategories.map((cat) => (
                  <Option key={cat.id} value={cat.id}>
                    {cat.name}
                  </Option>
                ))}
              </Select>

              <Input
                type="number"
                label="Sort Order"
                name="sortOrder"
                value={formData.sortOrder}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sortOrder: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="0"
                min={0}
              />
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
