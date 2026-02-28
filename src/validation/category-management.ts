import { z } from "zod";

export const categoryBasicInfoSchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(100),

  slug: z
    .string()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase and hyphen-separated"),

  description: z.string().max(1000).optional().nullable(),

  status: z.enum(["active", "inactive", "archive", "draft"]),

  parentId: z.string().cuid().optional().nullable(),

  image: z.string().url().optional().nullable(),

  sortOrder: z.number().int().min(0).default(0),
});

export const categoryAttributeItemSchema = z.object({
  attributeId: z.string().cuid(),

  isRequired: z.boolean().default(false),

  sortOrder: z.number().int().min(0).default(0),
});

export const categoryAttributeSchema = z.object({
  attributes: z
    .array(categoryAttributeItemSchema)
    .min(1, "At least one attribute is required"),
});

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

  canonicalUrl: z.string().url().optional().nullable(),

  robots: z.string().default("index,follow").optional(),

  ogTitle: z.string().optional().nullable(),
  ogDescription: z.string().optional().nullable(),
  ogImage: z.string().url().optional().nullable(),

  structuredData: z.any().optional().nullable(),

  metaData: z.any().optional().nullable(),
});

export const categoryFullSchema = z.object({
  basicInfo: categoryBasicInfoSchema,
  attributeManagement: categoryAttributeSchema,
  seoSettings: categorySeoSchema.optional(),
});

export const categoryAttributeSchema = z.object({
  attributes: z.array(categoryAttributeItemSchema),
}).refine(
  (data) => {
    const ids = data.attributes.map(a => a.attributeId)
    return new Set(ids).size === ids.length
  },
  {
    message: "Duplicate attributes are not allowed",
  }
)