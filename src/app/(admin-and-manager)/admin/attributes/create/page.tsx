"use client";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  Eye,
  FileText,
  Filter,
  GripVertical,
  Hash,
  Image as ImageIcon,
  Info,
  Layers,
  Palette,
  Plus,
  Save,
  Search,
  Settings2,
  ToggleLeft,
  Trash2,
  Type,
} from "lucide-react";
import { useEffect, useState } from "react";

const ATTRIBUTE_TYPES = [
  {
    id: "TEXT",
    label: "Text",
    icon: Type,
    color: "text-blue-500",
  },
  {
    id: "NUMBER",
    label: "Number",
    icon: Hash,
    color: "text-orange-500",
  },
  {
    id: "BOOLEAN",
    label: "Boolean",
    icon: ToggleLeft,
    color: "text-emerald-500",
  },
  {
    id: "SELECT",
    label: "Select",
    icon: Layers,
    color: "text-purple-500",
  },
  {
    id: "MULTISELECT",
    label: "Multi-Select",
    icon: Layers,
    color: "text-indigo-500",
  },
  {
    id: "COLOR",
    label: "Color",
    icon: Palette,
    color: "text-pink-500",
  },
  {
    id: "IMAGE",
    label: "Image Upload",
    icon: ImageIcon,
    color: "text-cyan-500",
  },
  {
    id: "FILE",
    label: "File Attachment",
    icon: FileText,
    color: "text-amber-500",
  },
  {
    id: "DATE",
    label: "Date Picker",
    icon: Calendar,
    color: "text-rose-500",
  },
];

const SWATCH_TYPES = [
  { id: "TEXT", label: "Text Label" },
  { id: "COLOR", label: "Color Swatch" },
  { id: "IMAGE", label: "Image Swatch" },
];

