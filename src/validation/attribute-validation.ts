import { z } from "zod";

export const attributeSchema: Record<string, z.ZodSchema> = {
  // --- Basic Information Tab ---
  basic: z.object({
    name: z.string().min(2, "Name is required (min 2 chars)"),
    slug: z.string().min(2, "Slug is required"),
    type: z.string().min(1, "Please select an attribute type"),
    group: z.string().min(1, "Group selection is required"),
    status: z.enum(["ACTIVE", "INACTIVE"]),
    visibility: z.enum(["PUBLIC", "PRIVATE", "HIDDEN"]),
    // Behaviors (Booleans are usually always valid, but good to include)
    isRequired: z.boolean(),
    isUnique: z.boolean(),
    isFilterable: z.boolean(),
    isSearchable: z.boolean(),
    isComparable: z.boolean(),
    isVariation: z.boolean(),
    isVisible: z.boolean(),
  }),

  // --- Display Settings Tab ---
  display: z.object({
    label: z.string().min(1, "Display label is required"),
    placeholder: z.string().optional(),
    helpText: z.string().optional(),
    unit: z.string().optional(),
    unitPosition: z.string().optional(),
    sortOrder: z.coerce.number().default(0),
    cssClass: z.string().optional(),
    icon: z.string().optional(),
  }),

  // --- Validation Settings Tab ---
  // --- Validation Settings Tab ---
  validation: z.object({
    minValue: z.coerce
      .number({ invalid_type_error: "Min value must be a number" })
      .optional()
      .or(z.literal("")),

    maxValue: z.coerce
      .number({ invalid_type_error: "Max value must be a number" })
      .optional()
      .or(z.literal("")),

    stepValue: z.coerce
      .number()
      .min(0.1, "Step value must be at least 0.1")
      .default(1),

    decimalPlaces: z.coerce
      .number()
      .min(0, "Decimal places cannot be negative")
      .max(5, "Decimal places cannot be more than 5") // Apnar requirement: 5 er beshi hole error
      .default(0),

    minLength: z.coerce
      .number({ invalid_type_error: "Min length must be a number" })
      .optional()
      .or(z.literal("")),

    maxLength: z.coerce
      .number({ invalid_type_error: "Max length must be a number" })
      .optional()
      .or(z.literal("")),
  }),

  // --- Attribute Values Tab ---
  values: z.object({
    values: z
      .array(
        z.object({
          value: z.string().min(1, "Value is required"),
          slug: z.string().min(1, "Slug is required"),
          swatchType: z.enum(["TEXT", "COLOR", "IMAGE"]),
          swatchValue: z.string().optional(),
          isDefault: z.boolean(),
        }),
      )
      .min(1, "At least one attribute value must be added"),
  }),
};

export const fullAttributeSchema = z.object({
  ...attributeSchema.basic.shape, // Basic tab er shob field
  ...attributeSchema.display.shape, // Display tab er shob field
  ...attributeSchema.validation.shape, // Validation tab er shob field
  ...attributeSchema.values.shape, // Values tab er array field
});

// Type inference (Optional kintu helpful)
export type FullAttributeInput = z.infer<typeof fullAttributeSchema>;
