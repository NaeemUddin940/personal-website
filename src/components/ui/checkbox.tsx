"use client";
import { motion } from "framer-motion";
import { useId, useState } from "react";

export const Checkbox = ({
  checked: controlledChecked,
  onChange,
  name,
  label,
  activeColor = "#506eec",
  value = "on",
  id,
}) => {
  const [internalChecked, setInternalChecked] = useState(false);
  const isChecked =
    controlledChecked !== undefined ? controlledChecked : internalChecked;
  const reactId = useId();
  const checkboxId = id || `cbx-${name || reactId}`;

  const handleChange = (e) => {
    if (controlledChecked === undefined) {
      setInternalChecked(e.target.checked);
    }
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="flex items-center group cursor-pointer select-none">
      <input
        type="checkbox"
        id={checkboxId}
        name={name}
        checked={isChecked}
        onChange={handleChange}
        value={value}
        className="sr-only"
      />

      <label
        htmlFor={checkboxId}
        className="flex items-center cursor-pointer relative"
      >
        {/* Checkbox Container */}
        <motion.div
          initial={false}
          animate={{
            backgroundColor: isChecked ? activeColor : "rgba(255, 255, 255, 0)",
            borderColor: isChecked ? activeColor : "#9098a9",
          }}
          transition={{ duration: 0.2 }}
          className="w-4.5 h-4.5 rounded-[3px] border-[1.5px] flex items-center justify-center relative group-hover:border-[#506eec]"
          style={{
            boxSizing: "border-box",
          }}
        >
          {/* 1. Circle Spread Effect (The Wave) */}
          <motion.span
            initial={false}
            animate={
              isChecked
                ? {
                    scale: [0, 3.5],
                    opacity: [1, 0],
                  }
                : { scale: 0, opacity: 0 }
            }
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className="absolute w-full h-full rounded-full z-0 pointer-events-none"
            style={{ backgroundColor: activeColor }}
          />

          {/* 2. Scale Pop Animation for the Box */}
          <motion.div
            animate={isChecked ? { scale: [1, 0.85, 1] } : { scale: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
          >
            {/* 3. SVG Check Icon */}
            <svg viewBox="0 0 12 10" className="w-2.5 h-2 z-10">
              <motion.polyline
                points="1.5 6 4.5 9 10.5 1"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{
                  pathLength: isChecked ? 1 : 0,
                  opacity: isChecked ? 1 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: isChecked ? 0.1 : 0,
                }}
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* Label Text */}
        <span className="ml-3 text-slate-700 font-medium transition-colors group-hover:text-slate-900">
          {label}
        </span>
      </label>
    </div>
  );
};
