import React, { ElementType, ReactNode } from "react";

/* =========================================================
   Types
========================================================= */

type BadgeColor =
  | "purple"
  | "indigo"
  | "violet"
  | "fuchsia"
  | "pink"
  | "rose"
  | "blue"
  | "sky"
  | "cyan"
  | "teal"
  | "emerald"
  | "green"
  | "lime"
  | "yellow"
  | "amber"
  | "orange"
  | "red"
  | "gray"
  | "slate"
  | "zinc"
  | "neutral"
  | "stone";

interface BaseBadgeProps {
  color?: BadgeColor;
  className?: string;
}

interface OverlayBadgeProps extends BaseBadgeProps {
  children: ReactNode;
  value?: string | number;
  icon?: never;
}

interface StatusBadgeProps extends BaseBadgeProps {
  value: string | number;
  icon?: ElementType;
  children?: never;
}

type BadgeProps = OverlayBadgeProps | StatusBadgeProps;

/* =========================================================
   Component
========================================================= */

export const Badge: React.FC<BadgeProps> = ({
  color = "purple",
  value,
  icon: Icon,
  children,
  className = "",
}) => {
  /* ============================
     Color Mapping
  ============================ */

  const colorClasses: Record<BadgeColor, string> = {
    purple: `${children ? "bg-purple-400" : "bg-purple-500/20"} text-white border border-purple-500`,
    indigo: `${children ? "bg-indigo-500" : "bg-indigo-500/20"} text-white border border-indigo-500`,
    violet: `${children ? "bg-violet-400" : "bg-violet-500/20"} text-white border border-violet-500`,
    fuchsia: `${children ? "bg-fuchsia-400" : "bg-fuchsia-500/20"} text-white border border-fuchsia-500`,
    pink: `${children ? "bg-pink-400" : "bg-pink-500/20"} text-white border border-pink-500`,
    rose: `${children ? "bg-rose-400" : "bg-rose-500/20"} text-white border border-rose-500`,
    blue: `${children ? "bg-blue-400" : "bg-blue-500/20"} text-white border border-blue-500`,
    sky: `${children ? "bg-sky-400" : "bg-sky-500/20"} text-white border border-sky-500`,
    cyan: `${children ? "bg-cyan-400" : "bg-cyan-500/20"} text-white border border-cyan-500`,
    teal: `${children ? "bg-teal-400" : "bg-teal-500/20"} text-white border border-teal-500`,
    emerald: `${children ? "bg-emerald-400" : "bg-emerald-500/20"} text-white border border-emerald-500`,
    green: `${children ? "bg-green-400" : "bg-green-500/20"} text-white border border-green-500`,
    lime: `${children ? "bg-lime-400" : "bg-lime-500/20"} text-white border border-lime-500`,
    yellow: `${children ? "bg-yellow-400" : "bg-yellow-500/20"} text-white border border-yellow-500`,
    amber: `${children ? "bg-amber-400" : "bg-amber-500/20"} text-white border border-amber-500`,
    orange: `${children ? "bg-orange-400" : "bg-orange-500/20"} text-white border border-orange-500`,
    red: `${children ? "bg-red-400" : "bg-red-500/20"} text-white border border-red-500`,
    gray: `${children ? "bg-gray-400" : "bg-gray-500/20"} text-white border border-gray-500`,
    slate: `${children ? "bg-slate-400" : "bg-slate-500/20"} text-white border border-slate-500`,
    zinc: `${children ? "bg-zinc-400" : "bg-zinc-500/20"} text-white border border-zinc-500`,
    neutral: `${children ? "bg-neutral-400" : "bg-neutral-500/20"} text-white border border-neutral-500`,
    stone: `${children ? "bg-stone-400" : "bg-stone-500/20"} text-white border border-stone-500`,
  };

  const selectedColor = colorClasses[color];

  /* ============================
     Base Styles
  ============================ */

  const badgeBaseStyles = `
    inline-flex items-center justify-center
    leading-none font-bold rounded-full
    ${selectedColor}
    ${className}
  `;

  /* ============================
     Overlay Badge
  ============================ */

  if (children) {
    return (
      <div className="relative inline-flex align-middle">
        {children}
        {value && (
          <span
            className={`
              absolute -top-1 -right-1
              min-w-5 h-5 px-1
              text-[10px] border-2 border-white
              ${badgeBaseStyles}
            `}
          >
            {value}
          </span>
        )}
      </div>
    );
  }

  /* ============================
     Status Badge
  ============================ */

  return (
    <span
      className={`
        px-3 py-1.5 text-xs gap-1.5
        ${badgeBaseStyles}
      `}
    >
      {Icon && <Icon size={14} className="shrink-0" />}
      {value}
    </span>
  );
};
