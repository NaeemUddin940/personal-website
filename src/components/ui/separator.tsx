type SeparatorProps = {
  orientation?: "horizontal" | "vertical";
  variant?: "solid" | "dotted" | "gradient";
  label?: string;
  className?: string;
};

export default function Separator({
  orientation = "horizontal",
  variant = "solid",
  label,
  className = "",
}: SeparatorProps) {
  const isHorizontal = orientation === "horizontal";

  const base = isHorizontal
    ? "w-full h-px flex items-center"
    : "h-full w-px flex flex-col justify-center";

  const lineStyle = {
    solid: "bg-muted",
    dotted: "border-t border-dotted border-border bg-transparent",
    gradient: "bg-gradient-to-r from-transparent via-primary to-transparent",
  }[variant];

  if (label && isHorizontal) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <span className={`flex-1 h-px ${lineStyle}`} />
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className={`flex-1 h-px ${lineStyle}`} />
      </div>
    );
  }

  return (
    <div className={`${base} ${lineStyle} ${className}`} aria-hidden="true" />
  );
}
