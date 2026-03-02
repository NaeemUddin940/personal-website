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

  parentId: z.string().optional().nullable(),

  image: z.string().optional().nullable(),

  sortOrder: z.number().int().min(0).default(0),
});

/* =========================================================
   STEP 2: ATTRIBUTE MANAGEMENT
========================================================= */

// Attribute Item Schema (প্রতিটি অ্যাট্রিবিউটের জন্য)
export const categoryAttributeItemSchema = z.object({
  id: z.string().optional(), // লোকাল আইডি
  attributeId: z.string().optional(), // গ্লোবাল অ্যাট্রিবিউট আইডি (যদি থাকে)
  name: z.string().min(1, "Attribute name is required"),
  type: z.enum(["text", "number", "select", "boolean", "date"]),
  isRequired: z.boolean().default(false),
  sortOrder: z.number().int().min(0).default(0),
  options: z.array(z.string()).optional(),
  overrideLabel: z.string().optional(),
  overrideHelpText: z.string().optional(),
  isFilterable: z.boolean().default(true),
  isVisible: z.boolean().default(true),
  defaultValue: z.union([z.string(), z.number(), z.boolean()]).optional(),
});

// অ্যাট্রিবিউট ম্যানেজমেন্ট স্কিমা (পুরো section টি optional)
export const categoryAttributeSchema = z
  .object({
    attributes: z.array(categoryAttributeItemSchema).default([]), // Empty array by default
  })
  .optional();

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
  attributeManagement: categoryAttributeSchema, // ✅ আনকমেন্ট করা হয়েছে
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
