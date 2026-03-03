"use client";
import { Button } from "@/components/common/advanced-button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React, { ComponentPropsWithoutRef } from "react";

interface HeaderAction extends Omit<
  ComponentPropsWithoutRef<typeof Button>,
  "children"
> {
  label: string;
  icon?: LucideIcon | React.ReactNode;
  href?: string;
}

interface PageHeaderProps extends ComponentPropsWithoutRef<"div"> {
  title: string;
  description?: string;
  actions?: HeaderAction[];
}

export default function PageHeader({
  title,
  description,
  actions,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <motion.div
      {...props}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "flex flex-col md:flex-row shadow-md border border-border px-5 py-2 rounded-xl justify-between items-start md:items-center gap-4 bg-card",
        className,
      )}
    >
      <div>
        <h1 className="text-4xl font-black tracking-tight text-foreground uppercase">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground font-medium mt-1">
            {description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {actions?.map((action, index) => {
          // icon-কে Icon নামে ডিস্ট্রাকচার করছি (PascalCase এ যেন কম্পোনেন্ট হিসেবে ব্যবহার করা যায়)
          const { label, icon: Icon, href, ...buttonProps } = action;

          const commonClassName = cn(
            "rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all active:scale-95 whitespace-nowrap",
            buttonProps.className,
          );

          // আইকনটি যদি একটি Lucide Component বা Function হয়
          const isComponent =
            typeof Icon === "function" ||
            (typeof Icon === "object" && Icon !== null && "render" in Icon);
          const IconComp = isComponent ? (Icon as LucideIcon) : null;

          if (href) {
            return (
              <Link
                key={index}
                href={href}
                className={cn(
                  "bg-primary text-primary-foreground px-6 py-3 shadow-xl shadow-primary/20",
                  commonClassName,
                )}
              >
                {IconComp ? <IconComp size={18} /> : Icon}
                <span>{label}</span>
              </Link>
            );
          }

          return (
            <Button
              key={index}
              icon={IconComp ? <IconComp size={18} /> : Icon}
              {...buttonProps}
              className={cn("px-6 py-3 shadow-xl", commonClassName)}
            >
              <span>{label}</span>
            </Button>
          );
        })}
      </div>
    </motion.div>
  );
}
