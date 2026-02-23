"use client";
import { SignUp } from "@/actions/sign-up";
import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { usePathname } from "next/navigation";
import { useActionState } from "react";
import { Card, CardContent } from "../ui/card";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import Input from "./input";
import SocialButtons from "./social-buttons";

export default function AuthForm() {
  const params = usePathname();
  const [state, formAction, isLoading] = useActionState(SignUp, {
    success: false,
    errors: null,
    inputs: null,
    message: null,
  });
  const isRegister = params.includes("/sign-up") ? true : false;

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
          <CardContent>
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
                  defaultValue={state?.data?.name}
                />
              )}
              <Input
                type="email"
                label="Enter Email Address"
                name="email"
                placeholder="Enter Your Email Address"
                defaultValue={state?.data?.email}
              />
              <Input
                type="password"
                label="Enter Password"
                // forgotPassword={
                //   !isRegister
                //     ? {
                //         label: "Forgot Password?",
                //         // onClick: handleForgotPassword,
                //       }
                //     : undefined
                // }
                name="password"
                placeholder="Enter Your Password"
              />

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
