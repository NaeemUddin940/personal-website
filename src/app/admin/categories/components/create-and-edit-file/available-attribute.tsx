"use client";
import { Button } from "@/components/common/advanced-button";
import InputField from "@/components/common/input-field";
import { Card } from "@/components/ui/card";
import { Option, Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";
import { HiOutlinePlus, HiOutlineSearch } from "react-icons/hi";

export interface AvailableAttribute {
  id: string;
  name: string;
  type: "text" | "number" | "select" | "boolean" | "date";
  options: string[];
  isGlobal: boolean;
  description?: string;
}

interface AvailableAttributeListProps {
  availableAttributes: AvailableAttribute[];
  onAssign: (attribute: AvailableAttribute) => void;
  assignedIds: string[];
}

export function AvailableAttributeList({
  availableAttributes,
  onAssign,
  assignedIds,
}: AvailableAttributeListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredAttributes = availableAttributes.filter((attr) => {
    const matchesSearch = attr.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || attr.type === filterType;
    const notAssigned = !assignedIds.includes(attr.id);
    return matchesSearch && matchesType && notAssigned;
  });


  const unassignedCount = availableAttributes.filter(
    (attr) => !assignedIds.includes(attr.id),
  ).length;

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-foreground">
            Available Attributes
          </h3>
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
            {unassignedCount}
          </span>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
        >
          {isExpanded ? "Show Less" : "Show All"}
        </button>
      </div>

      {/* Search and Filter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
        <div className="relative">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <InputField
            type="search"
            icon={Search}
            placeholder="Search attributes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <Option value="all">All Types</Option>
          <Option value="text">Text</Option>
          <Option value="number">Number</Option>
          <Option value="select">Select</Option>
          <Option value="boolean">Boolean</Option>
          <Option value="date">Date</Option>
        </Select>
      </div>

      {/* Attribute List */}
      <AnimatePresence>
        <div className="space-y-2 max-h-70 overflow-y-auto">
          {filteredAttributes
            .slice(0, isExpanded ? undefined : 5)
            .map((attr) => (
              <motion.div
                key={attr.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer",
                  "hover:bg-primary/5 hover:border-primary/30",
                )}
                onClick={() => onAssign(attr)}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <HiOutlinePlus className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {attr.name}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {attr.type}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAssign(attr);
                  }}
                >
                  Assign
                </Button>
              </motion.div>
            ))}

          {filteredAttributes.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-muted-foreground"
            >
              <p className="text-sm">No attributes found</p>
              <p className="text-xs mt-1">
                Try adjusting your search or filter
              </p>
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </Card>
  );
}
