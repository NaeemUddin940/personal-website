"use server";
import { FormState } from "@/@types/form-state";
import { AUTH_ERROR_RESPONSE } from "@/constant/error/auth-error-response";
import { AUTH_SUCCESS_RESPONSE } from "@/constant/success/auth-success-response";
import { auth } from "@/lib/auth";
import { betterAuthErrorHandler } from "@/utils/better-auth-error-handler";
import { validateSchema } from "@/utils/validate-schema";
import { signInSchema } from "@/validation/sign-in-schema";
import { headers } from "next/headers";

export const SignIn = async (formState: FormState, formData: FormData) => {
  const result = validateSchema(signInSchema, formData);
  if (!result.success) {
    return result;
  }

  const { email, password } = result.data;
  try {
    const signInResponse = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: await headers(),
    });

    return {
      ...AUTH_SUCCESS_RESPONSE.SIGN_IN,
      data: { role: signInResponse.user?.role },
    };
  } catch (error: any) {
    console.log(AUTH_ERROR_RESPONSE.SIGN_UP_FAILED.message, error.message);
    return betterAuthErrorHandler(error, result.data);
    return {
      ...AUTH_ERROR_RESPONSE.SIGN_UP_FAILED,
      inputs: result.data,
    };
  }
};
