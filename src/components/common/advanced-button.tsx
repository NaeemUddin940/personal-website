"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/component/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Eye, Loader2Icon, Minus, Pencil, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { useTransition } from "react";
import toast from "react-hot-toast";

type IconType =
  | React.ComponentType<{ className?: string; strokeWidth?: number }>
  | React.ReactNode;

export const buttonVariants = {
  base: "relative inline-flex animate-in fade-in zoom-in whitespace-nowrap items-center justify-center cursor-pointer rounded-md font-bold transition-all duration-200 overflow-hidden focus:outline-none active:scale-95 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 group",
  variants: {
    default:
      "border border-zinc-200 dark:border-zinc-800 shadow-sm text-sm text-foreground font-medium bg-white dark:bg-zinc-950",
    simple:
      "flex cursor-pointer items-center gap-1.5 text-[11px] font-bold hover:text-indigo-600 text-indigo-500 transition-colors uppercase tracking-tight",
    primary:
      "bg-indigo-600 text-white border border-transparent hover:bg-indigo-700 text-sm font-medium",
    glow: "bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_35px_rgba(79,70,229,0.6)] hover:-translate-y-1",
    ripple:
      "relative overflow-hidden bg-indigo-600 text-white font-medium border border-transparent rounded-md \
   after:absolute after:top-1/2 after:left-1/2 after:w-0 after:h-0 after:bg-white/30 after:rounded-full \
   after:translate-x-[-50%] after:translate-y-[-50%] after:scale-0 after:opacity-100 after:transition-all \
   hover:after:w-[200%] hover:after:h-[200%] hover:after:scale-100 hover:after:opacity-0",
    outline:
      "border-zinc-200 dark:border-zinc-800 border-2 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-foreground",
    overlay:
      "flex items-center border bg-zinc-100 dark:bg-zinc-800 shadow-md hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:ring ring-indigo-500 gap-1.5 cursor-pointer whitespace-nowrap px-3 py-1 text-xs font-medium text-zinc-500 transition-all duration-300",
    glass:
      "bg-white/10 backdrop-blur-md border border-white/20 text-foreground hover:bg-white/20 hover:border-white/40 shadow-xl",
    slide:
      "bg-transparent border-2 border-indigo-600 text-indigo-600 hover:text-white before:content-[''] before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-indigo-600 before:-z-10 before:transition-all before:duration-500 hover:before:w-full z-10",
    link: "bg-transparent border-none text-indigo-600 hover:underline",
    gradient:
      "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white hover:hue-rotate-15 shadow-lg",
    soft: "bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-foreground hover:bg-zinc-200 dark:hover:bg-zinc-700",
    success:
      "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/30",
    danger:
      "bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-500/30",
    cancel:
      "hover:bg-rose-500/10 hover:border bg-zinc-100 dark:bg-zinc-800 border-rose-500 rounded-full transition text-rose-600",
    close:
      "h-8 w-8 rounded-full p-0 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100",
    action_edit:
      "bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 p-2 rounded-lg border border-blue-100 dark:border-blue-900/30",
    action_delete:
      "bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-900/20 dark:text-rose-400 p-2 rounded-lg border border-rose-100 dark:border-rose-900/30",
    action_view:
      "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-400 p-2 rounded-lg border border-indigo-100 dark:border-indigo-900/30",
    stepper:
      "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 h-8 w-8 rounded-full p-0 border border-zinc-200 dark:border-zinc-700",
    ghost:
      "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400",
  },
  sizes: {
    default: "px-3 py-2 text-md",
    sm: "px-2 py-1.5 text-xs sm:px-2",
    md: "px-3 py-2.5 text-sm sm:px-6",
    lg: "px-8 py-4 text-lg",
    icon: "h-10 w-10 p-2",
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
  // NEW: ripple props
  ripple?: boolean; // enable ripple
  rippleColor?: string; // optional color override
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
      ripple,
      rippleColor,
      ...props
    },
    ref,
  ) => {
    const [isPending, startTransition] = useTransition();
    const isLoading = manualLoading || isPending;

    const getVariantRippleColor = (variant?: string) => {
      switch (variant) {
        case "primary":
        case "glow":
          return "rgba(255,255,255,0.4)";
        case "success":
          return "rgba(255,255,255,0.3)";
        case "danger":
          return "rgba(255,255,255,0.3)";
        case "soft":
        case "default":
          return "rgba(0,0,0,0.1)";
        case "outline":
          return "rgba(0,0,0,0.1)";
        default:
          return "rgba(255,255,255,0.3)";
      }
    };

    const performAction = (e?: React.MouseEvent) => {
      if (ripple) {
        // যদি rippleColor define থাকে, use it, otherwise auto from variant
        const variantColor = rippleColor || getVariantRippleColor(variant);
        createRipple(e, variantColor);
      }
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

    const createRipple = (
      e: React.MouseEvent<HTMLButtonElement>,
      color?: string,
    ) => {
      const button = e.currentTarget;
      const circle = document.createElement("span");
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
      circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
      circle.style.position = "absolute";
      circle.style.borderRadius = "50%";
      circle.style.pointerEvents = "none";
      circle.style.transform = "scale(0)";
      circle.style.opacity = "0.75";
      circle.style.transition = "transform 0.6s, opacity 0.6s";

      // flexible color handling
      if (!color) {
        circle.style.background = "rgba(255,255,255,0.4)"; // default
      } else if (color.startsWith("bg-") || color.startsWith("text-")) {
        // tailwind class → compute color dynamically
        const temp = document.createElement("div");
        temp.className = color;
        document.body.appendChild(temp);
        const computed =
          getComputedStyle(temp).backgroundColor ||
          getComputedStyle(temp).color;
        circle.style.background = computed;
        temp.remove();
      } else {
        // hex code or CSS variable
        circle.style.background = color;
      }

      button.appendChild(circle);

      requestAnimationFrame(() => {
        circle.style.transform = "scale(4)";
        circle.style.opacity = "0";
      });

      setTimeout(() => circle.remove(), 600);
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
              {variant === "close" && <X size={16} />}
              {variant === "action_edit" && <Pencil size={16} />}
              {variant === "action_delete" && <Trash2 size={16} />}
              {variant === "action_view" && <Eye size={16} />}

              {Icon &&
                (typeof Icon === "function" ? (
                  <Icon className={cn("h-5 w-5", iconClassName)} />
                ) : (
                  Icon
                ))}
              {image?.src && (
                <Image
                  height={100}
                  width={100}
                  src={image.src}
                  className="w-4.5 h-4.5 object-contain"
                  alt={image.alt || "button icon"}
                />
              )}
            </>
          )}
          {children && <span>{children}</span>}
        </div>
      </button>
    );

    return (
      <div className="relative inline-block">
        {requireAreYouSure ? (
          <AlertDialog>
            <AlertDialogTrigger asChild={true as any}>
              {buttonContent}
            </AlertDialogTrigger>
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
        {badge !== undefined && badge !== null && (
          <span
            className={cn(
              "absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold shadow-sm ring-2 ring-white dark:ring-zinc-950 bg-indigo-600 text-white transition-transform duration-300 group-hover:scale-110 z-100",
              badgeClassName,
            )}
          >
            {badge}
          </span>
        )}
      </div>
    );
  },
);

Button.displayName = "Button";

export const CloseButton = (props: ButtonProps) => (
  <Button variant="close" size="icon" {...props} />
);

export const EditButton = (props: ButtonProps) => (
  <Button variant="action_edit" size="icon" {...props} />
);

export const DeleteButton = (props: ButtonProps) => (
  <Button variant="action_delete" size="icon" {...props} />
);

export const ViewButton = (props: ButtonProps) => (
  <Button variant="action_view" size="icon" {...props} />
);

export interface StepperButtonProps extends ButtonProps {
  stepperType: "inc" | "dec";
}

export const StepperButton = ({
  stepperType,
  ...props
}: StepperButtonProps) => (
  <Button variant="stepper" size="icon" {...props}>
    {stepperType === "inc" ? <Plus size={14} /> : <Minus size={14} />}
  </Button>
);

export { Button };
