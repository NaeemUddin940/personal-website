"use client";
import Header from "./components/header";
import Stats from "./components/stats";
import Table from "./components/table";

export default function AllAttributes() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Header />

        <Stats />

        {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: "Total", count: 32, icon: Tag, color: "text-primary" },

            {
              label: "Active",
              count: 26,
              icon: CheckCircle2,
              color: "text-emerald-500",
            },

            {
              label: "Required",
              count: 18,
              icon: Asterisk,
              color: "text-red-500",
            },

            {
              label: "Used in Variants",
              count: 12,
              icon: GitBranch,
              color: "text-indigo-500",
            },

            {
              label: "Filterable",
              count: 15,
              icon: Filter,
              color: "text-blue-500",
            },

            {
              label: "Searchable",
              count: 20,
              icon: Search,
              color: "text-cyan-500",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-card border border-border p-4 rounded-2xl custom-shadow"
            >
              <div className="flex items-center justify-between mb-1">
                <stat.icon size={16} className={stat.color} />
                <span className="text-[10px] font-black opacity-40 uppercase">
                  Stat
                </span>
              </div>
              <div className="text-xl font-black">{stat.count}</div>
              <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div> */}
        <Table />
      </div>
    </div>
  );
}
