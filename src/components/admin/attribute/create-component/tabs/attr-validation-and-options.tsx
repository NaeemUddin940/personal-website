"use client";

import Input from "@/components/common/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Option, Select } from "@/components/ui/select";
import { SWATCH_TYPES } from "@/constant/attribute/attribute-constant";
import { generateSlug } from "@/utils/slug-generator";

import {
  Image as ImageIcon,
  ListPlus,
  Palette,
  Plus,
  Trash2,
  UploadCloud,
} from "lucide-react";
import Image from "next/image";

import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";

export default function AttrValidationAndOptions() {
  const { control } = useFormContext();

  const attributeType = useWatch({
    control,
    name: "type",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const hasOptions = [
    "SELECT",
    "MULTISELECT",
    "RADIO",
    "CHECKBOX",
    "COLOR",
    "SIZE",
  ].includes(attributeType);

  return (
    <div className="space-y-8">
      {hasOptions && (
        <div className="pt-6 border-t border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <ListPlus size={20} className="text-primary" />
                Attribute Options
              </h3>

              <p className="text-xs text-muted-foreground mt-1">
                Define the available choices for this attribute
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                append({
                  label: "",
                  slug: "",
                  swatchType: "TEXT",
                  value: "",
                  swatchValue: "",
                  isDefault: false,
                })
              }
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition shadow-sm text-sm"
            >
              <Plus size={16} />
              Add Option
            </button>
          </div>

          <div className="space-y-4">
            {fields.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 border border-dashed border-border rounded-xl bg-card">
                <ImageIcon size={40} className="text-muted-foreground mb-3" />

                <h4 className="font-medium">No options defined</h4>

                <p className="text-sm text-muted-foreground mt-1">
                  Click &ldquo;Add Option&ldquo; to create your first choice
                </p>
              </div>
            ) : (
              fields.map((field, index) => (
                <AttributeValueItem
                  key={field.id}
                  index={index}
                  remove={remove}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const AttributeValueItem = ({
  index,
  remove,
}: {
  index: number;
  remove: (i: number) => void;
}) => {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const currentSwatchType = useWatch({
    control,
    name: `options.${index}.swatchType`,
  });

  const currentSwatchValue = useWatch({
    control,
    name: `options.${index}.swatchValue`,
  });

  const itemErrors = errors?.options?.[index];

  return (
    <div className="border border-border rounded-xl p-5 bg-card shadow-sm hover:shadow-md transition">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[2fr_1.5fr_1.5fr_2fr_auto] gap-5 items-end">
        {/* Display Name */}
        <Input
          label="Display Name"
          placeholder="e.g. Red / XL"
          {...register(`options.${index}.label`, {
            onChange: (e) => {
              setValue(`options.${index}.slug`, generateSlug(e.target.value), {
                shouldDirty: true,
              });
            },
          })}
          error={itemErrors?.label?.message}
        />

        {/* Slug */}
        <Input
          label="Slug"
          readOnly
          {...register(`options.${index}.slug`)}
          className="bg-muted text-xs font-mono"
        />

        {/* Swatch Type */}
        <Controller
          name={`options.${index}.swatchType`}
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              label="Swatch Type"
              onChange={(value: string) => {
                field.onChange(value);

                setValue(`options.${index}.swatchValue`, "", {
                  shouldDirty: true,
                  shouldValidate: true,
                });

                setValue(`options.${index}.value`, "", {
                  shouldDirty: true,
                });
              }}
            >
              {SWATCH_TYPES.map((type: any) => (
                <Option key={type.value} value={type.value}>
                  {type.label}
                </Option>
              ))}
            </Select>
          )}
        />

        {/* Dynamic UI */}
        <div className="space-y-1.5">
          <label className="block text-md font-bold text-muted-foreground tracking-wider">
            Swatch Value
          </label>

          {currentSwatchType === "COLOR" && (
            <div className="flex gap-2 items-center">
              <div
                className="relative w-12 h-10 border border-border rounded-lg overflow-hidden"
                style={{
                  backgroundColor: currentSwatchValue || "var(--muted)",
                }}
              >
                <input
                  type="color"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  value={currentSwatchValue || "#000000"}
                  onChange={(e) => {
                    const color = e.target.value;

                    setValue(`options.${index}.value`, color, {
                      shouldDirty: true,
                      shouldValidate: true,
                    });

                    setValue(`options.${index}.swatchValue`, color, {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                  }}
                />

                {!currentSwatchValue && (
                  <Palette
                    size={16}
                    className="absolute inset-0 m-auto text-muted-foreground"
                  />
                )}
              </div>

              <Input
                placeholder="#HEXCODE"
                className="font-mono uppercase text-xs h-10"
                {...register(`options.${index}.swatchValue`)}
              />
            </div>
          )}

          {currentSwatchType === "IMAGE" && (
            <div className="flex gap-3 items-center">
              <input
                type="file"
                className="hidden"
                id={`file-${index}`}
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (!file) return;

                  const reader = new FileReader();

                  reader.onloadend = () => {
                    setValue(
                      `options.${index}.swatchValue`,
                      reader.result as string,
                      { shouldDirty: true },
                    );

                    setValue(`options.${index}.value`, file.name, {
                      shouldDirty: true,
                    });
                  };

                  reader.readAsDataURL(file);
                }}
              />

              <label
                htmlFor={`file-${index}`}
                className="relative w-12 h-10 border-2 border-dashed border-border rounded-lg cursor-pointer bg-muted flex items-center justify-center overflow-hidden"
              >
                {currentSwatchValue ? (
                  <Image
                    height={100}
                    width={100}
                    src={currentSwatchValue}
                    className="w-full h-full object-cover"
                    alt="preview"
                  />
                ) : (
                  <UploadCloud size={18} className="text-muted-foreground" />
                )}
              </label>

              {currentSwatchValue && (
                <button
                  type="button"
                  onClick={() => {
                    setValue(`options.${index}.swatchValue`, "", {
                      shouldDirty: true,
                    });

                    setValue(`options.${index}.value`, "", {
                      shouldDirty: true,
                    });
                  }}
                  className="text-xs text-destructive hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
          )}

          {currentSwatchType === "TEXT" && (
            <Input
              placeholder="e.g. S, M, L"
              {...register(`options.${index}.value`)}
              className="h-10"
            />
          )}

          {itemErrors?.value?.message && (
            <span className="text-destructive">
              {itemErrors?.value?.message}
            </span>
          )}
        </div>

        {/* Default + Remove */}

        <div className="flex items-center gap-3">
          <Controller
            name={`options.${index}.isDefault`}
            control={control}
            render={({ field: { value, onChange } }) => (
              <Checkbox checked={!!value} onCheckedChange={onChange} />
            )}
          />

          <button
            type="button"
            onClick={() => remove(index)}
            className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
