"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { useTransition } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

type IconType =
  | React.ComponentType<{ className?: string; strokeWidth?: number }>
  | ReactNode;

export const buttonVariants = {
  base: "relative inline-flex animate-in fade-in zoom-in whitespace-nowrap items-center justify-center cursor-pointer rounded-md font-bold transition-all duration-200 overflow-hidden focus:outline-none active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 group",
  variants: {
    default:
      "border border-input-border shadow-sm text-sm text-foreground font-medium",
    simple:
      "flex cursor-pointer items-center gap-1.5 text-[11px] font-bold  hover:text-primary text-primary/90 transition-colors uppercase tracking-tight",
    primary:
      "bg-primary text-primary-foreground border border-border hover:border-primary hover:text-primary-foreground hover:bg-primary/80 text-sm font-medium",
    glow: "bg-primary text-white shadow-[0_0_20px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_35px_hsl(var(--primary)/0.6)] hover:-translate-y-1",
    outline:
      "border-border border-2 bg-accent hover:bg-secondary/20 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
    overlay:
      "flex items-center border bg-muted shadow-md hover:bg-primary/30 hover:ring ring-primary shadow-primary-foreground gap-1.5 cursor-pointer whitespace-nowrap px-3 py-1 text-xs font-medium text-muted-foreground transition-all duration-300",
    glass:
      "bg-white/10 backdrop-blur-md border border-white/20 text-foreground hover:bg-white/20 hover:border-white/40 shadow-xl",
    slide:
      "bg-transparent border-2 border-primary text-primary hover:text-white before:content-[''] before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-primary before:-z-10 before:transition-all before:duration-500 hover:before:w-full z-10",
    link: "bg-transparent border-none text-primary hover:underline",
    gradient:
      "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white hover:hue-rotate-15 shadow-lg",
    soft: "bg-accent border border-2 text-foreground custom-shadow hover:bg-secondary/70",
    success:
      "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/30",
    danger:
      "bg-rose-500/40 border border-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-500/30",
    cancel:
      "hover:bg-rose-100 dark:hover:bg-rose-500 rounded-full transition text-rose-600",
  },
  sizes: {
    default: "px-3 py-2 text-md",
    sm: "px-2 py-1.5 text-xs sm:px-2",
    md: "px-3 py-2.5 text-sm sm:px-6",
    lg: "px-8 py-4 text-lg",
  },
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variants;
  size?: keyof typeof buttonVariants.sizes;
  isLoading?: boolean;
  icon?: IconType;
  image?: { src: string; alt: string } | null;
  fullWidth?: boolean;
  successMessage?: string;
  iconClassName?: string;
  badge?: string | number | null;
  badgeClassName?: string;
  action?: () => Promise<{ error: boolean; message?: string }>;
  requireAreYouSure?: boolean;
  areYouSureDescription?: React.ReactNode;
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      isLoading: manualLoading,
      fullWidth,
      icon: Icon,
      image,
      iconClassName,
      successMessage,
      children,
      disabled,
      badge,
      badgeClassName,
      action,
      requireAreYouSure = false,
      areYouSureDescription = "This action cannot be undone. This will permanently delete your data from our servers.",
      onClick,
      ...props
    },
    ref,
  ) => {
    const [isPending, startTransition] = useTransition();
    const { pending } = useFormStatus();

    const isLoading = manualLoading || isPending || pending;

    const performAction = (e?: React.MouseEvent) => {
      if (!action) {
        onClick?.(e as React.MouseEvent<HTMLButtonElement>);
        if (successMessage) {
          toast.success(successMessage);
        }
        return;
      }

      startTransition(async () => {
        try {
          const data = await action();
          if (data?.error) {
            toast.error(data.message ?? "Something went wrong");
          } else {
            toast.success(
              data.message || (successMessage ?? "Action successful"),
            );
          }
        } catch (err: any) {
          console.error(err.message);
          toast.error("A network error occurred.");
        }
      });
    };

    const buttonContent = (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        onClick={!requireAreYouSure ? performAction : undefined}
        className={cn(
          buttonVariants.base,
          buttonVariants.variants[
            variant as keyof typeof buttonVariants.variants
          ],
          buttonVariants.sizes[size as keyof typeof buttonVariants.sizes],
          fullWidth && "w-full",
          className,
        )}
        {...props}
      >
        <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
        <div className="flex items-center gap-2 relative z-20">
          {isLoading ? (
            <Loader2Icon size={18} className="animate-spin" />
          ) : (
            <>
              {typeof Icon === "function" ? (
                <Icon
                  className={`h-5 w-5 ${iconClassName}`}
                  strokeWidth={1.5}
                />
              ) : (
                Icon
              )}
              {image?.src && (
                <Image
                  height={18}
                  width={18}
                  src={image.src}
                  className="w-4.5 h-4.5 object-contain"
                  alt={image.alt || "button icon"}
                />
              )}
            </>
          )}
          {children && <span>{children}</span>}
          {badge !== undefined && badge !== null && (
            <span
              className={cn(
                "absolute -top-2 -right-2 flex h-5 min-w-2.5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold shadow-sm ring-2 bg-primary transition-transform duration-300 group-hover:scale-110 z-999999",
                badgeClassName,
              )}
            >
              {badge}
            </span>
          )}
        </div>
      </button>
    );

    return (
      <div>
        {requireAreYouSure ? (
          <AlertDialog animation="bounce" position="center">
            <AlertDialogTrigger asChild>{buttonContent}</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  {areYouSureDescription}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => performAction()}
                  disabled={isLoading}
                >
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          buttonContent
        )}
      </div>
    );
  },
);

Button.displayName = "Button";

export { Button };
