import Input from "@/components/common/input";
import InputField from "@/components/common/input-field";
import { RangeSlider } from "@/components/ui/range-slider";
import { Option, Select } from "@/components/ui/select";
import {
  ATTRIBUTE_GROUPS,
  ATTRIBUTE_TYPES,
  STATUS_OPTIONS,
  VISIBILITY_OPTIONS,
} from "@/constant/attribute/attribute-constant";
import { FullAttributeInput } from "@/validation/attribute-validation";
import { Controller, useFormContext } from "react-hook-form";
import AttrConfiguration from "../attr-configuration";

export default function AttrBasicInfoTab() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FullAttributeInput>();

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4 p-3">
          {/* Name & Slug */}
          <Input
            label="Name"
            required
            placeholder="e.g., Color"
            {...register("name")}
            error={errors.name?.message}
          />

          <Input
            label="Slug"
            disabled
            {...register("slug")}
            placeholder="color"
          />

          {/* Type & Group */}
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select label="Type" {...field} error={errors.type?.message}>
                  {ATTRIBUTE_TYPES.map((type) => (
                    <Option key={type.value} value={type.value}>
                      {type.label}
                    </Option>
                  ))}
                </Select>
              )}
            />
            <Controller
              name="group"
              control={control}
              render={({ field }) => (
                <Select label="Group" {...field}>
                  {ATTRIBUTE_GROUPS.map((group) => (
                    <Option key={group.value} value={group.value}>
                      {group.label}
                    </Option>
                  ))}
                </Select>
              )}
            />
          </div>

          {/* Status & Visibility */}
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select label="Status" {...field}>
                  {STATUS_OPTIONS.map((opt) => (
                    <Option key={opt.value} value={opt.value}>
                      {opt.label}
                    </Option>
                  ))}
                </Select>
              )}
            />
            <Controller
              name="visibility"
              control={control}
              render={({ field }) => (
                <Select label="Visibility" {...field}>
                  {VISIBILITY_OPTIONS.map((opt) => (
                    <Option key={opt.value} value={opt.value}>
                      {opt.label}
                    </Option>
                  ))}
                </Select>
              )}
            />
          </div>

          {/* Priority Slider */}
          <div className="pt-2">
            <Controller
              name="displayPriority"
              control={control}
              defaultValue={50}
              render={({ field: { onChange, value } }) => (
                <RangeSlider
                  label="Display Priority"
                  value={value}
                  onChange={onChange}
                  helpText="Set the visual importance."
                  variant="gradient"
                />
              )}
            />
          </div>
        </div>

        {/* Right Side Settings */}
        <div className="bg-secondary/10 p-4 rounded-2xl border border-border/50">
          <AttrConfiguration />
        </div>
      </div>
    </div>
  );
}
