"use client";

import Input from "@/components/common/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Option, Select } from "@/components/ui/select";
import { SWATCH_TYPES } from "@/constant/attribute/atter-constant";
import { generateSlug } from "@/utils/slug-generator";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

type AttributeValue = {
  value: string;
  slug: string;
  swatchType: "TEXT" | "COLOR" | "IMAGE";
  swatchValue: string;
  isDefault: boolean;
};

export default function AttrValuesTab({
  formData,
  errors,
  setFormData,
}: {
  formData: any;
  errors: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}) {
  const values = formData.values || [];

  function addValue() {
    setFormData((prev) => ({
      ...prev,
      values: [
        ...prev.values,
        {
          value: "",
          slug: "",
          swatchType: "TEXT",
          swatchValue: "",
          isDefault: false,
        },
      ],
    }));
  }

  function handleValueChange<K extends keyof AttributeValue>(
    index: number,
    field: K,
    newValue: AttributeValue[K],
  ) {
    setFormData((prev: any) => {
      const updatedValues = prev.values.map(
        (item: AttributeValue, i: number) => {
          if (i !== index) {
            // যদি নতুন কোনো ভ্যালুকে ডিফল্ট করা হয়, তবে অন্য সবগুলোকে false করে দাও
            if (field === "isDefault" && newValue === true) {
              return { ...item, isDefault: false };
            }
            return item;
          }
          return { ...item, [field]: newValue };
        },
      );

      return { ...prev, values: updatedValues };
    });
  }
  function deleteValue(index: number) {
    setFormData((prev: any) => ({
      ...prev,
      values: prev.values.filter((_: any, i: number) => i !== index),
    }));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Attribute Values</h3>

        <button
          type="button"
          onClick={addValue}
          className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
        >
          <Plus size={16} /> Add Value
        </button>
      </div>

      {values.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed rounded-lg text-muted-foreground">
          No values added yet
        </div>
      ) : (
        values.map((item, index) => (
          <AttributeValueItem
            key={index}
            value={item}
            errors={errors}
            index={index}
            onChange={handleValueChange}
            onDelete={deleteValue}
          />
        ))
      )}
      {errors?.values && (
        <span className="text-destructive my-1">{errors?.values}</span>
      )}
    </div>
  );
}

const AttributeValueItem = ({
  value,
  index,
  errors,
  onChange,
  onDelete,
}: {
  value: AttributeValue;
  index: number;
  errors: any;
  onChange: <K extends keyof AttributeValue>(
    index: number,
    field: K,
    value: AttributeValue[K],
  ) => void;
  onDelete: (index: number) => void;
}) => {
  return (
    <div className="border rounded-xl p-4 bg-card shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[2fr_2fr_1.5fr_2fr_auto] gap-4">
        {/* Value */}
        <Input
          label="Value"
          name="value"
          required
          placeholder="e.g., Red"
          value={value.value}
          error={errors.value}
          onChange={(e) => {
            const val = e.target.value;
            onChange(index, "value", val); // মেইন স্টেট আপডেট
            onChange(index, "slug", generateSlug(val)); // একই সাথে স্ল্যাগ জেনারেট করে আপডেট
          }}
        />

        {/* Slug */}
        <Input
          label="Slug"
          name="slug"
          placeholder="e.g., red"
          value={value.slug}
          error={errors.slug}
          onChange={(e) =>
            onChange(index, "slug", generateSlug(e.target.value))
          }
        />

        {/* Swatch Type */}
        <Select
          label="Swatch Type"
          name="swatchType"
          value={value.swatchType}
          error={errors.swatchType}
          onChange={(val) => {
            onChange(index, "swatchType", val as any);
          }}
        >
          {SWATCH_TYPES.map((type) => (
            <Option key={type.value} value={type.value}>
              {type.label}
            </Option>
          ))}
        </Select>

        {/* Swatch Value */}
        <div>
          <label className="block text-sm font-medium mb-1 text-muted-foreground">
            Swatch Value
          </label>

          {value.swatchType === "COLOR" ? (
            <div className="flex gap-2 items-center">
              <Input
                type="color"
                name="swatchValue"
                error={errors.swatchValue}
                value={value.swatchValue || "#000000"}
                onChange={(e) => onChange(index, "swatchValue", e.target.value)}
                className="w-10 h-9 border rounded-lg cursor-pointer"
              />
              <Input
                placeholder="#FF0000"
                value={value.swatchValue}
                name="swatchValue"
                error={errors.swatchValue}
                onChange={(e) => onChange(index, "swatchValue", e.target.value)}
              />
            </div>
          ) : value.swatchType === "IMAGE" ? (
            <div className="flex gap-2 items-center">
              <input
                type="file"
                accept="image/*"
                name="swatchValue"
                error={errors.swatchValue}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  const reader = new FileReader();
                  reader.onloadend = () =>
                    onChange(index, "swatchValue", reader.result as string);
                  reader.readAsDataURL(file);
                }}
                className="hidden"
                id={`file-${index}`}
              />

              <label
                htmlFor={`file-${index}`}
                className="flex-1 px-3 py-2 border rounded-lg text-xs text-center cursor-pointer hover:bg-muted truncate"
              >
                Choose Image
              </label>

              {value.swatchValue && (
                <Image
                  src="/PollenPop.png"
                  alt="preview"
                  width={36}
                  height={36}
                  className="w-9 h-9 object-cover rounded border"
                />
              )}
            </div>
          ) : (
            <Input
              placeholder="S, M, L"
              value={value.swatchValue}
              name="swatchValue"
              error={errors.swatchValue}
              onChange={(e) => onChange(index, "swatchValue", e.target.value)}
            />
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between lg:justify-center">
          <div className="flex flex-col items-center">
            <span className="text-xs text-muted-foreground mb-1">Default</span>
            <Checkbox
              value={value.isDefault}
              checked={value.isDefault}
              onChange={(checked) =>
                onChange(index, "isDefault", Boolean(checked))
              }
            />
          </div>

          <div className="flex items-center justify-center mt-3">
            <button
              type="button"
              onClick={() => onDelete(index)}
              className="p-2 cursor-pointer text-destructive hover:bg-destructive/10 rounded-lg transition"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
