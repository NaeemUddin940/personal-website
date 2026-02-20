import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

interface LinkProps {
  path: string;
  text: string;
  icon?: ReactNode;
  className?: string;
}

export default function CustomLink({ path, text, icon, className }: LinkProps) {
  return (
    <Link
      href={path}
      className={cn(
        `flex items-center bg-muted shadow-md hover:bg-primary/30 hover:ring ring-primary dark:shadow-primary-foreground gap-1.5 cursor-pointer whitespace-nowrap px-3 py-1 text-xs font-medium text-muted-foreground rounded-full transition-all duration-300 `,
        className,
      )}
    >
      {icon && <span className="text-sm">{icon}</span>}
      <span className="text-shadow-2xs">{text}</span>
    </Link>
  );
}
