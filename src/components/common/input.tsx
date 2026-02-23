"use client";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, ReactNode, useId, useState } from "react";

type IconType =
  | React.ComponentType<{ className?: string; strokeWidth?: number }>
  | ReactNode;

// 1. Forgot Password-এর জন্য নতুন টাইপ ডিফাইন করলাম
interface ForgotPasswordConfig {
  label?: string; // যেমন: "Forgot Password?"
  href?: string; // লিংকের জন্য
  onClick?: () => void; // ফাংশন বা মোডাল ওপেন করার জন্য
}

interface InputFieldProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  rows?: number;
  icon?: IconType;
  // 2. showForgotPassword কে সরিয়ে নতুন প্রপ দিলাম যা flexible
  forgotPassword?: ForgotPasswordConfig;
  iconPosition?: "left" | "right";
  iconClassName?: string;
  required?: boolean;
  error?: string | string[];
  id?: string;
  defaultValue?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  [key: string]: any;
}

export default function Input({
  name,
  label,
  type = "text",
  placeholder = "",
  className = "",
  containerClassName = "",
  rows = 4,
  onChange,
  forgotPassword, // showForgotPassword-এর বদলে এটি ব্যবহার করছি
  icon: Icon,
  iconPosition = "left",
  iconClassName = "",
  required = false,
  error,
  defaultValue,
  ...props
}: InputFieldProps) {
  const generatedId = useId();
  const inputId = props.id || generatedId;

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isPassword = type === "password";
  const isTextarea = type === "textarea";

  const errorMessage = Array.isArray(error) ? error[0] : error;

  const baseClasses = `
    w-full px-4 py-2 rounded-lg transition-all duration-200 outline-none border
    bg-muted text-foreground border-border
    placeholder:text-muted-foreground
    focus:ring-2 focus:ring-primary/70 focus:border-primary
    disabled:opacity-60 disabled:cursor-not-allowed
  `;

  const iconPaddingClasses = `
    ${Icon && iconPosition === "left" ? "pl-10" : ""}
    ${(Icon && iconPosition === "right") || isPassword ? "pr-10" : ""}
  `;

  const errorClasses = errorMessage
    ? "border-destructive focus:ring-destructive/20 focus:border-destructive"
    : "";

  const renderIcon = (pos: "left" | "right") => {
    if (!Icon || iconPosition !== pos) return null;
    return (
      <div
        className={`absolute ${pos === "left" ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none transition-colors group-focus-within:text-primary`}
      >
        {typeof Icon === "function" ? (
          <Icon
            className={`h-5 w-5 text-muted-foreground ${iconClassName}`}
            strokeWidth={1.5}
          />
        ) : (
          Icon
        )}
      </div>
    );
  };

  // 3. Forgot Password রেন্ডার করার ফাংশন
  const renderForgotPassword = () => {
    if (!forgotPassword || type !== "password") return null;

    const { label = "Forgot Password?", href, onClick } = forgotPassword;
    const commonClasses =
      "text-md italic font-medium text-primary hover:underline cursor-pointer transition-colors";

    // যদি href থাকে, তাহলে <a> ট্যাগ রেন্ডার হবে
    if (href) {
      return (
        <Link href={href} className={commonClasses}>
          {label}
        </Link>
      );
    }

    // যদি onClick থাকে, তাহলে <button> রেন্ডার হবে
    if (onClick) {
      return (
        <button type="button" onClick={onClick} className={commonClasses}>
          {label}
        </button>
      );
    }

    return null;
  };

  return (
    <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label
            htmlFor={inputId}
            className="text-sm font-semibold text-foreground/80 cursor-pointer w-fit"
          >
            {label}{" "}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>

          {/* এখানে Forgot Password কল করা হলো */}
          {renderForgotPassword()}
        </div>
      )}

      <div className="relative group">
        {renderIcon("left")}
        {isTextarea ? (
          <textarea
            id={inputId}
            name={name}
            rows={rows}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={onChange}
            className={cn(
              `${baseClasses} ${errorClasses} resize-none ${className}`,
            )}
            {...props}
          />
        ) : (
          <>
            <input
              id={inputId}
              name={name}
              type={isPassword ? (showPassword ? "text" : "password") : type}
              placeholder={placeholder}
              defaultValue={defaultValue}
              onChange={onChange}
              className={`${baseClasses} ${iconPaddingClasses} ${errorClasses} ${className}`}
              {...props}
            />
          </>
        )}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
        {!isPassword && renderIcon("right")}
      </div>

      {errorMessage && (
        <span
          role="alert"
          className="text-[12px] font-medium text-destructive mt-0.5 ml-1 animate-in fade-in slide-in-from-top-1"
        >
          {errorMessage}
        </span>
      )}
    </div>
  );
}
