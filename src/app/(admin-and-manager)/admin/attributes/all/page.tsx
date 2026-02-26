"use client";
import { DataTable } from "@/components/common/data-table";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Asterisk,
  CheckCircle2,
  ChevronRight,
  Eye,
  Filter,
  GitBranch,
  Hash,
  Info,
  Layers,
  Package,
  Palette,
  Search,
  Tag,
  ToggleLeft,
  Type,
  Zap,
} from "lucide-react";
import { useState } from "react";
import Header from "./components/header";
const ATTRIBUTE_TYPES = {
  TEXT: { label: "Text", icon: Type, color: "text-blue-500" },
  NUMBER: { label: "Number", icon: Hash, color: "text-orange-500" },
  BOOLEAN: { label: "Boolean", icon: ToggleLeft, color: "text-emerald-500" },
  SELECT: { label: "Select", icon: Layers, color: "text-purple-500" },
  MULTISELECT: {
    label: "Multi-Select",
    icon: Layers,
    color: "text-indigo-500",
  },
  COLOR: { label: "Color", icon: Palette, color: "text-pink-500" },
};
const MOCK_DATA = [
  {
    id: "1",
    name: "Color",
    slug: "color",
    type: "COLOR",
    isFilterable: true,
    isVisible: true,
    isVariation: true,
    values: [
      "Red",
      "Blue",
      "Green",
      "Yellow",
      "Black",
      "White",
      "Navy",
      "Crimson",
      "Gold",
      "Silver",
      "Purple",
      "Pink",
    ],
    valuesCount: 12,
  },
  {
    id: "2",
    name: "Size",
    slug: "size",
    type: "SELECT",
    isFilterable: true,
    isVisible: true,
    isVariation: true,
    values: ["XS", "S", "M", "L", "XL"],
    valuesCount: 5,
  },
  {
    id: "3",
    name: "Material",
    slug: "material",
    type: "TEXT",
    isFilterable: true,
    isVisible: true,
    isVariation: false,
    values: [
      "Cotton",
      "Polyester",
      "Wool",
      "Silk",
      "Linen",
      "Denim",
      "Leather",
      "Nylon",
    ],
    valuesCount: 8,
  },
  {
    id: "4",
    name: "Weight",
    slug: "weight",
    type: "NUMBER",
    isFilterable: false,
    isVisible: true,
    isVariation: false,
    values: [],
    valuesCount: 0,
  },
  {
    id: "5",
    name: "Washable",
    slug: "washable",
    type: "BOOLEAN",
    isFilterable: true,
    isVisible: false,
    isVariation: false,
    values: ["Yes", "No"],
    valuesCount: 2,
  },
];

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

