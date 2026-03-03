import { AvailableAttribute } from "@/@types/admin/available-attribute";

export const AVAILABLE_ATTRIBUTES: AvailableAttribute[] = [
  {
    id: "brand",
    name: "Brand",
    type: "text",
    description: "Product brand name",
  },
  {
    id: "color",
    name: "Color",
    type: "select",
    options: ["Red", "Blue", "Green", "Black", "White"],
    description: "Product color",
  },
  {
    id: "size",
    name: "Size",
    type: "select",
    options: ["XS", "S", "M", "L", "XL", "XXL"],
    description: "Product size",
  },
  {
    id: "weight",
    name: "Weight",
    type: "number",
    description: "Product weight in kg",
  },
  {
    id: "material",
    name: "Material",
    type: "text",
    description: "Product material composition",
  },
  {
    id: "warranty",
    name: "Warranty",
    type: "select",
    options: ["No Warranty", "6 Months", "1 Year", "2 Years", "Lifetime"],
    description: "Warranty period",
  },
  {
    id: "country",
    name: "Country of Origin",
    type: "text",
    description: "Manufacturing country",
  },
  {
    id: "rating",
    name: "Rating",
    type: "number",
    description: "Product rating (1-5)",
  },
  {
    id: "inStock",
    name: "In Stock",
    type: "boolean",
    description: "Availability status",
  },
  { id: "sku", name: "SKU", type: "text", description: "Stock keeping unit" },
];
