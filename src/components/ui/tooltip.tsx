"use client";
import { cn } from "@/lib/utils"; // Assuming this utility exists in your project
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

/**
 * Reusable Tooltip Component
 * @param {ReactNode} children - The element that triggers the tooltip
 * @param {string} content - The text to display inside the tooltip
 * @param {string} position - 'top', 'bottom', 'left', 'right'
 * @param {string} className - Additional classes for the tooltip bubble
 */
export const Tooltip = ({
  children,
  content,
  position = "top",
  className,
}: {
  children: React.ReactNode;
  content: string;
  position?: string;
  className?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Define position-based classes
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-3",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-3",
    left: "right-full top-1/2 -translate-y-1/2 mr-3",
    right: "left-full top-1/2 -translate-y-1/2 ml-3",
  };

  // Define arrow positions
  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-slate-800",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-slate-800",
    left: "left-full top-1/2 -translate-y-1/2 border-l-slate-800",
    right: "right-full top-1/2 -translate-y-1/2 border-r-slate-800",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {/* Trigger Element */}
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.5,
              y: position === "top" ? 10 : -10,
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: position === "top" ? 10 : -10 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 20,
            }}
            className={cn(
              "absolute z-50 px-3 py-2 text-sm font-medium text-muted-foreground bg-muted rounded-xl shadow-xl whitespace-nowrap pointer-events-none",
              positionClasses[position],
              className,
            )}
          >
            {content}

            {/* Tooltip Arrow */}
            <div
              className={cn(
                "absolute border-4 border-transparent",
                arrowClasses[position],
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
