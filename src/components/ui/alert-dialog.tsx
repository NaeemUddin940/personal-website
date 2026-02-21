"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  LucideAlertTriangle,
  LucideCheckCircle2,
  LucideInfo,
  LucideXCircle,
} from "lucide-react";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

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

const AlertDialogContext = createContext<any>(null);

function AlertDialog({
  children,
  open: controlledOpen,
  onOpenChange,
  animation = "scale",
  variant = "info",
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = useCallback(
    (value) => {
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
    <AlertDialogContext.Provider value={{ open, setOpen, animation, variant }}>
      {children}
    </AlertDialogContext.Provider>
  );
}

function AlertDialogTrigger({ children, asChild, ...props }) {
  const { setOpen } = useContext(AlertDialogContext);
  const handleClick = () => setOpen(true);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { onClick: handleClick, ...props });
  }

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 rounded-lg font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary"
      {...props}
    >
      {children}
    </button>
  );
}

function AlertDialogContent({ children, className, size = "default" }) {
  const { open, setOpen, animation } = useContext(AlertDialogContext);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-muted/40 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              variants={animations[animation] || animations.scale}
              initial="initial"
              animate="animate"
              exit="exit"
              className={cn(
                "pointer-events-auto relative grid gap-4 border bg-card p-6 shadow-xl rounded-2xl overflow-hidden",
                size === "default" ? "max-w-md" : "max-w-sm",
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

function AlertDialogHeader({ className, ...props }) {
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

function AlertDialogMedia({ className, children, variant: propVariant }) {
  const context = useContext(AlertDialogContext);
  const variant = propVariant || context?.variant || "info";

  const config = {
    success: {
      icon: LucideCheckCircle2,
      color: "bg-success text-success-foreground",
    },
    error: {
      icon: LucideXCircle,
      color: "bg-destructive text-destructive-foreground",
    },
    warning: {
      icon: LucideAlertTriangle,
      color: "bg-warning text-warning-foreground",
    },
    info: {
      icon: LucideInfo,
      color: "bg-info text-info-foreground",
    },
  };

  const { icon: DefaultIcon, color } = config[variant];

  return (
    <div
      className={cn(
        "mx-auto sm:mx-0 flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10 mb-2 transition-colors",
        color,
        className,
      )}
    >
      {children || <DefaultIcon className="h-6 w-6" />}
    </div>
  );
}

function AlertDialogTitle({ className, ...props }) {
  return (
    <h2
      className={cn("text-lg font-bold text-card-foreground", className)}
      {...props}
    />
  );
}

function AlertDialogDescription({ className, ...props }) {
  return (
    <p
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}

function AlertDialogFooter({ className, ...props }) {
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

function AlertDialogAction({
  className,
  onClick,
  children,
  variant: propVariant,
  ...props
}) {
  const { setOpen, variant: contextVariant } = useContext(AlertDialogContext);
  const variant = propVariant || contextVariant || "info";

  const variantStyles = {
    success: "bg-success hover:bg-success-foreground focus:ring-success",
    error:
      "bg-destructive hover:bg-destructive-foreground focus:ring-destructive",
    warning: "bg-warning hover:bg-warning-foreground focus:ring-warning",
    info: "bg-primary hover:bg-primary-foreground focus:ring-primary",
  };

  return (
    <button
      onClick={(e) => {
        onClick?.(e);
        setOpen(false);
      }}
      className={cn(
        "inline-flex h-10 items-center bg-primary hover:bg-primary/90 cursor-pointer justify-center rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children || "Confirm"}
    </button>
  );
}

function AlertDialogCancel({ className, onClick, children, ...props }) {
  const { setOpen } = useContext(AlertDialogContext);
  return (
    <button
      onClick={(e) => {
        onClick?.(e);
        setOpen(false);
      }}
      className={cn(
        "inline-flex h-10 cursor-pointer items-center justify-center rounded-lg border border-rose-500 bg-rose-500/10 hover:bg-rose-500/20 px-4 py-2 text-sm font-semibold text-card-foreground transition-all focus:outline-none focus:ring-2 focus:ring-card-foreground focus:ring-offset-2 active:scale-95 mt-2 sm:mt-0",
        className,
      )}
      {...props}
    >
      {children || "Cancel"}
    </button>
  );
}

export {
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
};
