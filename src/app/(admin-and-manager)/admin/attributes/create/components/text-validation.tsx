import Input from "@/components/common/input";
import { Plus, Trash2 } from "lucide-react";

export default function TextValidation({
  errors,
  onChange,
  formData,
}: {
  errors: any;
  formData: any;
  onChange: (name: string, value: any) => void;
  setFormData: any;
}) {
  // নতুন অপশন যোগ করার ফাংশন
  const addOption = () => {
    const newOption = { label: "", value: "" };
    onChange("options", [...(formData.options || []), newOption]);
  };

  // অপশন পরিবর্তনের ফাংশন
  const handleOptionChange = (index: number, field: string, value: string) => {
    const updatedOptions = formData.options.map((opt: any, i: number) =>
      i === index ? { ...opt, [field]: value } : opt,
    );
    onChange("options", updatedOptions);
  };

  // অপশন ডিলিট করার ফাংশন
  const deleteOption = (index: number) => {
    const filteredOptions = formData.options.filter(
      (_: any, i: number) => i !== index,
    );
    onChange("options", filteredOptions);
  };

  return (
    <div className="space-y-4">
      {/* 1. Multi-select Specific Validation */}
      {formData.type === "MULTISELECT" && (
        <div className="p-4 bg-secondary/30 border border-border rounded-lg space-y-4">
          <h3 className="font-medium flex items-center gap-2 text-foreground">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Selection Limits
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Min Selections"
              name="minChoices"
              type="number"
              placeholder="e.g., 1"
              error={errors?.minChoices}
              helpText="User must select at least this many options."
              value={formData.minChoices}
              onChange={(e) => onChange("minChoices", e.target.value)}
            />
            <Input
              label="Max Selections"
              name="maxChoices"
              type="number"
              placeholder="e.g., 5"
              error={errors?.maxChoices}
              helpText="User cannot select more than this many options."
              value={formData.maxChoices}
              onChange={(e) => onChange("maxChoices", e.target.value)}
            />
          </div>
        </div>
      )}

      {/* 2. Numeric Validation (Existing) */}
      {["NUMBER", "PRICE", "PERCENTAGE", "WEIGHT", "RANGE"].includes(
        formData.type,
      ) && (
        <div className="p-4 bg-secondary/30 border border-border rounded-lg space-y-4">
          <h3 className="font-medium flex items-center gap-2 text-foreground">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            Numeric Validation
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Min Value"
              name="minValue"
              type="number"
              value={formData.minValue}
              error={errors?.minValue}
              onChange={(e) => onChange("minValue", e.target.value)}
            />
            <Input
              label="Max Value"
              name="maxValue"
              type="number"
              value={formData.maxValue}
              error={errors?.maxValue}
              onChange={(e) => onChange("maxValue", e.target.value)}
            />
            <Input
              label="Step Value"
              name="stepValue"
              type="number"
              value={formData.stepValue}
              error={errors?.stepValue}
              onChange={(e) => onChange("stepValue", e.target.value)}
            />
            <Input
              label="Decimal Places"
              type="number"
              name="decimalPlaces"
              value={formData.decimalPlaces}
              error={errors?.decimalPlaces}
              onChange={(e) => onChange("decimalPlaces", e.target.value)}
            />
          </div>
        </div>
      )}

      {/* 3. Text Validation (Existing) */}
      {["TEXT", "TEXTAREA", "URL", "EMAIL", "PHONE"].includes(
        formData.type,
      ) && (
        <div className="p-4 bg-secondary/30 border border-border rounded-lg space-y-4">
          <h3 className="font-medium flex items-center gap-2 text-foreground">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            Text Validation
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Min Length"
              name="minLength"
              type="number"
              value={formData.minLength}
              error={errors?.minLength}
              onChange={(e) => onChange("minLength", e.target.value)}
            />
            <Input
              label="Max Length"
              name="maxLength"
              type="number"
              value={formData.maxLength}
              error={errors?.maxLength}
              onChange={(e) => onChange("maxLength", e.target.value)}
            />
          </div>
        </div>
      )}

      {/* 4. Options Management */}
      {["SELECT", "MULTISELECT", "RADIO", "CHECKBOX"].includes(
        formData.type,
      ) && (
        <div className="p-4 bg-secondary/30 border border-border rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium flex items-center gap-2 text-foreground">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Configurable Options
            </h3>
            <button
              type="button"
              onClick={addOption}
              className="flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 text-sm transition-all"
            >
              <Plus size={14} /> Add Option
            </button>
          </div>

          <div className="space-y-3">
            {formData.options?.map((option: any, index: number) => (
              <div
                key={index}
                className="flex gap-3 items-center animate-in fade-in slide-in-from-left-2"
              >
                <div className="flex-1">
                  <Input
                    type="text"
                    value={option.label || ""}
                    onChange={(e) =>
                      handleOptionChange(index, "label", e.target.value)
                    }
                    // className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm"
                    placeholder="Display Label (e.g. WiFi)"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    type="text"
                    value={option.value || ""}
                    onChange={(e) =>
                      handleOptionChange(index, "value", e.target.value)
                    }
                    // className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm"
                    placeholder="System Value (e.g. wifi)"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => deleteOption(index)}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {(!formData.options || formData.options.length === 0) && (
              <p className="text-xs text-center text-muted-foreground py-2 italic">
                No options added. Click &quot;Add Option&quot; to define
                choices.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
