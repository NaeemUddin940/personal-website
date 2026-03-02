import { Attribute, AttributeCreateInput } from "@/@types/attribute/attribute";
import { createSlice } from "@reduxjs/toolkit";

interface AttributeState {
  attributes: Attribute[];
  formData: AttributeCreateInput;
}

const initialState: AttributeState = {
  attributes: [],
  formData: {
    // Basic Infromation
    name: "",
    slug: "",
    type: "TEXT",
    group: "BASIC",
    status: "ACTIVE",
    visibility: "PUBLIC",

    // --- Behavior Configuration ---
    isGlobal: true,
    isRequired: false,
    isUnique: false,
    isFilterable: true,
    isSearchable: true,
    isComparable: true,
    isVariation: false,
    isVisible: true,

    // Display Settings
    label: "",
    placeholder: "",
    helpText: "",
    unit: "",
    unitPosition: "",
    cssClass: "",
    icon: "",

    // --- Validation Settings (Conditional) ---
    validations: [],
    stepValue: 1,
    sortOrder: 0,
    decimalPlaces: 0,
    // --- Values Area ---
    values: [
      {
        value: "RED",
        slug: "red",
        swatchType: "COLOR",
        swatchValue: "#ff0000",
        isDefault: false,
      },
    ],

    // options: [], // Reserved for future meta-configurations
    options: [],
  },
};

const attributeSlice = createSlice({
  name: "attribute",
  initialState,
  reducers: {},
});

export default attributeSlice.reducer;
