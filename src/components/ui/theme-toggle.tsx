"use client";
import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Option, Select } from "./select";
import { useTheme } from "./theme-provider";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Hydration mismatch fix
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-10 w-10" />;

  return (
    <div>
      <Select
        value={theme}
        position="bottom-center"
        onChange={setTheme}
        showChevron={false}
      >
        <Option value="light">
          <Sun size={18} className="text-amber-500" />
          <span>Light</span>
        </Option>
        <Option value="dark">
          <Moon size={18} className="text-indigo-400" />
          <span>Dark</span>
        </Option>
        <Option value="system">
          <Monitor size={18} className="text-emerald-500" />
          <span>System</span>
        </Option>
      </Select>
    </div>
  );
};
