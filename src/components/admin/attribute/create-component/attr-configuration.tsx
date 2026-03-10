"use client";
import { Toggle } from "@/components/ui/toggle";
import { TOGGLE_FLAG } from "@/constant/attribute/attribute-constant";
import { FullAttributeInput } from "@/validation/attribute-validation";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

export default function AttrConfiguration() {
  const { watch, setValue, control } = useFormContext<FullAttributeInput>();
  const isGlobal = watch("isGlobal");

  // Safety: Global on thakle isRequired jeno backend-e false thake
  useEffect(() => {
    if (isGlobal) {
      setValue("isRequired", false, { shouldValidate: true });
    }
  }, [isGlobal, setValue]);

  return (
    <div className="max-w-md mx-auto space-y-4">
      <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">
        Attribute Behavior
      </label>

      {TOGGLE_FLAG.map((flag) => (
        <Controller
          key={flag.id}
          name={flag.id as any}
          control={control}
          render={({ field }) => {
            // সরাসরি field.value থেকে চেকড স্টেট নিন
            const isItemChecked = !!field.value;

            return (
              <motion.div
                whileTap={{ scale: 0.98 }}
                onClick={() => field.onChange(!isItemChecked)} // কার্ডে ক্লিক করলে ভ্যালু উল্টে যাবে
                className={`flex items-center justify-between p-3 rounded-2xl border transition-all duration-200 cursor-pointer relative overflow-hidden 
                    ${
                      isItemChecked
                        ? "bg-primary/10 border-primary/40 shadow-sm"
                        : "bg-secondary/40 border-transparent hover:border-border"
                    }
                `}
              >
                <div className="flex items-center gap-3 relative z-10">
                  <div
                    className={`p-2 rounded-xl transition-all ${
                      isItemChecked
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                        : "bg-background text-muted-foreground"
                    }`}
                  >
                    <flag.icon size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={`text-[13px] font-bold ${
                        isItemChecked
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {flag.label}
                    </span>
                  </div>
                </div>

                <Toggle
                  size="sm"
                  checked={isItemChecked}
                  onChange={(val) => field.onChange(val)}
                  className={
                    isItemChecked ? "bg-primary text-primary-foreground" : ""
                  }
                />
              </motion.div>
            );
          }}
        />
      ))}
    </div>
  );
}
