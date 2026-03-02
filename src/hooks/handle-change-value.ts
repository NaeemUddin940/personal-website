import { setFormData } from "@/app/features/category/categorySlice";
import { useAppDispatch } from "@/app/store/hooks";

export const useChangeValue = () => {
  const dispatch = useAppDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    dispatch(
      setFormData({
        field: e.target.name as any,
        value: e.target.value,
      }),
    );
  };

  return { handleChange };
};
