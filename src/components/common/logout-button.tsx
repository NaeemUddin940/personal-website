"use client";
import { authClient } from "@/utils/auth-client";
import { Button } from "../ui/button";

export default function LogoutButton({
  size,
  className,
  fullWidth,
}: {
  size: string;
  className: string;
  fullWidth: boolean;
}) {
  return (
    <Button
      variant="danger"
      size={size}
      className={className}
      fullWidth={fullWidth}
      onClick={async () => await authClient.signOut()}
    >
      Logout
    </Button>
  );
}
