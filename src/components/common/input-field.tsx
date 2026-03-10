"use client";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import React, {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
  useEffect,
  useId,
  useState,
} from "react";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from "react-hook-form";

/**
 * Mock DatePicker for standalone compatibility.
 * Replace this import with your actual component: import { DatePicker } from "@/components/common/date-picker";
 */
const DatePicker = ({ selectedDate, setSelectedDate }: any) => (
  <input
    type="date"
    className="w-full rounded-lg border p-2"
    value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
    onChange={(e) =>
      setSelectedDate(e.target.value ? new Date(e.target.value) : null)
    }
  />
);

type IconType =
  | React.ComponentType<{ className?: string; strokeWidth?: number }>
  | React.ReactNode;

interface ForgotPasswordConfig {
  label?: string;
  href?: string;
  onClick?: () => void;
}

type InputSize = "sm" | "md" | "lg";
type InputVariant = "default" | "filled" | "outline" | "ghost";

interface BaseInputFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  icon?: IconType;
  iconPosition?: "left" | "right";
  iconClassName?: string;
  required?: boolean;
  error?:
    | string
    | string[]
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>;
  helpText?: string;
  id?: string;
  size?: InputSize;
  variant?: InputVariant;
  forgotPassword?: ForgotPasswordConfig;
  disabled?: boolean;
  readOnly?: boolean;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  register?: UseFormRegisterReturn<string>;
  success?: boolean;
  successMessage?: string;
  showCharCount?: boolean;
  maxLength?: number;
  loading?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

interface InputFieldInputProps extends BaseInputFieldProps {
  type?:
    | "text"
    | "number"
    | "password"
    | "email"
    | "tel"
    | "url"
    | "search"
    | "date"
    | "time"
    | "datetime-local";
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "name" | "id" | "className"
  >;
}

interface InputFieldTextareaProps extends BaseInputFieldProps {
  type: "textarea";
  rows?: number;
  textareaProps?: Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "name" | "id" | "className"
  >;
}

export type InputFieldProps = InputFieldInputProps | InputFieldTextareaProps;

const sizeClasses: Record<InputSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-md",
  lg: "px-5 py-3.5 text-lg",
};

const variantClasses: Record<InputVariant, string> = {
  default: "bg-input border-border focus:border-primary",
  filled:
    "bg-muted border-transparent focus:bg-background focus:border-primary",
  outline: "bg-transparent border-input focus:border-primary",
  ghost:
    "bg-transparent border-transparent focus:bg-background focus:border-primary",
};

