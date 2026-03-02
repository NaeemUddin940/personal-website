// types/attribute.types.ts

import { Category } from "../category/category";
import { CategoryAttribute } from "../category/category-attribute";
import {
  AttributeGroup,
  AttributeStatus,
  AttributeType,
  AttributeValidation,
  AttributeVisibility,
  SwatchType,
} from "./enum";

// Option interface for select/multiselect
export interface AttributeOption {
  value: string;
  label: string;
  disabled?: boolean;
  swatch?: AttributeSwatch;
}

// Validation rule interface
export interface AttributeValidationRule {
  type: AttributeValidation;
  value?: any;
  message?: string;
}

// Swatch interface
export interface AttributeSwatch {
  type: SwatchType;
  value: string; // hex code, image URL, text, icon name
  metadata?: Record<string, any>;
}

// Main Attribute Interface
export interface Attribute {
  id: string;
  name: string;
  slug: string;
  type: AttributeType;
  group: AttributeGroup;

  // Display settings
  label: string | null;
  placeholder: string | null;
  helpText: string | null;
  unit: string | null;
  unitPosition: string | null;

  // Options for select/multiselect
  options: AttributeOption[] | null;

  // Validation rules
  validations: AttributeValidationRule[] | null;

  // Numeric constraints
  minValue: number | null;
  maxValue: number | null;
  minLength: number | null;
  maxLength: number | null;
  stepValue: number;
  decimalPlaces: number;

  // Boolean settings
  isRequired: boolean;
  isUnique: boolean;
  isFilterable: boolean;
  isVisible: boolean;
  isVariation: boolean;
  isSearchable: boolean;
  isGlobal: boolean;

  // UI settings
  sortOrder: number;
  visibility: AttributeVisibility;
  cssClass: string | null;
  icon: string | null;

  // Status
  status: AttributeStatus;

  // Meta data
  metaData: Record<string, any> | null;

  // Relations
  values?: AttributeValue[];
  categories?: CategoryAttribute[];
  originCategory?: Category | null;
  originCategoryId: string | null;

  // System
  createdBy: string | null;
  updatedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

// Attribute Value Interface
export interface AttributeValue {
  id: string;
  attributeId: string;
  attribute?: Attribute;

  // Value
  value: string;
  slug: string;

  // Swatch
  swatchType: SwatchType | null;
  swatchValue: string | null;

  // Additional data
  description: string | null;
  image: string | null;
  colorCode: string | null;
  metadata: Record<string, any> | null;

  // Sorting
  sortOrder: number;

  // Status
  isActive: boolean;
  isDefault: boolean;

  // System
  createdBy: string | null;
  updatedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Attribute Create Input
export interface AttributeCreateInput {
  name: string;
  slug?: string;
  type: AttributeType;
  group?: AttributeGroup;

  label?: string | null;
  placeholder?: string | null;
  helpText?: string | null;
  unit?: string | null;
  unitPosition?: string | null;

  options?: AttributeOption[] | null;
  validations?: AttributeValidationRule[] | null;

  minValue?: number | null;
  maxValue?: number | null;
  minLength?: number | null;
  maxLength?: number | null;
  stepValue?: number;
  decimalPlaces?: number;

  isRequired?: boolean;
  isUnique?: boolean;
  isFilterable?: boolean;
  isVisible?: boolean;
  isVariation?: boolean;
  isSearchable?: boolean;
  isGlobal?: boolean;

  sortOrder?: number;
  visibility?: AttributeVisibility;
  cssClass?: string | null;
  icon?: string | null;

  status?: AttributeStatus;
  metaData?: Record<string, any> | null;

  originCategoryId?: string | null;
}

// Attribute Update Input
export type AttributeUpdateInput = Partial<Omit<AttributeCreateInput, "slug">>;

// Attribute Value Create Input
export interface AttributeValueCreateInput {
  value: string;
  slug?: string;
  swatchType?: SwatchType | null;
  swatchValue?: string | null;
  description?: string | null;
  image?: string | null;
  colorCode?: string | null;
  metadata?: Record<string, any> | null;
  sortOrder?: number;
  isActive?: boolean;
  isDefault?: boolean;
}

// Attribute Value Update Input
export type AttributeValueUpdateInput = Partial<AttributeValueCreateInput>;
