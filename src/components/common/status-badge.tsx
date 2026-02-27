// 1️⃣ Tailwind Color Type
export type TailwindColor =
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose";

// 2️⃣ Badge Style Type
type BadgeStyle = {
  bg: string;
  text: string;
  border: string;
};

// 3️⃣ Auto Generate Color Map
export const badgeColorMap: Record<TailwindColor, BadgeStyle> = {
  slate: createColor("slate"),
  gray: {
    bg: "bg-muted",
    text: "text-muted-foreground",
    border: "border-border",
  },
  zinc: createColor("zinc"),
  neutral: createColor("neutral"),
  stone: createColor("stone"),
  red: createColor("red"),
  orange: createColor("orange"),
  amber: createColor("amber"),
  yellow: createColor("yellow"),
  lime: createColor("lime"),
  green: createColor("green"),
  emerald: createColor("emerald"),
  teal: createColor("teal"),
  cyan: createColor("cyan"),
  sky: createColor("sky"),
  blue: createColor("blue"),
  indigo: createColor("indigo"),
  violet: createColor("violet"),
  purple: createColor("purple"),
  fuchsia: createColor("fuchsia"),
  pink: createColor("pink"),
  rose: createColor("rose"),
};

// 4️⃣ Color Generator Helper
function createColor(color: TailwindColor): BadgeStyle {
  return {
    bg: `bg-${color}-500/10`,
    text: `text-${color}-500`,
    border: `border-${color}-500/20`,
  };
}

interface StatusBadgeProps {
  label: string;
  color?: TailwindColor;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  color = "slate",
  className = "",
}) => {
  const style = badgeColorMap[color];

  return (
    <span
      className={`
        inline-flex items-center
        px-2 py-0.5
        rounded-md
        text-[9px]
        font-black
        uppercase
        tracking-tight
        border
        ${style.bg}
        ${style.text}
        ${style.border}
        ${className}
      `}
    >
      {label}
    </span>
  );
};
