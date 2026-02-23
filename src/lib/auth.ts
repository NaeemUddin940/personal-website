import sendEmail from "@/services/email-send";
import { passwordResetTemplate } from "@/services/email-template/password-reset-template";
import { sentOtpTemplate } from "@/services/email-template/sent-otp-template";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  session: {
    expiresIn: 5 * 60 * 60,
    updateAge: 3 * 60 * 60,
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    maxPasswordLength: 16,
    minPasswordLength: 8,
    sendResetPassword: async ({ user, url, token }) => {
      console.log("user", user);
      try {
        await sendEmail({
          email: user.email,
          subject: "Password Reset email Sent.",
          template: passwordResetTemplate(
            user.name,
            `${url}?token=${token}`,
            process.env.COMPANY_NAME,
          ),
          text: `Click the link to verify your email: ${url}`,
        });
      } catch (error: any) {
        console.log("Failed to sent Password Reset Link:", error);
      }
    },
  },

  plugins: [
    nextCookies(),
    emailOTP({
      otpLength: 6,
      allowedAttempts: 2,
      expiresIn: 60 * 5, // 5 minutes
      overrideDefaultEmailVerification: true,
      sendVerificationOTP: async ({ email, otp, type }) => {
        try {
          console.log(`Sending code ${otp} to ${email}, type ${type}`);
          if (type === "email-verification") {
            await sendEmail({
              email,
              subject: `Verify your account - ${process.env.COMPANY_NAME}`,
              template: sentOtpTemplate(
                process.env.COMPANY_NAME,
                process.env.COMPANY_EMAIL,
                otp,
              ),
              text: `${otp} is your verification code`,
            });
          }
        } catch (error: any) {
          console.error("Email sending failed:", error);
        }
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
      },
      isBlocked: {
        type: "boolean",
        defaultValue: false,
      },
      image: {
        type: "string",
      },
    },
  },

  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    facebook: {
      prompt: "select_account",
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    },
  },
});
