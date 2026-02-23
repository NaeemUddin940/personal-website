"use client";

import AuthForm from "@/app/(public)/auth/components/auth-form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

export default function SignIpModalPage() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Dialog open={isOpen} animationType="bounce" onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl">
        <AuthForm closeModal={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
