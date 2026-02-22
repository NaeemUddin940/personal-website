"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart,
  Box,
  CreditCard,
  Home,
  Settings,
  ShoppingCart,
  Tag,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SidebarItem } from "./sidebar-item";

const menuData = [
  {
    id: "1",
    title: "Dashboard",
    icon: <Home />,
    link: "/admin/dashboard",
  },

  {
    id: "2",
    title: "Products",
    icon: <Box />,
    children: [
      { id: "2-1", title: "All Products", link: "/admin/products" },
      { id: "2-2", title: "Add Product", link: "/admin/products/add" },
      { id: "2-3", title: "Categories", link: "/admin/categories" },
      { id: "2-4", title: "Attributes", link: "/admin/attributes" },
      { id: "2-5", title: "Inventory", link: "/admin/inventory" },
    ],
  },

  {
    id: "3",
    title: "Orders",
    icon: <ShoppingCart />,
    children: [
      { id: "3-1", title: "All Orders", link: "/admin/orders" },
      { id: "3-2", title: "Pending Orders", link: "/admin/orders/pending" },
      { id: "3-3", title: "Completed Orders", link: "/admin/orders/completed" },
      { id: "3-4", title: "Cancelled Orders", link: "/admin/orders/cancelled" },
    ],
  },

  {
    id: "4",
    title: "Customers",
    icon: <Users />,
    children: [
      { id: "4-1", title: "All Customers", link: "/admin/customers" },
      { id: "4-2", title: "Customer Reviews", link: "/admin/reviews" },
    ],
  },

  {
    id: "5",
    title: "Brands",
    icon: <Tag />,
    children: [
      { id: "5-1", title: "All Brands", link: "/admin/brands" },
      { id: "5-2", title: "Add Brand", link: "/admin/brands/add" },
    ],
  },

  {
    id: "6",
    title: "Marketing",
    icon: <TrendingUp />,
    children: [
      { id: "6-1", title: "Coupons", link: "/admin/coupons" },
      { id: "6-2", title: "Discounts", link: "/admin/discounts" },
      { id: "6-3", title: "Campaigns", link: "/admin/campaigns" },
      { id: "6-4", title: "Banners", link: "/admin/banners" },
    ],
  },

  {
    id: "7",
    title: "Payments",
    icon: <CreditCard />,
    children: [
      { id: "7-1", title: "Payment Methods", link: "/admin/payment-methods" },
      { id: "7-2", title: "Transactions", link: "/admin/transactions" },
    ],
  },

  {
    id: "8",
    title: "Reports",
    icon: <BarChart />,
    children: [
      { id: "8-1", title: "Sales Report", link: "/admin/reports/sales" },
      { id: "8-2", title: "Product Report", link: "/admin/reports/products" },
      { id: "8-3", title: "Customer Report", link: "/admin/reports/customers" },
    ],
  },

  {
    id: "9",
    title: "Team & Roles",
    icon: <UserCheck />,
    children: [
      { id: "9-1", title: "Team Members", link: "/admin/team" },
      { id: "9-2", title: "Roles & Permissions", link: "/admin/roles" },
    ],
  },

  {
    id: "10",
    title: "System Settings",
    icon: <Settings />,
    children: [
      {
        id: "10-1",
        title: "General Settings",
        link: "/admin/settings/general",
      },
      { id: "10-2", title: "Store Settings", link: "/admin/settings/store" },
      {
        id: "10-3",
        title: "Shipping Settings",
        link: "/admin/settings/shipping",
      },
      { id: "10-4", title: "Tax Settings", link: "/admin/settings/tax" },
    ],
  },
];

export default function Sidebar() {
  const [activeId, setActiveId] = useState("1");
  const [isHovered, setIsHovered] = useState(false);
  // const { data: session } = authClient.useSession();
  const session = {
    user: {
      name: "John Doe",
      email: "john@example.com",
      image: "/images/user.jpg",
      role: "admin",
    },
  };

  return (
    <motion.aside
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        width: isHovered ? "280px" : "76px",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 18,
        mass: 1.2,
        bounce: 0.4,
      }}
      className="h-screen sticky top-0 hidden sm:flex bg-card border-r border-border flex-col z-50 shadow-2xl overflow-hidden"
    >
      <div className="h-18 flex items-center p-3 shrink-0 border-b border-border">
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1 }}
          className="bg-primary p-1 rounded-2xl text-primary-foreground shadow-lg shadow-primary/20 shrink-0"
        >
          <Link href={"/"} className="h-10 hidden md:block w-10">
            <Image
              src="/PollenPop.png"
              alt="pollenpop"
              height={100}
              width={100}
              className="object-cover h-full w-full"
            />
          </Link>
        </motion.div>
        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, x: -20, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="ml-3 font-bold text-xl tracking-tight text-foreground whitespace-nowrap"
            >
              Track O Data
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1 overflow-y-auto p-3 scrollbar-hide no-scrollbar">
        {menuData.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            activeId={activeId}
            setActiveId={setActiveId}
            sidebarExpanded={isHovered}
          />
        ))}
      </div>

      <div className="p-2 border-t border-border bg-card/50">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-accent bg-muted cursor-pointer transition-colors group">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary font-bold shrink-0 border border-primary/20">
            {/* <div className="h-10 md:hidden w-10"> */}
            <Image
              src={session?.user?.image || "/avatar-default.svg"}
              height={100}
              width={100}
              alt={session?.user?.name || "My Profile"}
              className="object-cover h-full w-full rounded-full"
            />
            {/* </div> */}
          </div>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col overflow-hidden"
            >
              <span className="text-sm font-semibold truncate text-foreground">
                {session?.user?.name}
              </span>
              <span className="text-[10px] text-muted-foreground truncate uppercase tracking-wider font-bold">
                {session?.user?.role === "admin"
                  ? "Administrator"
                  : session?.user?.role}
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
