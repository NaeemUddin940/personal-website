import { Tooltip } from "@/components/ui/tooltip";
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Download,
  Filter,
  MoreVertical,
  Package,
  RefreshCw,
  Search,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Stock Status config (Consistent styling)
const STOCK_INDICATORS = {
  "In Stock": {
    text: "text-emerald-500",
    bg: "bg-emerald-500/10",
    icon: <CheckCircle2 size={14} />,
    bar: "bg-emerald-500",
  },
  "Low Stock": {
    text: "text-amber-500",
    bg: "bg-amber-500/10",
    icon: <AlertTriangle size={14} />,
    bar: "bg-amber-500",
  },
  "Out of Stock": {
    text: "text-rose-500",
    bg: "bg-rose-500/10",
    icon: <Clock size={14} />,
    bar: "bg-rose-500",
  },
};

const initialStockData = [
  {
    id: "SKU-9901",
    name: "Wireless Buds Pro",
    category: "Electronics",
    quantity: 124,
    minLevel: 20,
    unitPrice: 45.0,
    lastRestocked: "2024-01-15",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&h=100&fit=crop",
  },
  {
    id: "SKU-9902",
    name: "Gaming Mouse Pad",
    category: "Accessories",
    quantity: 8,
    minLevel: 15,
    unitPrice: 12.5,
    lastRestocked: "2023-12-10",
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=100&h=100&fit=crop",
  },
  {
    id: "SKU-9903",
    name: "Smart Desk Lamp",
    category: "Home Office",
    quantity: 0,
    minLevel: 10,
    unitPrice: 29.99,
    lastRestocked: "2024-02-01",
    image:
      "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=100&h=100&fit=crop",
  },
  {
    id: "SKU-9904",
    name: "USB-C Fast Charger",
    category: "Electronics",
    quantity: 45,
    minLevel: 30,
    unitPrice: 19.0,
    lastRestocked: "2024-01-28",
    image:
      "https://images.unsplash.com/photo-1619119532452-f6176518f8e0?w=100&h=100&fit=crop",
  },
  {
    id: "SKU-9905",
    name: "USB-C Fast Charger",
    category: "Electronics",
    quantity: 45,
    minLevel: 30,
    unitPrice: 19.0,
    lastRestocked: "2024-01-28",
    image:
      "https://images.unsplash.com/photo-1619119532452-f6176518f8e0?w=100&h=100&fit=crop",
  },
];

export default function StockReport() {
  const [stock] = useState(initialStockData);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getStatus = (item) => {
    if (item.quantity === 0) return "Out of Stock";
    if (item.quantity <= item.minLevel) return "Low Stock";
    return "In Stock";
  };

  return (
    <div className="min-h-full font-sans text-foreground">
      <div className="max-w-full mx-auto space-y-6">
        {/* Main Report Table Container */}
        <div className="bg-card text-card-foreground rounded-2xl custom-hover custom-shadow border border-border shadow-lg">
          {/* Header */}
          <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border bg-secondary/5">
            <div>
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold tracking-tight">
                  Stock Inventory Report
                </h2>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Monitor stock levels, reorder points, and warehouse status
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search SKU or Name..."
                  className="bg-muted border border-border rounded-lg pl-9 pr-4 py-1.5 text-xs w-48 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`p-2 rounded-lg border border-border hover:bg-accent transition-all text-muted-foreground ${isMenuOpen ? "bg-accent text-primary" : ""}`}
                >
                  <MoreVertical size={18} />
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-xl z-50 py-1.5 animate-in fade-in zoom-in-95 duration-200">
                    <button className="w-full px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted flex items-center gap-3 transition-colors">
                      <Download size={14} className="text-muted-foreground" />{" "}
                      Export Stock List
                    </button>
                    <button className="w-full px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted flex items-center gap-3 transition-colors">
                      <RefreshCw size={14} className="text-muted-foreground" />{" "}
                      Update Inventory
                    </button>
                    <button className="w-full px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted flex items-center gap-3 transition-colors">
                      <Filter size={14} className="text-muted-foreground" />{" "}
                      Category Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-225">
              <thead>
                <tr className="border-b border-border bg-secondary/10 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                  <th className="px-6 py-2">Item Details</th>
                  <th className="px-6 py-2 text-center">Status</th>
                  <th className="px-6 py-2">Quantity Info</th>
                  <th className="px-6 py-2 text-right">Unit Price</th>
                  <th className="px-6 py-2 text-right">Inventory Value</th>
                  <th className="px-6 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {stock.map((item) => {
                  const statusName = getStatus(item);
                  const status = STOCK_INDICATORS[statusName];
                  const stockPercentage = Math.min(
                    (item.quantity / 150) * 100,
                    100,
                  );

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-muted/40 transition-colors group"
                    >
                      <td className="px-6 py-2">
                        <div className="flex items-center gap-3">
                          <Image
                            height={200}
                            width={200}
                            src={item.image}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover border border-border"
                          />
                          <div className="flex flex-col">
                            <Tooltip
                              className="bg-primary"
                              content={item.name}
                              position="top"
                            >
                              <span className="text-sm line-clamp-1 font-bold text-foreground leading-tight">
                                {item.name}
                              </span>
                            </Tooltip>
                            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">
                              {item.id} • {item.category}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <div
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${status.bg} border border-border/50`}
                          >
                            <span className={`${status.text}`}>
                              {status.icon}
                            </span>
                            <span
                              className={`text-[10px] whitespace-nowrap font-bold uppercase tracking-wider ${status.text}`}
                            >
                              {statusName}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1.5 min-w-30">
                          <div className="flex justify-between items-center text-[11px] font-bold">
                            <span className="text-muted-foreground">
                              {item.quantity} units
                            </span>
                            <span className="text-foreground">
                              Min: {item.minLevel}
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-accent rounded-full overflow-hidden">
                            <div
                              className={`h-full ${status.bar} transition-all duration-700`}
                              style={{
                                width: `${item.quantity === 0 ? 0 : Math.max(stockPercentage, 5)}%`,
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right text-muted-foreground">
                        ${item.unitPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-foreground text-right">
                        ${(item.quantity * item.unitPrice).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-bold border border-border hover:bg-primary hover:text-primary-foreground transition-all">
                            Restock <ArrowUpRight size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
