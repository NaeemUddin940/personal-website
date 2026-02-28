"use client";
import { DatePicker } from "@/component/ui/date-picker";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
  useId,
  useState,
} from "react";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from "react-hook-form";

// Icon Type - supports both component and ReactNode
type IconType =
  | React.ComponentType<{ className?: string; strokeWidth?: number }>
  | React.ReactNode;

// Forgot Password Configuration
interface ForgotPasswordConfig {
  label?: string;
  href?: string;
  onClick?: () => void;
}

// Size variants for the input
type InputSize = "sm" | "md" | "lg";

// Variant styles
type InputVariant = "default" | "filled" | "outline" | "ghost";

// Base props shared between input and textarea
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
  // For direct value control (React state)
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  // For react-hook-form register
  register?: UseFormRegisterReturn<string>;
  // Success state
  success?: boolean;
  successMessage?: string;
  // Character count
  showCharCount?: boolean;
  maxLength?: number;
  // Loading state
  loading?: boolean;
  // Prefix/Suffix
  prefix?: ReactNode;
  suffix?: ReactNode;
}

// Input specific props
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

// Textarea specific props
interface InputFieldTextareaProps extends BaseInputFieldProps {
  type: "textarea";
  rows?: number;
  textareaProps?: Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "name" | "id" | "className"
  >;
}

export type InputFieldProps = InputFieldInputProps | InputFieldTextareaProps;

// Size classes mapping
const sizeClasses: Record<InputSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-base",
  lg: "px-5 py-3.5 text-lg",
};

// Variant classes mapping
const variantClasses: Record<InputVariant, string> = {
  default: "bg-input border-border focus:border-primary",
  filled: "bg-muted border-transparent focus:bg-input focus:border-primary",
  outline: "bg-transparent border-border focus:border-primary",
  ghost:
    "bg-transparent border-transparent focus:bg-input focus:border-primary",
};

