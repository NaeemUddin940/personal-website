export const AUTH_ERROR_RESPONSE = {
  USER_ALREADY_EXISTS: {
    success: false,
    action: "USER_ALREADY_EXISTS",
    message:
      "👤 An account already exists with this email. 🔑 Please try logging in.",
    status: 409,
  },
  SIGN_UP_FAILED: {
    success: false,
    action: "SIGN_UP_FAILED",
    message:
      "🚫 Sign Up failed! Something went wrong on our end. Please try again.",
    status: 500,
  },
  INVALID_CREDENTIALS: {
    success: false,
    action: "INVALID_CREDENTIALS",
    message:
      "🔐 Invalid email or password. Please check your credentials and try again.",
    status: 401,
  },
  EMAIL_NOT_VERIFIED: {
    success: false,
    action: "EMAIL_NOT_VERIFIED",
    message:
      "📧 Your email is not verified. Please check your inbox for the verification link.",
    status: 403,
  },
  INTERNAL_SERVER_ERROR: {
    success: false,
    action: "INTERNAL_SERVER_ERROR",
    message:
      "💥 Oops! Something went wrong on our end. Please try again later.",
    status: 500,
  },
};
