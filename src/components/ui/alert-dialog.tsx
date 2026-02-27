"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  LucideAlertTriangle,
  LucideCheckCircle2,
  LucideInfo,
  LucideXCircle,
} from "lucide-react";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// --- Types & Interfaces ---

type Position =
  | "center"
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

type Variant = "success" | "error" | "warning" | "info";
type Animation = "scale" | "bounce" | "slideUp" | "bubble" | "fade";

interface AlertDialogContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  animation: Animation;
  variant: Variant;
  position: Position;
  triggerRect: DOMRect | null;
  setTriggerRect: (rect: DOMRect | null) => void;
}

const AlertDialogContext = createContext<AlertDialogContextProps | null>(null);

// --- Animations Preset ---

const animations = {
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
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    exit: { opacity: 0, y: 50 },
  },
  bubble: {
    initial: { opacity: 0, scale: 0 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", damping: 20, stiffness: 200 },
    },
    exit: { opacity: 0, scale: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
};

// --- Components ---

export function AlertDialog({
  children,
  open: controlledOpen,
  onOpenChange,
  animation = "scale",
  variant = "info",
  position = "center",
}: {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  animation?: Animation;
  variant?: Variant;
  position?: Position;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = useCallback(
    (value: boolean) => {
      if (!isControlled) setUncontrolledOpen(value);
      onOpenChange?.(value);
    },
    [isControlled, onOpenChange],
  );

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, setOpen]);

  return (
    <AlertDialogContext.Provider
      value={{
        open,
        setOpen,
        animation,
        variant,
        position,
        triggerRect,
        setTriggerRect,
      }}
    >
      {children}
    </AlertDialogContext.Provider>
  );
}

export function AlertDialogTrigger({
  children,
  asChild,
  className,
  ...props
}: any) {
  const context = useContext(AlertDialogContext);
  const triggerRef = useRef<HTMLButtonElement>(null);

  if (!context) return null;

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    context.setTriggerRect(rect);
    context.setOpen(true);
  };

  if (asChild && React.isValidElement(children)) {
    // eslint-disable-next-line react-hooks/refs
    return React.cloneElement(children as any, {
      onClick: handleClick,
      ref: triggerRef,
      ...props,
    });
  }

  return (
    <button
      ref={triggerRef}
      onClick={handleClick}
      className={cn(
        "px-4 py-2 rounded-lg font-medium transition-colors bg-primary text-primary-foreground hover:opacity-90 cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function AlertDialogContent({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "small";
}) {
  const context = useContext(AlertDialogContext);
  if (!context) return null;

  const { open, setOpen, animation, position, triggerRect } = context;

  const anchorStyle: React.CSSProperties = {};

  if (position !== "center" && triggerRect) {
    const spacing = 12;
    const modalWidth = size === "default" ? 448 : 384;

    anchorStyle.position = "absolute";

    // Vertical Calculation
    if (position.startsWith("top")) {
      // Show above the button
      anchorStyle.bottom =
        window.innerHeight - (triggerRect.top + window.scrollY) + spacing;
    } else if (position.startsWith("bottom")) {
      // Show below the button
      anchorStyle.top = triggerRect.bottom + window.scrollY + spacing;
    }

    // Horizontal Calculation
    if (position.endsWith("left")) {
      anchorStyle.left = triggerRect.left + window.scrollX;
    } else if (position.endsWith("center")) {
      anchorStyle.left =
        triggerRect.left +
        window.scrollX +
        triggerRect.width / 2 -
        modalWidth / 2;
    } else if (position.endsWith("right")) {
      anchorStyle.left = triggerRect.right + window.scrollX - modalWidth;
    }

    // Boundary check to keep it on screen
    anchorStyle.left = Math.max(
      10,
      Math.min(Number(anchorStyle.left), window.innerWidth - modalWidth - 10),
    );
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm pointer-events-auto"
          />
          <div
            className={cn(
              "fixed inset-0 z-50 flex pointer-events-none",
              position === "center" ? "items-center justify-center p-4" : "",
            )}
          >
            <motion.div
              variants={animations[animation] || animations.scale}
              initial="initial"
              animate="animate"
              exit="exit"
              style={anchorStyle}
              className={cn(
                "pointer-events-auto relative grid gap-4 border bg-card p-6 shadow-2xl rounded-2xl overflow-hidden",
                size === "default" ? "max-w-md w-full" : "max-w-sm w-full",
                className,
              )}
            >
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export function AlertDialogHeader({ className, ...props }: any) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-2 text-center sm:text-left",
        className,
      )}
      {...props}
    />
  );
}

export function AlertDialogMedia({ className, variant: propVariant }: any) {
  const context = useContext(AlertDialogContext);
  const variant = propVariant || context?.variant || "info";
  const config = {
    success: { icon: LucideCheckCircle2, color: "bg-emerald-500 text-white" },
    error: {
      icon: LucideXCircle,
      color: "bg-destructive text-destructive-foreground",
    },
    warning: { icon: LucideAlertTriangle, color: "bg-amber-500 text-white" },
    info: { icon: LucideInfo, color: "bg-blue-500 text-white" },
  };
  const { icon: Icon, color } = config[variant as Variant];
  return (
    <div
      className={cn(
        "mx-auto sm:mx-0 flex h-10 w-10 shrink-0 items-center justify-center rounded-full mb-2",
        color,
        className,
      )}
    >
      <Icon className="h-5 w-5" />
    </div>
  );
}

export function AlertDialogTitle({ className, ...props }: any) {
  return (
    <h2
      className={cn("text-lg font-bold text-card-foreground", className)}
      {...props}
    />
  );
}

export function AlertDialogDescription({ className, ...props }: any) {
  return (
    <p
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}

export function AlertDialogFooter({ className, ...props }: any) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4",
        className,
      )}
      {...props}
    />
  );
}

export function AlertDialogAction({
  className,
  onClick,
  children,
  ...props
}: any) {
  const context = useContext(AlertDialogContext);
  return (
    <button
      onClick={(e) => {
        onClick?.(e);
        context?.setOpen(false);
      }}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-white bg-primary hover:opacity-90 transition-all cursor-pointer",
        className,
      )}
      {...props}
    >
      {children || "Confirm"}
    </button>
  );
}

export function AlertDialogCancel({
  className,
  onClick,
  children,
  ...props
}: any) {
  const context = useContext(AlertDialogContext);
  return (
    <button
      onClick={(e) => {
        onClick?.(e);
        context?.setOpen(false);
      }}
      className={cn(
        "inline-flex h-10 cursor-pointer items-center justify-center rounded-lg border border-border bg-transparent hover:bg-muted px-4 py-2 text-sm font-semibold text-card-foreground transition-all mt-2 sm:mt-0",
        className,
      )}
      {...props}
    >
      {children || "Cancel"}
    </button>
  );
}