const iconSizeClasses: Record<InputSize, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export const InputField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputFieldProps
>((props, ref) => {
  const {
    name,
    label,
    placeholder = "",
    className = "",
    containerClassName = "",
    labelClassName = "",
    onChange,
    forgotPassword,
    icon: Icon,
    iconPosition = "left",
    helpText,
    iconClassName = "",
    error,
    required = false,
    value,
    size = "md",
    variant = "default",
    disabled = false,
    readOnly = false,
    register,
    success = false,
    successMessage,
    showCharCount = false,
    maxLength,
    loading = false,
    prefix,
    suffix,
  } = props;

  const generatedId = useId();
  const inputId = props.id || generatedId;

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [charCount, setCharCount] = useState<number>(0);

  // Sync internal char count with initial value
  useEffect(() => {
    if (value !== undefined) {
      setCharCount(String(value).length);
    }
  }, [value]);

  const isPassword = props.type === "password";
  const isTextarea = props.type === "textarea";
  const isDate = props.type === "date";

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value as string) : null,
  );

  const getErrorMessage = (): string | undefined => {
    if (!error) return undefined;
    if (typeof error === "string") return error;
    if (Array.isArray(error)) return error[0];
    if (typeof error === "object" && "message" in error) {
      return error.message as string;
    }
    return undefined;
  };

  const errorMessage = getErrorMessage();

  const baseClasses = cn(
    " w-full px-4 py-2.5 rounded-lg transition-all duration-300 outline-none border bg-input text-secondary-foreground border-border placeholder:text-muted-foreground focus:scale-102 focus:ring-2 focus:ring-primary/30 focus:border-primary disabled:opacity-60 disabled:cursor-not-allowed",
    sizeClasses[size],
    variantClasses[variant],
  );

  const getIconPadding = () => {
    const paddingMap = {
      sm: { left: "pl-9", right: "pr-9" },
      md: { left: "pl-10", right: "pr-10" },
      lg: { left: "pl-12", right: "pr-12" },
    };
    let padding = "";
    if ((Icon && iconPosition === "left") || prefix)
      padding += paddingMap[size].left + " ";
    if ((Icon && iconPosition === "right") || isPassword || suffix || loading)
      padding += paddingMap[size].right;
    return padding;
  };

  const stateClasses = cn(
    errorMessage &&
      "border-destructive focus:ring-destructive/20 focus:border-destructive",
    success &&
      !errorMessage &&
      "border-green-500 focus:ring-green-500/20 focus:border-green-500",
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (showCharCount) setCharCount(e.target.value.length);
    onChange?.(e);
    if (register) register.onChange(e);
  };

  const renderIcon = (pos: "left" | "right") => {
    if (!Icon || iconPosition !== pos) return null;
    const positionClasses = pos === "left" ? "left-3" : "right-3";
    const isComponent =
      typeof Icon === "function" ||
      (typeof Icon === "object" && Icon !== null && "render" in (Icon as any));

    return (
      <div
        className={cn(
          "absolute top-1/2 z-10 -translate-y-1/2 flex items-center justify-center pointer-events-none transition-colors group-focus-within:text-primary",
          positionClasses,
        )}
      >
        {isComponent ? (
          <Icon
            className={cn(
              iconSizeClasses[size],
              "text-muted-foreground",
              iconClassName,
            )}
            strokeWidth={1.5}
          />
        ) : (
          Icon
        )}
      </div>
    );
  };

  const renderForgotPassword = () => {
    if (!forgotPassword || props.type !== "password") return null;
    const {
      label: fpLabel = "Forgot Password?",
      href,
      onClick,
    } = forgotPassword;
    const commonClasses =
      "text-xs italic font-medium text-primary hover:underline cursor-pointer transition-colors";
    return href ? (
      <a href={href} className={commonClasses}>
        {fpLabel}
      </a>
    ) : (
      <button type="button" onClick={onClick} className={commonClasses}>
        {fpLabel}
      </button>
    );
  };

  const renderLoading = () => {
    if (!loading) return null;
    return (
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        <svg
          className={cn("animate-spin text-primary", iconSizeClasses[size])}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    );
  };

  // Logic to merge refs and handle register vs custom props
  const inputPropsMerged = {
    id: inputId,
    name: register?.name || name,
    placeholder,
    disabled: disabled || loading,
    readOnly,
    maxLength,
    autoComplete: isPassword ? "current-password" : "off",
    ...(register ? register : {}),
    onChange: handleChange,
    ...(value !== undefined ? { value } : {}),
    "aria-invalid": !!errorMessage,
  };

  return (
    <div
      className={cn("flex flex-col gap-1.5 group w-full", containerClassName)}
    >
      {(label || forgotPassword) && (
        <div className="flex items-center justify-between">
          {label && (
            <label
              htmlFor={inputId}
              className={cn(
                "text-sm font-semibold group-focus-within:text-primary text-foreground/80 cursor-pointer w-fit transition-colors",
                labelClassName,
              )}
            >
              {label}{" "}
              {required && <span className="text-destructive ml-1">*</span>}
            </label>
          )}
          {renderForgotPassword()}
        </div>
      )}

      <div className="relative group transition-all duration-300">
        {prefix && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-muted-foreground">
            {prefix}
          </div>
        )}
        {renderIcon("left")}

        {isDate ? (
          <DatePicker
            selectedDate={selectedDate}
            setSelectedDate={(date: Date | null) => {
              setSelectedDate(date);
              const val = date ? date.toISOString().split("T")[0] : "";
              const event = {
                target: { name: register?.name || name, value: val },
              } as ChangeEvent<HTMLInputElement>;
              handleChange(event);
            }}
          />
        ) : isTextarea ? (
          <textarea
            ref={(node: HTMLTextAreaElement) => {
              if (register) register.ref(node);
              if (typeof ref === "function") ref(node);
              else if (ref) (ref as any).current = node;
            }}
            rows={(props as InputFieldTextareaProps).rows || 4}
            className={cn(baseClasses, stateClasses, "resize-none", className)}
            {...(inputPropsMerged as any)}
            {...(props as InputFieldTextareaProps).textareaProps}
          />
        ) : (
          <input
            ref={(node: HTMLInputElement) => {
              if (register) register.ref(node);
              if (typeof ref === "function") ref(node);
              else if (ref) (ref as any).current = node;
            }}
            type={
              isPassword
                ? showPassword
                  ? "text"
                  : "password"
                : props.type || "text"
            }
            className={cn(
              baseClasses,
              getIconPadding(),
              stateClasses,
              className,
            )}
            {...(inputPropsMerged as any)}
            {...(props as InputFieldInputProps).inputProps}
          />
        )}

        {isPassword && !loading && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {!isPassword && !loading && !suffix && renderIcon("right")}
        {renderLoading()}
        {suffix && !loading && !isPassword && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {suffix}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between min-h-[1.25rem]">
        <div className="flex-1">
          {errorMessage ? (
            <span className="text-xs font-medium text-destructive animate-in fade-in slide-in-from-top-1">
              {errorMessage}
            </span>
          ) : success && successMessage ? (
            <span className="text-xs font-medium text-green-600 animate-in fade-in">
              ✓ {successMessage}
            </span>
          ) : helpText ? (
            <span className="text-xs text-muted-foreground">💡 {helpText}</span>
          ) : null}
        </div>

        {showCharCount && maxLength && (
          <span
            className={cn(
              "text-xs transition-colors",
              charCount > maxLength
                ? "text-destructive font-bold"
                : "text-muted-foreground",
            )}
          >
            {charCount}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
});

InputField.displayName = "InputField";

export default InputField;
