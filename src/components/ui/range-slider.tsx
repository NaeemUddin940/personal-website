"use client";
import { useState } from "react";

export const RangeSlider = ({
  min = 0,
  max = 100,
  step = 1,
  initialValue = 50,
  label = "Setting",
  name = "slider",
  helpText,
  variant = "gradient",
  color = "bg-indigo-600",
  gradientFrom = "#6366f1",
  gradientTo = "#a855f7",
  onChange,
}) => {
  const [value, setValue] = useState(initialValue);
  const [isDragging, setIsDragging] = useState(false);

  const getPercentage = () => ((value - min) / (max - min)) * 100;

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setValue(newValue);

    // Ekhane standard event object simulate kora hoyeche
    if (onChange) {
      onChange({
        target: {
          name: name,
          value: newValue,
          type: "range",
        },
      });
    }
  };

  const getTrackStyle = () => {
    const pct = getPercentage();
    if (variant === "solid") {
      const isHex = color.startsWith("#");
      return {
        width: `${pct}%`,
        backgroundColor: isHex ? color : undefined,
        className: isHex ? "" : color,
      };
    } else {
      return {
        width: `${pct}%`,
        background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
      };
    }
  };

  const trackStyle = getTrackStyle();

  const getBadgeClasses = () => {
    const base = "text-lg font-bold font-mono px-3 py-1 rounded-lg ";
    if (variant === "solid" && !color.startsWith("#")) {
      const textColor = color.replace("bg-", "text-");
      const bgColor = color.replace("bg-", "bg-") + "/10";
      return base + `${textColor} ${bgColor}`;
    }
    return (
      base + "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
    );
  };

  return (
    <div className="w-full max-w-md px-2 rounded-2xl">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium uppercase tracking-wider">
          {label}
        </label>
        <span
          className={getBadgeClasses()}
          style={{
            color:
              variant === "solid" && color.startsWith("#") ? color : undefined,
            backgroundColor:
              variant === "solid" && color.startsWith("#")
                ? `${color}15`
                : undefined,
          }}
        >
          {value}
        </span>
      </div>

      <div className="relative h-10 flex items-center">
        <div className="absolute w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-150 ease-out ${trackStyle.className || ""}`}
            style={{
              width: trackStyle.width,
              background: trackStyle.background,
              backgroundColor: trackStyle.backgroundColor,
            }}
          />
        </div>

        <input
          type="range"
          name={name}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer z-20
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:w-6 
            [&::-webkit-slider-thumb]:h-6 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:bg-white 
            [&::-webkit-slider-thumb]:border-4 
            [&::-webkit-slider-thumb]:border-slate-400
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:transition-all
            [&::-webkit-slider-thumb]:duration-200
            [&::-webkit-slider-thumb]:hover:scale-125"
        />

        <div
          className={`absolute bottom-full mb-4 pointer-events-none transition-all duration-300 transform -translate-x-1/2 ${isDragging ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          style={{ left: `${getPercentage()}%` }}
        >
          <div className="bg-slate-800 text-white text-xs py-1.5 px-3 rounded-lg shadow-xl relative">
            {value}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-800" />
          </div>
        </div>
      </div>
      {helpText && <span>{helpText}</span>}
    </div>
  );
};
