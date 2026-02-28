"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Check } from "lucide-react";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/* =========================================================
   Types
========================================================= */

type TabsVariant = "default" | "underline" | "glass" | "fill" | "progress";
type TabsOrientation = "horizontal" | "vertical";

interface TabsContextType {
  activeTab: string;
  handleTabChange: (newValue: string) => void;
  variant: TabsVariant;
  fullWidth: boolean;
  orientation: TabsOrientation;
  orderedValues: string[];
}

interface TabsProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
  variant?: TabsVariant;
  fullWidth?: boolean;
  orientation?: TabsOrientation;
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

  // Extract ordered values for progress logic
  const orderedValues = useMemo(() => {
    const listChild = React.Children.toArray(children).find(
      (child) =>
        (child as any).type?.name === "TabsList" ||
        (child as any).type?.displayName === "TabsList",
    );
    if (!listChild) return [];
    return React.Children.toArray((listChild as any).props.children)
      .filter((c) => React.isValidElement(c))
      .map((c) => (c as any).props.value);
  }, [children]);

  useEffect(() => {
    if (value !== undefined) setActiveTab(value);
  }, [value]);

  const handleTabChange = (newValue: string) => {
    if (value === undefined) setActiveTab(newValue);
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider
      value={{
        activeTab,
        handleTabChange,
        variant,
        fullWidth,
        orientation,
        orderedValues,
      }}
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "flex-col" : "flex-row gap-8",
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

export const TabsList = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
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
    progress: cn(
      "bg-transparent gap-0 items-start",
      isVertical ? "flex-col" : "flex-row justify-center",
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
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return null;
          return (
            <React.Fragment>
              {React.cloneElement(child as any, {
                hoveredTab,
                setHoveredTab,
                index,
              })}
            </React.Fragment>
          );
        })}
      </LayoutGroup>
    </div>
  );
};

/* =========================================================
   3️⃣ Tabs Trigger
========================================================= */

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  icon?: ElementType | ReactElement;
  hoveredTab?: string | null;
  setHoveredTab?: (val: string | null) => void;
  index?: number;
}

export const TabsTrigger = ({
  value,
  children,
  className,
  icon: Icon,
  hoveredTab,
  setHoveredTab,
  index = 0,
}: TabsTriggerProps) => {
  const {
    activeTab,
    handleTabChange,
    variant,
    fullWidth,
    orientation,
    orderedValues,
  } = useTabs();

  const isActive = activeTab === value;
  const isHovered = hoveredTab === value;
  const isVertical = orientation === "vertical";

  // Progress Logic
  const activeIndex = orderedValues.indexOf(activeTab);
  const currentIndex = orderedValues.indexOf(value);
  const isCompleted = currentIndex < activeIndex;
  const isLast = index === orderedValues.length - 1;

  if (variant === "progress") {
    return (
      <div
        className={cn(
          "flex items-start",
          isVertical ? "flex-col w-full" : "flex-row items-center",
        )}
      >
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={() => handleTabChange(value)}
            onMouseEnter={() => setHoveredTab?.(value)}
            className={cn(
              "relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 outline-none cursor-pointer border-2",
              isActive || isCompleted
                ? "bg-primary text-primary-foreground shadow-lg border-primary shadow-primary/10"
                : "bg-background text-background-foreground border-2 border-border",
            )}
          >
            {isCompleted ? (
              <Check className="w-5 h-5 stroke-3" />
            ) : Icon ? (
              <Icon className="w-5 h-5" />
            ) : (
              <span className="text-sm font-bold">{currentIndex + 1}</span>
            )}
          </button>

          <span
            className={cn(
              "mt-2 text-xs font-semibold transition-colors duration-300",
              isActive || isCompleted
                ? "text-primary"
                : "text-muted-foreground",
            )}
          >
            {children}
          </span>
        </div>

        {!isLast && (
          <div
            className={cn(
              "relative bg-border transition-colors duration-300",
              isVertical
                ? "w-0.5 h-12 ml-5 my-1"
                : "w-16 sm:w-24 h-0.5 mx-2 -mt-6",
            )}
          >
            <motion.div
              initial={false}
              animate={{
                [isVertical ? "height" : "width"]: isCompleted ? "100%" : "0%",
              }}
              className="absolute inset-0 bg-primary"
            />
          </div>
        )}
      </div>
    );
  }

  // Standard Variants logic
  const variantStyles: Record<TabsVariant, string> = {
    default: cn(
      "px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200",
      isActive
        ? "text-slate-900 dark:text-white"
        : "text-slate-500 dark:text-slate-400",
    ),
    underline: cn(
      "px-4 py-2 text-sm font-medium transition-colors duration-200 relative",
      isActive ? "text-primary" : "text-muted-foreground",
    ),
    glass: cn(
      "px-6 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white",
      isActive && "text-white",
    ),
    fill: cn(
      "px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground",
      isActive && "bg-primary text-primary-foreground",
    ),
    progress: "",
  };

  return (
    <button
      type="button"
      onClick={() => handleTabChange(value)}
      onMouseEnter={() => setHoveredTab?.(value)}
      className={cn(
        "relative flex items-center gap-2 outline-none cursor-pointer z-10 whitespace-nowrap",
        fullWidth && !isVertical && "flex-1",
        variantStyles[variant],
        className,
      )}
    >
      {isHovered && !isActive && (
        <motion.div
          layoutId="hover-pill"
          className={cn(
            "absolute inset-0 z-[-1] rounded-lg bg-slate-200/50 dark:bg-white/5",
          )}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
        />
      )}

      {isActive && variant === "underline" && (
        <motion.div
          layoutId="active-underline"
          className={cn(
            "absolute bg-primary",
            isVertical
              ? "-right-2.25 top-0 bottom-0 w-0.5"
              : "-bottom-2.25 left-0 right-0 h-0.5",
          )}
        />
      )}

      {isActive && variant !== "underline" && (
        <motion.div
          layoutId="active-pill"
          className={cn(
            "absolute inset-0 z-[-1] rounded-lg shadow-sm",
            variant === "default" && "bg-white dark:bg-slate-600",
            variant === "glass" && "bg-white/10 shadow-md",
            variant === "fill" && "bg-primary",
          )}
        />
      )}

      <span className="flex items-center gap-2">
        {Icon && React.isValidElement(Icon) ? (
          Icon
        ) : (
          <Icon className="w-5 h-5" />
        )}
        {/* {Icon && <Icon className="w-4 h-4" />} */}
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
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) => {
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
            x: isVertical ? 10 : 0,
            y: isVertical ? 0 : 10,
          }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{
            opacity: 0,
            x: isVertical ? -10 : 0,
            y: isVertical ? 0 : -10,
          }}
          className={cn("w-full py-4", className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
