import { MenuItem } from "@/@types/admin/sidebar";
import {
  Activity,
  AlertTriangle,
  BarChart,
  Box,
  Clock,
  CreditCard,
  DollarSign,
  Home,
  Layers2,
  Settings,
  Settings2,
  ShoppingCart,
  Tag,
  TrendingUp,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";

export const initialOrders = [
  {
    id: "#8216",
    customer: {
      name: "Kara Goodwin",
      email: "milford67@gmail.com",
      avatar:
        "https://plus.unsplash.com/premium_photo-1771517577457-7b672b0d4aed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
    },
    unitPrice: 5.77,
    quantity: 57,
    totalPrice: 329.0,
    orderedDate: "June 25, 2023",
    deliveredDate: "Aug 12, 2023",
    receivedDate: "Aug 13, 2023", // Customer received it
    status: "Received",
  },
  {
    id: "#5881",
    customer: {
      name: "Irvin Farrell",
      email: "chanel21@yahoo.com",
      avatar:
        "https://plus.unsplash.com/premium_photo-1770738994941-21573a2075b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
    },
    unitPrice: 2.89,
    quantity: 91,
    totalPrice: 263.0,
    orderedDate: "July 10, 2023",
    deliveredDate: "---",
    receivedDate: "---",
    status: "Pending",
  },
  {
    id: "#9850",
    customer: {
      name: "Seth Rau",
      email: "bartholome24@gmail.com",
      avatar:
        "https://plus.unsplash.com/premium_photo-1771517577457-7b672b0d4aed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
    },
    unitPrice: 9.18,
    quantity: 88,
    totalPrice: 808.0,
    orderedDate: "July 19, 2023",
    deliveredDate: "Aug 11, 2023",
    receivedDate: "Aug 12, 2023",
    status: "Delivered",
  },
  {
    id: "#9841",
    customer: {
      name: "Arif Ahmed",
      email: "arif@example.com",
      avatar:
        "https://plus.unsplash.com/premium_photo-1771517577457-7b672b0d4aed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
    },
    unitPrice: 208.25,
    quantity: 12,
    totalPrice: 2499.0,
    orderedDate: "Feb 01, 2024",
    deliveredDate: "---",
    receivedDate: "---",
    status: "Processing",
  },
  {
    id: "#9838",
    customer: {
      name: "Mila Kabir",
      email: "mila@example.com",
      avatar:
        "https://plus.unsplash.com/premium_photo-1771517577457-7b672b0d4aed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
    },
    unitPrice: 19.8,
    quantity: 5,
    totalPrice: 99.0,
    orderedDate: "Jan 15, 2024",
    deliveredDate: "---",
    receivedDate: "---",
    status: "Canceled",
  },
  {
    id: "#9830",
    customer: {
      name: "Rahat Islam",
      email: "rahat@example.com",
      avatar:
        "https://plus.unsplash.com/premium_photo-1771517577457-7b672b0d4aed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
    },
    unitPrice: 50.0,
    quantity: 2,
    totalPrice: 100.0,
    orderedDate: "Jan 10, 2024",
    deliveredDate: "Jan 12, 2024",
    receivedDate: "Jan 13, 2024",
    status: "Refunded",
  },
];

export const menuData: MenuItem[] = [
  {
    id: "1",
    title: "Dashboard",
    icon: Home,
    link: "/admin/dashboard",
  },
  {
    id: "2",
    title: "Products",
    icon: Box,
    children: [
      { id: "2-1", title: "All Products", link: "/admin/products" },
      { id: "2-2", title: "Add Product", link: "/admin/products/add" },
      { id: "2-5", title: "Inventory", link: "/admin/inventory" },
    ],
  },
  {
    id: "2-3",
    title: "Categories",
    icon: Layers2,
    link: "/admin/categories",
    children: [
      {
        id: "2-3-1",
        title: "Create",
        link: "/admin/categories/create-category",
      },
      {
        id: "2-3-2",
        title: "Clothing",
        link: "/admin/categories/clothing",
        children: [
          { id: "2-3-2-1", title: "Men's Wear", link: "/admin/cat/men" },
          {
            id: "2-3-2-2",
            title: "Women's Wear",
            link: "/admin/cat/women",
          },
        ],
      },
    ],
  },
  {
    id: "3-attr",
    title: "Attributes",
    icon: Settings2,
    children: [
      {
        id: "3-1",
        title: "Create Attribute",
        link: "/admin/attributes/create",
      },
      { id: "3-2", title: "All Attributes", link: "/admin/attributes/all" },
    ],
  },
  {
    id: "3-orders",
    title: "Orders",
    icon: ShoppingCart,
    children: [
      { id: "3-1-o", title: "All Orders", link: "/admin/orders" },
      { id: "3-2-o", title: "Pending Orders", link: "/admin/orders/pending" },
    ],
  },
  {
    id: "4",
    title: "Customers",
    icon: Users,
    children: [
      { id: "4-1", title: "All Customers", link: "/admin/customers" },
      { id: "4-2", title: "Customer Reviews", link: "/admin/reviews" },
    ],
  },
  {
    id: "5",
    title: "Brands",
    icon: Tag,
    children: [
      { id: "5-1", title: "All Brands", link: "/admin/brands" },
      { id: "5-2", title: "Add Brand", link: "/admin/brands/add" },
    ],
  },
  {
    id: "6",
    title: "Marketing",
    icon: TrendingUp,
    children: [
      { id: "6-1", title: "Coupons", link: "/admin/coupons" },
      { id: "6-2", title: "Discounts", link: "/admin/discounts" },
    ],
  },
  {
    id: "7",
    title: "Payments",
    icon: CreditCard,
    children: [
      { id: "7-1", title: "Methods", link: "/admin/payment-methods" },
      { id: "7-2", title: "Transactions", link: "/admin/transactions" },
    ],
  },
  {
    id: "8",
    title: "Reports",
    icon: BarChart,
    children: [
      { id: "8-1", title: "Sales Report", link: "/admin/reports/sales" },
    ],
  },
  {
    id: "9",
    title: "Team & Roles",
    icon: UserCheck,
    children: [
      { id: "9-1", title: "Members", link: "/admin/team" },
      { id: "9-2", title: "Permissions", link: "/admin/roles" },
    ],
  },
  {
    id: "10",
    title: "System Settings",
    icon: Settings,
    children: [
      {
        id: "10-1",
        title: "General Settings",
        link: "/admin/settings/general",
      },
    ],
  },
];

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
