"use server";
import { FormState } from "@/@types/form-state";
import { ReturnType } from "@/@types/return-type";
import { AUTH_ERROR_RESPONSE } from "@/constant/error/auth-error-response";
import { AUTH_SUCCESS_RESPONSE } from "@/constant/success/auth-success-response";
import { auth } from "@/lib/auth";
import { betterAuthErrorHandler } from "@/utils/better-auth-error-handler";
import { validateSchema } from "@/utils/validate-schema";
import { SignInInput, signInSchema } from "@/validation/sign-in-schema";
import { headers } from "next/headers";

// Zod schema theke type-ta auto-generate korlam

export const SignIn = async (
  _formState: FormState,
  formData: FormData,
): Promise<ReturnType> => {
  // validateSchema-ke bolte hobe eta SignInInput return korbe
  const result = validateSchema<SignInInput>(signInSchema, formData);

  if (!result.success) {
    // Ekhane result-e 'errors' ebong 'inputs' thakbe ja ReturnType-er sathe compatible hote hobe
    return result as ReturnType;
  }

  // Ekhon result.data-te email ebong password type-safe thakbe
  const { email, password } = result.data as any;

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
    // Note: betterAuthErrorHandler jodi ReturnType return kore, tobe nichei sesh
    console.error(AUTH_ERROR_RESPONSE.SIGN_UP_FAILED.message, error);

    // Catch block-e return er por arekta return kaj korbe na, tai ektai rakhun
    return betterAuthErrorHandler(error, result.data);
  }
};
