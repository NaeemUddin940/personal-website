// attribute-management.tsx
"use client";
import { DUMMY_ALL_ATTRIBUTES } from "@/@api-response/dummy-all-attributes";
import { SectionHeader } from "@/components/common/section-header";
import { Card } from "@/components/ui/card";
import {
  CategoryAttributeItemInput,
  CategoryFullInput,
} from "@/validation/category-management";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  HiOutlineCog,
  HiOutlineInformationCircle,
  HiOutlinePlus,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import { AttributeRow } from "./attribute-row";
import { AvailableAttributeList } from "./available-attribute";


export default function AttributeManagement() {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<CategoryFullInput>();

  // useFieldArray ব্যবহার করে attributes ম্যানেজ করা
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "attributeManagement.attributes", // এই পাথে ডেটা সংরক্ষণ হবে
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);

  const assignAttribute = useCallback(
    (availableAttr: AvailableAttr) => {
      append({
        id: `attr-${Date.now()}`,
        attributeId: availableAttr.id,
        name: availableAttr.name,
        type: availableAttr.type,
        isRequired: false,
        sortOrder: fields.length,
        options:
          availableAttr.type === "select"
            ? ["Option 1", "Option 2"]
            : undefined,
        isFilterable: true,
        isVisible: true,
      });
    },
    [append, fields.length],
  );

  const updateAttribute = useCallback(
    (id: string, updates: Partial<CategoryAttributeItemInput>) => {
      const index = fields.findIndex((field) => field.id === id);
      if (index !== -1) {
        update(index, { ...fields[index], ...updates });
      }
    },
    [fields, update],
  );

  const deleteAttribute = useCallback(
    (id: string) => {
      const index = fields.findIndex((field) => field.id === id);
      if (index !== -1 && fields.length > 1) {
        remove(index);
      }
    },
    [fields, remove],
  );

  const assignedIds = fields.map((attr) => attr.attributeId).filter(Boolean);
  const requiredCount = fields.filter((a) => a.isRequired).length;
  const optionalCount = fields.filter((a) => !a.isRequired).length;

  const filteredGlobalAttributes = DUMMY_ALL_ATTRIBUTES.filter(
    (attr) => attr.isGlobal,
  );

  // Stats Bar - শুধু দেখান যদি attributes থাকে
  const hasAttributes = fields.length > 0;

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
      {hasAttributes && (
        <Card className="p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-card-foreground">
                Attributes Overview
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {fields.length} attribute{fields.length !== 1 ? "s" : ""}{" "}
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
      )}

      {/* Available Attributes Section */}
      <AvailableAttributeList
        availableAttributes={filteredGlobalAttributes}
        onAssign={assignAttribute}
        assignedIds={assignedIds}
      />

      {/* Attributes List */}
      {hasAttributes && (
        <Card className="p-6">
          <SectionHeader
            title="Category Attributes"
            subtitle="Define the fields products in this category should have"
            icon={HiOutlineCog}
          />

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {fields.map((field, i) => (
                <AttributeRow
                  key={field.id}
                  field={field}
                  index={i}
                  onUpdate={updateAttribute}
                  onDelete={deleteAttribute}
                  totalCount={fields.length}
                />
              ))}
            </AnimatePresence>

            {/* Add New Custom Attribute Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => {
                append({
                  id: `attr-${Date.now()}`,
                  name: "",
                  type: "text",
                  isRequired: false,
                  sortOrder: fields.length,
                  isFilterable: true,
                  isVisible: true,
                });
              }}
              className="w-full py-4 border-2 border-dashed border-border rounded-xl text-sm font-semibold text-primary hover:border-primary cursor-pointer hover:text-primary hover:bg-primary/10 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <div className="p-1 rounded-md bg-muted shadow-lg group-hover:bg-primary transition-colors">
                <HiOutlinePlus className="w-4 h-4 group-hover:text-primary-foreground" />
              </div>
              Add New Custom Attribute
            </motion.button>
          </div>
        </Card>
      )}

      {/* Tip Box */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100"
      >
        <HiOutlineInformationCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-700 leading-relaxed">
          <strong className="text-amber-900">Tip:</strong> Attributes are
          optional. You can skip this section if your category doesn't need
          specific attributes.
          {!hasAttributes && (
            <span className="block mt-1 text-amber-600 font-medium">
              ✨ No attributes assigned yet. Assign from the list above or
              continue without attributes.
            </span>
          )}
        </div>
      </motion.div>

      {/* No Attributes Message */}
      {!hasAttributes && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 bg-muted/30 rounded-xl"
        >
          <p className="text-muted-foreground">
            No attributes assigned. You can continue without attributes.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
