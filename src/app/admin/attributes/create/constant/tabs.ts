import { NotebookText, ScrollText, Tv, Vegan } from "lucide-react";

export const tabs = [
  {
    id: "basic",
    label: "Basic Information",
    icon: NotebookText,
  },
  {
    id: "display",
    label: "Display Settings",
    icon: Tv,
  },
  {
    id: "validation",
    label: "Validation",
    icon: Vegan,
  },
  { id: "values", label: "Values", icon: ScrollText },
];
