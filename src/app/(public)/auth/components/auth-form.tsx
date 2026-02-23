"use client";
import { sentPasswordResetEmail } from "@/actions/sent-password-reset-email";
import { SignIn } from "@/actions/sign-in";
import { SignUp } from "@/actions/sign-up";
import Input from "@/components/common/input";
import SocialButtons from "@/components/common/social-buttons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { usePathname, useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AuthForm(closeModal) {
  const params = usePathname();
  const router = useRouter();
  const [email, setEmail] = useState("");

  const isRegister = params.includes("/sign-up") ? true : false;
  const [state, formAction, isLoading] = useActionState(
    isRegister ? SignUp : SignIn,
    {
      success: false,
      action: null,
      errors: null,
      inputs: null,
      message: null,
      data: null,
    },
  );

  useEffect(() => {
    if (!state?.message) return;

    if (state?.success) {
      toast.success(state?.message);

      if (state?.action === "SIGN_IN") {
        const role = state.data?.role;

        if (typeof closeModal === "function") {
          closeModal(false);
        }
        if (role === "admin") {
          router.push("/admin/dashboard");
          router.refresh();
        } else {
          router.refresh();
          router.push("/");
        }
      }
    } else {
      toast.error(state?.message);
    }
  }, [state, router, closeModal]);

  // Components/ForgotPassword.tsx
  async function requestPasswordEmailSent() {
    // Call the server action
    const response = await sentPasswordResetEmail(email);

    if (response.success) {
      toast.success(response.message);
      console.log("Success:", response.action);
    } else {
      toast.error(response.message);
      console.log("Error:", response.action);
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-stretch w-full max-h-120">
      {/* LEFT SIDE: Animation - flex-1 and self-stretch ensures it fills the height */}
      <div className="hidden md:flex flex-1 items-center justify-center p-4">
        <div className="w-full h-full min-h-87.5 flex items-center justify-center">
          <DotLottieReact
            src="/auth.lottie"
            className="w-full h-full object-contain transform scale-110"
            loop
            autoplay
          />
        </div>
      </div>

      {/* RIGHT SIDE: Form */}
      <div className="flex-1 w-full flex flex-col justify-center">
        <Card className="bg-secondary/50">
          <CardContent className="w-md">
            <DialogHeader className="items-center text-center">
              <DialogTitle className="text-3xl font-bold mb-2">
                {isRegister ? "Create Account" : "Welcome Back"}
              </DialogTitle>
              <DialogDescription className="mb-3">
                {isRegister
                  ? "Enter your details below to create your account"
                  : "Enter your credentials to access your account"}
              </DialogDescription>
            </DialogHeader>

            <form action={formAction} className="space-y-4 mb-4">
              {isRegister && (
                <Input
                  label="Enter Full Name"
                  name="name"
                  placeholder="Enter Your Full Name"
                  defaultValue={state?.inputs?.name}
                  error={state?.errors?.name}
                />
              )}
              <Input
                type="email"
                label="Enter Email Address"
                name="email"
                placeholder="Enter Your Email Address"
                defaultValue={state?.inputs?.email}
                error={state?.errors?.email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                label="Enter Password"
                forgotPassword={{
                  label: "Forgot Password?",
                  onClick: () => requestPasswordEmailSent(),
                }}
                name="password"
                placeholder="Enter Your Password"
                error={state?.errors?.password}
              />
              {!isRegister && (
                <Input
                  type="password"
                  label="Enter Confirm Password"
                  name="confirmPassword"
                  placeholder="Enter Your Confirm Password"
                  error={state?.errors?.confirmPassword}
                />
              )}

              <Button
                fullWidth
                type="submit"
                variant="primary"
                isLoading={isLoading}
                className="w-full h-11 mt-2"
              >
                {isRegister ? "Register" : "Login"}
              </Button>
            </form>
            <SocialButtons />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
