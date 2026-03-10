import { z } from "zod";

// ==================== ENUMS from Prisma Schema ====================

export const AttributeTypeEnum = z.enum([
  "TEXT",
  "TEXTAREA",
  "NUMBER",
  "BOOLEAN",
  "SELECT",
  "MULTISELECT",
  "RADIO",
  "CHECKBOX",
  "COLOR",
  "SIZE",
  "IMAGE",
  "FILE",
  "DATE",
  "DATETIME",
  "RANGE",
  "PRICE",
  "PERCENTAGE",
  "WEIGHT",
  "DIMENSION",
  "URL",
  "EMAIL",
  "PHONE",
  "RATING",
  "JSON",
]);

export const SwatchTypeEnum = z.enum([
  "COLOR",
  "IMAGE",
  "TEXT",
  "ICON",
  "GRADIENT",
  "PATTERN",
]);

export const AttributeGroupEnum = z.enum([
  "BASIC",
  "TECHNICAL",
  "PHYSICAL",
  "PACKAGING",
  "WARRANTY",
  "SHIPPING",
  "SEO",
  "MARKETING",
  "INVENTORY",
  "PRICING",
  "CUSTOM",
]);

export const AttributeValidationEnum = z.enum([
  "REQUIRED",
  "UNIQUE",
  "MIN_LENGTH",
  "MAX_LENGTH",
  "MIN_VALUE",
  "MAX_VALUE",
  "PATTERN",
  "EMAIL",
  "URL",
  "PHONE",
  "IMAGE_DIMENSION",
  "FILE_SIZE",
  "FILE_TYPE",
  "CUSTOM",
]);

export const AttributeVisibilityEnum = z.enum([
  "PUBLIC",
  "PRIVATE",
  "HIDDEN",
  "SELLER_ONLY",
  "BUYER_ONLY",
]);

export const AttributeStatusEnum = z.enum([
  "ACTIVE",
  "INACTIVE",
  "DRAFT",
  "ARCHIVED",
]);

export const UnitPositionEnum = z.enum(["prefix", "suffix"]);

// ==================== Type Inferences ====================

export type AttributeType = z.infer<typeof AttributeTypeEnum>;
export type SwatchType = z.infer<typeof SwatchTypeEnum>;
export type AttributeGroup = z.infer<typeof AttributeGroupEnum>;
export type AttributeValidation = z.infer<typeof AttributeValidationEnum>;
export type AttributeVisibility = z.infer<typeof AttributeVisibilityEnum>;
export type AttributeStatus = z.infer<typeof AttributeStatusEnum>;

// ==================== Option Schema ====================

export const OptionSchema = z.object({
  label: z.string().min(1, "Label is required"),
  value: z.string().min(1, "Value is required"),
  sortOrder: z.number().nullish(),
  isDefault: z.boolean().nullish(),
  swatchType: SwatchTypeEnum.nullish(),
  swatchValue: z.string().nullish(),
  colorCode: z.string().nullish(),
  image: z.string().nullish(),
  description: z.string().nullish(),
  metadata: z.record(z.string(), z.any()).nullish(),
});

// ==================== Validation Rule Schema ====================

export const ValidationRuleSchema = z.object({
  type: AttributeValidationEnum,
  value: z.union([z.string(), z.number(), z.boolean(), z.object({})]).nullish(),
  message: z.string().nullish(),
});

// ==================== Complete Schema ====================

