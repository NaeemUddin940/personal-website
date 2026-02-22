import { Activity, ArrowUpRight, TrendingUp } from "lucide-react";
import { useState } from "react";

export const StatsCardPremium = ({
  title,
  timeframes, // Pure timeframe object ta pass hobe
  subtext,
  icon: Icon,
  colorClass,
  glowColor,
  badgeText,
}) => {
  // Default range '7d'
  const [timeRange, setTimeRange] = useState("7d");
  const ranges = ["today", "7d", "15d", "30d"];

  // Current selected data ber kora
  const currentData = timeframes[timeRange];

  return (
    <div className="glass-item-premium group relative h-50">
      <div className="item-content bg-muted/90 hover:shadow-xl rounded-2xl custom-hover custom-shadow  transition-all duration-400 backdrop-blur-xl border border-white/5 p-5 h-full flex flex-col relative z-10 overflow-hidden">
        {/* Dynamic Glow Spheres */}
        <div
          className={`glow-sphere absolute -top-12 -right-12 w-32 h-32 blur-[60px] opacity-20 group-hover:opacity-60 transition-all duration-700 ${glowColor}`}
        ></div>
        <div
          className={`glow-sphere absolute -bottom-12 -left-12 w-32 h-32 blur-[60px] opacity-10 group-hover:opacity-40 transition-all duration-700 ${glowColor}`}
        ></div>

        {/* Top Header: Title & Time Range Picker */}
        <div className="flex justify-between items-center mb-6 relative z-20">
          <h3 className="font-bold text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80">
            {title}
          </h3>

          <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 backdrop-blur-md">
            {ranges.map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-2.5 py-1 rounded-lg cursor-pointer text-[9px] font-black uppercase transition-all ${
                  timeRange === range
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4 relative z-20">
          {/* Icon Container */}
          <div className="relative w-16 h-16 rounded-2xl shrink-0 flex items-center justify-center border border-white/10 bg-white/5 shadow-inner group-hover:border-white/20 transition-colors">
            {/* ColorClass theke text color dynamic kora hoyeche */}
            <div className={`text-2xl ${colorClass}`}>
              <Icon size={28} strokeWidth={1.5} />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-[7px] text-black px-1.5 py-0.5 rounded-sm font-black uppercase tracking-tighter">
              {badgeText || "Live"}
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-baseline gap-2">
              <span className="font-black text-3xl text-foreground tracking-tighter leading-none transition-all duration-300">
                {currentData.value}
              </span>

              {/* Trend color dynamic (Red if growth is down) */}
              <span
                className={`text-[10px] font-bold flex items-center gap-0.5 ${currentData.growth === "down" ? "text-rose-500" : "text-emerald-500"}`}
              >
                <TrendingUp
                  size={10}
                  className={currentData.growth === "down" ? "rotate-180" : ""}
                />
                {currentData.trend}
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground/60 mt-1 italic">
              Showing {timeRange === "today" ? "today's" : `last ${timeRange}`}{" "}
              data
            </p>
          </div>
        </div>

        {/* Bottom Footer Area */}
        <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between relative z-20">
          <span className="text-[10px] text-muted-foreground/60 flex items-center gap-1 font-medium">
            <Activity size={12} className="opacity-50" />
            {subtext}
          </span>
          <button className="text-[10px] cursor-pointer font-bold text-primary hover:text-primary/80 flex items-center gap-0.5 transition-colors">
            Details <ArrowUpRight size={10} />
          </button>
        </div>
      </div>
    </div>
  );
};
