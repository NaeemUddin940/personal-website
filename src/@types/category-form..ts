export interface CategoryAttribute {
  id: string;
  name: string;
  type: "text" | "number" | "select" | "boolean" | "date";
  isRequired: boolean;
  sortOrder: number;
  options?: string[];
}

export interface CategoryForm {
  name: string;
  slug: string;
  description: string;
  parentId: string;
  image: string;
  sortOrder: number;
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    canonicalUrl: string;
    robots: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
  };
}
