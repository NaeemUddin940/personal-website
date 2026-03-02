// types/category-attribute.types.ts

// Main Category-Attribute Pivot Interface
export interface CategoryAttribute {
  categoryId: string;
  category?: Category;

  attributeId: string;
  attribute?: Attribute;

  // Override fields
  isRequired: boolean;
  sortOrder: number;
  overrideLabel: string | null;
  overrideHelpText: string | null;
  isFilterable: boolean | null;
  isVisible: boolean;

  // Default value (supports any type)
  defaultValue: any | null;

  // System
  createdAt: Date;
  updatedAt: Date;
}

// Category Attribute Create Input
export interface CategoryAttributeCreateInput {
  attributeId: string;
  isRequired?: boolean;
  sortOrder?: number;
  overrideLabel?: string | null;
  overrideHelpText?: string | null;
  isFilterable?: boolean | null;
  isVisible?: boolean;
  defaultValue?: any | null;
}

// Category Attribute Update Input
export type CategoryAttributeUpdateInput =
  Partial<CategoryAttributeCreateInput>;

// Category Attribute with Attribute details
export interface CategoryAttributeWithAttribute extends CategoryAttribute {
  attribute: Attribute;
}

// Category Attribute List
export interface CategoryAttributeList {
  categoryId: string;
  attributes: CategoryAttributeWithAttribute[];
}
