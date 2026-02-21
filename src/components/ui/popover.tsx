"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, MotionProps, Variants } from "framer-motion";
import * as React from "react";

/* =========================================================
   Animation Variants
========================================================= */
const animations: Record<
  "scale" | "bounce" | "slideUp" | "bubble" | "fade",
  Variants
> = {
  scale: {
    initial: { opacity: 0, scale: 0.9, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 10 },
  },
  bounce: {
    initial: { opacity: 0, scale: 0.5 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 15 },
    },
    exit: { opacity: 0, scale: 0.5 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    exit: { opacity: 0, y: 20 },
  },
  bubble: {
    initial: { opacity: 0, scale: 0, borderRadius: "100%" },
    animate: {
      opacity: 1,
      scale: 1,
      borderRadius: "0.75rem",
      transition: { type: "spring", damping: 20, stiffness: 200 },
    },
    exit: { opacity: 0, scale: 0, borderRadius: "100%" },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
};

/* =========================================================
   Context Types
========================================================= */
interface PopoverContextType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  triggerRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
}

const PopoverContext = React.createContext<PopoverContextType | null>(null);

/* =========================================================
   Popover Root
========================================================= */
interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Popover({
  children,
  open: controlledOpen,
  onOpenChange,
  ...props
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const isOpen = controlledOpen ?? internalOpen;

  const toggle = React.useCallback(() => {
    const next = !isOpen;
    if (onOpenChange) onOpenChange(next);
    else setInternalOpen(next);
  }, [isOpen, onOpenChange]);

  const close = React.useCallback(() => {
    if (onOpenChange) onOpenChange(false);
    else setInternalOpen(false);
  }, [onOpenChange]);

  React.useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, close]);

  return (
    <PopoverContext.Provider
      value={{ isOpen, toggle, close, triggerRef, containerRef }}
    >
      <div className="relative inline-block" ref={containerRef} {...props}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

/* =========================================================
   Popover Trigger
========================================================= */
interface PopoverTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  className?: string;
}

export function PopoverTrigger({
  children,
  className,
  ...props
}: PopoverTriggerProps) {
  const context = React.useContext(PopoverContext);
  if (!context) throw new Error("PopoverTrigger must be inside Popover");

  const { toggle, triggerRef } = context;

  return (
    <div
      ref={triggerRef}
      onClick={toggle}
      className={cn("cursor-pointer inline-block", className)}
      {...props}
    >
      {children}
    </div>
  );
}

/* =========================================================
   Popover Content
========================================================= */
interface PopoverContentProps
  extends React.HTMLAttributes<HTMLDivElement>, MotionProps {
  animationType?: keyof typeof animations;
  align?: "left" | "center" | "right";
  sideOffset?: number;
}

export function PopoverContent({
  children,
  className,
  animationType = "scale",
  align = "center",
  sideOffset = 8,
  ...props
}: PopoverContentProps) {
  const context = React.useContext(PopoverContext);
  if (!context) throw new Error("PopoverContent must be inside Popover");

  const { isOpen } = context;

  const alignmentClasses: Record<string, string> = {
    left: "left-0",
    center: "left-1/2 -translate-x-1/2",
    right: "right-0",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={animations[animationType].initial}
          animate={animations[animationType].animate}
          exit={animations[animationType].exit}
          style={{ top: `calc(100% + ${sideOffset}px)` }}
          className={cn(
            "absolute z-50 w-72 rounded-xl border bg-white p-4 shadow-xl dark:bg-zinc-950 dark:border-zinc-800",
            alignmentClasses[align],
            className,
          )}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* =========================================================
   Popover Subcomponents
========================================================= */
export const PopoverHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div className={cn("mb-2 flex flex-col space-y-1", className)} {...props} />
);

export const PopoverTitle: React.FC<
  React.HTMLAttributes<HTMLHeadingElement>
> = ({ className, ...props }) => (
  <h3
    className={cn("font-semibold text-zinc-900 dark:text-zinc-100", className)}
    {...props}
  />
);

export const PopoverDescription: React.FC<
  React.HTMLAttributes<HTMLParagraphElement>
> = ({ className, ...props }) => (
  <p
    className={cn("text-sm text-zinc-500 dark:text-zinc-400", className)}
    {...props}
  />
);
