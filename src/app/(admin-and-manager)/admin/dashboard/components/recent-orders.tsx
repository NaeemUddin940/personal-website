"use client";
import { Option, Select } from "@/components/ui/select";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronUp,
  Eye,
  Pencil,
  Search,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { initialOrders } from "../data/initial-orders";

// Status colors and config for easy management
const STATUS_CONFIG = {
  Pending: {
    dot: "bg-amber-500",
    text: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  Processing: {
    dot: "bg-blue-500",
    text: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  Received: {
    dot: "bg-indigo-500",
    text: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  Delivered: {
    dot: "bg-emerald-500",
    text: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  Canceled: { dot: "bg-rose-500", text: "text-rose-500", bg: "bg-rose-500/10" },
  Refunded: {
    dot: "bg-slate-500",
    text: "text-slate-500",
    bg: "bg-slate-500/10",
  },
};

/**
 * SortIndicator component moved outside to prevent "Cannot create components during render" error.
 * It now receives sortConfig as a prop.
 */
const SortIndicator = ({ columnKey, sortConfig }) => {
  const isActive = sortConfig.key === columnKey;

  if (!isActive) {
    return (
      <div className="ml-1 text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors">
        <ChevronUp size={14} />
      </div>
    );
  }

  return (
    <div className="ml-1 text-primary animate-in fade-in zoom-in duration-300">
      {sortConfig.direction === "asc" ? (
        <ChevronUp size={14} />
      ) : (
        <ChevronDown size={14} />
      )}
    </div>
  );
};

export default function RecentOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  // Default sorting set to orderedDate ASC
  const [sortConfig, setSortConfig] = useState({
    key: "orderedDate",
    direction: "asc",
  });
  const [rowsPerPage, setRowsPerPage] = useState(null);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedOrders = useMemo(() => {
    let sortableItems = [...orders];

    if (searchQuery) {
      sortableItems = sortableItems.filter(
        (order) =>
          order.customer.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          order.id.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const aVal =
          sortConfig.key === "customer" ? a.customer.name : a[sortConfig.key];
        const bVal =
          sortConfig.key === "customer" ? b.customer.name : b[sortConfig.key];

        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [orders, sortConfig, searchQuery]);

  return (
    <div className="min-h-full bg-background font-sans transition-colors duration-300">
      <div className="max-w-full custom-shadow  mx-auto custom-hover bg-card rounded-2xl text-card-foreground rounded-radius border border-border custom-shadow">
        {/* Header Section */}
        <div className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Recent Orders</h2>
            <p className="text-xs text-muted-foreground mt-1 text-nowrap">
              Manage and track all customer transactions
            </p>
          </div>

          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search ID or Name..."
              className="bg-muted border border-border rounded-lg pl-10 pr-4 py-2 text-sm w-full lg:w-80 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-full">
            <thead>
              <tr className="border-y border-border bg-secondary/20 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                <th
                  className="px-6 py-4 cursor-pointer hover:text-primary transition-colors group"
                  onClick={() => handleSort("id")}
                >
                  <div className="flex items-center">
                    ID <SortIndicator columnKey="id" sortConfig={sortConfig} />
                  </div>
                </th>
                <th
                  className="px-6 py-4 cursor-pointer hover:text-primary transition-colors group"
                  onClick={() => handleSort("customer")}
                >
                  <div className="flex items-center">
                    Customer{" "}
                    <SortIndicator
                      columnKey="customer"
                      sortConfig={sortConfig}
                    />
                  </div>
                </th>
                <th className="px-6 py-4 text-center">Qty</th>
                <th className="px-6 py-4 text-right">Price/Unit</th>
                <th
                  className="px-6 py-4 cursor-pointer hover:text-primary transition-colors group"
                  onClick={() => handleSort("totalPrice")}
                >
                  <div className="flex items-center justify-end">
                    Total{" "}
                    <SortIndicator
                      columnKey="totalPrice"
                      sortConfig={sortConfig}
                    />
                  </div>
                </th>
                <th
                  className="px-6 py-4 cursor-pointer hover:text-primary transition-colors group"
                  onClick={() => handleSort("orderedDate")}
                >
                  <div className="flex items-center">
                    Ordered{" "}
                    <SortIndicator
                      columnKey="orderedDate"
                      sortConfig={sortConfig}
                    />
                  </div>
                </th>
                <th className="px-6 py-4">Delivered</th>
                <th
                  className="px-6 py-4 cursor-pointer hover:text-primary transition-colors group"
                  onClick={() => handleSort("receivedDate")}
                >
                  <div className="flex items-center">
                    Received{" "}
                    <SortIndicator
                      columnKey="receivedDate"
                      sortConfig={sortConfig}
                    />
                  </div>
                </th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {sortedOrders.map((order) => {
                const status =
                  STATUS_CONFIG[order.status] || STATUS_CONFIG.Pending;
                return (
                  <tr
                    key={order.id}
                    className="hover:bg-muted/40 transition-colors group"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-muted-foreground">
                      {order.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Image
                            height={500}
                            width={500}
                            src={order.customer.avatar}
                            alt=""
                            className="w-9 h-9 rounded-full border border-border"
                          />
                          <div
                            className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-card ${status.dot}`}
                          ></div>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-foreground leading-tight">
                            {order.customer.name}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            {order.customer.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-center">
                      {order.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-right text-muted-foreground">
                      ${order.unitPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-foreground text-right">
                      ${order.totalPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground whitespace-nowrap">
                      {order.orderedDate}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground whitespace-nowrap">
                      {order.deliveredDate}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground whitespace-nowrap">
                      {order.receivedDate}
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${status.bg}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${status.dot} shadow-sm`}
                        />
                        <span
                          className={`text-[11px] font-bold uppercase tracking-wider ${status.text}`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          title="Edit"
                          className="p-2 cursor-pointer rounded-md border border-border hover:bg-violet-500/10 hover:text-violet-500 hover:border-violet-500/50 transition-all"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          title="View Details"
                          className="p-2 cursor-pointer rounded-md border border-border hover:bg-green-500/10 hover:text-green-500 hover:border-green-500/50 transition-all"
                        >
                          <Eye size={13} />
                        </button>
                        <button
                          title="Delete"
                          className="p-2 cursor-pointer rounded-md border border-border hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/50 transition-all text-muted-foreground"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Section */}
        <div className="px-6 py-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 bg-secondary/5">
          <div className="flex items-center gap-2">
            <span className="text-xs whitespace-nowrap text-muted-foreground font-medium uppercase tracking-tighter">
              Rows per page
            </span>
            <Select
              side="bottom"
              align="center"
              showChevron={false}
              value={rowsPerPage}
              onChange={setRowsPerPage}
            >
              <Option defaultSelect={true} value={5}>
                5
              </Option>
              <Option value={10}>10</Option>
              <Option value={20}>20</Option>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground font-bold whitespace-nowrap">
              Showing 1 to {sortedOrders.length} of {orders.length} entries
            </span>
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-md border border-border cursor-pointer bg-card hover:bg-muted disabled:opacity-30 transition-colors">
                <ChevronsLeft size={18} />
              </button>
              <button className="p-2 rounded-md border border-border cursor-pointer bg-card hover:bg-muted disabled:opacity-30 transition-colors">
                <ChevronLeft size={18} />
              </button>
              <button className="p-2 rounded-md border border-border cursor-pointer bg-card hover:bg-muted disabled:opacity-30 transition-colors">
                <ChevronRight size={18} />
              </button>
              <button className="p-2 rounded-md border border-border cursor-pointer bg-card hover:bg-muted disabled:opacity-30 transition-colors">
                <ChevronsRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