const App = () => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [errors, setErrors] = useState({});
  const [savedData, setSavedData] = useState(null); // To display data after save

  const [attribute, setAttribute] = useState({
    name: "",
    slug: "",
    type: "TEXT",
    isFilterable: true,
    isSearchable: false,
    isRequired: false,
    isVisible: true,
    isVariation: false,
    sortOrder: 0,
    values: [],
  });

  // Slug generator
  useEffect(() => {
    if (attribute.name) {
      const generatedSlug = attribute.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setAttribute((prev) => ({ ...prev, slug: generatedSlug }));
      if (errors.name)
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.name;
          return newErrors;
        });
    }
  }, [attribute.name]);

  const handleValueAdd = () => {
    const newValue = {
      id: Math.random().toString(36).substr(2, 9),
      value: "",
      slug: "",
      swatchType: "TEXT",
      swatchValue: "",
      sortOrder: attribute.values.length,
    };
    setAttribute((prev) => ({ ...prev, values: [...prev.values, newValue] }));
    if (errors.values)
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.values;
        return newErrors;
      });
  };

  const handleValueChange = (id, field, val) => {
    setAttribute((prev) => {
      const updatedValues = prev.values.map((v) => {
        if (v.id === id) {
          const updated = { ...v, [field]: val };
          if (field === "value") {
            updated.slug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            if (errors[`value_${id}`]) {
              setErrors((prevErr) => {
                const newE = { ...prevErr };
                delete newE[`value_${id}`];
                return newE;
              });
            }
          }
          return updated;
        }
        return v;
      });
      return { ...prev, values: updatedValues };
    });
  };

  const handleValueRemove = (id) => {
    setAttribute((prev) => ({
      ...prev,
      values: prev.values.filter((v) => v.id !== id),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!attribute.name.trim()) newErrors.name = "Attribute name is required";

    // Values validation for specific types
    if (
      ["SELECT", "MULTISELECT", "COLOR"].includes(attribute.type) &&
      attribute.values.length === 0
    ) {
      newErrors.values =
        "At least one value is required for this attribute type";
    }

    attribute.values.forEach((v) => {
      if (!v.value.trim()) {
        newErrors[`value_${v.id}`] = true;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(null);
    setSavedData(null);

    if (!validateForm()) {
      setNotification({
        success: false,
        action: "VALIDATION_ERROR",
        message: "❌ Validation failed. Please check required fields.",
        status: 422,
      });
      return;
    }

    setLoading(true);

    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      const finalPayload = {
        ...attribute,
        updatedAt: new Date().toISOString(),
      };

      console.log("Saving Attribute Data:", finalPayload);
      setSavedData(finalPayload);

      setNotification({
        success: true,
        action: "CREATE_ATTRIBUTE",
        message:
          "✅ Attribute saved successfully! Check console for full payload.",
        status: 201,
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button className="flex items-center text-muted-foreground hover:text-primary transition-colors mb-2 text-sm font-medium">
            <ChevronLeft size={16} className="mr-1" /> Back to Attributes
          </button>
          <h1 className="text-3xl font-bold tracking-tight">
            Create New Attribute
          </h1>
          <p className="text-muted-foreground mt-1">
            Configure your product properties with full validation.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="px-4 py-2 rounded-md border border-border bg-card hover:bg-accent transition-all text-sm font-medium"
          >
            Discard
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-all text-sm font-semibold flex items-center gap-2 shadow-sm disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {loading ? "Saving..." : "Save Attribute"}
          </button>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div
          className={`max-w-6xl mx-auto mb-6 p-4 rounded-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2 ${notification.success ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-600" : "bg-destructive/10 border border-destructive/20 text-destructive"}`}
        >
          <div className="flex items-center gap-3">
            {notification.success ? (
              <CheckCircle2 size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span className="font-medium text-sm">{notification.message}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="opacity-50 hover:opacity-100"
          >
            <Plus className="rotate-45" size={20} />
          </button>
        </div>
      )}

      {/* Saved Data Result (JSON Preview) */}
      {savedData && (
        <div className="max-w-6xl mx-auto mb-8 p-6 bg-muted/30 border border-primary/20 rounded-xl animate-in zoom-in-95">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest">
              Saved Payload Data
            </h3>
            <button
              onClick={() => setSavedData(null)}
              className="text-xs text-muted-foreground hover:text-foreground underline"
            >
              Clear Preview
            </button>
          </div>
          <pre className="text-[12px] font-mono overflow-x-auto bg-card p-4 rounded-lg border border-border shadow-inner max-h-64">
            {JSON.stringify(savedData, null, 2)}
          </pre>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        {/* Left Side: Forms */}
        <div className="lg:col-span-8 space-y-6">
          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-foreground">
              <Info size={18} className="text-primary" /> Basic Configuration
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-1">
                  Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Fabric Material"
                  className={`w-full bg-input border rounded-lg px-4 py-2.5 outline-none transition-all ${errors.name ? "border-destructive ring-2 ring-destructive/10" : "border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"}`}
                  value={attribute.name}
                  onChange={(e) =>
                    setAttribute({ ...attribute, name: e.target.value })
                  }
                />
                {errors.name && (
                  <p className="text-[10px] text-destructive font-bold uppercase tracking-tighter">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground">
                  Internal Slug
                </label>
                <input
                  type="text"
                  className="w-full bg-muted/40 border border-border rounded-lg px-4 py-2.5 text-muted-foreground font-mono text-xs cursor-not-allowed"
                  value={attribute.slug}
                  readOnly
                />
              </div>

              <div className="md:col-span-2 space-y-4 pt-2">
                <label className="text-sm font-semibold">
                  Data Input Type <span className="text-destructive">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {ATTRIBUTE_TYPES.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() =>
                          setAttribute({ ...attribute, type: type.id })
                        }
                        className={`flex  cursor-pointer items-center gap-3 p-3 rounded-lg border text-left transition-all group ${
                          attribute.type === type.id
                            ? "border-primary bg-primary/5 ring-1 ring-primary shadow-sm"
                            : "border-border bg-background hover:bg-accent/50"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-md ${attribute.type === type.id ? `bg-muted ${type.color} ` : "bg-muted group-hover:bg-muted-foreground/10"}`}
                        >
                          <Icon size={16} />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-tight">
                          {type.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Layers size={18} className="text-primary" /> Attribute Values
                  {["SELECT", "MULTISELECT", "COLOR"].includes(
                    attribute.type,
                  ) && <span className="text-destructive">*</span>}
                </h2>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Define options available for this attribute.
                </p>
              </div>
              <button
                type="button"
                onClick={handleValueAdd}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-accent transition-colors shadow-sm"
              >
                <Plus size={14} /> Add New Row
              </button>
            </div>

            <div className="space-y-3">
              {errors.values && (
                <div className="p-3 mb-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-xs font-bold flex items-center gap-2 animate-pulse">
                  <AlertCircle size={14} /> {errors.values}
                </div>
              )}

              {attribute.values.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-border rounded-xl bg-muted/5 group">
                  <Layers
                    className="mx-auto text-muted-foreground/30 mb-2 group-hover:text-primary/30 transition-colors"
                    size={32}
                  />
                  <p className="text-muted-foreground text-sm">
                    No values defined for this attribute.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {attribute.values.map((v) => (
                    <div
                      key={v.id}
                      className="flex items-center gap-3 bg-card border border-border p-3 rounded-xl hover:shadow-md hover:border-primary/30 transition-all group"
                    >
                      <div className="text-muted-foreground/30 cursor-grab px-1 group-hover:text-primary/50">
                        <GripVertical size={16} />
                      </div>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        <div className="md:col-span-4">
                          <input
                            type={
                              attribute.type === "NUMBER" ? "number" : "text"
                            }
                            placeholder="Value Name (e.g. XL)"
                            className={`w-full bg-input border rounded-lg px-3 py-2 text-sm font-medium outline-none transition-all ${errors[`value_${v.id}`] ? "border-destructive ring-1 ring-destructive/20" : "border-border focus:border-primary"}`}
                            value={v.value}
                            onChange={(e) =>
                              handleValueChange(v.id, "value", e.target.value)
                            }
                          />
                        </div>
                        <div className="md:col-span-3">
                          <select
                            className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm outline-none cursor-pointer focus:border-primary transition-all"
                            value={v.swatchType}
                            onChange={(e) =>
                              handleValueChange(
                                v.id,
                                "swatchType",
                                e.target.value,
                              )
                            }
                          >
                            {SWATCH_TYPES.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="md:col-span-5 flex items-center gap-2">
                          {v.swatchType === "COLOR" ? (
                            <div className="flex items-center gap-2 flex-1">
                              <input
                                type="color"
                                className="w-12 h-9 rounded-lg border border-border cursor-pointer p-0 overflow-hidden"
                                value={v.swatchValue || "#6366f1"}
                                onChange={(e) =>
                                  handleValueChange(
                                    v.id,
                                    "swatchValue",
                                    e.target.value,
                                  )
                                }
                              />
                              <input
                                type="text"
                                className="flex-1 bg-input border border-border rounded-lg px-3 py-2 text-xs font-mono uppercase"
                                value={v.swatchValue}
                                onChange={(e) =>
                                  handleValueChange(
                                    v.id,
                                    "swatchValue",
                                    e.target.value,
                                  )
                                }
                                placeholder="#HEX"
                              />
                            </div>
                          ) : (
                            <input
                              type="text"
                              placeholder={
                                v.swatchType === "IMAGE"
                                  ? "Image URL"
                                  : "Optional Extra Info"
                              }
                              className="flex-1 bg-input border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-all"
                              value={v.swatchValue}
                              onChange={(e) =>
                                handleValueChange(
                                  v.id,
                                  "swatchValue",
                                  e.target.value,
                                )
                              }
                            />
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleValueRemove(v.id)}
                        className="p-2 text-muted-foreground/50 hover:text-destructive hover:bg-destructive/5 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Side: Flags */}
        <div className="lg:col-span-4 space-y-6">
          <section className="bg-card border border-border rounded-xl p-6 shadow-sm sticky top-8">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Settings2 size={18} className="text-primary" /> Logic Controls
            </h2>

            <div className="space-y-3">
              {[
                {
                  id: "isVariation",
                  label: "Use for Variations",
                  icon: Layers,
                },
                {
                  id: "isFilterable",
                  label: "Enable in Sidebar Filters",
                  icon: Filter,
                },
                {
                  id: "isSearchable",
                  label: "Allow Value Search",
                  icon: Search,
                },
                {
                  id: "isRequired",
                  label: "Mandatory Selection",
                  icon: AlertCircle,
                },
                { id: "isVisible", label: "Publicly Visible", icon: Eye },
              ].map((flag) => (
                <div
                  key={flag.id}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all ${attribute[flag.id] ? "bg-primary/5 border-primary/20 border-2" : "bg-accent border-transparent hover:border-border border-2"}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1.5 rounded-md ${attribute[flag.id] ? "text-primary" : "text-muted-foreground"}`}
                    >
                      <flag.icon size={16} />
                    </div>
                    <span className="text-xs font-bold text-foreground">
                      {flag.label}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setAttribute({
                        ...attribute,
                        [flag.id]: !attribute[flag.id],
                      })
                    }
                    className={`w-10 h-5 rounded-full relative transition-all duration-300 ${attribute[flag.id] ? "bg-primary" : "bg-muted"}`}
                  >
                    <div
                      className={`absolute top-0.5 cursor-pointer left-0.5 bg-white w-4 h-4 rounded-full shadow-sm transition-transform duration-300 ${attribute[flag.id] ? "translate-x-5" : ""}`}
                    />
                  </button>
                </div>
              ))}

              <div className="pt-6 mt-4 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    Display Priority
                  </label>
                  <input
                    type="number"
                    className="w-16 bg-muted px-2 py-1 rounded text-primary text-xs font-mono outline-none border border-transparent focus:border-primary/50"
                    value={attribute.sortOrder}
                    onChange={(e) =>
                      setAttribute({
                        ...attribute,
                        sortOrder: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  value={attribute.sortOrder}
                  onChange={(e) =>
                    setAttribute({
                      ...attribute,
                      sortOrder: parseInt(e.target.value),
                    })
                  }
                />
                <p className="text-[9px] text-muted-foreground mt-2 italic text-center">
                  Note: Duplicate values are allowed but unique ones are
                  recommended for consistent sorting.
                </p>
              </div>
            </div>
          </section>
        </div>
      </form>
    </div>
  );
};

export default App;
