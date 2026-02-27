import Input from "@/components/common/input";
import { Option, Select } from "@/components/ui/select";

export default function DisplaySettings({
  formData,
  errors,
  onChange,
}: {
  openTab: string;
  setOpenTab: () => void;
  formData: any;
  errors?: any;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Label"
          name="label"
          placeholder="Choose Color (optional)"
          value={formData.label}
          error={errors?.label}
          onChange={(e) => onChange("label", e.target.value)}
        />
        <Input
          label="Placeholder"
          name="placeholder"
          placeholder="e.g, Red, Blue, Green"
          value={formData.placeholder}
          error={errors?.placeholder}
          onChange={(e) => onChange("placeholder", e.target.value)}
        />
      </div>

      <div>
        <Input
          label="Help Text"
          type="textarea"
          name="helpText"
          error={errors?.helpText}
          placeholder="If you Like most then select two color. ⚠️"
          value={formData.helpText}
          onChange={(e) => onChange("helpText", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Input
          label="Unit"
          name="unit"
          helpText="Select the measurement unit for this product (e.g., kg, pcs, or ltr)."
          placeholder="kg, cm, px"
          error={errors?.unit}
          value={formData.unit}
          onChange={(e) => onChange("unit", e.target.value)}
        />
        <Select
          label="Unit Position"
          helpText="Select Option If Prefix $10 is Suffix 10 KG"
          name="unitPosition"
          error={errors?.unitPosition}
          value={formData.unitPosition}
          onChange={(value) => onChange("unitPosition", value)}
        >
          <Option value="none">none</Option>
          <Option value="prefix">Prefix ($10)</Option>
          <Option value="suffix">Suffix (10 KG)</Option>
        </Select>
        <Input
          label="Sort Order"
          type="number"
          helpText="🔢 Set the display order. Lower values show up first."
          name="sortOrder"
          error={errors?.sortOrder}
          value={formData.sortOrder}
          onChange={(e) => onChange("sortOrder", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 mb-3 gap-4">
        <Input
          label="CSS Class"
          name="cssClass"
          placeholder="custom-class"
          error={errors?.cssClass}
          value={formData.cssClass}
          onChange={(e) => onChange("cssClass", e.target.value)}
        />
        <Input
          label="Icon"
          name="icon"
          placeholder="Icon name or URL"
          value={formData.icon}
          error={errors?.icon}
          onChange={(e) => onChange("icon", e.target.value)}
        />
      </div>
    </div>
  );
}
