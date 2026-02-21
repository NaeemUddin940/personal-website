/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

/* =========================================================
   Types
========================================================= */

type TabsVariant = "default" | "underline" | "glass" | "fill";
type TabsOrientation = "horizontal" | "vertical";

interface TabsContextType {
  activeTab: string;
  handleTabChange: (newValue: string) => void;
  variant: TabsVariant;
  fullWidth: boolean;
  orientation: TabsOrientation;
}

interface TabsProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
  variant?: TabsVariant;
  fullWidth?: boolean;
  orientation?: TabsOrientation;
}

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
  icon?: LucideIcon;
  hoveredTab?: string | null;
  setHoveredTab?: Dispatch<SetStateAction<string | null>>;
}

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

/* =========================================================
   Context
========================================================= */

const TabsContext = createContext<TabsContextType | null>(null);

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tabs components must be used inside <Tabs>");
  return context;
};

/* =========================================================
   1️⃣ Tabs Root
========================================================= */

export const Tabs = ({
  value,
  defaultValue,
  onValueChange,
  children,
  className,
  variant = "default",
  fullWidth = false,
  orientation = "horizontal",
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(
    value ?? defaultValue ?? "",
  );

  useEffect(() => {
    if (value !== undefined) setActiveTab(value);
  }, [value]);

  const handleTabChange = (newValue: string) => {
    if (value === undefined) setActiveTab(newValue);
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider
      value={{ activeTab, handleTabChange, variant, fullWidth, orientation }}
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "flex-col" : "flex-row gap-4",
          fullWidth && "w-full",
          className,
        )}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

/* =========================================================
   2️⃣ Tabs List
========================================================= */

export const TabsList = ({ children, className }: TabsListProps) => {
  const { variant, fullWidth, orientation } = useTabs();
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const isVertical = orientation === "vertical";

  const listVariants: Record<TabsVariant, string> = {
    default: cn(
      "bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl border border-slate-200 dark:border-slate-700 gap-1",
      isVertical ? "flex-col w-48" : "flex-row",
    ),
    underline: cn(
      "bg-transparent gap-4",
      isVertical
        ? "flex-col border-r border-slate-200 dark:border-slate-800 pr-2"
        : "flex-row border-b border-slate-200 dark:border-slate-800 pb-2",
    ),
    glass: cn(
      "bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 shadow-xl gap-2",
      isVertical ? "flex-col w-48" : "flex-row",
    ),
    fill: cn(
      "bg-slate-100 dark:bg-slate-800 rounded-xl p-2 border border-border gap-1",
      isVertical ? "flex-col w-48" : "flex-row",
    ),
  };

  return (
    <div
      onMouseLeave={() => setHoveredTab(null)}
      className={cn(
        "relative flex items-center select-none isolate shrink-0",
        fullWidth && !isVertical ? "w-full" : "w-fit",
        listVariants[variant],
        className,
      )}
    >
      <LayoutGroup id="tabs-group">
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return null;
          return React.cloneElement(
            child as React.ReactElement<TabsTriggerProps>,
            { hoveredTab, setHoveredTab },
          );
        })}
      </LayoutGroup>
    </div>
  );
};

/* =========================================================
   3️⃣ Tabs Trigger
========================================================= */

export const TabsTrigger = ({
  value,
  children,
  className,
  icon: Icon,
  hoveredTab,
  setHoveredTab,
}: TabsTriggerProps) => {
  const { activeTab, handleTabChange, variant, fullWidth, orientation } =
    useTabs();

  const isActive = activeTab === value;
  const isHovered = hoveredTab === value;
  const isVertical = orientation === "vertical";

  const variantStyles: Record<TabsVariant, string> = {
    default: cn(
      "px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200",
      isVertical && "w-full justify-start",
      isActive
        ? "text-slate-900 dark:text-white"
        : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white",
    ),
    underline: cn(
      "text-sm font-medium transition-colors duration-200 relative",
      isVertical ? "px-4 py-2 w-full justify-start" : "px-2 py-3",
      isActive
        ? "text-primary-foreground dark:text-primary"
        : "text-slate-500 hover:text-slate-700 dark:text-slate-400",
    ),
    glass: cn(
      "px-6 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200",
      isVertical && "w-full justify-start",
      isActive ? "text-white scale-[1.02]" : "text-white/60 hover:text-white",
    ),
    fill: cn(
      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
      isVertical && "w-full justify-start",
      isActive
        ? "bg-primary text-primary-foreground"
        : "bg-transparent text-muted-foreground hover:bg-muted/10 hover:text-primary",
    ),
  };

  const activeIndicator: Record<TabsVariant, string> = {
    default: "bg-white dark:bg-slate-600 shadow-sm rounded-lg",
    underline: cn(
      "bg-primary",
      isVertical
        ? "absolute right-[-9px] top-0 bottom-0 w-[2px] rounded-none"
        : "absolute bottom-[-10px] left-0 right-0 h-[2px] rounded-none",
    ),
    glass: "bg-white/10 shadow-md rounded-xl",
    fill: "bg-primary shadow-lg rounded-lg",
  };

  const hoverIndicator: Record<TabsVariant, string> = {
    default: "bg-white/80 dark:bg-slate-700/80 shadow-none rounded-lg",
    underline: cn(
      "bg-slate-200/80 dark:bg-white/5",
      isVertical
        ? "absolute right-[-9px] top-0 bottom-0 w-[1px]"
        : "absolute bottom-[-10px] left-0 right-0 h-[1px]",
    ),
    glass: "bg-white/5 rounded-xl",
    fill: "bg-primary/20 rounded-lg",
  };

  return (
    <button
      onClick={() => handleTabChange(value)}
      onMouseEnter={() => setHoveredTab?.(value)}
      className={cn(
        "relative flex items-center gap-2 outline-none cursor-pointer z-10",
        fullWidth && !isVertical && "flex-1",
        variantStyles[variant],
        className,
      )}
    >
      {isHovered && !isActive && (
        <motion.div
          layoutId="hover-pill"
          className={cn("absolute inset-0 z-[-1]", hoverIndicator[variant])}
          initial={false}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
        />
      )}

      {isActive && (
        <motion.div
          layoutId="active-pill"
          className={cn(
            variant === "underline" ? "" : "absolute inset-0 z-[-1]",
            activeIndicator[variant],
          )}
          initial={false}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}

      <span className="relative flex items-center gap-2 whitespace-nowrap">
        {Icon && <Icon className="w-4 h-4" />}
        {children}
      </span>
    </button>
  );
};

/* =========================================================
   4️⃣ Tabs Content
========================================================= */

export const TabsContent = ({
  value,
  children,
  className,
}: TabsContentProps) => {
  const { activeTab, orientation } = useTabs();
  const isActive = activeTab === value;
  const isVertical = orientation === "vertical";

  return (
    <AnimatePresence mode="popLayout">
      {isActive && (
        <motion.div
          key={value}
          initial={{
            opacity: 0,
            x: isVertical ? 20 : 0,
            y: isVertical ? 0 : 20,
          }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{
            opacity: 0,
            x: isVertical ? 20 : 0,
            y: isVertical ? 0 : 20,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={cn(
            "outline-none w-full",
            !isVertical && "mt-4",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
