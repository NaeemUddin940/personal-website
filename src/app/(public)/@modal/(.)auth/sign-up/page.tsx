"use client";
import AuthForm from "@/components/common/auth-form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function SignUpModalPage() {
  const router = useRouter();

  // মডাল বন্ধ করলে আগের পেজে ফিরে যাওয়ার জন্য
  const onOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };
  return (
    <Dialog open={true} animationType="bounce" onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <AuthForm />
      </DialogContent>
    </Dialog>
  );
}
