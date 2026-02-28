"use client";
import Input from "@/components/common/input";
import { SectionHeader } from "@/components/common/section-header";
import { Card } from "@/components/ui/card";
import { Option, Select } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Check, Search } from "lucide-react";
import { useMemo, useState } from "react";
import {
  HiOutlineChevronDown,
  HiOutlineDocumentText,
  HiOutlinePlus,
  HiOutlineSearch,
} from "react-icons/hi";
import { AVAILABLE_ATTRIBUTES } from "../../../attributes/constants/available-attribute";

export default function AvailableAttribute({ attributes }) {
  const [attributeTypeFilter, setAttributeTypeFilter] = useState<string>("all");
  const [attributeFilter, setAttributeFilter] = useState("");

  const filteredAvailableAttributes = useMemo(() => {
    return AVAILABLE_ATTRIBUTES.filter((attr) => {
      const matchesSearch = attr.name
        .toLowerCase()
        .includes(attributeFilter.toLowerCase());

      const matchesType =
        attributeTypeFilter === "all" || attr.type === attributeTypeFilter;

      const isInUse = attributes.some((a) => a.id === attr.id);

      return matchesSearch && matchesType && !isInUse;
    });
  }, [attributeFilter, attributeTypeFilter, attributes]);

  return (
    <Card className="p-5 sm:p-6">
      <SectionHeader
        title="Available Attributes"
        subtitle="Browse and assign pre-defined attributes"
        icon={HiOutlinePlus}
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        {/* Search */}
        <Input
          type="text"
          icon={<Search className="w-4 h-4 text-muted-foreground" />}
          placeholder="Search attributes..."
          value={attributeFilter}
          onChange={(e) => setAttributeFilter(e.target.value)}
        />

        {/* Type Filter */}

        <Select
          name="type"
          value={attributeTypeFilter}
          onChange={(e) => setAttributeTypeFilter(e.target.value)}
        >
          <Option value="all">All Types</Option>
          <Option value="text">Text</Option>
          <Option value="number">Number</Option>
          <Option value="select">Select</Option>
          <Option value="boolean">Boolean</Option>
        </Select>
      </div>

      {/* List */}
      <div className="space-y-2 max-h-64 p-5 overflow-y-auto">
        {filteredAvailableAttributes.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <HiOutlineSearch className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No attributes found</p>
          </div>
        ) : (
          filteredAvailableAttributes.map((attr) => (
            <motion.div
              key={attr.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center duration-200 justify-between p-3 bg-muted rounded-lg border border-border hover:bg-primary/10 hover:border-primary transition-all"
            >
              <div className="flex items-center gap-3">
                {/* Icon Box */}
                <div className="p-2 bg-background rounded-lg border border-border">
                  {attr.type === "text" && (
                    <HiOutlineDocumentText className="w-4 h-4 text-muted-foreground" />
                  )}
                  {attr.type === "number" && (
                    <span className="text-sm font-bold text-muted-foreground">
                      #
                    </span>
                  )}
                  {attr.type === "select" && (
                    <HiOutlineChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                  {attr.type === "boolean" && (
                    <Check className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>

                {/* Text */}
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {attr.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {attr.description}
                  </p>
                </div>
              </div>

              {/* Assign Button */}
              <button
                onClick={() =>
                  handleCreateAttribute({
                    name: attr.name,
                    type: attr.type,
                    isRequired: false,
                  })
                }
                className="px-3 cursor-pointer py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Assign
              </button>
            </motion.div>
          ))
        )}
      </div>
    </Card>
  );
}
