import Input from "@/components/common/input";
import { RangeSlider } from "@/components/ui/range-slider";
import { Option, Select } from "@/components/ui/select";
import {
  ATTRIBUTE_GROUPS,
  ATTRIBUTE_TYPES,
  STATUS_OPTIONS,
  VISIBILITY_OPTIONS,
} from "@/constant/attribute/attribute-constant";
import { generateSlug } from "@/utils/slug-generator";
import AttrConfiguratuion from "./attr-configuratuion";

export default function BasicInfoTab({
  formData,
  errors,
  onChange,
}: {
  openTab: string;
  formData: any;
  errors: string;
  onChange: (e: any) => void;
}) {
  return (
    <div className="space-y-3">
      {/* Main Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3 p-3">
          {/* Name */}
          <Input
            label="Name"
            name="name"
            required
            placeholder="e.g., Color"
            value={formData.name}
            error={errors?.name}
            onChange={(e) => {
              const val = e.target.value;
              onChange("name", val); // মেইন স্টেট আপডেট
              onChange("slug", generateSlug(val)); // একই সাথে স্ল্যাগ জেনারেট করে আপডেট
            }}
          />

          {/* Slug */}
          <Input
            label="Slug"
            name="slug"
            disabled
            placeholder="color"
            error={errors?.slug}
            value={formData.slug}
            onChange={(e) => onChange("slug", generateSlug(e.target.value))}
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Type"
              name="type"
              value={formData.type}
              onChange={(value) => onChange("type", value)}
            >
              {ATTRIBUTE_TYPES.map((type) => (
                <Option key={type.value} value={type.value}>
                  {type.label}
                </Option>
              ))}
            </Select>
            <Select
              label="Group"
              name="group"
              value={formData.group}
              onChange={(value) => onChange("group", value)}
            >
              {ATTRIBUTE_GROUPS.map((group) => (
                <Option key={group.value} value={group.value}>
                  {group.label}
                </Option>
              ))}
            </Select>
          </div>

          {/* Priority Slider */}

          <div className="grid grid-cols-2 gap-8">
            <Select
              label="Status"
              name="status"
              value={formData.status}
              onChange={(value) => onChange("status", value)}
            >
              {STATUS_OPTIONS.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>

            <Select
              label="Visibility"
              name="visibility"
              value={formData.visibility}
              onChange={(value) => onChange("visibility", value)}
            >
              {VISIBILITY_OPTIONS.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>
          <div className="space-y-4 px-2 w-full">
            <RangeSlider
              label="Display Priority"
              name="displayPriority"
              helpText="Set the visual importance. Higher priority items are highlighted first."
              variant="gradient"
              initialValue={50}
              onChange={(e) => onChange("displayPriority", e.target.value)}
            />
          </div>
        </div>

        {/* Enhanced Bubble Toggle Settings Area */}
        <div className="bg-secondary/10 p-3 pt-5 rounded-2xl border border-border/50">
          <AttrConfiguratuion formData={formData} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}
