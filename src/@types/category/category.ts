// types/category.types.ts

// import { CategoryStatus } from "./attribute-enums";
import { Attribute } from "@/@types/attribute/attribute";
import { CategorySeo, CategoryStatus } from "@/@types/category";
import { CategoryAttribute, CategoryAttributeCreateInput } from "./category-attribute";
import { CategorySeoCreateInput } from "./category-seo";

// Main Category Interface
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  status: CategoryStatus;

  // Parent-child relationship
  parentId: string | null;
  parent?: Category | null;
  children?: Category[];

  // Media & sorting
  image: string | null;
  sortOrder: number;

  // Relations
  attributes?: CategoryAttribute[];
  createdAttributes?: Attribute[];
  seo?: CategorySeo | null;

  // System
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

// Category with children (tree structure)
export interface CategoryWithChildren extends Category {
  children: CategoryWithChildren[];
  level?: number;
  path?: string;
}

// Category Create Input
export interface CategoryCreateInput {
  name: string;
  slug?: string;
  description?: string | null;
  status?: CategoryStatus;
  parentId?: string | null;
  image?: string | null;
  sortOrder?: number;
  seo?: CategorySeoCreateInput | null;
  attributes?: CategoryAttributeCreateInput[];
}

// Category Update Input
export type CategoryUpdateInput = Partial<Omit<CategoryCreateInput, "slug">>;

// Category Filter
export interface CategoryFilter {
  id?: string | string[];
  ids?: string[];
  name?: string | { contains?: string; startsWith?: string; endsWith?: string };
  slug?: string | { contains?: string };
  status?: CategoryStatus | CategoryStatus[];
  parentId?: string | null | { in?: string[]; not?: string | null };
  hasParent?: boolean;
  hasChildren?: boolean;
  sortOrder?: number | { gt?: number; gte?: number; lt?: number; lte?: number };
  createdAt?: Date | { gt?: Date; gte?: Date; lt?: Date; lte?: Date };
  isDeleted?: boolean;
}

// Category Sort
export interface CategorySort {
  field: "name" | "slug" | "status" | "sortOrder" | "createdAt" | "updatedAt";
  order: "asc" | "desc";
}

// Category Query Options
export interface CategoryQueryOptions {
  filter?: CategoryFilter;
  sort?: CategorySort | CategorySort[];
  include?: {
    parent?: boolean;
    children?: boolean;
    seo?: boolean;
    attributes?: boolean | { include?: { attribute?: boolean } };
    createdAttributes?: boolean;
  };
  page?: number;
  limit?: number;
}

// Category List Response
export interface CategoryListResponse {
  items: Category[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Category Status Count
export interface CategoryStatusCount {
  active: number;
  inactive: number;
  draft: number;
  archive: number;
  total: number;
}
