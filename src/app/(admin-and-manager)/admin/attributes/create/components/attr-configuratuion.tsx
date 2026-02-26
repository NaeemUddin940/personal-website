"use client";
import { Toggle } from "@/components/ui/toggle";
import { TOGGLE_FLAG } from "@/constant/attribute/attribute-constant";
import { motion } from "framer-motion";

export default function AttrConfiguratuion({
  formData,
  onChange,
}: {
  formData: any;
  onChange: (value: string) => void;
}) {
  const handleToggle = (id: string) => {
    const currentValue = !!formData[id];
    onChange(id, !currentValue);
  };
  return (
    <div className="max-w-md mx-auto space-y-4">
      <label className="block text-lg font-black text-muted-foreground uppercase tracking-widest mb-4">
        Attribute Behavior
      </label>

      {TOGGLE_FLAG.map((flag) => {
        const isItemChecked = !!formData[flag.id];

        return (
          <motion.div
            key={flag.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleToggle(flag.id)}
            className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer relative overflow-hidden 
                ${isItemChecked ? "bg-primary/5 border-primary shadow-sm" : "bg-secondary border-transparent hover:border-border"}
            `}
          >
            <div className="flex items-center gap-3 relative z-10">
              <div
                className={`p-1.5 rounded-lg transition-colors ${isItemChecked ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                <flag.icon size={14} className="w-3.5 h-3.5" />
              </div>
              <span
                className={`text-xs font-bold ${isItemChecked ? "text-foreground" : "text-muted-foreground"}`}
              >
                {flag.label}
              </span>
            </div>

            <Toggle
              size="sm"
              name={flag.id}
              checked={isItemChecked}
              onChange={() => handleToggle(flag.id)}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
