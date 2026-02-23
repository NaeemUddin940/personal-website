"use client";
import { AUTH_SUCCESS_RESPONSE } from "@/constant/success/auth-success-response";
import { authClient } from "@/utils/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

export default function LogoutButton({
  size = "default",
  className,
  fullWidth,
}: {
  size?: any; // আপনার Button কম্পোনেন্টের টাইপ অনুযায়ী
  className?: string;
  fullWidth?: boolean;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success(AUTH_SUCCESS_RESPONSE.LOGOUT.message);
          router.push("/auth/sign-in"); // সাকসেস হলে রিডাইরেক্ট
          router.refresh(); // পেজ স্টেট ক্লিয়ার করতে রিফ্রেশ জরুরি
        },
      },
    });
    setIsLoading(false);
  };

  return (
    <Button
      variant="danger"
      size={size}
      className={className}
      fullWidth={fullWidth}
      disabled={isLoading} // লোডিং অবস্থায় বাটন ডিসেবল থাকবে
      onClick={handleLogout}
    >
      {isLoading ? "Logging out..." : "Logout"}
    </Button>
  );
}
