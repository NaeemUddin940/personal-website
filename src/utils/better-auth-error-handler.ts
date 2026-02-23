import { AUTH_ERROR_RESPONSE } from "@/constant/error/auth-error-response";

export const betterAuthErrorHandler = (error, data) => {
  if (!error) return;
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
