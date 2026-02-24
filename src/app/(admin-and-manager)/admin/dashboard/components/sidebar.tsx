"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart,
  Box,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Home,
  Menu,
  MinusSquare,
  Settings,
  Settings2,
  ShoppingCart,
  Tag,
  TrendingUp,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

/**
 * Next.js standard components (`next/link`, `next/navigation`)
 * environment-e shimaboddhotar karone amra inline implementation use korchi.
 */

// Recursive SidebarItem Component for infinite nesting
const SidebarItem = React.memo(
  ({ item, activePath, sidebarExpanded, globalCollapseSignal, depth = 0 }) => {
    // Check if the current path matches the item link
    const isActive = activePath === item.link;
    const hasChildren = item.children && item.children.length > 0;
    const [isOpen, setIsOpen] = useState(false);

    // Global collapse trigger logic
    useEffect(() => {
      if (globalCollapseSignal) {
        setIsOpen(false);
      }
    }, [globalCollapseSignal]);

    // Handle click logic: toggle for parents, log/navigate for links
    const handleItemClick = (e) => {
      if (hasChildren) {
        e.preventDefault();
        setIsOpen(!isOpen);
      } else if (item.link) {
        console.log(`Navigating to: ${item.link}`);
        // Normal navigation logic thakbe ekhane
      }
    };

    const content = (
      <div
        onClick={handleItemClick}
        className={`flex items-center p-2 rounded-lg cursor-pointer transition-all relative group ${
          isActive
            ? "bg-primary/10 text-primary shadow-sm"
            : "text-muted-foreground hover:bg-accent hover:text-foreground"
        }`}
        style={{ paddingLeft: depth > 0 ? `${depth * 12 + 8}px` : "8px" }}
      >
        {/* Active Indicator Line */}
        {isActive && (
          <motion.div
            layoutId="activeLine"
            className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
          />
        )}

        <div className="shrink-0 ml-1">
          {item.icon ? (
            item.icon
          ) : (
            <div className="w-5 h-5 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-current opacity-40" />
            </div>
          )}
        </div>

        <AnimatePresence mode="popLayout">
          {sidebarExpanded && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="ml-3 font-medium whitespace-nowrap overflow-hidden text-md flex-1"
            >
              {item.title}
            </motion.span>
          )}
        </AnimatePresence>

        {sidebarExpanded && hasChildren && (
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="w-4 h-4 opacity-50" />
          </motion.div>
        )}
      </div>
    );

    return (
      <div className="mb-1 select-none overflow-hidden">
        {/* Environment-e Link component constraint thakai amra placeholder use korchi */}
        {!hasChildren && item.link ? (
          <Link href={item.link} className="block no-underline">
            {content}
          </Link>
        ) : (
          content
        )}

        {/* Nested Submenu Animation */}
        <AnimatePresence initial={false}>
          {sidebarExpanded && isOpen && hasChildren && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "circOut" }}
              className="overflow-hidden border-l border-border/50 mt-1 ml-4"
            >
              {item.children.map((child) => (
                <SidebarItem
                  key={child.id}
                  item={child}
                  activePath={activePath}
                  sidebarExpanded={sidebarExpanded}
                  globalCollapseSignal={globalCollapseSignal}
                  depth={depth + 1}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

SidebarItem.displayName = "SidebarItem";

const menuData = [
  {
    id: "1",
    title: "Dashboard",
    icon: <Home size={20} />,
    link: "/admin/dashboard",
  },
  {
    id: "2",
    title: "Products",
    icon: <Box size={20} />,
    children: [
      { id: "2-1", title: "All Products", link: "/admin/products" },
      { id: "2-2", title: "Add Product", link: "/admin/products/add" },
      {
        id: "2-3",
        title: "Categories",
        link: "/admin/categories",
        children: [
          {
            id: "2-3-1",
            title: "Electronics",
            link: "/admin/categories/electronics",
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
      { id: "2-5", title: "Inventory", link: "/admin/inventory" },
    ],
  },
  {
    id: "3-attr",
    title: "Attributes",
    icon: <Settings2 size={20} />,
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
    icon: <ShoppingCart size={20} />,
    children: [
      { id: "3-1-o", title: "All Orders", link: "/admin/orders" },
      { id: "3-2-o", title: "Pending Orders", link: "/admin/orders/pending" },
    ],
  },
  {
    id: "4",
    title: "Customers",
    icon: <Users size={20} />,
    children: [
      { id: "4-1", title: "All Customers", link: "/admin/customers" },
      { id: "4-2", title: "Customer Reviews", link: "/admin/reviews" },
    ],
  },
  {
    id: "5",
    title: "Brands",
    icon: <Tag size={20} />,
    children: [
      { id: "5-1", title: "All Brands", link: "/admin/brands" },
      { id: "5-2", title: "Add Brand", link: "/admin/brands/add" },
    ],
  },
  {
    id: "6",
    title: "Marketing",
    icon: <TrendingUp size={20} />,
    children: [
      { id: "6-1", title: "Coupons", link: "/admin/coupons" },
      { id: "6-2", title: "Discounts", link: "/admin/discounts" },
    ],
  },
  {
    id: "7",
    title: "Payments",
    icon: <CreditCard size={20} />,
    children: [
      { id: "7-1", title: "Methods", link: "/admin/payment-methods" },
      { id: "7-2", title: "Transactions", link: "/admin/transactions" },
    ],
  },
  {
    id: "8",
    title: "Reports",
    icon: <BarChart size={20} />,
    children: [
      { id: "8-1", title: "Sales Report", link: "/admin/reports/sales" },
    ],
  },
  {
    id: "9",
    title: "Team & Roles",
    icon: <UserCheck size={20} />,
    children: [
      { id: "9-1", title: "Members", link: "/admin/team" },
      { id: "9-2", title: "Permissions", link: "/admin/roles" },
    ],
  },
  {
    id: "10",
    title: "System Settings",
    icon: <Settings size={20} />,
    children: [
      {
        id: "10-1",
        title: "General Settings",
        link: "/admin/settings/general",
      },
    ],
  },
];

export default function Sidebar() {
  // Preview environment-e usePathname available noy, tai mock path use kora hoyeche

  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [globalCollapseSignal, setGlobalCollapseSignal] = useState(0);

  const session = {
    user: {
      name: "John Doe",
      email: "john@example.com",
      image: "https://i.pravatar.cc/150?u=john",
      role: "admin",
    },
  };

  const handleCollapseAll = () => {
    setGlobalCollapseSignal((prev) => prev + 1);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="sm:hidden fixed top-4 left-4 z-[80]">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 bg-primary text-primary-foreground rounded-lg shadow-xl"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 sm:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        layout="position"
        initial={false}
        animate={{
          width: isExpanded ? "280px" : "80px",
          transition: { type: "tween", duration: 0.3, ease: "circOut" },
        }}
        className="fixed sm:sticky top-0 h-screen bg-card border-r border-border flex flex-col z-[60] shadow-2xl overflow-visible will-change-[width] antialiased"
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -right-4 top-12 cursor-pointer bg-background border border-border rounded-full p-1.5 shadow-xl hover:text-primary z-[100] hidden sm:flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          style={{ transform: "translateX(0)" }}
        >
          {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>

        {/* Logo Section */}
        <div className="h-20 flex items-center px-5 justify-between shrink-0 border-b border-border overflow-hidden">
          <div className="flex items-center">
            <div className="bg-primary p-2 rounded-xl text-primary-foreground shrink-0 shadow-lg shadow-primary/20">
              <div className="w-7 h-7 flex items-center justify-center font-black italic">
                P
              </div>
            </div>
            <AnimatePresence mode="popLayout">
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="ml-3 font-bold text-lg leading-4 tracking-tight whitespace-nowrap text-foreground"
                >
                  <span>Pollen</span>
                  <br />
                  <span>Pop</span>
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          {isExpanded && (
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onClick={handleCollapseAll}
              className="p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-all group shrink-0"
              title="Collapse All Menus"
            >
              <MinusSquare
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
            </motion.button>
          )}
        </div>

        {/* Navigation Area */}
        <div className="flex-1 overflow-y-auto p-3 no-scrollbar space-y-1">
          {menuData.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              activePath={pathname || "/admin/dashboard"}
              sidebarExpanded={isExpanded}
              globalCollapseSignal={globalCollapseSignal}
            />
          ))}
        </div>

        {/* User Footer */}
        <div className="p-3 border-t border-border bg-muted/20">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-accent transition-all cursor-pointer overflow-hidden">
            <img
              src={session.user.image}
              alt="Avatar"
              className="w-10 h-10 rounded-full border-2 border-primary/10 shrink-0"
            />
            <AnimatePresence mode="popLayout">
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -5 }}
                  className="flex flex-col min-w-0"
                >
                  <span className="text-sm font-bold truncate text-foreground">
                    {session.user.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">
                    {session.user.role}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
