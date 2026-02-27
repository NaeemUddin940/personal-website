"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { XIcon } from "lucide-react";
import React, { useEffect } from "react";

// --- Animation Variants ---
type AnimationType = "scale" | "bounce" | "slideUp" | "bubble" | "fade";

const animations: Record<AnimationType, Variants> = {
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
    initial: { opacity: 0, y: 100 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    exit: { opacity: 0, y: 100 },
  },
  bubble: {
    initial: { opacity: 0, scale: 0, borderRadius: "100%" },
    animate: {
      opacity: 1,
      scale: 1,
      borderRadius: "0.5rem", // matching --radius (0.5rem)
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

// --- Types ---
interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  animationType?: AnimationType;
  children: React.ReactNode;
}

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  showCloseButton?: boolean;
}

// --- Context ---
const DialogContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
  animationType: AnimationType;
} | null>(null);

export function Dialog({
  open: controlledOpen,
  onOpenChange,
  animationType = "scale",
  children,
}: DialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  return (
    <DialogContext.Provider value={{ open, setOpen, animationType }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(DialogContext);
  if (!context) return null;

  return (
    <div
      className="inline-block cursor-pointer"
      onClick={() => context.setOpen(true)}
      {...props}
    >
      {children}
    </div>
  );
}

export function DialogContent({
  children,
  className,
  showCloseButton = true,
  ...props
}: DialogContentProps) {
  const context = React.useContext(DialogContext);
  if (!context) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") context.setOpen(false);
    };
    if (context.open) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [context]);

  return (
    <AnimatePresence>
      {context.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => context.setOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
          />

          <motion.div
            variants={animations[context.animationType]}
            initial="initial"
            animate="animate"
            exit="exit"
            className={cn(
              "relative z-50 w-full max-w-lg overflow-hidden rounded-xl border border-border bg-popover p-6 shadow-xl ring-1 ring-foreground/5",
              className,
            )}
            {...props}
          >
            {showCloseButton && (
              <button
                onClick={() => context.setOpen(false)}
                className="absolute right-4 top-4 cursor-pointer hover:text-destructive rounded-md p-1.5 text-muted-foreground transition-all bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <XIcon className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            )}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className,
      )}
      {...props}
    />
  );
}

export function DialogTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold leading-none tracking-tight text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
}

export function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-6 -mx-6 -mb-6 flex flex-col-reverse bg-muted/30 p-4 sm:flex-row sm:justify-end sm:space-x-2 border-t border-border",
        className,
      )}
      {...props}
    />
  );
}

export function DialogClose({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  const context = React.useContext(DialogContext);
  if (!context) return null;
  return (
    <div
      className="cursor-pointer"
      onClick={() => context.setOpen(false)}
      {...props}
    >
      {children}
    </div>
  );
}
