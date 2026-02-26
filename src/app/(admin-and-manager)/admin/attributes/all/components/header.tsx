import { Plus } from "lucide-react";

export default function Header() {
  return (
    <div className="flex shadow-md border border-border p-3 rounded-xl  justify-between items-center">
      <div>
        <h1 className="text-4xl font-black tracking-tight text-foreground uppercase">
          Attribute Engine
        </h1>
        <p className="text-muted-foreground font-medium mt-1">
          Configure product taxonomies, variations and data types.
        </p>
      </div>
      <button className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-transform shadow-xl shadow-primary/20 active:scale-95">
        <Plus size={18} /> New Attribute
      </button>
    </div>
  );
}
