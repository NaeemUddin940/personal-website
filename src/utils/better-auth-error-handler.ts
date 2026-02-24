/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ReturnType } from "@/@types/return-type";
import { AUTH_ERROR_RESPONSE } from "@/constant/error/auth-error-response";

/**
 * @param error - The error object received from BetterAuth
 * @param data - The input data passed to the auth function (typed as Generic T)
 */
export const betterAuthErrorHandler = (
  error: any,
  data: any,
): Promise<ReturnType> => {
  // টাইপ সেফটি নিশ্চিত করতে এবং undefined রিটার্ন এড়াতে ডিফল্ট চেক
  if (!error) {
    return {
      ...AUTH_ERROR_RESPONSE.INTERNAL_SERVER_ERROR,
      message: "❌ An unexpected error occurred",
      inputs: data,
    };
  }

  switch (error.message) {
    case "Invalid email or password":
      return {
        ...AUTH_ERROR_RESPONSE.INVALID_CREDENTIALS,
        inputs: data,
      };
    case "Email not verified":
      return {
        ...AUTH_ERROR_RESPONSE.EMAIL_NOT_VERIFIED,
        inputs: data,
      };
    case "User already exists":
      return {
        ...AUTH_ERROR_RESPONSE.USER_ALREADY_EXISTS,
        inputs: data,
      };
    default:
      return {
        ...AUTH_ERROR_RESPONSE.INTERNAL_SERVER_ERROR,
        inputs: data,
      };
  }
};
