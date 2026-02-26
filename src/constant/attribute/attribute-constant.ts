import {
  AlertCircle,
  Eye,
  Filter,
  Fingerprint,
  Layers,
  Search,
} from "lucide-react";

export const ATTRIBUTE_GROUPS = [
  { value: "BASIC", label: "Basic" },
  { value: "TECHNICAL", label: "Technical" },
  { value: "PHYSICAL", label: "Physical" },
  { value: "PACKAGING", label: "Packaging" },
  { value: "WARRANTY", label: "Warranty" },
  { value: "SHIPPING", label: "Shipping" },
  { value: "SEO", label: "SEO" },
  { value: "MARKETING", label: "Marketing" },
  { value: "INVENTORY", label: "Inventory" },
  { value: "PRICING", label: "Pricing" },
  { value: "CUSTOM", label: "Custom" },
];

export const ATTRIBUTE_TYPES = [
  { value: "TEXT", label: "Text", group: "basic" },
  { value: "TEXTAREA", label: "Text Area", group: "basic" },
  { value: "NUMBER", label: "Number", group: "basic" },
  { value: "BOOLEAN", label: "Boolean (Yes/No)", group: "basic" },
  { value: "SELECT", label: "Select Dropdown", group: "select" },
  { value: "MULTISELECT", label: "Multi Select", group: "select" },
  { value: "RADIO", label: "Radio Button", group: "select" },
  { value: "CHECKBOX", label: "Checkbox", group: "select" },
  { value: "COLOR", label: "Color", group: "visual" },
  { value: "SIZE", label: "Size", group: "visual" },
  { value: "IMAGE", label: "Image", group: "media" },
  { value: "FILE", label: "File", group: "media" },
  { value: "DATE", label: "Date", group: "temporal" },
  { value: "DATETIME", label: "Date & Time", group: "temporal" },
  { value: "RANGE", label: "Range", group: "numeric" },
  { value: "PRICE", label: "Price", group: "numeric" },
  { value: "PERCENTAGE", label: "Percentage", group: "numeric" },
  { value: "WEIGHT", label: "Weight", group: "physical" },
  { value: "DIMENSION", label: "Dimension", group: "physical" },
  { value: "URL", label: "URL", group: "basic" },
  { value: "EMAIL", label: "Email", group: "basic" },
  { value: "PHONE", label: "Phone", group: "basic" },
  { value: "RATING", label: "Rating", group: "numeric" },
  { value: "JSON", label: "JSON", group: "advanced" },
];

export const TOGGLE_FLAG = [
  { id: "isVariation", label: "Use for Variations", icon: Layers },
  { id: "isFilterable", label: "Enable in Sidebar Filters", icon: Filter },
  { id: "isSearchable", label: "Allow Value Search", icon: Search },
  { id: "isRequired", label: "Mandatory Selection", icon: AlertCircle },
  { id: "isVisible", label: "Publicly Visible", icon: Eye },
  { id: "isUnique", label: "Unique Value", icon: Fingerprint },
];

export const STATUS_OPTIONS = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "DRAFT", label: "Draft" },
  { value: "ARCHIVED", label: "Archived" },
];

export const VISIBILITY_OPTIONS = [
  { value: "PUBLIC", label: "Public" },
  { value: "PRIVATE", label: "Private" },
  { value: "HIDDEN", label: "Hidden" },
];

export const SWATCH_TYPES = [
  { value: "TEXT", label: "Text" },
  { value: "COLOR", label: "Color" },
  { value: "IMAGE", label: "Image" },
  { value: "ICON", label: "Icon" },
  { value: "GRADIENT", label: "Gradient" },
  { value: "PATTERN", label: "Pattern" },
];
