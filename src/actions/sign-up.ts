"use server";
import { FormState } from "@/@types/form-state";
import { ReturnType } from "@/@types/return-type";
import { AUTH_ERROR_RESPONSE } from "@/constant/error/auth-error-response";
import { AUTH_SUCCESS_RESPONSE } from "@/constant/success/auth-success-response";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { validateSchema } from "@/utils/validate-schema";
import { SignUpInput, signUpSchema } from "@/validation/sign-up-schema";
import { headers } from "next/headers";

export const SignUp = async (
  _formState: FormState,
  formData: FormData,
): Promise<ReturnType> => {
  const result = validateSchema<SignUpInput>(signUpSchema, formData);
  if (!result.success) {
    return result as SignUpInput;
  }

  const { name, email, password } = result.data as any;
  try {
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      return {
        ...AUTH_ERROR_RESPONSE.USER_ALREADY_EXISTS,
        inputs: result.data,
      };
    }

    const newUser = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
      headers: await headers(),
    });

    const data = await auth.api.sendVerificationOTP({
      body: {
        email,
        type: "email-verification",
      },
    });
    if (!data.success) {
      return AUTH_ERROR_RESPONSE.EMAIL_SEND_FAILED;
    }

    if (newUser) {
      return AUTH_SUCCESS_RESPONSE.SIGN_UP;
    }
  } catch (error: any) {
    console.log(AUTH_ERROR_RESPONSE.SIGN_UP_FAILED.message, error);
    return {
      ...AUTH_ERROR_RESPONSE.SIGN_UP_FAILED,
      inputs: result.data,
    };
  }
};
