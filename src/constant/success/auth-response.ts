export const AUTH_SUCCESS_RESPONSE = {
  LOGOUT: {
    success: true,
    action: "LOGOUT",
    message: "✅ Logout successful. Redirecting to sign-in page.",
    status: 200,
  },
  SIGN_UP: {
    success: true,
    action: "SIGN_UP",
    message: "🚀 Account created successfully! Please verify your email.",
    status: 201,
  },
  SIGN_IN: {
    success: true,
    action: "SIGN_IN",
    message: "🔑 Login successful! Welcome back.",
    status: 200,
  },
  SEND_PASSWORD_RESET: {
    success: true,
    action: "SEND_PASSWORD_RESET",
    message:
      "✅ Password reset email sent successfully. Please check your inbox and spam folder.",
    status: 200,
  },
};
