"use server"
import { AUTH_ERROR_RESPONSE } from "@/constant/error/auth-error-response";
import { AUTH_SUCCESS_RESPONSE } from "@/constant/success/auth-success-response";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const sentPasswordResetEmail = async (email) => {
  try {
    const isUserExist = await prisma.user.findFirst({
      where: { email },
    });

    if (!isUserExist) {
      return AUTH_ERROR_RESPONSE.USER_NOT_FOUND;
    }

    await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: "/forgot-password",
      },
    });

    return AUTH_SUCCESS_RESPONSE.SEND_PASSWORD_RESET;
  } catch (error: any) {
    console.log(AUTH_ERROR_RESPONSE.SEND_PASSWORD_RESET_FAILED.message, error);
    return AUTH_ERROR_RESPONSE.SEND_PASSWORD_RESET_FAILED;
  }
};
