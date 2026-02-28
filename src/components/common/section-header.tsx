"use client";
import { cn } from "@/lib/utils";
import React from "react";

export function SectionHeader({
  className,
  title,
  subtitle,
  icon: Icon,
}: {
  title: string;
  subtitle?: string;
  icon?: ElementType | ReactElement;
}) {
  return (
    <>
      <div className={cn("flex items-center border-b gap-3 pb-3", className)}>
        <div className="p-2.5 bg-primary/10 rounded-xl">
          {Icon &&
            (React.isValidElement(Icon) ? (
              icon
            ) : (
              <Icon className="w-5 h-5 text-primary" />
            ))}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
    </>
  );
}
