"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Layers } from "lucide-react";
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
  value: string | string[] | undefined;
  onSelect: (val: string) => void;
  isOpen: boolean;
  multiple?: boolean;
}

interface SelectProps {
  children: ReactNode;
  value?: string | string[];
  onChange?: (value: any) => void;
  name?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  position?: Position;
  showChevron?: boolean;
  offset?: number;
  helpText?: string;
  disabled?: boolean;
  className?: string;
  customTrigger?: ReactNode;
  multiple?: boolean;
  iconOnly?: boolean;
}

interface OptionProps {
  value: string;
  children: ReactNode;
  label?: string;
  icon?: ReactNode;
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
  multiple = false,
  iconOnly = false,
}: SelectProps) {
  const [internalValue, setInternalValue] = useState<string | string[]>(
    multiple ? [] : "",
  );
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

  const updatePosition = useCallback(() => {
    if (triggerRef.current && isOpen) {
      const rect = triggerRef.current.getBoundingClientRect();
      const dropdownElement = dropdownRef.current;
      const dHeight = dropdownElement?.offsetHeight || 0;
      const dWidth = dropdownElement?.offsetWidth || 0;

      let top = 0;
      let left = 0;

      const [side, align] = position.split("-") as [string, string];

      if (side === "top") top = rect.top - dHeight - offset;
      else if (side === "bottom") top = rect.bottom + offset;
      else if (side === "left" || side === "right") {
        if (align === "top") top = rect.top;
        else if (align === "center")
          top = rect.top + rect.height / 2 - dHeight / 2;
        else if (align === "bottom") top = rect.bottom - dHeight;
      }

      if (side === "left") left = rect.left - dWidth - offset;
      else if (side === "right") left = rect.right + offset;
      else if (side === "top" || side === "bottom") {
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
      let newValue: string | string[];

      if (multiple) {
        const prevArr = Array.isArray(currentValue) ? currentValue : [];
        newValue = prevArr.includes(val)
          ? prevArr.filter((i) => i !== val)
          : [...prevArr, val];
      } else {
        newValue = val;
        setIsOpen(false);
      }

      if (!isControlled) setInternalValue(newValue);
      onChange?.(newValue);
    },
    [onChange, isControlled, multiple, currentValue],
  );

  const childrenArray = React.Children.toArray(
    children,
  ) as ReactElement<OptionProps>[];

  const renderDisplay = () => {
    if (multiple) {
      const selectedOptions = childrenArray.filter((child) =>
        (currentValue as string[])?.includes(String(child.props.value)),
      );

      if (selectedOptions.length === 0)
        return <span className="text-muted-foreground">{placeholder}</span>;

      if (iconOnly) {
        // IconOnly mode logic for multiple: show the icon of the first selected item
        return selectedOptions[0].props.icon || <Layers size={20} />;
      }

      if (selectedOptions.length > 2)
        return `${selectedOptions.length} items selected`;
      return selectedOptions
        .map((item) => item.props.label || item.props.children)
        .join(", ");
    }

    const selectedOption = childrenArray.find(
      (child) => String(child.props.value) === String(currentValue),
    );

    if (!selectedOption)
      return <span className="text-muted-foreground">{placeholder}</span>;

    const optionIcon = selectedOption.props.icon;
    const optionContent =
      selectedOption.props.label || selectedOption.props.children;

    if (iconOnly) {
      return optionIcon || <Layers size={20} />;
    }

    return (
      <div className="flex items-center gap-2">
        {optionIcon && <span className="shrink-0">{optionIcon}</span>}
        <span className="truncate">{optionContent}</span>
      </div>
    );
  };

  return (
    <SelectContext.Provider
      value={{ value: currentValue, onSelect, isOpen, multiple }}
    >
      <div className={cn("relative w-full", className)}>
        {name && (
          <input
            type="hidden"
            name={name}
            value={
              multiple
                ? (currentValue as string[]).join(",")
                : (currentValue as string)
            }
          />
        )}

        {label && !iconOnly && (
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
            "group flex shadow-sm cursor-pointer rounded-xl items-center bg-input border transition-all outline-none",
            iconOnly
              ? "h-10 w-10 justify-center px-0"
              : "w-full h-10 px-4 justify-between",
            error
              ? "border-destructive ring-4 ring-destructive/10"
              : "border-border",
            isOpen && "ring-4 ring-ring/10 border-primary",
            disabled && "opacity-50 cursor-not-allowed",
          )}
        >
          {customTrigger ? (
            customTrigger
          ) : (
            <>
              <div
                className={cn(
                  "relative h-full overflow-hidden flex items-center",
                  !iconOnly && "flex-1",
                )}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={JSON.stringify(currentValue) || "placeholder"}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    className="truncate font-medium flex items-center text-foreground"
                  >
                    {renderDisplay()}
                  </motion.div>
                </AnimatePresence>
              </div>
              {showChevron && !iconOnly && (
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
                minWidth: iconOnly ? 180 : Math.max(coords.width, 160),
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

        {!iconOnly && (
          <div className="min-h-5 ml-1">
            {error ? (
              <span
                role="alert"
                className="text-[12px] font-medium text-destructive flex items-center gap-1"
              >
                ❌ {error}
              </span>
            ) : helpText ? (
              <span className="text-[12px] text-muted-foreground">
                💡 {helpText}
              </span>
            ) : null}
          </div>
        )}
      </div>
    </SelectContext.Provider>
  );
}

/* ======================= OPTION ======================= */
export function Option({ value: itemValue, children, icon }: OptionProps) {
  const context = useContext(SelectContext);
  if (!context) return null;

  const { value, onSelect, multiple } = context;
  const isSelected = multiple
    ? Array.isArray(value) && value.includes(itemValue)
    : String(value) === String(itemValue);

  return (
    <li
      onClick={(e) => {
        if (multiple) e.stopPropagation();
        onSelect(itemValue);
      }}
      className={cn(
        "flex items-center justify-between gap-3 px-4 py-2.5 text-sm rounded-xl cursor-pointer transition-all mb-0.5 last:mb-0 group outline-none",
        isSelected
          ? "bg-primary text-primary-foreground font-bold"
          : "text-foreground/80 hover:bg-primary/10 hover:text-primary",
      )}
    >
      <div className="flex items-center gap-3">
        {icon && <span className="shrink-0 text-base">{icon}</span>}
        <span className="truncate">{children}</span>
      </div>
      {isSelected && (
        <motion.div
          layoutId={multiple ? undefined : "active-check"}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex items-center justify-center h-5 w-5 rounded-full bg-green-500 shadow-sm"
        >
          <Check size={12} strokeWidth={4} className="text-white" />
        </motion.div>
      )}
    </li>
  );
}
