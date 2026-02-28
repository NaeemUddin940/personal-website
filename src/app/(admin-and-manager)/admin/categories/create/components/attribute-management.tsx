"use client";
import { SectionHeader } from "@/components/common/section-header";
import { Card } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  HiOutlineCog,
  HiOutlineInformationCircle,
  HiOutlinePlus,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import { AttributeRow } from "./attribute-row";
import AvailableAttribute from "./available-attribute";

export default function AttributeManagement({ formData, setFormData }) {
  const [attributes, setAttributes] = useState<CategoryAttribute[]>([
    {
      id: "attr-1",
      name: "Material",
      type: "text",
      isRequired: true,
      sortOrder: 0,
    },
    {
      id: "attr-2",
      name: "Color",
      type: "select",
      isRequired: false,
      sortOrder: 1,
      options: ["Red", "Blue", "Green"],
    },
    {
      id: "attr-3",
      name: "Size",
      type: "text",
      isRequired: false,
      sortOrder: 2,
    },
  ]);


  const handleUpdateAttribute = useCallback(
    (id: string, updates: Partial<CategoryAttribute>) => {
      setAttributes((prev) =>
        prev.map((attr) => (attr.id === id ? { ...attr, ...updates } : attr)),
      );
    },
    [],
  );

  const handleDeleteAttribute = useCallback((id: string) => {
    setAttributes((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((attr) => attr.id !== id);
    });
  }, []);

  const handleAddAttribute = () => {
    const newAttr: CategoryAttribute = {
      id: `attr-${Date.now()}`,
      name: "",
      type: "text",
      isRequired: false,
      sortOrder: attributes.length,
    };
    setAttributes((prev) => [...prev, newAttr]);
  };

  const handleSave = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1800);
  };

  const requiredCount = attributes.filter((a) => a.isRequired).length;
  const optionalCount = attributes.filter((a) => !a.isRequired).length;


  return (
    <motion.div
      key="step3"
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 80, opacity: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="space-y-6"
    >
      {/* Stats Bar */}
      <Card className="p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-card-foreground">
              Attributes Overview
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              {attributes.length} attribute{attributes.length !== 1 ? "s" : ""}{" "}
              defined for this category
            </p>
          </div>
          <div className="flex items-center gap-3">
            <motion.div
              key={`req-${requiredCount}`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/20 rounded-lg"
            >
              <HiOutlineShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-bold text-primary">
                {requiredCount}
              </span>
              <span className="text-xs text-primary">Required</span>
            </motion.div>
            <motion.div
              key={`opt-${optionalCount}`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-lg"
            >
              <div className="w-3.5 h-3.5 rounded-full border-2 border-accent-foreground flex items-center justify-center">
                <span className="text-[8px] text-accent-foreground">○</span>
              </div>
              <span className="text-xs font-bold text-accent-foreground">
                {optionalCount}
              </span>
              <span className="text-xs text-accent-foreground">Optional</span>
            </motion.div>
          </div>
        </div>
      </Card>

      {/* Attributes List */}
      <AvailableAttribute attributes={attributes} />
      <Card className="p-6">
        <SectionHeader
          title="Category Attributes"
          subtitle="Define the fields products in this category should have"
          icon={HiOutlineCog}
        />

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {attributes.map((attr, i) => (
              <AttributeRow
                key={attr.id}
                attribute={attr}
                index={i}
                onUpdate={handleUpdateAttribute}
                onDelete={handleDeleteAttribute}
                totalCount={attributes.length}
              />
            ))}
          </AnimatePresence>

          {/* Add New Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleAddAttribute}
            className="w-full py-4 border-2 border-dashed border-border rounded-xl text-sm font-semibold text-primary hover:border-primary cursor-pointer hover:text-primary hover:bg-primary/10 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <div className="p-1 rounded-md bg-muted shadow-lg group-hover:bg-primary transition-colors">
              <HiOutlinePlus className="w-4 h-4 group-hover:text-primary-foreground" />
            </div>
            Add New Attribute
          </motion.button>
        </div>
      </Card>

      {/* Tip Box */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100"
      >
        <HiOutlineInformationCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-700 leading-relaxed">
          <strong className="text-amber-900">Tip:</strong> Toggle each attribute
          between <strong className="text-amber-900">Required</strong> and
          Optional. Required attributes must be filled in before a product can
          be published. You can reorder them using the sort order field.
        </div>
      </motion.div>
    </motion.div>
  );
}
