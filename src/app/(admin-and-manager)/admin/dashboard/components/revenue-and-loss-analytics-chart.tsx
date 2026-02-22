import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const revenueData = [
  { name: "Day 1", revenue: 4000, loss: 400 },
  { name: "Day 3", revenue: 3000, loss: 300 },
  { name: "Day 5", revenue: 5000, loss: 200 },
  { name: "Day 7", revenue: 4500, loss: 600 },
  { name: "Day 9", revenue: 6000, loss: 100 },
  { name: "Day 11", revenue: 5500, loss: 450 },
  { name: "Day 13", revenue: 7000, loss: 200 },
  { name: "Day 15", revenue: 8500, loss: 150 },
];
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-md border border-border p-4  rounded-xl shadow-xl">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
          {label}
        </p>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-8">
            <span className="text-xs font-semibold text-secondary-foreground flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" /> Revenue
            </span>
            <span className="text-xs font-bold text-card-foreground">
              ${payload[0].value.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between gap-8">
            <span className="text-xs font-semibold text-secondary-foreground flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-rose-500" /> Loss
            </span>
            <span className="text-xs font-bold text-card-foreground">
              ${payload[1].value.toLocaleString()}
            </span>
          </div>
          <div className="pt-2 mt-2 border-t border-border flex items-center justify-between">
            <span className="text-[10px] font-bold text-emerald-500 uppercase">
              Net Profit
            </span>
            <span className="text-sm font-black text-emerald-600">
              ${(payload[0].value - payload[1].value).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function RevenueAndLossAnalyticsChart() {
  return (
    <div className="lg:col-span-2 w-full bg-card p-6 custom-hover rounded-2xl border border-border custom-shadow overflow-hidden">
      <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
        <div>
          <h3 className="font-bold text-lg text-card-foreground">
            Financial Growth & Loss
          </h3>
          <p className="text-xs text-muted-foreground font-medium tracking-wide">
            Comparison of performance over 15 days
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20">
            <div className="w-2 h-2 rounded-full bg-primary" /> Revenue
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-rose-500 bg-rose-500/10 px-3 py-1.5 rounded-lg border border-rose-500/20">
            <div className="w-2 h-2 rounded-full bg-rose-500" /> Loss
          </div>
        </div>
      </div>

      <div className="h-87.5 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={revenueData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={"#1e293b"}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#6366f1",
                strokeWidth: 1,
                strokeDasharray: "5 5",
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#6366f1"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRev)"
              animationDuration={1500}
            />
            <Area
              type="monotone"
              dataKey="loss"
              stroke="#f43f5e"
              strokeWidth={2}
              strokeDasharray="4 4"
              fillOpacity={0}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
