import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
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
  Trash,
  Trash2,
  X,
} from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Option, Select } from "../ui/select";

// --- Interfaces ---
interface Column<T> {
  header: string;
  accessor: keyof T;
  sortable?: boolean;
  visible?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
}

interface FetchParams {
  page: number;
  limit: number;
  search: string;
  sort: string;
  order: "asc" | "desc";
  columnFilters: Record<string, string>;
}

interface FetchResponse<T> {
  data: T[];
  total: number;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  fetchData: (params: FetchParams) => Promise<FetchResponse<T>>;
  initialItemsPerPage?: number;
  title?: string;
  description?: string;
  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onBulkDelete?: (ids: (string | number)[]) => void;
  refreshKey?: number;
}

// --- Reusable DataTable Component ---
export function DataTable<T extends { id: string | number }>({
  columns: initialColumns,
  fetchData,
  initialItemsPerPage = 5,
  title,
  description,
  onView,
  onEdit,
  onDelete,
  onBulkDelete,
  refreshKey = 0,
}: DataTableProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(
    new Set(),
  );

  const [cols, setCols] = useState(initialColumns);
  const [showSettings, setShowSettings] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>(
    {},
  );
  const [activeDropdown, setActiveDropdown] = useState<string | number | null>(
    null,
  );
  const [isSearchOpenMobile, setIsSearchOpenMobile] = useState(false);

  const totalPages = Math.ceil(totalRecords / itemsPerPage);
  const activeColumns = cols.filter((c) => c.visible);

  const getPaginationGroup = useCallback(() => {
    let start = Math.max(currentPage - 2, 1);
    const end = Math.min(start + 4, totalPages);
    if (end - start < 4) start = Math.max(end - 4, 1);
    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }, [currentPage, totalPages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const params: FetchParams = {
        page: currentPage,
        limit: itemsPerPage,
        search: debouncedSearch,
        sort: sortConfig ? String(sortConfig.key) : "",
        order: sortConfig ? sortConfig.direction : "asc",
        columnFilters,
      };
      const response = await fetchData(params);
      setData(response.data);
      setTotalRecords(response.total);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [
    currentPage,
    itemsPerPage,
    debouncedSearch,
    sortConfig,
    columnFilters,
    fetchData,
  ]);

  useEffect(() => {
    loadData();
  }, [loadData, refreshKey]);

  // UI interaction handles
  const handleExportCSV = () => {
    const headers = activeColumns.map((c) => c.header).join(",");
    const rows = data
      .map((item) =>
        activeColumns.map((c) => `"${String(item[c.accessor])}"`).join(","),
      )
      .join("\n");
    const blob = new Blob([`${headers}\n${rows}`], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `export-${Date.now()}.csv`;
    a.click();
    setShowSettings(false);
  };

  const handleSort = (key: keyof T) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc")
      direction = "desc";
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const showingFrom =
    totalRecords === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const showingTo = Math.min(currentPage * itemsPerPage, totalRecords);

  return (
    <div className="bg-card rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col font-sans">
      {/* Table Header / Toolbar */}
      <div className="p-6 border-b bg-secondary/40 border-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="hidden md:block text-xl font-black text-foreground uppercase tracking-tight">
                {title}
              </h2>
              <p className="text-secondary-foreground/50">{description}</p>
            </div>
            <div
              className={`relative transition-all duration-300 ${isSearchOpenMobile ? "w-full" : "w-10 md:w-64"}`}
            >
              <button
                onClick={() => setIsSearchOpenMobile(!isSearchOpenMobile)}
                className="md:hidden p-2.5 rounded-xl bg-muted text-muted-foreground"
              >
                <Search className="w-5 h-5" />
              </button>
              <div
                className={`${isSearchOpenMobile ? "absolute top-0 left-0 w-full z-10" : "hidden md:block"}`}
              >
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-10 py-2.5 bg-input border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {(searchTerm || isSearchOpenMobile) && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      if (isSearchOpenMobile) setIsSearchOpenMobile(false);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 justify-end">
            {/* Delete Button with COUNT */}
            <AnimatePresence>
              {selectedRows.size > 0 && (
                <motion.button
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.9 }}
                  onClick={() => {
                    onBulkDelete?.(Array.from(selectedRows));
                    setSelectedRows(new Set());
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-destructive text-destructive-foreground rounded-xl shadow-lg shadow-destructive/20 text-xs font-black transition-transform active:scale-95"
                >
                  <Trash className="w-4 h-4" />
                  <span>Delete ({selectedRows.size})</span>
                </motion.button>
              )}
            </AnimatePresence>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2.5 rounded-xl border transition-all ${showFilters ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground"}`}
              title="Toggle Filters"
            >
              <Filter className="w-4 h-4" />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2.5 rounded-xl border transition-all ${showSettings ? "bg-accent text-accent-foreground" : "bg-card border-border text-muted-foreground"}`}
              >
                <Settings className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {showSettings && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowSettings(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute right-0 mt-2 w-64 bg-popover border border-border rounded-2xl shadow-2xl p-4 z-50 space-y-4 text-popover-foreground"
                    >
                      <div>
                        <h4 className="text-[10px] font-black uppercase text-muted-foreground mb-2 tracking-widest">
                          Options
                        </h4>
                        <button
                          onClick={() => {
                            loadData();
                            setShowSettings(false);
                          }}
                          className="w-full flex items-center gap-3 p-2 hover:bg-accent hover:text-accent-foreground rounded-lg text-sm transition-colors"
                        >
                          <RefreshCw className="w-4 h-4" /> Refresh Data
                        </button>
                        <button
                          onClick={handleExportCSV}
                          className="w-full flex items-center gap-3 p-2 hover:bg-accent hover:text-accent-foreground rounded-lg text-sm transition-colors"
                        >
                          <Download className="w-4 h-4" /> Export CSV
                        </button>
                      </div>
                      <div className="pt-2 border-t border-border">
                        <h4 className="text-[10px] font-black uppercase text-muted-foreground mb-2 tracking-widest">
                          Columns
                        </h4>
                        <div className="max-h-40 overflow-y-auto space-y-1 pr-1">
                          {cols.map((c) => (
                            <label
                              key={String(c.accessor)}
                              className="flex items-center justify-between p-2 hover:bg-accent hover:text-accent-foreground rounded-lg cursor-pointer transition-colors"
                            >
                              <span className="text-xs font-bold">
                                {c.header}
                              </span>
                              <input
                                type="checkbox"
                                checked={c.visible}
                                onChange={() =>
                                  setCols((prev) =>
                                    prev.map((col) =>
                                      col.accessor === c.accessor
                                        ? { ...col, visible: !col.visible }
                                        : col,
                                    ),
                                  )
                                }
                                className="w-4 h-4 accent-primary rounded cursor-pointer"
                              />
                            </label>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Table Area with Fixed/Sticky Header */}
      <div className="overflow-x-auto relative scrollbar-thin scrollbar-thumb-border max-h-150">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead className="sticky top-0 z-20 bg-card">
            <tr>
              <th className="p-5 w-16 text-center border-b border-border bg-card">
                <Checkbox
                  checked={data.length > 0 && selectedRows.size === data.length}
                  onChange={() => {
                    if (selectedRows.size === data.length)
                      setSelectedRows(new Set());
                    else setSelectedRows(new Set(data.map((i) => i.id)));
                  }}
                />
              </th>

              {activeColumns.map((col) => (
                <th
                  key={String(col.accessor)}
                  className="p-5 border-b border-border bg-card"
                >
                  <div className="space-y-3">
                    <div
                      className={`flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest cursor-pointer hover:text-primary transition-colors ${
                        col.sortable ? "" : "pointer-events-none"
                      }`}
                      onClick={() => col.sortable && handleSort(col.accessor)}
                    >
                      {col.header}
                      {col.sortable && (
                        <ArrowUpDown
                          className={`w-3 h-3 ${
                            sortConfig?.key === col.accessor
                              ? "text-primary"
                              : "opacity-20"
                          }`}
                        />
                      )}
                    </div>
                    {/* Smoothly Collapsed Column Filters */}
                    <AnimatePresence initial={false}>
                      {showFilters && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: "auto", opacity: 1, marginTop: 8 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          className="overflow-hidden"
                        >
                          <input
                            placeholder={
                              col?.header
                                ? `${col.header} Filter...`
                                : "Filter...."
                            }
                            className="w-full px-3 py-1.5 text-[11px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-semibold"
                            value={columnFilters[String(col.accessor)] || ""}
                            onChange={(e) => {
                              const val = e.target.value;
                              setColumnFilters((prev) => ({
                                ...prev,
                                [String(col.accessor)]: val,
                              }));
                              setCurrentPage(1);
                            }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </th>
              ))}

              <th className="p-5 border-b border-border text-right text-[10px] font-black text-muted-foreground uppercase tracking-widest bg-card">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-muted/40" : "bg-background"
                    }`}
                  >
                    <td
                      colSpan={activeColumns.length + 2}
                      className="p-5 animate-pulse"
                    >
                      <div className="h-10 bg-muted rounded-2xl" />
                    </td>
                  </tr>
                ))
              : data.map((item, index) => {
                  const isSelected = selectedRows.has(item.id);

                  return (
                    <tr
                      key={item.id}
                      className={`
                group transition-colors
                ${
                  isSelected
                    ? "bg-primary/10"
                    : index % 2 === 0
                      ? "bg-muted/40"
                      : "bg-accent"
                }
                hover:bg-secondary
              `}
                    >
                      {/* Checkbox */}
                      <td className="p-5 text-center border-b border-border">
                        <Checkbox
                          checked={isSelected}
                          id={item.id}
                          onChange={() => {
                            const next = new Set(selectedRows);
                            if (next.has(item.id)) next.delete(item.id);
                            else next.add(item.id);
                            setSelectedRows(next);
                          }}
                        />
                      </td>

                      {/* Columns */}
                      {activeColumns.map((col) => (
                        <td
                          key={String(col.accessor)}
                          className="px-5 text-sm font-semibold text-foreground border-b border-border"
                        >
                          {col.render
                            ? col.render(item[col.accessor], item)
                            : String(item[col.accessor])}
                        </td>
                      ))}

                      {/* Actions */}
                      <td className="p-5 text-right border-b border-border relative">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => onView?.(item)}
                            className="p-2 hover:bg-primary/10 rounded-lg text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <div className="relative">
                            <button
                              onClick={() =>
                                setActiveDropdown(
                                  activeDropdown === item.id ? null : item.id,
                                )
                              }
                              className={`p-2 rounded-lg transition-colors ${activeDropdown === item.id ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent"}`}
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            <AnimatePresence>
                              {activeDropdown === item.id && (
                                <>
                                  <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setActiveDropdown(null)}
                                  />
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.9, x: -10 }}
                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, x: -10 }}
                                    className="absolute right-full mr-2 top-0 w-36 bg-popover border border-border rounded-xl shadow-xl z-50 overflow-hidden text-popover-foreground"
                                  >
                                    <button
                                      onClick={() => {
                                        onEdit?.(item);
                                        setActiveDropdown(null);
                                      }}
                                      className="w-full flex items-center gap-2.5 p-3 text-xs font-bold hover:bg-accent border-b border-border transition-colors"
                                    >
                                      <Edit2 className="w-3.5 h-3.5 text-primary" />{" "}
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => {
                                        onDelete?.(item);
                                        setActiveDropdown(null);
                                      }}
                                      className="w-full flex items-center gap-2.5 p-3 text-xs font-bold text-destructive hover:bg-destructive/10 transition-colors"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" /> Delete
                                    </button>
                                  </motion.div>
                                </>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6 bg-muted/30">
        <div className="text-[11px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-4">
          <p>
            Showing {showingFrom} - {showingTo} / {totalRecords}
          </p>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span>Per Page:</span>
            <Select side="top" value={itemsPerPage} onChange={setItemsPerPage}>
              {[5, 10, 25, 50, 100].map((s) => (
                <Option key={s} value={s}>
                  {s}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
            className="p-2 rounded-lg border border-border disabled:opacity-20 hover:bg-accent transition-all text-muted-foreground"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="p-2 rounded-lg border border-border disabled:opacity-20 hover:bg-accent transition-all text-muted-foreground"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-1 mx-2">
            {getPaginationGroup().map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-8 h-8 rounded-lg text-[10px] font-black transition-all ${currentPage === p ? "bg-primary text-primary-foreground shadow-lg scale-110" : "text-muted-foreground hover:bg-accent"}`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="p-2 rounded-lg border border-border disabled:opacity-20 hover:bg-accent transition-all text-muted-foreground"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(totalPages)}
            className="p-2 rounded-lg border border-border disabled:opacity-20 hover:bg-accent transition-all text-muted-foreground"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
