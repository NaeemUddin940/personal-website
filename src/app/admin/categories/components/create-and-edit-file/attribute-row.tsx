"use client";
import { DeleteButton } from "@/components/common/advanced-button";
import InputField from "@/components/common/input-field";
import { Checkbox } from "@/components/ui/checkbox";
import { Option, Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CategoryFullInput } from "@/validation/category-management";
import { AnimatePresence, motion } from "framer-motion";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { HiOutlineDotsVertical, HiOutlineTag } from "react-icons/hi";
import { RequiredToggle } from "./required-toggle";

interface AttributeRowProps {
  field: CategoryAttributeItemInput & { id: string };
  index: number;
  onDelete: (id: string) => void; // onUpdate removed
  totalCount: number;
}

export const AttributeRow = ({
  field,
  index,
  onDelete,
  totalCount,
}: AttributeRowProps) => {
  const { register, control, setValue } = useFormContext<CategoryFullInput>();

  // 👇 Watch the current isRequired value from RHF
  const isRequired = useWatch({
    control,
    name: `attributeManagement.${index}.isRequired`,
    defaultValue: field.isRequired ?? false,
  });

  const attributeType = useWatch({
    control,
    name: `attributeManagement.${index}.type`,
    defaultValue: field.type || "text",
  });

  const handleRequiredToggle = () => {
    // Just toggle via RHF – no need for onUpdate
    setValue(
      `attributeManagement.${index}.isRequired`,
      !isRequired,
      { shouldDirty: true, shouldValidate: true },
    );
  };

  const optionsString = field?.options?.join(", ") || "";

  return (
    <motion.div
      layout="position"
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
          // 👇 use watched isRequired instead of field.isRequired
          isRequired
            ? "border-primary/40 bg-primary/5"
            : "border-border hover:border-ring/40",
        )}
      >
        {/* Left indicator bar */}
        <motion.div
          initial={false}
          animate={{
            scaleY: isRequired ? 1 : 0,
            opacity: isRequired ? 1 : 0,
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
                  isRequired
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground",
                )}
              >
                <HiOutlineTag className="w-3 h-3" />
                {index + 1}
              </div>

              {isRequired && (
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

            <DeleteButton
              onClick={() => onDelete(field.id)}
              disabled={totalCount < 1}
              type="button"
            />
          </div>

          {/* Main Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <InputField
              label="Attribute Name"
              {...register(`attributeManagement.${index}.name`)}
              defaultValue={field?.name}
              placeholder="e.g. Size, Color, Material"
            />

            <Controller
              control={control}
              name={`attributeManagement.${index}.defaultValue`}
              defaultValue={field?.values || "text"}
              render={({ field: { onChange, value } }) => (
                <Select label="Default Value" value={value} onChange={onChange}>
                  <Option value="text">Text</Option>
                  <Option value="number">Number</Option>
                  <Option value="select">Dropdown Select</Option>
                  <Option value="boolean">Yes/No</Option>
                  <Option value="date">Date</Option>
                </Select>
              )}
            />
          </div>

          {/* Select Options */}
          <AnimatePresence mode="wait">
            {attributeType === "select" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mb-4 space-y-1.5 overflow-hidden"
              >
                <InputField
                  label="Options (comma separated)"
                  {...register(`attributeManagement.${index}.options`, {
                    setValueAs: (value) => {
                      if (typeof value === "string") {
                        return value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean);
                      }
                      return value;
                    },
                  })}
                  defaultValue={optionsString}
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
                {...register(`attributeManagement.${index}.overrideLabel`)}
                defaultValue={field?.overrideLabel || ""}
                placeholder="Custom label for this category"
              />

              <InputField
                label="Help Text (Optional)"
                {...register(`attributeManagement.${index}.overrideHelpText`)}
                defaultValue={field?.overrideHelpText || ""}
                placeholder="Help text shown to users"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Controller
                  control={control}
                  name={`attributeManagement.${index}.isFilterable`}
                  defaultValue={field?.isFilterable ?? true}
                  render={({ field: { onChange, value } }) => (
                    <Checkbox
                      label="Is Filterable"
                      checked={value}
                      onChange={onChange}
                    />
                  )}
                />
              </div>

              <div className="flex items-center gap-2">
                <Controller
                  control={control}
                  name={`attributeManagement.${index}.isVisible`}
                  defaultValue={field?.isVisible ?? true}
                  render={({ field: { onChange, value } }) => (
                    <Checkbox
                      label="Is Visible"
                      checked={value}
                      onChange={onChange}
                    />
                  )}
                />
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground leading-relaxed max-w-md">
              {isRequired
                ? "Products in this category must include this attribute before publishing."
                : "This attribute is optional — products can be published without it."}
            </p>

            <RequiredToggle
              isRequired={isRequired} // 👈 use watched value
              onToggle={handleRequiredToggle}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
