"use client";

import Input from "@/components/common/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/utils/auth-client"; // Better-Auth client
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // URL theke token neya (Better-Auth reset link e thake)
  const token = searchParams.get("token");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // 1. Client-side Validation
    if (password !== confirmPassword) {
      toast.error("❌ Passwords do not match!");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      toast.error("❌ Password must be at least 8 characters.");
      setIsLoading(false);
      return;
    }

    // 2. Better-Auth Reset Call
    const { error } = await authClient.resetPassword({
      newPassword: password,
      token: token ?? "",
    });

    if (error) {
      if (error.code === "INVALID_TOKEN") {
        toast.error(
          "🔗 Invalid or expired reset link. Please request a new one.",
        );
        console.log(error);
      } else {
        toast.error(error.message || "❌ Failed to reset password.");
      }
    } else {
      toast.success("✅ Password updated successfully!");
      router.push("/auth/sign-in");
    }
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        label="New Password"
        type="password"
        name="password"
        placeholder="Minimum 8 characters"
        required
      />
      <Input
        label="Confirm New Password"
        type="password"
        name="confirmPassword"
        placeholder="Repeat your password"
        required
      />
      <Button
        variant="glow"
        type="submit"
        isLoading={isLoading}
        className="w-full"
      >
        Update Password
      </Button>
    </form>
  );
}
