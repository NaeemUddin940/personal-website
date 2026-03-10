"use client";
import { Eye, EyeOff, Plus } from "lucide-react";
import { useState } from "react";
import PageHeader from "../../../../components/admin/common/page-header";
import CategoryMainSection from "./category-main-section";

export default function CreateCategoryPage() {
  const [showPreview, setShowPreview] = useState<boolean | null>(true);
  return (
    <div className="p-5">
      <main>
        {/* Category Page Reusable Header */}
        <PageHeader
          title="Create Category"
          description="Fill in the details below to add a category"
          actions={[
            {
              label: showPreview ? "Hide Preview" : "Show Preview",
              icon: showPreview ? EyeOff : Eye,
              variant: "outline",
              onClick: () => setShowPreview(!showPreview),
            },

            {
              label: "Create Category",
              icon: Plus,
              variant: "glow",
              onClick: () => alert("Created"),
            },
          ]}
        />
        <CategoryMainSection
          showPreview={showPreview}
          setShowPreview={setShowPreview}
        />
      </main>
    </div>
  );
}
