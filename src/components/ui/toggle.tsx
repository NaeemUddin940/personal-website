"use client";

import { useRef } from "react";

// --- Sub-Component: BubbleToggle ---
// Separated so it remains reusable
export const Toggle = ({ checked, onChange, name, size = "md" }) => {
  const containerRef = useRef(null);

  const sizeClasses = {
    sm: { container: "w-12 h-6", knob: "w-4 h-4", translate: "translate-x-6" },
    md: { container: "w-16 h-8", knob: "w-6 h-6", translate: "translate-x-8" },
    lg: {
      container: "w-20 h-10",
      knob: "w-8 h-8",
      translate: "translate-x-10",
    },
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  const handleToggle = (e) => {
    e.stopPropagation(); // Parent onClick handle korle double trigger thakate
    if (onChange) onChange(!checked);
    createBubbles(!checked);
  };

  const createBubbles = (isMovingRight) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    for (let i = 0; i < 8; i++) {
      const bubble = document.createElement("div");
      const bubbleSize = Math.random() * (size === "lg" ? 12 : 8) + 4;
      Object.assign(bubble.style, {
        position: "absolute",
        width: `${bubbleSize}px`,
        height: `${bubbleSize}px`,
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: "10",
        left: isMovingRight ? "70%" : "30%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        opacity: "1",
      });
      container.appendChild(bubble);
      requestAnimationFrame(() => {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 40 + 20;
        bubble.style.transform = `translate(calc(-50% + ${Math.cos(angle) * velocity}px), calc(-50% + ${Math.sin(angle) * velocity}px)) scale(0)`;
        bubble.style.opacity = "0";
      });
      setTimeout(() => bubble.remove(), 700);
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleToggle}
      className={`relative ${currentSize.container} flex items-center rounded-full cursor-pointer transition-colors duration-300 p-1 overflow-hidden
        ${checked ? "bg-primary" : "bg-muted border border-border"}
      `}
    >
      <input
        type="checkbox"
        name={name}
        checked={checked}
        readOnly
        className="hidden"
      />
      <div
        className={`relative z-20 ${currentSize.knob} bg-primary-foreground rounded-full shadow-md transform transition-transform duration-300 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]
          ${checked ? currentSize.translate : "translate-x-0"}
        `}
      />
      {checked && (
        <div className="absolute inset-0 bg-white/10 animate-pulse" />
      )}
    </div>
  );
};
