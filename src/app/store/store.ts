import CategoryReducer from "@/app/features/category/categorySlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    category: CategoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
