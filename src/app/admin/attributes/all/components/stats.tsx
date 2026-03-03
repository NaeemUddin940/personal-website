"use client";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Asterisk,
  CheckCircle2,
  ChevronRight,
  Eye,
  Filter,
  GitBranch,
  Info,
  Layers,
  Search,
  Tag,
  Zap,
} from "lucide-react";

const stats = [
  {
    label: "Total",
    count: 32,
    icon: Tag,
    color: "text-primary",
    design: "aurora",
  },
  {
    label: "Active",
    count: 26,
    icon: CheckCircle2,
    color: "text-emerald-500",
    design: "wave",
  },
  {
    label: "Required",
    count: 18,
    icon: Asterisk,
    color: "text-red-500",
    design: "diagonal",
  },
  {
    label: "Used in Variants",
    count: 12,
    icon: GitBranch,
    color: "text-indigo-500",
    design: "glass",
  },
  {
    label: "Filterable",
    count: 15,
    icon: Filter,
    color: "text-blue-500",
    design: "concave",
  },
  {
    label: "Searchable",
    count: 20,
    icon: Search,
    color: "text-cyan-500",
    design: "corner",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08, // 80ms delay
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 32,
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0.0, 0.2, 1],
    },
  },
};
export default function Stats() {
  return (
    <div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-7xl mx-auto"
      >
        {stats.map((stat, i) => (
          <motion.div key={i} variants={item}>
            {/* DESIGN 1: Aurora Mesh */}
            {stat.design === "aurora" && (
              <div className="h-full w-full bg-card border border-border p-3.5 rounded-2xl flex flex-col justify-between relative overflow-hidden hover:scale-105 custom-shadow transition-all duration-500 hover:border-primary/60 hover:-translate-y-1.5">
                <div className="absolute -left-10 -top-10 w-24 h-24 bg-primary/20 blur-[30px] rounded-full animate-pulse transition-transform group-hover:scale-150 duration-700"></div>
                <div className="relative z-10 transition-transform duration-500 group-hover:scale-105">
                  <div className="flex items-center justify-between">
                    <stat.icon size={14} className={stat.color} />
                    <button className="flex items-center gap-1 text-[8px] font-black text-primary px-2 py-0.5 bg-primary/10 rounded-full border border-primary/20 hover:bg-primary hover:text-white transition-all duration-300">
                      TRACK <Zap size={8} fill="currentColor" />
                    </button>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-black text-foreground tracking-tighter leading-none">
                      {stat.count}
                    </div>
                    <div className="text-[8px] text-muted-foreground uppercase font-black tracking-widest mt-0.5 opacity-60">
                      {stat.label}
                    </div>
                  </div>
                </div>
                <div className="relative z-10 mt-auto transition-transform duration-500 group-hover:translate-y-0.5">
                  <div className="w-full bg-muted/50 h-1 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "70%" }}
                      transition={{ duration: 1.5 }}
                      className="h-full bg-linear-to-r from-primary to-rose-400 transition-all duration-[1.5s]"
                      // style={{ width: mounted ? "70%" : "0%" }}
                    ></motion.div>
                  </div>
                </div>
              </div>
            )}

            {/* DESIGN 2: Glass Wave */}
            {stat.design === "wave" && (
              <div className="h-full hover:scale-105 w-full bg-linear-to-br from-card via-card to-emerald-500/10 border border-border p-3.5 rounded-2xl flex flex-col relative overflow-hidden custom-shadow transition-all duration-500 hover:border-primary/60 hover:-translate-y-1.5">
                <div className="absolute left-1/2 -bottom-12 -translate-x-1/2 w-28 h-28 bg-emerald-400/10 rounded-full transition-transform group-hover:scale-150 duration-1000"></div>
                <div className="relative z-10 h-full flex flex-col justify-between transition-transform duration-500 group-hover:scale-[1.03]">
                  <div className="flex justify-between items-center">
                    <stat.icon size={14} className={stat.color} />
                    <button className="group/btn flex items-center gap-1 text-[8px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/20 px-2 py-0.5 rounded-md transition-all">
                      VIEW <Eye size={8} />
                    </button>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-foreground tracking-tighter leading-none">
                      {stat.count}
                    </div>
                    <div className="text-[8px] text-muted-foreground uppercase font-black tracking-widest mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                  <div className="flex -space-x-2 transition-transform duration-500 group-hover:translate-x-1">
                    {[1, 2, 3].map((v) => (
                      <div
                        key={v}
                        className="w-4 h-4 rounded-full border border-card bg-emerald-100 dark:bg-emerald-900/40"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* DESIGN 3: Diagonal Split */}
            {stat.design === "diagonal" && (
              <div className="h-full hover:scale-105 w-full bg-primary border-none p-3.5 rounded-2xl text-primary-foreground relative overflow-hidden shadow-lg transition-all duration-500 hover:scale-[1.03]">
                <div className="absolute top-0 left-0 w-full h-full bg-black/25 origin-top-left -rotate-12 translate-y-6 transition-transform group-hover:translate-y-4 duration-700"></div>
                <div className="relative z-10 h-full flex flex-col justify-between transition-transform duration-500 group-hover:scale-105">
                  <div className="flex justify-between items-start">
                    <stat.icon size={14} className="text-white" />
                    <button className="group/btn w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/20 hover:bg-white hover:text-primary transition-all duration-300">
                      <ArrowUpRight
                        size={12}
                        className="group-hover/btn:rotate-45 transition-transform"
                      />
                    </button>
                  </div>
                  <div>
                    <div className="text-2xl font-black italic tracking-tighter leading-none">
                      {stat.count}
                    </div>
                    <div className="text-[8px] text-white/80 uppercase font-black tracking-[0.2em] mt-1 leading-none">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DESIGN 4: Orbital Glass */}
            {stat.design === "glass" && (
              <div className="h-full hover:scale-105 w-full bg-white/40 dark:bg-card/40 backdrop-blur-xl border border-white/40 dark:border-border p-3.5 rounded-2xl flex flex-col relative overflow-hidden custom-shadow transition-all duration-500 hover:border-primary/60 hover:-translate-y-1.5">
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-indigo-400/30 rounded-full blur-2xl animate-float transition-transform group-hover:scale-125 duration-1000"></div>
                <div className="relative z-10 h-full flex flex-col justify-between transition-transform duration-500 group-hover:scale-105">
                  <div className="flex justify-between items-center">
                    <div className="w-7 h-7 rounded-lg bg-white/50 dark:bg-card/50 flex items-center justify-center border border-white dark:border-border transition-transform group-hover:rotate-12">
                      <stat.icon size={12} className={stat.color} />
                    </div>
                    <button className="flex items-center gap-0.5 text-[8px] font-black text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 border border-indigo-400/30 rounded hover:bg-indigo-400 hover:text-white transition-all duration-300">
                      INFO <Info size={8} />
                    </button>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-foreground tracking-tighter leading-none">
                      {stat.count}
                    </div>
                    <div className="text-[8px] text-muted-foreground uppercase font-black tracking-widest mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DESIGN 5: Inner Shadow Concave */}
            {stat.design === "concave" && (
              <div className="h-full hover:scale-105 w-full bg-card border border-border p-3.5 rounded-2xl flex flex-col relative overflow-hidden custom-shadow transition-all duration-500 hover:border-primary/60 hover:-translate-y-1.5">
                <div className="absolute top-1/2 -left-8 -translate-y-1/2 w-14 h-14 rounded-full bg-background shadow-[inset_2px_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[inset_4px_4px_12px_rgba(0,0,0,0.6)] border border-border transition-transform duration-700 group-hover:scale-110"></div>
                <div className="relative z-10 ml-6 h-full flex flex-col justify-between transition-transform duration-500 group-hover:translate-x-1">
                  <div className="flex justify-between items-start">
                    <stat.icon size={14} className={stat.color} />
                    <button className="group/btn flex items-center gap-0.5 text-[8px] font-black text-blue-600 hover:text-blue-700 transition-colors">
                      VARIANTS <Layers size={8} />
                    </button>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-foreground tracking-tighter leading-none">
                      {stat.count}
                    </div>
                    <div className="text-[8px] text-muted-foreground uppercase font-black tracking-widest mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                  <div className="w-6 h-0.5 bg-linear-to-r from-blue-600 to-cyan-400 rounded-full transition-all group-hover:w-10"></div>
                </div>
              </div>
            )}

            {/* DESIGN 6: Tech Core */}
            {stat.design === "corner" && (
              <div className="h-full hover:scale-105 w-full bg-card border border-border p-3.5 rounded-2xl flex flex-col relative overflow-hidden custom-shadow group transition-all duration-500 hover:border-primary/60 hover:-translate-y-1.5 hover:bg-accent/5">
                <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-cyan-500/10 rounded-full transition-all group-hover:scale-150 duration-1000"></div>
                <div className="relative z-10 h-full flex flex-col justify-between transition-transform duration-500 group-hover:scale-[1.02]">
                  <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center border border-border group-hover:border-primary/40 transition-colors">
                    <stat.icon size={14} className={stat.color} />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-foreground tracking-tighter leading-none">
                      {stat.count}
                    </div>
                    <div className="text-[8px] text-muted-foreground uppercase font-black tracking-widest mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                  <button className="flex items-center justify-between w-full text-[8px] font-black text-cyan-600 dark:text-cyan-400 mt-1 py-1 px-2 bg-cyan-500/5 rounded border border-cyan-500/10 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300">
                    OPEN <ChevronRight size={8} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
