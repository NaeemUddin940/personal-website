// types/category-seo.types.ts

import { Category } from "./category.types";

// Main Category SEO Interface
export interface CategorySeo {
  id: string;
  categoryId: string;
  category?: Category;

  // Basic SEO
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  canonicalUrl: string | null;

  // Robots directive
  robots: string | null;

  // Open Graph
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;

  // Additional data
  structuredData: Record<string, any> | null;
  metaData: Record<string, any> | null;

  // System
  createdAt: Date;
  updatedAt: Date;
}

// Category SEO Create Input
export interface CategorySeoCreateInput {
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords?: string | null;
  canonicalUrl?: string | null;
  robots?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
  structuredData?: Record<string, any> | null;
  metaData?: Record<string, any> | null;
}

// Category SEO Update Input
export type CategorySeoUpdateInput = Partial<CategorySeoCreateInput>;

// Google SERP Preview Data
export interface GoogleSerpPreviewData {
  title: string;
  url: string;
  description: string;
}

// Social Card Preview Data
export interface SocialCardPreviewData {
  title: string;
  description: string;
  image: string | null;
  url: string;
}
