import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  session: {
    expiresIn: 5 * 60 * 60,
    updateAge: 3 * 60 * 60,
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
      isDeleted: {
        type: "boolean",
        defaultValue: false,
      },
      failedLoginAttempts: {
        type: "number",
        defaultValue: 0,
      },
      accountLockedUntil: {
        type: "date",
      },
      lastLoginAt: {
        type: "date",
      },
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    },
  },
});
