"use client";
import { SidebarProps } from "@/@types/admin/sidebar";
import { DrawerClose } from "@/components/ui/drawer";
import { authClient } from "@/utils/auth-client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MinusSquare } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { menuData } from "../data/sidebar-menu-data";
import { SidebarItem } from "./sidebar-item";

export default function Sidebar({
  isMobile = false,
  onClose,
  onExpandChange,
  className = "",
}: SidebarProps) {
  const { data: session } = authClient.useSession();
  const [isExpanded, setIsExpanded] = useState(true);
  const [globalCollapseSignal, setGlobalCollapseSignal] = useState(0);

  const handleToggleExpand = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    if (onExpandChange) {
      onExpandChange(newState);
    }
  };

  const handleCollapseAll = () => {
    setGlobalCollapseSignal((prev) => prev + 1);
  };

  const handleNavigate = () => {
    if (onClose) {
      onClose();
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-sidebar">
      {/* Logo Section */}
      <div className="h-16 flex items-center px-4 justify-between shrink-0 border-b border-border overflow-hidden">
        <div className="flex items-center">
          <div className="bg-primary p-2 rounded-xl text-primary-foreground shrink-0 shadow-lg shadow-primary">
            <div className="w-7 h-7 flex items-center justify-center font-bold italic">
              P
            </div>
          </div>
          <AnimatePresence mode="popLayout">
            {isExpanded && !isMobile && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-3 font-bold text-lg leading-4 tracking-tight whitespace-nowrap text-muted-foreground"
              >
                <span>Pollen</span>
                <br />
                <span>Pop</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        {isExpanded && !isMobile && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            onClick={handleCollapseAll}
            className="p-2 rounded-lg text-accent-foreground cursor-pointer hover:bg-accent hover:text-accent-foreground transition-all group shrink-0"
            title="Collapse All Menus"
          >
            <MinusSquare
              size={18}
              className="group-hover:scale-110 transition-transform"
            />
          </motion.button>
        )}
        {isMobile && (
          <DrawerClose className="p-2 rounded-lg text-muted-foreground hover:bg-muted">
            <ChevronLeft size={20} />
          </DrawerClose>
        )}
      </div>

      {/* Navigation Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {menuData.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            activePath="/admin/dashboard"
            sidebarExpanded={isMobile ? true : isExpanded}
            globalCollapseSignal={globalCollapseSignal}
            onNavigate={handleNavigate}
          />
        ))}
      </div>

      {/* User Footer */}
      <div className="p-3 border-t border-border bg-muted">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-accent transition-all cursor-pointer overflow-hidden">
          <div className="w-10 h-10 rounded-full border-2 border-border shrink-0 bg-primary flex items-center justify-center text-primary-foreground font-bold">
            <Image
              src={session?.user?.image}
              alt={session?.user?.name}
              height={100}
              width={100}
              className="object-cover rounded-full"
            />
          </div>
          <AnimatePresence mode="popLayout">
            {(isExpanded && !isMobile) || isMobile ? (
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                className="flex flex-col min-w-0"
              >
                <span className="text-sm font-bold truncate text-muted-foreground">
                  John Doe
                </span>
                <span className="text-[10px] text-accent-foreground uppercase tracking-widest font-bold">
                  Administrator
                </span>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return sidebarContent;
  }

  return (
    <motion.aside
      layout="position"
      initial={false}
      animate={{
        width: isExpanded ? "280px" : "80px",
        transition: { type: "tween", duration: 0.3, ease: "circOut" },
      }}
      className={`fixed top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col z-40 shadow-xl overflow-hidden ${className}`}
    >
      {/* Toggle Button */}
      <button
        onClick={handleToggleExpand}
        className="absolute -right-3 top-12 cursor-pointer bg-accent border border-border rounded-full p-1.5 shadow-lg hover:text-primary z-990 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        style={{ transform: "translateX(0)" }}
      >
        {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      {sidebarContent}
    </motion.aside>
  );
}
