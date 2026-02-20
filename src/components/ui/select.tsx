/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

const SelectContext = createContext(null);

/* -------------------------------- Select Components (Definitions) -------------------------------- */

function DropdownContainer({
  children,
  side = "bottom",
  align = "left",
  offset = 8,
}) {
  const context = useContext(SelectContext);
  if (!context) return null;
  const { isOpen } = context;

  const sideClasses = {
    bottom: "top-full",
    top: "bottom-full",
    left: "right-full top-0",
    right: "left-full top-0",
  };

  const alignClasses = {
    left: "left-0",
    center: "left-1/2 -translate-x-1/2",
    right: "right-0",
  };

  const spacingStyle =
    side === "bottom"
      ? { marginTop: offset }
      : side === "top"
        ? { marginBottom: offset }
        : side === "left"
          ? { marginRight: offset }
          : { marginLeft: offset };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: side === "bottom" ? -4 : 4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: side === "bottom" ? -4 : 4 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{
            ...spacingStyle,
            position: "absolute",
          }}
          className={cn(
            "absolute z-999 min-w-40 w-max rounded-2xl p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl",
            sideClasses[side],
            (side === "top" || side === "bottom") && alignClasses[align],
          )}
        >
          <ul className="max-h-60 overflow-y-auto list-none p-0 m-0">
            {children}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Select({
  children,
  value: controlledValue,
  onChange,
  name,
  placeholder = "Select...",
  label,
  error,
  side = "bottom",
  align = "left",
  showChevron = true,
  offset = 8,
  disabled = false,
  className,
  customTrigger,
}) {
  const [internalValue, setInternalValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const listboxId = useId();

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  useEffect(() => {
    if (
      currentValue === undefined ||
      currentValue === "" ||
      currentValue === null
    ) {
      const childrenArray = React.Children.toArray(children);
      const defaultOption = childrenArray.find(
        (child) => child?.props?.defaultSelect === true,
      );

      if (defaultOption) {
        const val = defaultOption.props.value;
        if (!isControlled) setInternalValue(val);
        onChange?.(val);
      }
    }
  }, [children, controlledValue, onChange, isControlled, currentValue]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSelect = useCallback(
    (val) => {
      if (!isControlled) setInternalValue(val);
      onChange?.(val);
      setIsOpen(false);
      triggerRef.current?.focus();
    },
    [onChange, isControlled],
  );

  const selectedOption = React.Children.toArray(children).find(
    (child) => String(child?.props?.value) === String(currentValue),
  );

  const renderDisplay = () => {
    if (!selectedOption)
      return (
        <span className="text-muted-foreground font-normal">{placeholder}</span>
      );

    if (selectedOption.props.label) {
      const childrenArray = React.Children.toArray(
        selectedOption.props.children,
      );
      return childrenArray[0];
    }

    return selectedOption.props.children;
  };

  return (
    <SelectContext.Provider
      value={{
        value: currentValue,
        onSelect,
        isOpen,
        setIsOpen,
        disabled,
        listboxId,
      }}
    >
      <div
        ref={rootRef}
        className={cn("relative  w-full", className)}
        style={{ zIndex: isOpen ? 50 : 1 }}
      >
        {name && (
          <input
            type="hidden"
            name={name}
            value={currentValue || ""}
            disabled={disabled}
          />
        )}

        {label && (
          <label
            className={cn(
              "text-sm font-semibold ml-1 mb-2 block text-foreground/90",
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
          onClick={() => !disabled && setIsOpen((v) => !v)}
          className={cn(
            "group flex w-full custom-shadow cursor-pointer rounded-2xl items-center h-10 bg-input border transition-all px-4",
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
              <div className="relative  h-full overflow-hidden flex items-center flex-1">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={currentValue ? String(currentValue) : "placeholder"}
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
                >
                  <ChevronDown size={16} className="text-muted-foreground" />
                </motion.div>
              )}
            </>
          )}
        </button>

        <DropdownContainer side={side} align={align} offset={offset}>
          {children}
        </DropdownContainer>
      </div>
    </SelectContext.Provider>
  );
}

export function Option({ value: itemValue, children, label, defaultSelect }) {
  const context = useContext(SelectContext);
  if (!context) return null;
  const { value, onSelect } = context;

  const isSelected = String(value) === String(itemValue);

  return (
    <li
      onClick={() => onSelect(itemValue)}
      className={cn(
        "flex items-center justify-between gap-3 px-3 py-2 text-sm rounded-xl cursor-pointer transition-all mb-0.5 last:mb-0",
        isSelected
          ? "bg-primary text-white font-medium shadow-sm"
          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800",
      )}
    >
      <div className="flex items-center gap-3">{children}</div>
      {isSelected && (
        <span className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
          <Check size={12} strokeWidth={3} className="text-white" />
        </span>
      )}
    </li>
  );
}
