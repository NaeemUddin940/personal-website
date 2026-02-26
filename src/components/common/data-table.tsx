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
  MoreVertical,
  RefreshCw,
  Search,
  Settings,
  Trash2,
  X,
} from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverItem,
  PopoverTrigger,
} from "../ui/popover";
import { Option, Select } from "../ui/select";
import Input from "./input";

/**
 * --- UTILITY: CLICK OUTSIDE HOOK ---
 */
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

/**
 * --- COMPONENT: DROPDOWN ACTION MENU ---
 */
const ActionMenu = ({ item, onView, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-muted cursor-pointer rounded-full transition-colors text-muted-foreground"
      >
        <MoreVertical size={18} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="absolute right-0 mt-2 w-44 bg-popover border border-border rounded-2xl shadow-xl z-100 overflow-hidden"
          >
            <div className="flex flex-col p-1.5">
              <button
                onClick={() => {
                  onView(item);
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2.5 text-xs font-bold hover:bg-muted rounded-xl transition-colors"
              >
                <Eye size={14} className="text-blue-500" /> View Details
              </button>
              <button
                onClick={() => {
                  onEdit(item);
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2.5 text-xs font-bold hover:bg-muted rounded-xl transition-colors"
              >
                <Edit2 size={14} className="text-amber-500" /> Edit Record
              </button>
              <hr className="my-1 border-border/50" />
              <button
                onClick={() => {
                  onDelete(item);
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2.5 text-xs font-bold hover:bg-rose-500/10 text-rose-500 rounded-xl transition-colors"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * --- COMPONENT: DATA TABLE ---
 */
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
  setRefreshTrigger,
  expandableContent,
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
  const [showSettings, setShowSettings] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const settingsRef = useRef();

  useOnClickOutside(settingsRef, () => setShowSettings(false));

  const totalPages = Math.ceil(totalRecords / itemsPerPage);
  const activeColumns = cols.filter((c) => c.visible);
  const isExpandable = typeof expandableContent === "function";

  // Search Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Column Filters Debounce
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
  }, [loadData]);

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
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${title.replace(/\s+/g, "_")}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleColumnFilterChange = (accessor, value) => {
    setColumnFilters((prev) => ({
      ...prev,
      [accessor]: value,
    }));
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
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(data.map((i) => i.id)));
    }
  };

  const toggleSelectRow = (id) => {
    const next = new Set(selectedRows);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelectedRows(next);
  };

  return (
    <div
      style={{ maxHeight: maxHeight }}
      className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col font-sans transition-all w-full h-fit"
    >
      {/* HEADER / TOOLBAR */}
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
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 w-4 h-4 group-focus-within:text-primary transition-colors" />
                <Input
                  type="text"
                  placeholder="Global search..."
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

              {/* FILTER TOGGLE BUTTON */}
              <Button
                size="sm"
                variant="soft"
                className="w-10 h-10"
                onClick={() => setShowFilters(!showFilters)}
                // className={`p-3.5 rounded-2xl cursor-pointer border transition-all ${showFilters ? "bg-primary text-white shadow-lg" : "bg-card border-border text-muted-foreground hover:bg-muted"}`}
              >
                <Filter size={20} />
              </Button>
            </div>

            <AnimatePresence>
              {selectedRows.size > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => onBulkDelete(Array.from(selectedRows))}
                  className="flex items-center gap-2 px-6 py-3.5 bg-rose-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/20 hover:bg-rose-600 active:scale-95 transition-all"
                >
                  <Trash2 size={16} /> Delete Selected ({selectedRows.size})
                </motion.button>
              )}
            </AnimatePresence>

            <div className="relative" ref={settingsRef}>
              <Popover>
                <PopoverTrigger className="p-2">
                  <Button size="sm">
                    <Settings size={22} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent animationType="bounce" align="right">
                  <div className="space-y-6 p-3">
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50 mb-3">
                        Table Tools
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          onClick={() => {
                            setRefreshTrigger((p) => p + 1);
                            setShowSettings(false);
                          }}
                          icon={<RefreshCw size={14} />}
                          size="sm"
                          className="py-2"
                        >
                          Refresh
                        </Button>
                        <Button
                          onClick={() => {
                            handleExport();
                            setShowSettings(false);
                          }}
                          icon={<Download size={14} />}
                          size="sm"
                          className="py-2"
                        >
                          Export
                        </Button>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50 mb-4">
                        Display Columns
                      </h4>
                      <div className="space-y-2 h-50 overflow-y-auto custom-scrollbar pr-2">
                        {cols.map((col) => (
                          <PopoverItem
                            key={String(col.accessor)}
                            className=" cursor-pointer group"
                          >
                            <label className="text-md flex items-center w-full cursor-pointer justify-between font-bold text-foreground group-hover:text-primary transition-colors">
                              <div>{col.header}</div>
                              <Checkbox
                                checked={col.visible}
                                onChange={() => toggleColumn(col.accessor)}
                                className="w-4 h-4 accent-primary rounded cursor-pointer"
                              />
                            </label>
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
      </div>

      {/* TABLE CONTAINER */}
      <div className="grow overflow-y-auto overflow-x-auto relative custom-scrollbar bg-card">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead className="sticky top-0 z-10">
            <tr className="bg-secondary backdrop-blur-md">
              <th className="p-6 w-16 border-b border-border text-center">
                <Checkbox
                  checked={data.length > 0 && selectedRows.size === data.length}
                  onChange={toggleSelectAll}
                />
              </th>
              {isExpandable && (
                <th className="p-6 w-16 border-b border-border"></th>
              )}
              {activeColumns.map((col) => (
                <th
                  key={String(col.accessor)}
                  className="p-6 border-b border-border"
                >
                  <button
                    disabled={!col.sortable}
                    onClick={() => {
                      const dir =
                        sortConfig?.direction === "asc" ? "desc" : "asc";
                      setSortConfig({ key: col.accessor, direction: dir });
                    }}
                    className={`flex items-center gap-2 text-[11px] font-black text-muted-foreground uppercase tracking-widest transition-colors ${col.sortable ? "hover:text-primary cursor-pointer" : "cursor-default "}`}
                  >
                    {col.header}
                    {col.sortable && (
                      <ArrowUpDown
                        size={14}
                        className={
                          sortConfig?.key === col.accessor
                            ? "text-primary cursor-pointer"
                            : "opacity-100 cursor-pointer"
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
            {/* COLLAPSIBLE FILTER ROW AS FIRST TBODY ROW */}
            <AnimatePresence>
              {showFilters && (
                <tr className="bg-secondary/40">
                  <td
                    colSpan={activeColumns.length + (isExpandable ? 3 : 2)}
                    className="border-b border-border/50"
                  >
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="flex items-center gap-0 w-full px-6 py-4">
                        {/* Empty spacing for checkbox column */}
                        <div className="w-16 shrink-0"></div>
                        {/* Empty spacing for expand column if applicable */}
                        {isExpandable && <div className="w-16 shrink-0"></div>}

                        <div className="grow grid grid-flow-col auto-cols-fr gap-4 pr-20">
                          {activeColumns.map((col) => (
                            <div
                              key={`filter-${String(col.accessor)}`}
                              className="relative"
                            >
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
                                <button
                                  onClick={() =>
                                    handleColumnFilterChange(col.accessor, "")
                                  }
                                  className="absolute right-2 cursor-pointer hover:bg-red-500/10 p-1 rounded-2xl top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-rose-500"
                                >
                                  <X size={16} />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                        {/* Spacing for actions column */}
                        <div className="w-20 shrink-0"></div>
                      </div>
                    </motion.div>
                  </td>
                </tr>
              )}
            </AnimatePresence>

            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td
                    colSpan={activeColumns.length + (isExpandable ? 3 : 2)}
                    className="p-6"
                  >
                    <div className="h-10 bg-muted animate-pulse rounded-2xl" />
                  </td>
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={activeColumns.length + (isExpandable ? 3 : 2)}
                  className="p-10 text-center text-muted-foreground font-black uppercase tracking-[0.3em] opacity-30 italic"
                >
                  No records found
                </td>
              </tr>
            ) : (
              data.map((item) => {
                const isExpanded = expandedRows.has(item.id);
                return (
                  <React.Fragment key={item.id}>
                    <tr
                      className={`group hover:bg-secondary/30 transition-all ${isExpanded ? "bg-primary/5" : selectedRows.has(item.id) ? "bg-primary/5" : ""}`}
                    >
                      <td className="px-6 text-center border-b border-border/20">
                        <Checkbox
                          checked={selectedRows.has(item.id)}
                          onChange={() => toggleSelectRow(item.id)}
                          className="w-5 h-5 accent-primary rounded-lg cursor-pointer"
                        />
                      </td>
                      {isExpandable && (
                        <td
                          className="text-center border-b border-border/20"
                          onClick={() => toggleExpand(item.id)}
                        >
                          {/* <button
                            onClick={() => toggleExpand(item.id)}
                            className={`p-2.5 rounded-xl transition-all shadow-sm ${isExpanded ? "bg-primary text-white shadow-primary/20" : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"}`}
                          > */}
                          <ChevronDown
                            size={18}
                            className={`transition-transform duration-500 ${isExpanded ? "rotate-180" : ""}`}
                          />
                          {/* </button> */}
                        </td>
                      )}
                      {activeColumns.map((col) => (
                        <td
                          key={String(col.accessor)}
                          onClick={() => toggleExpand(item.id)}
                          className="border-b border-border/20 cursor-pointer whitespace-nowrap"
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
                      <td className="p-6  text-right border-b border-border/20">
                        <ActionMenu
                          item={item}
                          onView={onView}
                          onEdit={onEdit}
                          onDelete={onDelete}
                        />
                      </td>
                    </tr>
                    <AnimatePresence>
                      {isExpandable && isExpanded && (
                        <tr>
                          <td
                            colSpan={activeColumns.length + 3}
                            className="p-0 border-b border-border/20"
                          >
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: 0.5,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                            >
                              <div className="p-10 bg-linear-to-br from-secondary/50 to-background">
                                {expandableContent(item)}
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

      {/* FOOTER */}
      <div className="p-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-8 bg-secondary/5 shrink-0">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-3">
            <Activity size={16} className="text-primary" />
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, totalRecords)} of{" "}
            {totalRecords}
          </div>

          <div className="flex items-center gap-3 ">
            <span className="text-[9px] font-black uppercase text-muted-foreground tracking-tighter">
              Rows Per Page:
            </span>
            <Select
              value={itemsPerPage}
              side="top"
              onChange={setItemsPerPage}
              className="text-xs font-black outline-none bg-transparent cursor-pointer"
            >
              {[5, 10, 20, 50, 100].map((val) => (
                <Option key={val} value={val}>
                  {val}
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

          <div className="flex gap-2 mx-4">
            {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => (
              <Button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                size="sm"
                variant="glass"
                className="h-9 w-9"
                // className={`min-w-11 h-11 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm ${currentPage === i + 1 ? "bg-primary text-white shadow-lg shadow-primary/30 scale-110" : "bg-card border border-border hover:bg-muted text-muted-foreground"}`}
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
