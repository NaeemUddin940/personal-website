"use client";
import { FullAttributeInput } from "@/validation/attribute-validation";
import { Check, Eye, X } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

const StatusBadge = ({
  condition,
  trueLabel = "Yes",
  falseLabel = "No",
}: {
  condition?: boolean;
  trueLabel?: string;
  falseLabel?: string;
}) => {
  if (condition) {
    return (
      <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
        <Check size={14} /> {trueLabel}
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-muted-foreground">
      <X size={14} /> {falseLabel}
    </span>
  );
};

export default function AttrPreview() {
  const { control } = useFormContext<FullAttributeInput>();

  const formData = useWatch({
    control,
  });

  return (
    <div className="bg-card border border-border rounded-xl shadow-lg p-4 animate-in fade-in slide-in-from-right-4 duration-500">
      <h3 className="font-medium mb-4 flex items-center gap-2 text-primary border-b border-border pb-2">
        <Eye size={18} /> Live Preview
      </h3>

      <div className="space-y-4">
        {/* Basic Info Section */}
        <div className="p-3 bg-muted/50 border border-border rounded-lg">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-1">
            Basic Information
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Name:</span>{" "}
            <span className="font-semibold text-foreground">
              {formData?.name || "Not set"}
            </span>
          </div>
          <div className="text-sm mt-1">
            <span className="text-muted-foreground">Slug:</span>{" "}
            <span className="font-mono text-primary">
              {formData?.slug || "auto-generated"}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
              <span className="text-xs text-muted-foreground">Type:</span>
              <div className="font-medium capitalize text-foreground">
                {formData?.type || "Not selected"}
              </div>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Group:</span>
              <div className="font-medium capitalize text-foreground">
                {formData?.group || "BASIC"}
              </div>
            </div>
          </div>
        </div>

        {/* Boolean Settings */}
        <div className="p-3 bg-muted/50 border border-border rounded-lg">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-2">
            Settings
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Global or Not:</span>
              <StatusBadge condition={formData?.isGlobal} />
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Unique:</span>
              <StatusBadge condition={formData?.isUnique} />
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Filterable:</span>
              <StatusBadge condition={formData?.isFilterable} />
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Visible:</span>
              <StatusBadge condition={formData?.isVisible} />
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Variation:</span>
              <StatusBadge condition={formData?.isVariation} />
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Searchable:</span>
              <StatusBadge condition={formData?.isSearchable} />
            </div>
          </div>
        </div>

        {/* Options Preview */}
        {formData?.options && formData.options.length > 0 && (
          <div className="p-3 bg-muted/50 border border-border rounded-lg">
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-2 flex justify-between">
              <span>Options</span>
              <span className="text-primary">{formData.options.length}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.options.map(
                (option: any, index: number) =>
                  option.value && (
                    <div
                      key={index}
                      className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-2 ${
                        option.isDefault
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted text-foreground border-border"
                      }`}
                    >
                      {option.label || option.value}
                      {option.isDefault && " (Default)"}
                      {option.swatchValue && (
                        <span
                          className="inline-block w-3 h-3 rounded-full border border-white/20"
                          style={{ backgroundColor: option.swatchValue }}
                        />
                      )}
                    </div>
                  ),
              )}
            </div>
          </div>
        )}

        {/* Status Badges */}
        <div className="flex gap-2 text-xs">
          <span className="px-2 py-1 bg-primary/10 text-primary rounded">
            {formData?.status || "ACTIVE"}
          </span>
          <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded">
            {formData?.visibility || "PUBLIC"}
          </span>
        </div>
      </div>
    </div>
  );
}
