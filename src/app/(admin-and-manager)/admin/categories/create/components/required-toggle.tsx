"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineShieldCheck } from "react-icons/hi";

export const RequiredToggle = ({
  isRequired,
  onToggle,
}: {
  isRequired: boolean;
  onToggle: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "relative flex active:scale-95 hover:scale-105 cursor-pointer items-center gap-2.5 px-3 py-2 rounded-lg border transition-all duration-300 select-none",
        isRequired
          ? "bg-primary/10 border-primary hover:border-primary/60"
          : "bg-muted border-border hover:border-ring/40",
      )}
    >
      {/* Toggle Track */}
      <div
        className={cn(
          "relative w-11 h-6 rounded-full transition-colors duration-300 shrink-0",
          isRequired ? "bg-primary" : "bg-border",
        )}
      >
        {/* Toggle Knob */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
          className={cn(
            "absolute top-0.75 w-4.5 h-4.5 rounded-full shadow-sm flex items-center justify-center bg-background",
            isRequired ? "left-5.5" : "left-0.75",
          )}
        >
          <AnimatePresence mode="wait">
            {isRequired ? (
              <motion.div
                key="check"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                <HiOutlineShieldCheck className="w-3 h-3 text-primary" />
              </motion.div>
            ) : (
              <motion.div
                key="x"
                initial={{ scale: 0, rotate: 90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -90 }}
                transition={{ duration: 0.15 }}
              >
                <span className="w-3 h-3 flex items-center justify-center text-muted-foreground text-xs">
                  ○
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Label */}
      <AnimatePresence mode="wait">
        <motion.span
          key={isRequired ? "req" : "opt"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className={cn(
            "text-xs font-semibold tracking-wide uppercase whitespace-nowrap",
            isRequired ? "text-primary" : "text-muted-foreground",
          )}
        >
          {isRequired ? "Required" : "Optional"}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};