// Icon size based on input size
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
  const [charCount, setCharCount] = useState<number>(
    typeof value === "string" ? value.length : 0,
  );

  const isPassword = props.type === "password";
  const isTextarea = props.type === "textarea";
  const isDate = props.type === "date";
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value as string) : null,
  );

  // Extract error message from various error types
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

  // Base input classes
  const baseClasses = cn(
    "w-full rounded-lg transition-all duration-300 outline-none border",
    "text-foreground",
    "placeholder:text-muted-foreground",
    "focus:ring-2 focus:ring-primary/30",
    "disabled:opacity-60 disabled:cursor-not-allowed",
    "read-only:bg-muted read-only:cursor-default",
    sizeClasses[size],
    variantClasses[variant],
  );

  // Icon padding classes
  const getIconPadding = () => {
    const paddingMap = {
      sm: { left: "pl-9", right: "pr-9" },
      md: { left: "pl-10", right: "pr-10" },
      lg: { left: "pl-12", right: "pr-12" },
    };

    let padding = "";
    if (Icon && iconPosition === "left") {
      padding += paddingMap[size].left + " ";
    }
    if ((Icon && iconPosition === "right") || isPassword || suffix || loading) {
      padding += paddingMap[size].right;
    }
    if (prefix) {
      padding += " " + paddingMap[size].left;
    }
    return padding;
  };

  // State classes (error/success)
  const stateClasses = cn(
    errorMessage &&
      "border-destructive focus:ring-destructive/20 focus:border-destructive",
    success &&
      !errorMessage &&
      "border-success focus:ring-success/20 focus:border-success",
  );

  // Handle change for character count
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (showCharCount) {
      setCharCount(e.target.value.length);
    }
    onChange?.(e);
    register?.onChange?.(e);
  };

  // Render icon
  const renderIcon = (pos: "left" | "right") => {
    if (!Icon || iconPosition !== pos) return null;

    const positionClasses = pos === "left" ? "left-3" : "right-3";

    // ১. চেক করুন এটা কি কোনো valid React Component (Function অথবা forwardRef Object)
    const isComponent =
      typeof Icon === "function" ||
      (typeof Icon === "object" && Icon !== null && "render" in (Icon as any));

    return (
      <div
        className={cn(
          "absolute top-1/2 z-50 -translate-y-1/2 flex items-center justify-center pointer-events-none transition-colors group-focus-within:text-primary",
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

  // Render forgot password link/button
  const renderForgotPassword = () => {
    if (!forgotPassword || props.type !== "password") return null;

    const {
      label: fpLabel = "Forgot Password?",
      href,
      onClick,
    } = forgotPassword;
    const commonClasses =
      "text-sm italic font-medium text-primary hover:underline cursor-pointer transition-colors";

    if (href) {
      return (
        <a href={href} className={commonClasses}>
          {fpLabel}
        </a>
      );
    }

    if (onClick) {
      return (
        <button type="button" onClick={onClick} className={commonClasses}>
          {fpLabel}
        </button>
      );
    }

    return null;
  };

  // Loading spinner
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

  // Combined props for register and controlled input
  const getInputProps = () => {
    const baseProps = {
      id: inputId,
      name,
      placeholder,
      disabled: disabled || loading,
      readOnly,
      maxLength,
      "aria-invalid": !!errorMessage,
      "aria-describedby": errorMessage
        ? `${inputId}-error`
        : helpText
          ? `${inputId}-help`
          : undefined,
    };

    // React Hook Form
    if (register) {
      return {
        ...baseProps,
        ...register,
        onChange: handleChange,
      };
    }

    // Controlled component (ONLY if value is defined)
    if (value !== undefined) {
      return {
        ...baseProps,
        value,
        onChange: handleChange,
      };
    }

    // Uncontrolled (Native Form case)
    return {
      ...baseProps,
      onChange: handleChange,
    };
  };

  // Render prefix
  const renderPrefix = () => {
    if (!prefix) return null;
    return (
      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-muted-foreground">
        {prefix}
      </div>
    );
  };

  // Render suffix
  const renderSuffix = () => {
    if (!suffix) return null;
    return (
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-muted-foreground">
        {suffix}
      </div>
    );
  };

  return (
    <div
      className={cn("flex flex-col gap-1.5 group w-full", containerClassName)}
    >
      {/* Label Row */}
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
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </label>
          )}
          {renderForgotPassword()}
        </div>
      )}

      {/* Input Container */}
      <div className="relative group focus-within:scale-102 transition-all duration-300">
        {renderPrefix()}
        {renderIcon("left")}
        {isDate ? (
          <DatePicker
            selectedDate={selectedDate}
            setSelectedDate={(date) => {
              setSelectedDate(date);

              const syntheticEvent = {
                target: {
                  name,
                  value: date
                    ? new Date(
                        date.getTime() - date.getTimezoneOffset() * 60000,
                      )
                        .toISOString()
                        .split("T")[0]
                    : "",
                },
              } as ChangeEvent<HTMLInputElement>;

              handleChange(syntheticEvent);
            }}
          />
        ) : isTextarea ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            rows={(props as InputFieldTextareaProps).rows || 4}
            className={cn(baseClasses, stateClasses, "resize-none", className)}
            {...getInputProps()}
            {...(props as InputFieldTextareaProps).textareaProps}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            type={
              isPassword
                ? showPassword
                  ? "text"
                  : "password"
                : props.type || "text"
            }
            min={props.type === "number" ? 0 : undefined}
            className={cn(
              baseClasses,
              getIconPadding(),
              stateClasses,
              className,
            )}
            {...getInputProps()}
            {...(props as InputFieldInputProps).inputProps}
          />
        )}

        {/* Password toggle */}
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

        {/* Right icon (only if not password) */}
        {!isPassword && !loading && !suffix && renderIcon("right")}

        {/* Loading spinner */}
        {renderLoading()}

        {/* Suffix */}
        {!isPassword && !loading && renderSuffix()}
      </div>

      {/* Bottom row: error, success, help text, character count */}
      <div className="flex items-center justify-between min-h-4.5">
        <div className="flex-1">
          {errorMessage ? (
            <span
              id={`${inputId}-error`}
              role="alert"
              className="text-xs font-medium text-destructive animate-in"
            >
              {errorMessage}
            </span>
          ) : success && successMessage ? (
            <span className="text-xs font-medium text-success animate-in">
              ✓ {successMessage}
            </span>
          ) : helpText ? (
            <span
              id={`${inputId}-help`}
              className="text-xs text-muted-foreground"
            >
              💡 {helpText}
            </span>
          ) : null}
        </div>

        {showCharCount && maxLength && (
          <span
            className={cn(
              "text-xs",
              charCount > maxLength
                ? "text-destructive"
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
