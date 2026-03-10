import Input from "@/components/common/input";
import { Option, Select } from "@/components/ui/select";
import { FullAttributeInput } from "@/validation/attribute-validation";
import { Controller, useFormContext } from "react-hook-form";

export default function DisplaySettings() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FullAttributeInput>();

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Label"
          name="label"
          placeholder="Choose Color (optional)"
          {...register("label")}
          error={errors.label?.message}
        />
        <Input
          label="Placeholder"
          name="placeholder"
          placeholder="e.g, Red, Blue, Green"
          {...register("placeholder")}
          error={errors.placeholder?.message}
        />
      </div>

      <div>
        <Input
          label="Help Text"
          type="textarea"
          name="helpText"
          placeholder="If you Like most then select two color. ⚠️"
          {...register("helpText")}
          error={errors.helpText?.message}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Input
          label="Unit"
          name="unit"
          helpText="Select the measurement unit for this product (e.g., kg, pcs, or ltr)."
          placeholder="kg, cm, px"
          {...register("unit")}
          error={errors.unit?.message}
        />
        <Controller
          control={control}
          name="unitPosition"
          render={({ field }) => (
            <Select
              {...field}
              onValueChange={field.onChange}
              defaultValue={field.value}
              error={errors?.unitPosition?.message}
              label="Unit Position"
              helpText="Select Option: Prefix is $10, Suffix is 10 KG"
            >
              <Option value="none">none</Option>
              <Option value="prefix">Prefix ($10)</Option>
              <Option value="suffix">Suffix (10 KG)</Option>
            </Select>
          )}
        />
        <Input
          label="Sort Order"
          type="number"
          helpText="🔢 Set the display order. Lower values show up first."
          name="sortOrder"
          {...register("sortOrder", { valueAsNumber: true })}
          error={errors?.sortOrder?.message}
        />
      </div>

      <div className="grid grid-cols-2 mb-3 gap-4">
        <Input
          label="CSS Class"
          name="cssClass"
          placeholder="custom-class"
          {...register("cssClass")}
          error={errors?.cssClass?.message}
        />
        <Input
          label="Icon"
          name="icon"
          placeholder="Icon name or URL"
          {...register("icon")}
          error={errors?.icon?.message}
        />
      </div>
    </div>
  );
}
