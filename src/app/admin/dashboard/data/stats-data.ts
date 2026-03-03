import { Activity, AlertTriangle, Clock, DollarSign, TrendingUp, UserPlus } from "lucide-react";

export const statsData = {
  totalRevenue: {
    title: "Total Revenue",
    icon: DollarSign,
    color: "text-emerald-500",
    glow: "bg-emerald-500",
    badge: "Financials",
    subtext: "Net profit after taxes",
    timeframes: {
      today: { value: "$2,480", trend: "+4.2%", growth: "up" },
      "7d": { value: "$18,250", trend: "+12.8%", growth: "up" },
      "15d": { value: "$34,120", trend: "+15.2%", growth: "up" },
      "30d": { value: "$68,400", trend: "+22.5%", growth: "up" },
    },
  },
  totalSales: {
    title: "Total Sales",
    icon: TrendingUp,
    color: "text-blue-500",
    glow: "bg-blue-500",
    badge: "Revenue",
    subtext: "Gross sales volume",
    timeframes: {
      today: { value: "$1,200", trend: "+2.5%", growth: "up" },
      "7d": { value: "$8,500", trend: "+10.2%", growth: "up" },
      "15d": { value: "$10,200", trend: "+14.1%", growth: "up" },
      "30d": { value: "$12,450", trend: "+12.5%", growth: "up" },
    },
  },
  totalOrders: {
    title: "Total Orders",
    icon: Activity,
    color: "text-purple-500",
    glow: "bg-purple-500",
    badge: "Logistics",
    subtext: "Completed transactions",
    timeframes: {
      today: { value: "45", trend: "+5.1%", growth: "up" },
      "7d": { value: "320", trend: "+8.2%", growth: "up" },
      "15d": { value: "680", trend: "+11.5%", growth: "up" },
      "30d": { value: "1,284", trend: "+15.0%", growth: "up" },
    },
  },
  newCustomers: {
    title: "New Customers",
    icon: UserPlus, // Lucide icon
    color: "text-cyan-500",
    glow: "bg-cyan-500",
    badge: "Users",
    subtext: "Registered this period",
    timeframes: {
      today: { value: "12", trend: "+1.2%", growth: "up" },
      "7d": { value: "84", trend: "+12.0%", growth: "up" },
      "15d": { value: "120", trend: "+16.5%", growth: "up" },
      "30d": { value: "156", trend: "+18.0%", growth: "up" },
    },
  },
  pendingOrders: {
    title: "Pending Orders",
    icon: Clock, // Lucide icon
    color: "text-amber-500",
    glow: "bg-amber-500",
    badge: "Alert",
    subtext: "Awaiting fulfillment",
    timeframes: {
      today: { value: "05", trend: "-2.1%", growth: "down" },
      "7d": { value: "18", trend: "-5.0%", growth: "down" },
      "15d": { value: "20", trend: "+2.0%", growth: "up" },
      "30d": { value: "23", trend: "-2.0%", growth: "down" },
    },
  },
  lowStock: {
    title: "Low Stock",
    icon: AlertTriangle, // Lucide icon
    color: "text-rose-500",
    glow: "bg-rose-500",
    badge: "Stock",
    subtext: "Items below threshold",
    timeframes: {
      today: { value: "02", trend: "Critical", growth: "down" },
      "7d": { value: "05", trend: "Warning", growth: "down" },
      "15d": { value: "06", trend: "Stable", growth: "up" },
      "30d": { value: "08", trend: "Critical", growth: "down" },
    },
  },
};
