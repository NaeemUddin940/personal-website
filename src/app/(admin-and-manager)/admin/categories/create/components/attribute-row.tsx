"use client";
import Input from "@/components/common/input";
import { Option, Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  HiOutlineDotsVertical,
  HiOutlineTag,
  HiOutlineTrash,
} from "react-icons/hi";
import { RequiredToggle } from "./required-toggle";

export const AttributeRow = ({
  attribute,
  index,
  onUpdate,
  onDelete,
  totalCount,
}: {
  attribute: CategoryAttribute;
  index: number;
  onUpdate: (id: string, updates: Partial<CategoryAttribute>) => void;
  onDelete: (id: string) => void;
  totalCount: number;
}) => {
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
          attribute.isRequired
            ? "border-primary/40 bg-primary/5"
            : "border-border hover:border-ring/40",
        )}
      >
        {/* Left indicator bar */}
        <motion.div
          initial={false}
          animate={{
            scaleY: attribute.isRequired ? 1 : 0,
            opacity: attribute.isRequired ? 1 : 0,
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
                  attribute.isRequired
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground",
                )}
              >
                <HiOutlineTag className="w-3 h-3" />
                {index + 1}
              </div>

              {attribute.isRequired && (
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
              onClick={() => onDelete(attribute.id)}
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

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Attribute Name"
              name="name"
              value={attribute.name}
              onChange={(e) => onUpdate(attribute.id, { name: e.target.value })}
              placeholder="e.g. Size, Color, Material"
            />

            <Select
              label="Attribute Type"
              name="type"
              value={attribute.type}
              onChange={(value) =>
                onUpdate(attribute.id, {
                  type: value as CategoryAttribute["type"],
                })
              }
            >
              <Option value="text">Text</Option>
              <Option value="number">Number</Option>
              <Option value="select">Dropdown Select</Option>
              <Option value="boolean">Yes/No</Option>
              <Option value="date">Date</Option>
            </Select>
          </div>

          {/* Select Options */}
          {attribute.type === "select" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-4 space-y-1.5"
            >
              <Input
                label="Options (comma separated)"
                name="options"
                value={attribute.options?.join(", ") || ""}
                onChange={(e) =>
                  onUpdate(attribute.id, {
                    options: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
                placeholder="Red, Blue, Green, Yellow"
              />
            </motion.div>
          )}

          {/* Footer */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground leading-relaxed max-w-md">
              {attribute.isRequired
                ? "Products in this category must include this attribute before publishing."
                : "This attribute is optional — products can be published without it."}
            </p>

            <RequiredToggle
              isRequired={attribute.isRequired}
              onToggle={() =>
                onUpdate(attribute.id, { isRequired: !attribute.isRequired })
              }
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
