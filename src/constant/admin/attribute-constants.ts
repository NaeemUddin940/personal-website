export const AttributeTabType =
  "basic-info" | "display-settings" | "validations";

export const ATTR_TABS = {
  BASIC_INFO: [
    "name",
    "slug",
    "type",
    "group",
    "status",
    "visibility",
    "isRequired",
    "isUnique",
    "isFilterable",
    "isVisible",
    "isVariation",
    "isSearchable",
    "isGlobal",
  ],
  DISPLAY_SETTINGS: [
    "label",
    "placeholder",
    "helpText",
    "unit",
    "unitPosition",
    "sortOrder",
    "cssClass",
    "icon",
  ],
  VALIDATIONS: [
    "minValue",
    "maxValue",
    "stepValue",
    "decimalPlaces",
    "minLength",
    "maxLength",
    "validations",
  ],
} as const;

export const attributeTabsTrigger = [
  {
    id: "basic-info",
    label: "Basic Info",
    // Validation-required fields only
    fields: [
      "name",
      "slug",
      "type",
      "group",
      "isRequired",
      "isUnique",
      "isFilterable",
      "isVisible",
      "isVariation",
      "isSearchable",
      "isGlobal",
      "status",
      "visibility",
    ],
  },
  {
    id: "display-settings",
    label: "Display Settings",
    fields: [
      "label",
      "placeholder",
      "helpText",
      "unit",
      "unitPosition",
      "sortOrder",
      "cssClass",
      "icon",
    ],
  },
  {
    id: "validations",
    label: "Validations & Options",
    fields: [
      "minValue",
      "maxValue",
      "stepValue",
      "decimalPlaces",
      "minLength",
      "maxLength",
      "validations",
    ],
  },
];

export const getAttributeTabError = (tab: TabType, errors: any) => {
  if (tab === "basic-info" && errors?.basicInfo) return true;
  if (tab === "display-settings" && errors?.displaySettings) return true;
  if (tab === "validations" && errors?.validation) return true;
  return false;
};
