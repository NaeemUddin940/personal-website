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
        iconOnly
        onChange={setTheme}
        showChevron={false}
      >
        <Option
          icon={<Sun size={18} className="text-amber-500" />}
          value="light"
        >
          <span>Light</span>
        </Option>
        <Option
          icon={<Moon size={18} className="text-indigo-400" />}
          value="dark"
        >
          <span>Dark</span>
        </Option>
        <Option
          icon={<Monitor size={18} className="text-emerald-500" />}
          value="system"
        >
          <span>System</span>
        </Option>
      </Select>
    </div>
  );
};
