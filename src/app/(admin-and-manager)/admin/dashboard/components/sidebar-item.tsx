/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export const SidebarItem = ({
  item,
  depth = 0,
  activeId,
  setActiveId,
  sidebarExpanded,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = activeId === item.id;

  const handleClick = useCallback(
    (e) => {
      if (hasChildren && sidebarExpanded) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else {
        setActiveId(item.id);
      }
    },
    [hasChildren, sidebarExpanded, item.id, setActiveId],
  );

  useEffect(() => {
    if (!sidebarExpanded) setIsOpen(false);
  }, [sidebarExpanded]);

  return (
    <div className="w-full">
      <motion.div
        onClick={handleClick}
        layout="position"
        className={`flex items-center px-3 py-2.5 cursor-pointer rounded-lg relative group mb-1 transform-gpu ${
          isActive
            ? "bg-primary text-primary-foreground shadow-md"
            : "text-muted-foreground hover:bg-slate-300 dark:hover:bg-slate-800 hover:text-foreground transition-colors duration-150"
        }`}
        style={{ marginLeft: sidebarExpanded ? `${depth * 12}px` : "0px" }}
      >
        <div className="flex justify-center items-center shrink-0 w-6 h-6">
          {item.icon || (
            <div
              className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-current" : "bg-muted-foreground"}`}
            />
          )}
        </div>

        <AnimatePresence mode="wait">
          {sidebarExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -5 }}
              transition={{ duration: 0.15 }}
              className="ml-3 flex-1 flex items-center justify-between overflow-hidden"
            >
              <span className="text-sm font-medium whitespace-nowrap">
                {item.title}
              </span>
              {hasChildren && (
                <motion.div
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  className="opacity-60 flex items-center justify-center"
                >
                  <ChevronRight size={16} />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {!sidebarExpanded && (
          <div className="absolute left-full ml-4 px-3 py-1.5 bg-foreground text-background text-xs rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-[100] shadow-xl font-medium border border-border/50">
            {item.title}
          </div>
        )}
      </motion.div>

      <AnimatePresence initial={false}>
        {isOpen && sidebarExpanded && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "tween", ease: "anticipate", duration: 0.2 }}
            className="overflow-hidden"
          >
            {item.children.map((child) => (
              <SidebarItem
                key={child.id}
                item={child}
                depth={depth + 1}
                activeId={activeId}
                setActiveId={setActiveId}
                sidebarExpanded={sidebarExpanded}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
