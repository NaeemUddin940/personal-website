"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import React, {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";


/* ======================= TYPES ======================= */

export type Position =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
  | "left-top"
  | "left-center"
  | "left-bottom"
  | "right-top"
  | "right-center"
  | "right-bottom";

interface SelectContextType {
  value: string | undefined;
  onSelect: (val: string) => void;
  isOpen: boolean;
}

interface SelectProps {
  children: ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  position?: Position;
  showChevron?: boolean;
  offset?: number;
  error?: string | string[];
  helpText?: string;
  disabled?: boolean;
  className?: string;
  customTrigger?: ReactNode;
}

interface OptionProps {
  value: string;
  children: ReactNode;
  label?: string;
  defaultSelect?: boolean;
}

/* ======================= CONTEXT ======================= */

const SelectContext = createContext<SelectContextType | null>(null);

/* ======================= MAIN SELECT ======================= */

export function Select({
  children,
  value: controlledValue,
  onChange,
  name,
  placeholder = "Select...",
  label,
  position = "bottom-left",
  showChevron = true,
  offset = 8,
  helpText,
  error,
  disabled = false,
  className,
  customTrigger,
}: SelectProps) {
  const [internalValue, setInternalValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

  // Positioning logic updated to handle real-time scrolling
  const updatePosition = useCallback(() => {
    if (triggerRef.current && isOpen) {
      const rect = triggerRef.current.getBoundingClientRect();
      const dropdownElement = dropdownRef.current;
      const dHeight = dropdownElement?.offsetHeight || 0;
      const dWidth = dropdownElement?.offsetWidth || 0;

      let top = 0;
      let left = 0;

      const [side, align] = position.split("-") as [string, string];

      // Using getBoundingClientRect directly for fixed positioning relative to viewport
      if (side === "top") {
        top = rect.top - dHeight - offset;
      } else if (side === "bottom") {
        top = rect.bottom + offset;
      } else if (side === "left" || side === "right") {
        if (align === "top") top = rect.top;
        else if (align === "center")
          top = rect.top + rect.height / 2 - dHeight / 2;
        else if (align === "bottom") top = rect.bottom - dHeight;
      }

      if (side === "left") {
        left = rect.left - dWidth - offset;
      } else if (side === "right") {
        left = rect.right + offset;
      } else if (side === "top" || side === "bottom") {
        if (align === "left") left = rect.left;
        else if (align === "center")
          left = rect.left + rect.width / 2 - dWidth / 2;
        else if (align === "right") left = rect.right - dWidth;
      }

      setCoords({ top, left, width: rect.width });
    }
  }, [isOpen, offset, position]);

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      // Listen to scroll and resize to keep dropdown attached
      window.addEventListener("scroll", updatePosition, {
        capture: true,
        passive: true,
      });
      window.addEventListener("resize", updatePosition);

      return () => {
        window.removeEventListener("scroll", updatePosition, { capture: true });
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [isOpen, updatePosition]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  const onSelect = useCallback(
    (val: string) => {
      if (!isControlled) setInternalValue(val);
      onChange?.(val);
      setIsOpen(false);
    },
    [onChange, isControlled],
  );

  const childrenArray = React.Children.toArray(
    children,
  ) as ReactElement<OptionProps>[];
  const selectedOption = childrenArray.find(
    (child) => String(child.props.value) === String(currentValue),
  );

  const renderDisplay = () => {
    if (!selectedOption)
      return (
        <span className="text-muted-foreground font-normal">{placeholder}</span>
      );
    return selectedOption.props.label || selectedOption.props.children;
  };

  return (
    <SelectContext.Provider value={{ value: currentValue, onSelect, isOpen }}>
      <div className={cn("relative w-full", className)}>
        {name && <input type="hidden" name={name} value={currentValue || ""} />}
        {label && (
          <label
            className={cn(
              "text-sm font-semibold ml-1 mb-2 block text-foreground",
              error && "text-destructive",
            )}
          >
            {label}
          </label>
        )}

        <button
          ref={triggerRef}
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn(
            "group flex w-full shadow-sm cursor-pointer rounded-xl items-center h-10 bg-input border transition-all px-4 outline-none",
            error
              ? "border-destructive ring-4 ring-destructive/10"
              : "border-border",
            isOpen && "ring-4 ring-ring/10 border-primary",
            showChevron ? "justify-between" : "justify-center",
            disabled && "opacity-50 cursor-not-allowed",
          )}
        >
          {customTrigger ? (
            customTrigger
          ) : (
            <>
              <div className="relative h-full overflow-hidden flex items-center flex-1">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={currentValue || "placeholder"}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    className="truncate font-medium flex items-center text-foreground"
                  >
                    {renderDisplay()}
                  </motion.span>
                </AnimatePresence>
              </div>
              {showChevron && (
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "circOut" }}
                  className="ml-2"
                >
                  <ChevronDown size={16} className="text-muted-foreground" />
                </motion.div>
              )}
            </>
          )}
        </button>

        {isOpen && (
          <div
            className="fixed inset-0 z-[9998]"
            onClick={() => setIsOpen(false)}
          />
        )}

        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={dropdownRef}
              initial={{
                opacity: 0,
                scale: 0.95,
                y: position.includes("bottom") ? -4 : 4,
              }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: position.includes("bottom") ? -4 : 4,
              }}
              transition={{ duration: 0.1, ease: "linear" }}
              style={{
                position: "fixed",
                top: coords.top,
                left: coords.left,
                minWidth: Math.max(coords.width, 160),
                zIndex: 9999,
              }}
              className="rounded-2xl p-1.5 bg-popover text-popover-foreground border border-border shadow-2xl outline-none"
            >
              <ul className="max-h-60 overflow-y-auto list-none p-0 m-0 custom-scrollbar">
                {children}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="min-h-5 ml-1">
          {/* Fixed height layout shift আটকাবে */}
          {error ? (
            <span
              role="alert"
              className="text-[12px] font-medium text-destructive animate-in fade-in slide-in-from-top-1 flex items-center gap-1"
            >
              ❌ {error}
            </span>
          ) : helpText ? (
            <span className="text-[12px] text-muted-foreground animate-in fade-in">
              💡 {helpText}
            </span>
          ) : null}
        </div>
      </div>
    </SelectContext.Provider>
  );
}

/* ======================= OPTION ======================= */

export function Option({ value: itemValue, children }: OptionProps) {
  const context = useContext(SelectContext);
  if (!context) return null;

  const { value, onSelect } = context;
  const isSelected = String(value) === String(itemValue);

  return (
    <li
      onClick={() => onSelect(itemValue)}
      className={cn(
        "flex items-center justify-between gap-3 px-3 py-2 text-sm rounded-xl cursor-pointer transition-all mb-0.5 last:mb-0 outline-none",
        isSelected
          ? "bg-primary text-primary-foreground font-medium shadow-sm"
          : "text-foreground/80 hover:bg-accent hover:text-accent-foreground",
      )}
    >
      <div className="flex items-center gap-3 whitespace-nowrap">
        {children}
      </div>
      {isSelected && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center"
        >
          <Check size={12} strokeWidth={3} className="text-white" />
        </motion.span>
      )}
    </li>
  );
}
