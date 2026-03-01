import { z } from "zod";

/* =========================================================
   ENUMS
========================================================= */

export const categoryStatusEnum = z.enum([
  "active",
  "inactive",
  "archive",
  "draft",
]);

/* =========================================================
   STEP 1: BASIC INFO
========================================================= */

export const categoryBasicInfoSchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(100, "Category name cannot exceed 100 characters"),

  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .max(120, "Slug cannot exceed 120 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase and hyphen-separated"),

  description: z
    .string()
    .max(1000, "Description cannot exceed 1000 characters")
    .optional()
    .nullable(),

  status: categoryStatusEnum.default("draft"),

  parentId: z.string().cuid().optional().nullable(),

  image: z.string().url("Image must be a valid URL").optional().nullable(),

  sortOrder: z.number().int().min(0).default(0),
});

/* =========================================================
   STEP 2: ATTRIBUTE MANAGEMENT
========================================================= */

export const categoryAttributeItemSchema = z.object({
  attributeId: z.string().cuid("Invalid attribute ID"),

  isRequired: z.boolean().default(false),

  sortOrder: z.number().int().min(0).default(0),
});

export const categoryAttributeSchema = z
  .object({
    attributes: z
      .array(categoryAttributeItemSchema)
      .min(1, "At least one attribute is required"),
  })
  .refine(
    (data) => {
      const ids = data.attributes.map((a) => a.attributeId);
      return new Set(ids).size === ids.length;
    },
    {
      message: "Duplicate attributes are not allowed",
      path: ["attributes"],
    },
  );

/* =========================================================
   STEP 3: SEO SETTINGS
========================================================= */

export const categorySeoSchema = z.object({
  metaTitle: z
    .string()
    .max(60, "Meta title should be under 60 characters")
    .optional()
    .nullable(),

  metaDescription: z
    .string()
    .max(160, "Meta description should be under 160 characters")
    .optional()
    .nullable(),

  metaKeywords: z.string().optional().nullable(),

  canonicalUrl: z
    .string()
    .url("Canonical URL must be valid")
    .optional()
    .nullable(),

  robots: z.string().default("index,follow").optional(),

  ogTitle: z.string().optional().nullable(),

  ogDescription: z.string().optional().nullable(),

  ogImage: z.string().url("OG image must be valid URL").optional().nullable(),

  structuredData: z.unknown().optional().nullable(),

  metaData: z.unknown().optional().nullable(),
});

/* =========================================================
   FULL MULTI-STEP SCHEMA
========================================================= */

export const categoryFullSchema = z.object({
  basicInfo: categoryBasicInfoSchema,
  attributeManagement: categoryAttributeSchema,
  seoSettings: categorySeoSchema.optional(),
});

/* =========================================================
   TYPE EXPORTS (VERY IMPORTANT)
========================================================= */

export type CategoryStatus = z.infer<typeof categoryStatusEnum>;

export type CategoryBasicInfoInput = z.infer<typeof categoryBasicInfoSchema>;

export type CategoryAttributeItemInput = z.infer<
  typeof categoryAttributeItemSchema
>;

export type CategoryAttributeInput = z.infer<typeof categoryAttributeSchema>;

export type CategorySeoInput = z.infer<typeof categorySeoSchema>;

export type CategoryFullInput = z.infer<typeof categoryFullSchema>;
