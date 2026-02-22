import {
  ArrowUpRight,
  PieChartIcon,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

// Updated Data: Revenue vs Expenses/Returns with Totals
const financialData = {
  revenue: [
    { label: "Today", value: "$12,450", color: "text-emerald-500" },
    { label: "7 Days", value: "$85,200", color: "text-emerald-500" },
    { label: "15 Days", value: "$158,900", color: "text-emerald-500" },
    {
      label: "Monthly Total",
      value: "$324,300",
      color: "text-primary",
      highlight: true,
    },
  ],
  expenses: [
    { label: "Refunds", value: "-$420", color: "text-rose-500" },
    { label: "Damages", value: "-$180", color: "text-rose-500" },
    { label: "Returns", value: "-$920", color: "text-rose-500" },
    { label: "Shipping", value: "-$2,100", color: "text-rose-500" },
    {
      label: "Total Expenses",
      value: "-$3,620",
      color: "text-rose-600",
      highlight: true,
    },
  ],
  categories: [
    { name: "Laptops", value: 45, color: "#3b82f6" },
    { name: "Phones", value: 30, color: "#10b981" },
    { name: "Accessories", value: 15, color: "#8b5cf6" },
    { name: "Monitors", value: 10, color: "#f59e0b" },
  ],
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-xl border border-border p-3 rounded-2xl shadow-lg animate-in fade-in zoom-in duration-200">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
          {payload[0].name}
        </p>
        <p className="text-sm font-black text-foreground">
          {payload[0].value}% Share
        </p>
      </div>
    );
  }
  return null;
};

export default function FinancialStats() {
  return (
    <div className="bg-card text-card-foreground p-7 rounded-2xl custom-hover custom-shadow  border border-border shadow-lg flex flex-col gap-6 relative overflow-hidden group transition-all duration-500 hover:shadow-2xl max-w-4xl mx-auto">
      {/* Background Accents */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 blur-[120px] rounded-full group-hover:bg-primary/10 transition-all duration-1000"></div>

      {/* Header */}
      <div className="flex justify-between items-start relative z-10">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
            <Zap size={20} className="text-primary animate-pulse" />
          </div>
          <div>
            <h3 className="font-black text-sm uppercase tracking-[0.15em] text-foreground">
              Financial Recap
            </h3>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter opacity-70">
              Shorasori Update (Real-time)
            </p>
          </div>
        </div>
        <button className="p-2.5 bg-muted/50 hover:bg-muted text-muted-foreground rounded-xl transition-all border border-border/50 group/btn">
          <ArrowUpRight
            size={18}
            className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
          />
        </button>
      </div>

      <div className="space-y-6 relative z-10">
        {/* Pasa Pasi Sections (Revenue & Expenses) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {/* Revenue Section (Ay) */}
          <div className="p-5 rounded-2xl bg-muted/30 border border-border/40 hover:scale-105 duration-200 hover:border-emerald-500/70 hover:bg-emerald-500/10 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-black text-emerald-500/80">
                    Revenue Streams (Ay)
                  </p>
                </div>
                <TrendingUp size={14} className="text-emerald-500/40" />
              </div>

              <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                {financialData.revenue.map((item, idx) => (
                  <div
                    key={idx}
                    className={
                      item.highlight
                        ? "col-span-2 mt-2 pt-4 border-t border-border/50"
                        : ""
                    }
                  >
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight mb-0.5">
                      {item.label}
                    </p>
                    <p
                      className={`font-black tracking-tighter ${item.highlight ? "text-3xl" : "text-lg"} ${item.color}`}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Expense/Loss Section (Khoroch) */}
          <div className="p-5 rounded-2xl bg-muted/30 border border-border/40 hover:scale-105 duration-200 hover:border-rose-500/70 hover:bg-rose-500/10 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-black text-rose-500/80">
                    Expenses & Returns (Khoroch)
                  </p>
                </div>
                <TrendingDown size={14} className="text-rose-500/40" />
              </div>

              <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                {financialData.expenses.map((item, idx) => (
                  <div
                    key={idx}
                    className={
                      item.highlight
                        ? "col-span-2 mt-2 pt-4 border-t border-border/50"
                        : ""
                    }
                  >
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight mb-0.5">
                      {item.label}
                    </p>
                    <p
                      className={`font-black tracking-tight ${item.highlight ? "text-3xl" : "text-lg"} ${item.color}`}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pie Chart (Niche) */}
        <div className="pt-6 border-t border-border/40 flex flex-col items-center">
          <div className="w-full h-50 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={financialData.categories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {financialData.categories.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      className="hover:opacity-80 transition-all cursor-pointer outline-none"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} cursor={false} />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Visual */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <PieChartIcon size={20} className="text-primary/30 mb-1" />
              <span className="text-[10px] font-black text-foreground/40 tracking-[0.2em]">
                DISTRIBUTION
              </span>
            </div>
          </div>

          {/* Custom Legend */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mt-4">
            {financialData.categories.map((cat, i) => (
              <div
                key={i}
                className="flex items-center gap-3 group/legend cursor-default"
              >
                <div
                  className="w-2.5 h-2.5 rounded-full transition-transform group-hover/legend:scale-125 shadow-sm"
                  style={{ backgroundColor: cat.color }}
                ></div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-foreground/80 uppercase leading-tight">
                    {cat.name}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-bold">
                    {cat.value}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
