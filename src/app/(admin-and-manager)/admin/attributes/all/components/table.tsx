"use client";
import { getAllAttributes } from "@/actions/attribute-management/get-all-attributes";
import { DataTable } from "@/components/common/data-table";
import { StatusBadge } from "@/components/common/status-badge";
import {
  Hash,
  Info,
  Layers,
  Package,
  Palette,
  ToggleLeft,
  Type,
} from "lucide-react";
import { FILTER_OPTIONS } from "../../constants/filter-options";
import QuickAttributeView from "./quick-attribute-view";

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
export default function Table() {
  const fetchData = async (params) => {
    const res = await getAllAttributes(params);
    console.log("res", res);

    return {
      data: res.data,
      total: res.total,
      currentPage: res.pageCount,
    };
  };

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
      accessor: "values",
      visible: true,
      render: (val) => (
        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-black border border-primary/20">
          {val.length} Values
        </span>
      ),
    },

    {
      header: "Configuration",
      accessor: "configuration",
      visible: true,
      filterType: "select",
      filterOptions: FILTER_OPTIONS.map((o) =>
        o.key === "isVisible" ? "Hidden" : o.label,
      ),

      render: (_, item) => (
        <div className="flex flex-wrap gap-1.5">
          {FILTER_OPTIONS.map((option) => {
            const value = item[option.key];
            // Hidden case
            if (option.key === "isVisible") {
              if (!value)
                return (
                  <StatusBadge key={option.key} label="Hidden" color="red" />
                );
              return null;
            }

            return (
              value && (
                <StatusBadge
                  key={option.key}
                  label={option.label}
                  color={option.color}
                />
              )
            );
          })}
        </div>
      ),
    },
  ];
  return (
    <div>
      <DataTable
        title="Product Attributes"
        description="Manage and filter through all defined product attributes."
        columns={columns}
        fetchData={fetchData}
        // refreshKey={refreshKey}
        onBulkDelete={(item) => console.log(item)}
        onEdit={(item) => console.log("Edit", item)}
        onView={(item) => console.log("View", item)}
        onDelete={(item) => console.log("Delete", item)}
        // ✅ NEW
        renderViewModal={(item) => (
          <div>
            <QuickAttributeView formData={item} />
          </div>
        )}
        renderEditModal={(item) => (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Edit Attribute</h2>
            <input
              defaultValue={item.name}
              className="border p-2 rounded w-full"
            />
          </div>
        )}
        expandableContent={(item) =>
          item.values && item.values.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-border/50 pb-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                  <Info size={14} /> Registered Values ({item.values.length})
                </h4>
                <div className="flex gap-2 mt-2">
                  {/* Default Value Section */}
                  <div className="flex flex-wrap gap-2">
                    {item.values.map(
                      (v) =>
                        v.isDefault && (
                          <div
                            key={v.id}
                            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
                          >
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Default: {v.value}
                          </div>
                        ),
                    )}
                  </div>

                  {/* Slug Hierarchy Section */}
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground/70 bg-secondary/30 w-fit px-2 py-1 rounded-md border border-border/50">
                    <span className="font-semibold uppercase tracking-wider text-[9px]">
                      Path:
                    </span>
                    <span className="italic">attributes</span>
                    <span className="text-muted-foreground/40">/</span>
                    <span className="font-medium text-foreground">
                      {item.slug}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {item.values.map((v) => (
                  <div
                    key={v}
                    className={`group relative bg-muted px-5 py-3 rounded-2xl text-[11px] font-black border border-border shadow-sm ${v.isDefault ? "text-emerald-500 bg-emerald-500/10 border-emerald-500 px-2 border rounded-full" : ""} transition-all cursor-default text-center`}
                  >
                    {v.isDefault && (
                      <div className="absolute top-2 right-2 w-1.5 h-1.5 animate-pulse bg-green-500 rounded-full opacity-100 transition-opacity"></div>
                    )}
                    {v.value}
                  </div>
                ))}
              </div>
              {/* {item.values.length > 10 && (
                <p className="text-[10px] text-muted-foreground text-center font-bold tracking-widest opacity-50">
                  + more entries available
                </p>
              )} */}
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
  );
}
