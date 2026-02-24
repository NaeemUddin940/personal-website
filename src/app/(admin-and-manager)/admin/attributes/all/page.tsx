"use client";
import { DataTable } from "@/components/common/data-table";
import { Hash, Info, Layers, Package, Palette, Plus, ToggleLeft, Type } from "lucide-react";
import { useState } from "react";
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

const App = () => {
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
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-foreground uppercase">
              Attribute Engine
            </h1>
            <p className="text-muted-foreground font-medium mt-1">
              Configure product taxonomies, variations and data types.
            </p>
          </div>
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-transform shadow-xl shadow-primary/20 active:scale-95">
            <Plus size={18} /> New Attribute
          </button>
        </div>

        <DataTable
          title="Product Attributes"
          description="Manage and filter through all defined product attributes."
          columns={columns}
          fetchData={fetchData}
          refreshKey={refreshKey}
          onEdit={(item) => console.log("Edit", item)}
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
                      className="group relative bg-white px-5 py-3 rounded-2xl text-[11px] font-black border border-border shadow-sm hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all cursor-default text-center"
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
};

export default App;
