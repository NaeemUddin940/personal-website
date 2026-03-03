"use client";
import { SidebarItemProps } from "@/@types/admin/sidebar";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

export const SidebarItem: React.FC<SidebarItemProps> = React.memo(
  ({
    item,
    activePath,
    sidebarExpanded,
    globalCollapseSignal,
    depth = 0,
    onNavigate,
  }) => {
    const isActive = activePath === item.link;
    const hasChildren = !!item.children?.length;

    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
      if (globalCollapseSignal) {
        setIsOpen(false);
      }
    }, [globalCollapseSignal]);

    const handleItemClick = (e: React.MouseEvent<HTMLDivElement>): void => {
      if (hasChildren) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    const Icon = item.icon;

    const content = (
      <div
        onClick={handleItemClick}
        className={`flex items-center p-2 rounded-lg cursor-pointer transition-all relative group ${
          isActive
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-sidebar-foreground hover:bg-sidebar-primary hover:text-primary-foreground"
        }`}
        style={{
          paddingLeft: depth > 0 ? `${depth * 12 + 8}px` : "8px",
        }}
      >
        {/* Active Indicator */}
        {isActive && (
          <motion.div
            layoutId="activeLine"
            className="absolute left-0 w-1 h-6 bg-destructive rounded-r-full"
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 35,
            }}
          />
        )}

        {/* Icon */}
        <div className="shrink-0 ml-1">
          {Icon ? (
            <Icon className="w-5 h-5" />
          ) : (
            <div className="w-5 h-5 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-current opacity-40" />
            </div>
          )}
        </div>

        {/* Title */}
        <AnimatePresence mode="popLayout">
          {sidebarExpanded && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="ml-3 font-medium whitespace-nowrap overflow-hidden text-sm flex-1"
            >
              {item.title}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Chevron */}
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
        {!hasChildren && item.link ? (
          <a
            href={item.link}
            onClick={onNavigate}
            className="block no-underline"
          >
            {content}
          </a>
        ) : (
          content
        )}

        {/* Nested Items */}
        <AnimatePresence initial={false}>
          {sidebarExpanded && isOpen && hasChildren && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.25,
                ease: "circOut",
              }}
              className="overflow-hidden border-l border-border mt-1 ml-4"
            >
              {item.children!.map((child) => (
                <SidebarItem
                  key={child.id}
                  item={child}
                  activePath={activePath}
                  sidebarExpanded={sidebarExpanded}
                  globalCollapseSignal={globalCollapseSignal}
                  depth={depth + 1}
                  onNavigate={onNavigate}
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
