"use client";
import Input from "@/components/common/input";
import InputField from "@/components/common/input-field";
import { Checkbox } from "@/components/ui/checkbox";
import { Option, Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  CategoryAttributeItemInput,
  CategoryFullInput,
} from "@/validation/category-management";
import { AnimatePresence, motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import {
  HiOutlineDotsVertical,
  HiOutlineTag,
  HiOutlineTrash,
} from "react-icons/hi";
import { RequiredToggle } from "./required-toggle";

interface AttributeRowProps {
  field: CategoryAttributeItemInput & { id: string }; // useFieldArray থেকে আসা ফিল্ড
  index: number;
  onUpdate: (id: string, updates: Partial<CategoryAttributeItemInput>) => void;
  onDelete: (id: string) => void;
  totalCount: number;
}

export const AttributeRow = ({
  field,
  index,
  onUpdate,
  onDelete,
  totalCount,
}: AttributeRowProps) => {
  const { register, watch, setValue } = useFormContext<CategoryFullInput>();

  // সঠিক পাথ ব্যবহার করে ফিল্ড ভ্যালু ওয়াচ করা
  const attributeType = watch(`attributeManagement.attributes.${index}.type`);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.2 } }}
      transition={{
        duration: 0.35,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      <div
        className={cn(
          "relative rounded-xl border transition-all duration-300 overflow-hidden bg-card",
          field?.isRequired
            ? "border-primary/40 bg-primary/5"
            : "border-border hover:border-ring/40",
        )}
      >
        {/* Left indicator bar */}
        <motion.div
          initial={false}
          animate={{
            scaleY: field?.isRequired ? 1 : 0,
            opacity: field?.isRequired ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-xl origin-center"
        />

        <div className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="text-muted-foreground cursor-grab active:cursor-grabbing hover:text-foreground transition-colors">
                <HiOutlineDotsVertical className="w-4 h-4" />
              </div>

              <div
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold",
                  field?.isRequired
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground",
                )}
              >
                <HiOutlineTag className="w-3 h-3" />
                {index + 1}
              </div>

              {field?.isRequired && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Must fill
                </motion.span>
              )}
            </div>

            <button
              onClick={() => onDelete(field?.id)}
              disabled={totalCount <= 1}
              className={cn(
                "p-2 rounded-lg transition-all duration-200",
                totalCount <= 1
                  ? "opacity-30 cursor-not-allowed text-muted-foreground"
                  : "text-muted-foreground hover:text-destructive hover:bg-destructive/10 active:scale-95",
              )}
            >
              <HiOutlineTrash className="w-4 h-4" />
            </button>
          </div>

          {/* Main Inputs - সঠিক পাথ সহ register */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <InputField
              label="Attribute Name"
              {...register(`attributeManagement.attributes.${index}.name`, {
                onChange: (e) => onUpdate(field?.id, { name: e.target.value }),
              })}
              defaultValue={field?.name}
              placeholder="e.g. Size, Color, Material"
            />

            <Select
              label="Attribute Type"
              {...register(`attributeManagement.attributes.${index}.type`, {
                onChange: (value) => {
                  const newType = value
                    .value as CategoryAttributeItemInput["type"];
                  onUpdate(field?.id, { type: newType });
                  // টাইপ পরিবর্তন হলে অপশন রিসেট করা
                  if (newType !== "select") {
                    setValue(
                      `attributeManagement.attributes.${index}.options`,
                      undefined,
                    );
                  }
                },
              })}
              defaultValue={field?.type}
            >
              <Option value="text">Text</Option>
              <Option value="number">Number</Option>
              <Option value="select">Dropdown Select</Option>
              <Option value="boolean">Yes/No</Option>
              <Option value="date">Date</Option>
            </Select>
          </div>

          {/* Select Options */}
          <AnimatePresence>
            {attributeType === "select" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 space-y-1.5 overflow-hidden"
              >
                <InputField
                  label="Options (comma separated)"
                  {...register(
                    `attributeManagement.attributes.${index}.options`,
                    {
                      onChange: (e) => {
                        const optionsArray = e.target.value
                          .split(",")
                          .map((s: string) => s.trim())
                          .filter(Boolean);
                        onUpdate(field?.id, { options: optionsArray });
                      },
                    },
                  )}
                  defaultValue={field?.options?.join(", ") || ""}
                  placeholder="Red, Blue, Green, Yellow"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Advanced Options */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3 pt-4 border-t border-border"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Override Label (Optional)"
                {...register(
                  `attributeManagement.attributes.${index}.overrideLabel`,
                  {
                    onChange: (e) =>
                      onUpdate(field?.id, { overrideLabel: e.target.value }),
                  },
                )}
                defaultValue={field?.overrideLabel || ""}
                placeholder="Custom label for this category"
              />

              <InputField
                label="Help Text (Optional)"
                {...register(
                  `attributeManagement.attributes.${index}.overrideHelpText`,
                  {
                    onChange: (e) =>
                      onUpdate(field?.id, { overrideHelpText: e.target.value }),
                  },
                )}
                defaultValue={field?.overrideHelpText || ""}
                placeholder="Help text shown to users"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  label="Is Filterable"
                  {...register(
                    `attributeManagement.attributes.${index}.isFilterable`,
                    {
                      onChange: (e) =>
                        onUpdate(field?.id, { isFilterable: e.target.checked }),
                    },
                  )}
                  defaultChecked={field?.isFilterable ?? true}
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  label="Is Visible"
                  activeColor="#624dfe"
                  {...register(
                    `attributeManagement.attributes.${index}.isVisible`,
                    {
                      onChange: (e) =>
                        onUpdate(field?.id, { isVisible: e.target.checked }),
                    },
                  )}
                  defaultChecked={field?.isVisible ?? true}
                />
              </div>

              {attributeType !== "select" && (
                <Input
                  label="Default Value"
                  {...register(
                    `attributeManagement.attributes.${index}.defaultValue`,
                    {
                      onChange: (e) => {
                        let value: string | number | boolean = e.target.value;
                        if (attributeType === "number") {
                          value = parseFloat(e.target.value) || 0;
                        } else if (attributeType === "boolean") {
                          value = e.target.value === "true";
                        }
                        onUpdate(field?.id, { defaultValue: value });
                      },
                    },
                  )}
                  defaultValue={field?.defaultValue?.toString() || ""}
                  placeholder="Default value"
                  type={attributeType === "number" ? "number" : "text"}
                />
              )}
            </div>
          </motion.div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground leading-relaxed max-w-md">
              {field?.isRequired
                ? "Products in this category must include this attribute before publishing."
                : "This attribute is optional — products can be published without it."}
            </p>

            <RequiredToggle
              isRequired={field?.isRequired ?? false}
              onToggle={() => onUpdate(field?.id, { isRequired: newValue })}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
