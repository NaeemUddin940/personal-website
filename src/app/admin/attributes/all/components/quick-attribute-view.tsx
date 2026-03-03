import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CheckCircle2,
  ExternalLink,
  Info,
  Layout,
  Palette,
  Settings,
  ShieldCheck,
} from "lucide-react";

export default function QuickAttributeView({ formData, onFullEdit }) {
  return (
    <div className="flex flex-col h-full max-h-[80vh]">
      {/* Header section inside content */}
      <DialogHeader className="flex flex-row items-center gap-4 px-6 py-4 border-b">
        <div className="p-2.5 rounded-xl bg-secondary text-primary">
          <Info size={22} />
        </div>
        <div>
          <DialogTitle>Attribute Overview</DialogTitle>
          <DialogDescription>
            Reviewing{" "}
            <span className="text-primary font-bold">{formData.name}</span>{" "}
            configuration
          </DialogDescription>
        </div>
      </DialogHeader>

      {/* Body Section - Scrollable */}
      <div className="flex-1 overflow-y-auto p-5 lg:p-5 space-y-8">
        {/* Identity Banner */}
        <div className="p-4 rounded-xl border bg-muted border-border flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-foreground">
                {formData.name}
              </h3>
              <StatusBadge active={formData.status} />
            </div>
            <p className="text-xs font-mono text-muted-foreground">
              slug: {formData.slug}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              Type
            </span>
            <span className="text-sm font-bold px-3 py-1 rounded-lg bg-foreground text-background">
              {formData.type}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="md:col-span-7 space-y-8">
            <section>
              <SectionTitle icon={Settings} title="Logic & Behavior" />
              <div className="flex shadow-lg bg-card p-3 rounded-2xl border flex-wrap gap-2">
                <BooleanTag label="Required" value={formData.isRequired} />
                <BooleanTag label="Unique" value={formData.isUnique} />
                <BooleanTag label="Filterable" value={formData.isFilterable} />
                <BooleanTag label="Searchable" value={formData.isSearchable} />
                <BooleanTag label="Comparable" value={formData.isComparable} />
                <BooleanTag label="Variation" value={formData.isVariation} />
                <BooleanTag label="Visible" value={formData.isVisible} />
              </div>
            </section>

            {(formData.type === "NUMBER" || formData.type === "TEXT") && (
              <section>
                <SectionTitle icon={ShieldCheck} title="Validation Limits" />
                <div className="grid grid-cols-4 gap-4 p-4 border rounded-xl bg-card shadow-lg border-border">
                  <DataField
                    label="Min"
                    value={formData.minValue || formData.minLength || "—"}
                  />
                  <DataField
                    label="Max"
                    value={formData.maxValue || formData.maxLength || "—"}
                  />
                  <DataField label="Step" value={formData.stepValue} />
                  <DataField label="Precision" value={formData.decimalPlaces} />
                </div>
              </section>
            )}

            {formData.values.length > 2 && (
              <section className="mt-5">
                <SectionTitle icon={Layout} title="UI Configuration" />
                <div className="grid grid-cols-2 gap-y-5 gap-x-6">
                  <DataField label="Field Label" value={formData.label} />
                  <DataField
                    label="Placeholder"
                    value={formData.placeholder}
                    italic
                  />
                  <DataField label="CSS Class" value={formData.cssClass} mono />
                  <DataField label="Sort Order" value={formData.sortOrder} />
                </div>
              </section>
            )}
            <div className="col-span-2">
              <label className="text-[10px] uppercase font-black block mb-1.5 tracking-wider text-muted-foreground">
                Help Text
              </label>
              <p className="text-sm leading-relaxed p-3 rounded-lg border italic bg-muted text-secondary-foreground border-border">
                {formData.helpText || "No description provided."}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-5 space-y-6">
            <section className="h-full flex flex-col">
              <SectionTitle icon={Palette} title="Predefined Options" />
              <div className="border rounded-xl overflow-hidden shadow-sm bg-background border-border">
                <table className="w-full text-left text-sm border-collapse">
                  <thead className="text-[10px] uppercase font-black border-b bg-muted text-muted-foreground border-border">
                    <tr>
                      <th className="px-4 py-3">Value</th>
                      <th className="px-4 py-3">Swatch</th>
                      <th className="px-4 py-3 text-right">Default</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y border-border">
                    {formData.values?.map((item, idx) => (
                      <tr
                        key={idx}
                        className="hover:opacity-80 transition-colors"
                      >
                        <td className="px-4 py-3 font-bold text-foreground">
                          {item.value}
                        </td>
                        <td className="px-4 py-3">
                          {item.swatchType === "COLOR" ? (
                            <div
                              style={{
                                backgroundColor: item.swatchValue,
                              }}
                              className="w-5 h-5 rounded-md border shadow-inner border-border"
                            />
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {item.isDefault && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-md font-black uppercase bg-primary text-primary-foreground">
                              Def
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <MetaTag label="Visibility" value={formData.visibility} />
                <MetaTag label="Group" value={formData.group} />
              </div>

              {formData.values.length < 2 && (
                <section className="mt-5">
                  <SectionTitle icon={Layout} title="UI Configuration" />
                  <div className="grid grid-cols-2 gap-y-5 gap-x-6">
                    <DataField label="Field Label" value={formData.label} />
                    <DataField
                      label="Placeholder"
                      value={formData.placeholder}
                      italic
                    />
                    <DataField
                      label="CSS Class"
                      value={formData.cssClass}
                      mono
                    />
                    <DataField label="Sort Order" value={formData.sortOrder} />
                  </div>
                </section>
              )}
            </section>
          </div>
        </div>
      </div>

      {/* Footer inside content */}
      <DialogFooter className="border-t flex items-center gap-5 px-6 py-4 mt-auto">
        <div className="text-[10px] font-medium text-muted-foreground hidden sm:block">
          Internal System ID: {formData.slug}
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <DialogClose>
            <Button className="rounded-xl">Close</Button>
          </DialogClose>
          <button
            onClick={onFullEdit}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl hover:opacity-90 transition-all font-bold active:scale-95 text-sm bg-primary text-primary-foreground shadow-lg"
          >
            <ExternalLink size={16} />
            Full Editor
          </button>
        </div>
      </DialogFooter>
    </div>
  );
}

const StatusBadge = ({ active }) => (
  <span
    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
      active === "ACTIVE"
        ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
        : "bg-gray-100 text-gray-600 dark:bg-gray-500/10 dark:text-gray-400"
    }`}
  >
    {active}
  </span>
);

const BooleanTag = ({ label, value }) => (
  <div
    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium transition-all ${
      value
        ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-400"
        : "bg-gray-50 border-gray-100 text-gray-400 opacity-60 dark:bg-gray-500/5 dark:border-gray-500/10"
    }`}
  >
    {value ? (
      <CheckCircle2 size={12} />
    ) : (
      <div className="w-3 h-3 border border-dashed rounded-full" />
    )}
    {label}
  </div>
);

const SectionTitle = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
    <Icon size={18} className="text-muted-foreground" />
    <h3 className="font-semibold text-foreground uppercase tracking-wider text-xs">
      {title}
    </h3>
  </div>
);

const DataField = ({ label, value, mono, italic }) => (
  <div>
    <label className="text-[10px] uppercase font-black text-muted-foreground block mb-1 tracking-wider">
      {label}
    </label>
    <p
      className={`text-sm text-foreground ${
        mono ? "font-mono bg-muted px-1.5 rounded" : "font-semibold"
      } ${italic ? "italic" : ""}`}
    >
      {value !== "" && value !== undefined ? value : "—"}
    </p>
  </div>
);

const MetaTag = ({ label, value }) => (
  <div className="p-3 bg-card rounded-lg border border-border shadow-sm flex flex-col gap-1">
    <span className="text-[9px] font-black text-muted-foreground uppercase tracking-tighter">
      {label}
    </span>
    <span className="text-xs font-bold text-foreground">{value}</span>
  </div>
);