export default function AllAttributes() {
  const [refreshKey, setRefreshKey] = useState(0);

  const columns = [
    {
      header: "Name",
      accessor: "name",
      sortable: true,
      visible: true,
      render: (val, item) => (
        <div>
          <div className="text-sm font-bold">{val}</div>
          <div className="text-[10px] font-mono text-muted-foreground">
            /{item.slug}
          </div>
        </div>
      ),
    },
    {
      header: "Type",
      accessor: "type",
      sortable: true,
      visible: true,
      render: (val) => {
        const config = ATTRIBUTE_TYPES[val] || ATTRIBUTE_TYPES.TEXT;
        const Icon = config.icon;
        return (
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-md bg-muted ${config.color}`}>
              <Icon size={14} />
            </div>
            <span className="text-xs font-bold">{config.label}</span>
          </div>
        );
      },
    },
    {
      header: "Values",
      accessor: "valuesCount",
      sortable: true,
      visible: true,
      render: (val) => (
        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-black border border-primary/20">
          {val} Values
        </span>
      ),
    },
    {
      header: "Configuration",
      accessor: "id",
      visible: true,
      render: (_, item) => (
        <div className="flex gap-2">
          {item.isVariation && (
            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 text-[9px] font-black uppercase tracking-tighter border border-blue-500/20">
              Variation
            </span>
          )}
          {item.isFilterable && (
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-tighter border border-emerald-500/20">
              Filterable
            </span>
          )}
          {!item.isVisible && (
            <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground text-[9px] font-black uppercase tracking-tighter border border-border">
              Hidden
            </span>
          )}
        </div>
      ),
    },
  ];

  const fetchData = async (params) => {
    // Artificial delay to simulate API
    console.log(params)
    await new Promise((resolve) => setTimeout(resolve, 800));

    let filtered = [...MOCK_DATA];
    if (params.search) {
      filtered = filtered.filter(
        (a) =>
          a.name.toLowerCase().includes(params.search.toLowerCase()) ||
          a.slug.toLowerCase().includes(params.search.toLowerCase()),
      );
    }

    const start = (params.page - 1) * params.limit;
    return {
      data: filtered.slice(start, start + params.limit),
      total: filtered.length,
    };
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Header />

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
                <div className="h-full w-full bg-card border border-border p-3.5 rounded-2xl flex flex-col justify-between relative overflow-hidden custom-shadow transition-all duration-500 hover:border-primary/60 hover:-translate-y-1.5">
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
                <div className="h-full w-full bg-linear-to-br from-card via-card to-emerald-500/10 border border-border p-3.5 rounded-2xl flex flex-col relative overflow-hidden custom-shadow transition-all duration-500 hover:border-primary/60 hover:-translate-y-1.5">
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
                <div className="h-full w-full bg-primary border-none p-3.5 rounded-2xl text-primary-foreground relative overflow-hidden shadow-lg transition-all duration-500 hover:scale-[1.03] hover:rotate-1">
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
                <div className="h-full w-full bg-white/40 dark:bg-card/40 backdrop-blur-xl border border-white/40 dark:border-border p-3.5 rounded-2xl flex flex-col relative overflow-hidden custom-shadow transition-all duration-500 hover:border-primary/60 hover:-translate-y-1.5">
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
                <div className="h-full w-full bg-card border border-border p-3.5 rounded-2xl flex flex-col relative overflow-hidden custom-shadow transition-all duration-500 hover:border-primary/60 hover:-translate-y-1.5">
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
                <div className="h-full w-full bg-card border border-border p-3.5 rounded-2xl flex flex-col relative overflow-hidden custom-shadow group transition-all duration-500 hover:border-primary/60 hover:-translate-y-1.5 hover:bg-accent/5">
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

        <DataTable
          title="Product Attributes"
          description="Manage and filter through all defined product attributes."
          columns={columns}
          fetchData={fetchData}
          refreshKey={refreshKey}
          onBulkDelete={(item) => console.log(item)}
          onEdit={(item) => console.log("Edit", item)}
          onView={(item) => console.log("Edit", item)}
          onDelete={(item) => console.log("Delete", item)}
          expandableContent={(item) =>
            item.values && item.values.length > 0 ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-border/50 pb-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                    <Info size={14} /> Registered Values ({item.valuesCount})
                  </h4>
                  <span className="text-[10px] font-bold text-muted-foreground italic">
                    Slug Hierarchy: system / attributes / {item.slug}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {item.values.map((v) => (
                    <div
                      key={v}
                      className="group relative bg-muted px-5 py-3 rounded-2xl text-[11px] font-black border border-border shadow-sm hover:border-primary hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/10 transition-all cursor-default text-center"
                    >
                      <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      {v}
                    </div>
                  ))}
                </div>
                {item.valuesCount > 10 && (
                  <p className="text-[10px] text-muted-foreground text-center font-bold tracking-widest opacity-50">
                    + more entries available
                  </p>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 space-y-4 opacity-40">
                <div className="w-16 h-16 rounded-full bg-muted border-4 border-dashed border-muted-foreground/30 flex items-center justify-center text-muted-foreground">
                  <Package size={24} />
                </div>
                <p className="text-sm font-black uppercase tracking-widest italic">
                  No values defined for this attribute
                </p>
              </div>
            )
          }
        />
      </div>
    </div>
  );
}
