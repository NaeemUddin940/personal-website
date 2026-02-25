"use server";
import { ReturnType } from "@/@types/return-type";

export const CreateAttribute = async (
  formData: FormData,
): Promise<ReturnType> => {
  //  const result = validateSchema(signUpSchema, formData);
  //   if (!result.success) {
  // return result as SignUpInput;
  //   }
  console.log(formData);
};