export const fullAttributeSchema = z
  .object({
    // --- TAB 1: BASIC INFO ---
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    slug: z
      .string()
      .min(2)
      .regex(/^[a-z0-9-]+$/, "Lowercase, numbers & hyphens only"),
    type: AttributeTypeEnum,
    group: AttributeGroupEnum,
    status: AttributeStatusEnum.default("ACTIVE"),
    visibility: AttributeVisibilityEnum.default("PUBLIC"),
    isRequired: z.boolean().default(false),
    isUnique: z.boolean().default(false),
    isFilterable: z.boolean().default(false),
    isVisible: z.boolean().default(true),
    isVariation: z.boolean().default(false),
    isSearchable: z.boolean().default(false),
    isGlobal: z.boolean().default(false),

    // --- TAB 2: DISPLAY SETTINGS ---
    label: z.string().min(1, "Display label is required").max(200),
    placeholder: z.string().max(200).nullish(),
    helpText: z.string().max(500).nullish(),
    unit: z.string().max(50).nullish(),
    unitPosition: UnitPositionEnum.nullish(),
    sortOrder: z.number().nullish(),
    cssClass: z.string().nullish(),
    icon: z.string().nullish(),

    // --- TAB 3: VALIDATION RULES (Number & Text specific) ---
    minValue: z.number().nullish(),
    maxValue: z.number().nullish(),
    stepValue: z.number().min(0, "Step cannot be negative").nullish(),
    decimalPlaces: z.number().min(0).max(5).nullish(),
    minLength: z.number().min(0).nullish(),
    maxLength: z.number().min(1).nullish(),
    validations: z.array(ValidationRuleSchema).nullish(),

    // --- TAB 4: OPTIONS ---
    options: z.array(OptionSchema).nullish(),

    metaData: z.record(z.string(), z.any()).nullish(),
  })
  .superRefine((data, ctx) => {
    // --- ক) টাইপ অনুযায়ী OPTIONS চেক (Tab 4) ---
    const optionRequiredTypes = [
      "SELECT",
      "MULTISELECT",
      "RADIO",
      "CHECKBOX",
      "COLOR",
      "SIZE",
    ];
    if (optionRequiredTypes.includes(data.type)) {
      if (!data.options || data.options.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "At least one option is required for this attribute type",
          path: ["options"],
        });
      }
    }

    // --- খ) NUMBER টাইপ ভ্যালিডেশন (Tab 3) ---
    if (data.type === "NUMBER") {
      if (data.minValue !== null && data.maxValue !== null) {
        if (data.minValue! > data.maxValue!) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Min value cannot be greater than Max value",
            path: ["minValue"],
          });
        }
      }
      // Step value validation for Numbers
      if (data.stepValue === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Step value cannot be zero",
          path: ["stepValue"],
        });
      }
    }

    // --- গ) TEXT টাইপ ভ্যালিডেশন (Tab 3) ---
    if (["TEXT", "TEXTAREA"].includes(data.type)) {
      if (data.minLength !== null && data.maxLength !== null) {
        if (data.minLength! > data.maxLength!) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Min length cannot be greater than Max length",
            path: ["minLength"],
          });
        }
      }
    }

    // --- ঘ) SWATCH/COLOR টাইপ স্পেসিফিক চেক ---
    if (data.type === "COLOR" && data.options) {
      data.options.forEach((opt, idx) => {
        if (!opt.colorCode && !opt.image) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Color code or Image is required for color options",
            path: ["options", idx, "colorCode"],
          });
        }
      });
    }
  });
// ==================== Type Exports ====================

export type FullAttributeInput = z.infer<typeof fullAttributeSchema>;
export type Option = z.infer<typeof OptionSchema>;
export type ValidationRule = z.infer<typeof ValidationRuleSchema>;

// Field arrays for each tab (used for validation)
export const basicInfoFields = [
  "name",
  "slug",
  "type",
  "group",
  "isRequired",
  "isUnique",
  "isFilterable",
  "isVisible",
  "isVariation",
  "isSearchable",
  "isGlobal",
  "status",
  "visibility",
] as const;

export const displaySettingsFields = [
  "label",
  "placeholder",
  "helpText",
  "unit",
  "unitPosition",
  "sortOrder",
  "cssClass",
  "icon",
] as const;

export const validationRulesFields = [
  "minValue",
  "maxValue",
  "stepValue",
  "decimalPlaces",
  "minLength",
  "maxLength",
  "validations",
] as const;
