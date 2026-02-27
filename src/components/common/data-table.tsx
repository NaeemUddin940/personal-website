/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowUpDown,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Edit2,
  Eye,
  Filter,
  RefreshCw,
  Search,
  Settings,
  Trash2,
  X,
} from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Dialog, DialogContent } from "../ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverItem,
  PopoverTrigger,
} from "../ui/popover";
import { Option, Select } from "../ui/select";
import Input from "./input";

const ActionMenu = ({ item, onView, onEdit, onDelete }) => {
  return (
    <div className="flex gap-3 items-end">
      <Button
        onClick={() => {
          onView(item);
        }}
        size="sm"
        variant="overlay"
      >
        <Eye size={14} className="text-white" />
      </Button>
      <Button
        onClick={() => {
          onEdit(item);
        }}
        size="sm"
        variant="glass"
      >
        <Edit2 size={14} className="text-amber-500" />
      </Button>
      <Button
        onClick={() => {
          onDelete(item);
        }}
        size="sm"
        variant="danger"
        areYouSureDescription="Are You Sure want to delete this attribute?"
        requireAreYouSure
      >
        <Trash2 size={14} />
      </Button>
    </div>
  );
};

const TableSkeleton = ({ rows = 5, colCount = 5 }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr
          key={`skeleton-row-${rowIndex}`}
          className="border-b border-border/20"
        >
          {Array.from({ length: colCount }).map((_, colIndex) => (
            <td key={`skeleton-cell-${rowIndex}-${colIndex}`} className="p-6">
              <div
                className="h-4 bg-muted animate-pulse rounded-lg"
                style={{
                  width: `${Math.floor(Math.random() * (80 - 40 + 1) + 40)}%`,
                  margin: colIndex === colCount - 1 ? "0 0 0 auto" : "0",
                }}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export const DataTable = ({
  columns: initialColumns,
  fetchData,
  initialItemsPerPage = 5,
  title,
  description,
  onView,
  onEdit,
  onDelete,
  onBulkDelete,
  refreshTrigger = 0,
  setRefreshTrigger = () => {},
  expandableContent,
  renderViewModal,
  renderEditModal,
  maxHeight = "85vh",
}) => {
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [columnFilters, setColumnFilters] = useState({});
  const [debouncedColumnFilters, setDebouncedColumnFilters] = useState({});
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [cols, setCols] = useState(initialColumns);
  const [showFilters, setShowFilters] = useState(false);

  // Modal States
  const [viewingItem, setViewingItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const totalPages = Math.ceil(totalRecords / itemsPerPage);
  const activeColumns = cols.filter((c) => c.visible);
  const isExpandable = typeof expandableContent === "function";

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedColumnFilters(columnFilters);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [columnFilters]);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    const params = {
      page: currentPage,
      limit: itemsPerPage,
      search: debouncedSearch,
      columnFilters: debouncedColumnFilters,
      sortBy: sortConfig?.key || "",
      sortOrder: sortConfig?.direction || "asc",
    };
    try {
      const response = await fetchData(params);
      setData(response.data);
      setTotalRecords(response.total);
    } catch (err) {
      console.error("❌ API ERROR:", err);
    } finally {
      setIsLoading(false);
    }
  }, [
    currentPage,
    itemsPerPage,
    debouncedSearch,
    debouncedColumnFilters,
    sortConfig,
    fetchData,
  ]);

  useEffect(() => {
    loadData();
  }, [loadData, refreshTrigger]);

  const handleExport = () => {
    if (data.length === 0) return;
    const headers = activeColumns.map((c) => c.header).join(",");
    const rows = data.map((item) =>
      activeColumns
        .map((c) => `"${String(item[c.accessor]).replace(/"/g, '""')}"`)
        .join(","),
    );
    const csvContent =
      "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `${title.replace(/\s+/g, "_")}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleColumnFilterChange = (accessor, value) => {
    setColumnFilters((prev) => ({ ...prev, [accessor]: value }));
  };

  const toggleColumn = (accessor) => {
    setCols((prev) =>
      prev.map((col) =>
        col.accessor === accessor ? { ...col, visible: !col.visible } : col,
      ),
    );
  };

  const toggleExpand = (id) => {
    const next = new Set(expandedRows);
    next.has(id) ? next.delete(id) : next.add(id);
    setExpandedRows(next);
  };

  const toggleSelectAll = () => {
    if (selectedRows.size === data.length) setSelectedRows(new Set());
    else setSelectedRows(new Set(data.map((i) => i.id)));
  };

  const toggleSelectRow = (id) => {
    const next = new Set(selectedRows);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelectedRows(next);
  };

  // Internal Handlers for View/Edit
  const handleView = (item) => {
    if (renderViewModal) setViewingItem(item); // ✅ updated
    if (onView) onView(item);
  };

  const handleEdit = (item) => {
    if (renderEditModal) setEditingItem(item); // ✅ updated
    if (onEdit) onEdit(item);
  };

  return (
    <div
      style={{ maxHeight }}
      className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col font-sans transition-all w-full h-fit"
    >
      {/* HEADER */}
      <div className="p-8 border-b bg-secondary/10 shrink-0">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
              {title}
            </h2>
            <p className="text-[11px] text-muted-foreground font-black uppercase tracking-widest opacity-60 italic">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full md:w-80 flex items-center gap-2">
              <div className="relative grow group">
                <Input
                  icon={<Search className="text-muted-foreground/40 w-4 h-4" />}
                  placeholder="Global search..."
                  className="pl-11"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2 cursor-pointer hover:bg-red-500/10 p-1 rounded-2xl top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-rose-500"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <Button
                size="sm"
                variant="soft"
                className="w-10 h-10 p-0"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={20} />
              </Button>
            </div>

            <AnimatePresence>
              {selectedRows.size > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Button
                    variant="danger"
                    size="sm"
                    icon={<Trash2 size={16} />}
                    onClick={() => onBulkDelete(Array.from(selectedRows))}
                    className="py-2 uppercase tracking-widest"
                  >
                    Delete ({selectedRows.size})
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            <Popover>
              <PopoverTrigger>
                <Button size="sm" variant="outline">
                  <Settings size={22} />
                </Button>
              </PopoverTrigger>
              <PopoverContent animationType="bubble" align="right">
                <div className="space-y-6 p-3">
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">
                      Table Tools
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={() => setRefreshTrigger((p) => p + 1)}
                        icon={<RefreshCw size={14} />}
                        size="sm"
                        variant="outline"
                      >
                        Refresh
                      </Button>
                      <Button
                        onClick={handleExport}
                        icon={<Download size={14} />}
                        size="sm"
                        variant="outline"
                      >
                        Export
                      </Button>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50 mb-4">
                      Display Columns
                    </h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                      {cols.map((col) => (
                        <PopoverItem
                          key={String(col.accessor)}
                          className="group flex items-center py-2 justify-between cursor-pointer"
                          onClick={() => toggleColumn(col.accessor)}
                        >
                          <span className="text-xs font-bold">
                            {col.header}
                          </span>
                          <Checkbox
                            checked={col.visible}
                            onChange={() => toggleColumn(col.accessor)}
                          />
                        </PopoverItem>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="grow overflow-auto relative custom-scrollbar bg-card">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead className="sticky top-0 z-10">
            <tr className="bg-secondary/80 backdrop-blur-md">
              <th className="p-6 w-16 border-b border-border text-center">
                <Checkbox
                  checked={data.length > 0 && selectedRows.size === data.length}
                  onChange={toggleSelectAll}
                />
              </th>
              {isExpandable && (
                <th className="p-6 w-16 border-b border-border" />
              )}
              {activeColumns.map((col) => (
                <th
                  key={String(col.accessor)}
                  className="p-6 border-b border-border"
                >
                  <button
                    disabled={!col.sortable}
                    onClick={() =>
                      setSortConfig({
                        key: col.accessor,
                        direction:
                          sortConfig?.direction === "asc" ? "desc" : "asc",
                      })
                    }
                    className={`flex items-center gap-2 text-[11px] font-black text-muted-foreground uppercase tracking-widest transition-colors ${col.sortable ? "hover:text-primary cursor-pointer" : ""}`}
                  >
                    {col.header}
                    {col.sortable && (
                      <ArrowUpDown
                        size={14}
                        className={
                          sortConfig?.key === col.accessor
                            ? "text-primary"
                            : "opacity-30"
                        }
                      />
                    )}
                  </button>
                </th>
              ))}
              <th className="p-6 border-b border-border text-right text-[11px] font-black text-muted-foreground uppercase tracking-widest">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {/* FILTER ROW */}
            <AnimatePresence>
              {showFilters && (
                <tr className="bg-secondary/30">
                  <td
                    colSpan={activeColumns.length + (isExpandable ? 3 : 2)}
                    className="border-b border-border/50"
                  >
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="flex items-center gap-4 px-6 py-4 pr-24">
                        <div className="w-12 shrink-0" />
                        {isExpandable && <div className="w-16 shrink-0" />}
                        <div className="grow grid grid-flow-col auto-cols-fr gap-4">
                          {activeColumns.map((col) => (
                            <div
                              key={`filter-${String(col.accessor)}`}
                              className="relative"
                            >
                              {col.filterType === "select" ? (
                                <Select
                                  value={columnFilters[col.accessor] || ""}
                                  onChange={(val) =>
                                    handleColumnFilterChange(col.accessor, val)
                                  }
                                  className="w-full"
                                >
                                  <Option value="">All {col.header}</Option>
                                  {(col.filterOptions || []).map((opt) => (
                                    <Option key={opt} value={opt}>
                                      {opt}
                                    </Option>
                                  ))}
                                </Select>
                              ) : (
                                <div className="relative">
                                  <Input
                                    placeholder={`Filter ${col.header}...`}
                                    value={columnFilters[col.accessor] || ""}
                                    onChange={(e) =>
                                      handleColumnFilterChange(
                                        col.accessor,
                                        e.target.value,
                                      )
                                    }
                                  />
                                  {columnFilters[col.accessor] && (
                                    <X
                                      size={14}
                                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-rose-500"
                                      onClick={() =>
                                        handleColumnFilterChange(
                                          col.accessor,
                                          "",
                                        )
                                      }
                                    />
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </td>
                </tr>
              )}
            </AnimatePresence>

            {isLoading ? (
              <TableSkeleton
                rows={itemsPerPage}
                colCount={activeColumns.length + (isExpandable ? 3 : 2)}
              />
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  className="p-10 text-center text-muted-foreground font-black uppercase tracking-widest opacity-30 italic"
                >
                  No records found
                </td>
              </tr>
            ) : (
              data.map((item, index) => {
                const isExpanded = expandedRows.has(item.id);
                // Zebra Striping logic: Alternating backgrounds
                const rowBg =
                  index % 2 === 0 ? "bg-secondary/5" : "bg-transparent";

                return (
                  <React.Fragment key={item.id}>
                    <tr
                      className={`group transition-all ${rowBg} hover:bg-primary/5 ${isExpanded || selectedRows.has(item.id) ? "bg-primary/5" : ""}`}
                    >
                      <td className="px-6 py-4 text-center border-b border-border/20">
                        <Checkbox
                          checked={selectedRows.has(item.id)}
                          onChange={() => toggleSelectRow(item.id)}
                        />
                      </td>
                      {isExpandable && (
                        <td
                          className="text-center border-b border-border/20 cursor-pointer"
                          onClick={() => toggleExpand(item.id)}
                        >
                          <ChevronDown
                            size={18}
                            className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                          />
                        </td>
                      )}
                      {activeColumns.map((col) => (
                        <td
                          key={String(col.accessor)}
                          className="px-6 py-4 border-b border-border/20 whitespace-nowrap"
                        >
                          {col.render ? (
                            col.render(item[col.accessor], item)
                          ) : (
                            <span className="text-sm font-bold text-foreground/80">
                              {String(item[col.accessor])}
                            </span>
                          )}
                        </td>
                      ))}
                      <td className="p-6 text-right border-b border-border/20">
                        <ActionMenu
                          item={item}
                          onView={handleView}
                          onEdit={handleEdit}
                          onDelete={onDelete}
                        />
                      </td>
                    </tr>
                    <AnimatePresence>
                      {isExpanded && (
                        <tr>
                          <td
                            colSpan={activeColumns.length + 3}
                            className="p-0 border-b border-border/20"
                          >
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                            >
                              <div className="p-5 bg-secondary/20 border-l-4 border-primary">
                                {expandableContent ? (
                                  expandableContent(item)
                                ) : (
                                  <div className="text-xs italic text-muted-foreground">
                                    No additional details available.
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {/* VIEW DIALOG */}
      {renderViewModal && (
        <Dialog
          open={!!viewingItem}
          onOpenChange={(open) => {
            if (!open) setViewingItem(null);
          }}
          animationType="bubble"
        >
          <DialogContent className="max-w-3xl">
            {viewingItem && renderViewModal(viewingItem)}
          </DialogContent>
        </Dialog>
      )}

      {/* EDIT DIALOG */}
      {renderEditModal && (
        <Dialog
          open={!!editingItem}
          onOpenChange={(open) => {
            if (!open) setEditingItem(null);
          }}
          animationType="slideUp"
        >
          <DialogContent className="max-w-3xl">
            {editingItem && renderEditModal(editingItem)}
          </DialogContent>
        </Dialog>
      )}

      {/* FOOTER */}
      <div className="p-5 border-t border-border flex flex-col md:flex-row items-center justify-between gap-8 bg-secondary/5 shrink-0">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-3">
            <Activity size={16} className="text-primary" />
            Showing
            <span className="text-primary">{currentPage}</span> to
            <span className="text-primary">
              {Math.min(currentPage * itemsPerPage, totalRecords)}
            </span>
            of
            <span className="text-primary">{totalRecords}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-black uppercase text-muted-foreground">
              ROWS <br /> PER <br /> PAGE
            </span>
            <Select
              value={itemsPerPage}
              position="top-center"
              className="flex items-center"
              onChange={(v) => setItemsPerPage(Number(v))}
            >
              {[5, 10, 20, 50].map((v) => (
                <Option key={v} value={v}>
                  {v}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
            size="sm"
            variant="overlay"
          >
            <ChevronsLeft size={20} />
          </Button>
          <div className="flex gap-2 mx-2">
            {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => (
              <Button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                size="sm"
                variant={currentPage === i + 1 ? "primary" : "outline"}
                className="w-9 h-9"
              >
                {i + 1}
              </Button>
            ))}
          </div>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
            size="sm"
            variant="overlay"
          >
            <ChevronsRight size={20} />
          </Button>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};
