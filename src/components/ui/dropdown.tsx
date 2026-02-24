"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React, {
  createContext,
  FC,
  MouseEvent,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

/* ================================
   Types
================================ */

type TriggerMode = "click" | "hover";
type DropdownSide = "top" | "bottom" | "left" | "right";
type AnimationVariant = "expand" | "flip" | "pop" | "slide";

interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  triggerMode: TriggerMode;
  side: DropdownSide;
  animationVariant: AnimationVariant;
}

/* ================================
   Context
================================ */

const DropdownContext = createContext<DropdownContextType | null>(null);

const useDropdown = (): DropdownContextType => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown components must be used inside <Dropdown />");
  }
  return context;
};

/* ================================
   Dropdown Root
================================ */

interface DropdownProps {
  children: ReactNode;
  triggerMode?: TriggerMode;
  side?: DropdownSide;
  animationVariant?: AnimationVariant;
}

const Dropdown: FC<DropdownProps> = ({
  children,
  triggerMode = "click",
  side = "bottom",
  animationVariant = "expand",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (triggerMode !== "click") return;

    const handleClickOutside = (event: MouseEvent | globalThis.MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside as any);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside as any);
  }, [triggerMode]);

  const handleMouseEnter = () => triggerMode === "hover" && setIsOpen(true);

  const handleMouseLeave = () => triggerMode === "hover" && setIsOpen(false);

  return (
    <DropdownContext.Provider
      value={{ isOpen, setIsOpen, triggerMode, side, animationVariant }}
    >
      <div
        ref={containerRef}
        className="relative inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

/* ================================
   Trigger
================================ */

interface DropdownTriggerProps {
  children: ReactNode;
  className?: string;
  hideChevron?: boolean;
}

const DropdownTrigger: FC<DropdownTriggerProps> = ({
  children,
  className = "",
  hideChevron = false,
}) => {
  const { isOpen, setIsOpen, triggerMode } = useDropdown();

  return (
    <div
      className={cn(
        "cursor-pointer active:scale-95 px-2 py-1 rounded-xl transition-all text-card-foreground duration-300 flex items-center gap-2 select-none border border-border bg-card shadow-sm",
        className,
      )}
      onClick={() => triggerMode === "click" && setIsOpen(!isOpen)}
    >
      {children}
      {!hideChevron && (
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "circOut" }}
        >
          <ChevronDown size={16} className="text-muted-foreground" />
        </motion.div>
      )}
    </div>
  );
};

/* ================================
   Content
================================ */

interface DropdownContentProps {
  children: ReactNode;
  className?: string;
  width?: string;
}

const DropdownContent: FC<DropdownContentProps> = ({
  children,
  className = "",
  width = "w-64",
}) => {
  const { isOpen, side, animationVariant } = useDropdown();

  const positions: Record<DropdownSide, string> = {
    bottom: "top-full mt-2 left-1/2 -translate-x-1/2 origin-top",
    top: "bottom-full mb-2 left-1/2 -translate-x-1/2 origin-bottom",
    left: "right-full mr-2 top-0 origin-right",
    right: "left-full ml-2 top-0 origin-left",
  };

  const currentPos = positions[side];

  const variants: Record<AnimationVariant, Variants> = {
    expand: {
      hidden: {
        height: 0,
        opacity: 0,
        clipPath: "inset(0% 0% 100% 0%)",
        scale: 0.95,
      },
      visible: {
        height: "auto",
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        transition: {
          height: { duration: 0.4 },
          opacity: { duration: 0.3 },
          clipPath: { duration: 0.4 },
          staggerChildren: 0.08,
        },
      },
      exit: {
        height: 0,
        opacity: 0,
        clipPath: "inset(0% 0% 100% 0%)",
        transition: { duration: 0.3 },
      },
    },
    flip: {
      hidden: {
        opacity: 0,
        rotateX: -90,
        y: side === "bottom" ? -20 : 20,
      },
      visible: {
        opacity: 1,
        rotateX: 0,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 20,
          staggerChildren: 0.05,
        },
      },
      exit: {
        opacity: 0,
        rotateX: 90,
        transition: { duration: 0.2 },
      },
    },
    pop: {
      hidden: {
        opacity: 0,
        scale: 0.5,
        y: side === "bottom" ? -50 : 50,
      },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 300,
          staggerChildren: 0.1,
        },
      },
      exit: {
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.2 },
      },
    },
    slide: {
      hidden: {
        opacity: 0,
        x: side === "right" ? -20 : side === "left" ? 20 : 0,
        y: side === "bottom" ? -10 : side === "top" ? 10 : 0,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          ease: "easeOut",
          duration: 0.3,
          staggerChildren: 0.05,
        },
      },
      exit: {
        opacity: 0,
        filter: "blur(4px)",
        transition: { duration: 0.2 },
      },
    },
  };

  const selectedVariant = variants[animationVariant];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={selectedVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`absolute z-50 overflow-hidden shadow-2xl rounded-2xl border bg-card border-border backdrop-blur-md ${currentPos} ${width} ${className}`}
          style={{ perspective: "1000px" }}
        >
          <div className="p-1.5">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ================================
   Item
================================ */

interface DropdownItemProps {
  children?: ReactNode;
  icon?: ReactNode;
  title?: string;
  link?: string;
  label?: string;
  className?: string;
  onClick?: () => void;
  variant?: "default";
}

const DropdownItem: FC<DropdownItemProps> = ({
  children,
  icon,
  title,
  label,
  link,
  className = "",
  onClick,
}) => {
  const { setIsOpen } = useDropdown();

  const handleItemClick = () => {
    if (onClick) onClick();
    setIsOpen(false);
  };

  const itemAnims: Variants = {
    hidden: { opacity: 0, y: 10, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <>
      {link ? (
        <Link href={link}>
          <motion.div
            variants={itemAnims}
            onClick={handleItemClick}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 group hover:bg-muted text-muted-foreground hover:text-primary ${className}`}
          >
            {children ? (
              children
            ) : (
              <>
                {icon && (
                  <div className="text-current opacity-70 group-hover:opacity-100">
                    {icon}
                  </div>
                )}
                <div className="flex flex-col">
                  {title && (
                    <span className="text-sm font-semibold leading-tight">
                      {title}
                    </span>
                  )}
                  {label && (
                    <span className="text-[10px] opacity-50 font-medium mt-0.5">
                      {label}
                    </span>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </Link>
      ) : (
        <motion.div
          variants={itemAnims}
          onClick={handleItemClick}
          className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 group hover:bg-muted text-muted-foreground hover:text-primary ${className}`}
        >
          {children ? (
            children
          ) : (
            <>
              {icon && (
                <div className="text-current opacity-70 group-hover:opacity-100">
                  {icon}
                </div>
              )}
              <div className="flex flex-col">
                {title && (
                  <span className="text-sm font-semibold leading-tight">
                    {title}
                  </span>
                )}
                {label && (
                  <span className="text-[10px] opacity-50 font-medium mt-0.5">
                    {label}
                  </span>
                )}
              </div>
            </>
          )}
        </motion.div>
      )}
    </>
  );
};

export { Dropdown, DropdownContent, DropdownItem, DropdownTrigger };
