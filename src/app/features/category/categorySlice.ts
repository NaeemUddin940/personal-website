import { Category, CategoryCreateInput } from "@/@types/category/category";
import { createSlice } from "@reduxjs/toolkit";

interface CategoryState {
  categories: Category[];
  formData: CategoryCreateInput;
}

const initialState: CategoryState = {
  categories: [],
  formData: {
    name: "",
    slug: "",
    description: "",
    status: "ACTIVE",
    parentId: null,
    image: "",
    sortOrder: 0,
    seo: null,
    attributes: [],
  },
};

const categorySlice = createSlice({
  name: "Category",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<CategoryFieldUpdate>) => {
      const { field, value } = action.payload;
      (state.formData as any)[field] = value;
      console.log(action);
    },
  },
});

export const { setFormData } = categorySlice.actions;

export default categorySlice.reducer;
