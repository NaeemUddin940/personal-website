"use client";
import {
  CheckCircle2,
  ChevronLeft,
  Globe,
  ImageIcon,
  Info,
  Layers,
  LayoutGrid,
  Link as LinkIcon,
  Plus,
  Save,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Category Create - All fields restored (Description, Media, Full SEO).
 * Plus Inline Attribute Creation logic integrated.
 */

const CategoryCreate = () => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showAttrModal, setShowAttrModal] = useState(false);

  // Category State - Full Model
  const [category, setCategory] = useState({
    name: "",
    slug: "",
    description: "",
    parentId: "",
    image: "",
    sortOrder: 0,
    seo: {
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
    },
    attributes: [],
  });

  // Mock Global Attributes
  const [availableAttributes, setAvailableAttributes] = useState([
    { id: "a1", name: "Color", type: "COLOR" },
    { id: "a2", name: "Size", type: "SELECT" },
    { id: "a3", name: "Material", type: "TEXT" },
  ]);

  // New Attribute State
  const [newAttr, setNewAttr] = useState({ name: "", type: "TEXT" });

  // Auto-slug generator
  useEffect(() => {
    if (category.name) {
      const generatedSlug = category.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setCategory((prev) => ({ ...prev, slug: generatedSlug }));
    }
  }, [category.name]);

  const handleAttributeToggle = (attrId) => {
    setCategory((prev) => {
      const exists = prev.attributes.find((a) => a.attributeId === attrId);
      if (exists) {
        return {
          ...prev,
          attributes: prev.attributes.filter((a) => a.attributeId !== attrId),
        };
      } else {
        return {
          ...prev,
          attributes: [
            ...prev.attributes,
            { attributeId: attrId, isRequired: false },
          ],
        };
      }
    });
  };

  const createNewAttribute = () => {
    if (!newAttr.name) return;
    const id = `new-${Date.now()}`;
    const attrObj = { id, name: newAttr.name, type: newAttr.type };
    setAvailableAttributes((prev) => [...prev, attrObj]);
    setCategory((prev) => ({
      ...prev,
      attributes: [...prev.attributes, { attributeId: id, isRequired: false }],
    }));
    setNewAttr({ name: "", type: "TEXT" });
    setShowAttrModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setNotification({
        success: true,
        message: "✅ Category successfully save kora hoyeche!",
      });
      setTimeout(() => setNotification(null), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] p-4 md:p-8 font-sans">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button className="flex items-center text-slate-500 hover:text-blue-600 transition-colors mb-2 text-sm font-semibold">
            <ChevronLeft size={16} className="mr-1" /> Back to Categories
          </button>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Create New Category
          </h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">
            Sothikvabe category ebong attribute set korun.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all text-sm font-bold">
            Discard
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-200 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save size={18} />
            )}
            Save Changes
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* General Information */}
          <section className="bg-white border border-slate-200 rounded-4xl p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
              <Info size={20} className="text-blue-500" /> General Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Category Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mens Fashion"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-medium text-lg"
                  value={category.name}
                  onChange={(e) =>
                    setCategory({ ...category, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Slug (URL)
                </label>
                <div className="relative">
                  <LinkIcon
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm font-mono text-slate-500 italic"
                    value={category.slug}
                    readOnly
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Parent Category
                </label>
                <select
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-blue-500 cursor-pointer"
                  value={category.parentId}
                  onChange={(e) =>
                    setCategory({ ...category, parentId: e.target.value })
                  }
                >
                  <option value="">Root Category (None)</option>
                  <option value="c1">Electronics</option>
                  <option value="c2">Fashion</option>
                  <option value="c3">Groceries</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about this category..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all resize-none font-medium"
                  value={category.description}
                  onChange={(e) =>
                    setCategory({ ...category, description: e.target.value })
                  }
                />
              </div>
            </div>
          </section>

          {/* Media Section */}
          <section className="bg-white border border-slate-200 rounded-4xl p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
              <ImageIcon size={20} className="text-blue-500" /> Category Media
            </h2>
            <div className="border-2 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 hover:border-blue-300 transition-all cursor-pointer group">
              <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform shadow-inner">
                <ImageIcon size={32} />
              </div>
              <p className="text-sm font-bold text-slate-700">
                Drop your image here or click to browse
              </p>
              <p className="text-xs text-slate-400 mt-2">
                Recommended: 1200x1200px (Max 2MB)
              </p>
            </div>
          </section>

          {/* SEO Details */}
          <section className="bg-white border border-slate-200 rounded-4xl p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
              <Globe size={20} className="text-blue-500" /> Search Engine
              Optimization
            </h2>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Meta Title
                </label>
                <input
                  type="text"
                  placeholder="Primary SEO title..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 font-medium"
                  value={category.seo.metaTitle}
                  onChange={(e) =>
                    setCategory({
                      ...category,
                      seo: { ...category.seo, metaTitle: e.target.value },
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                    Keywords
                  </label>
                  <input
                    type="text"
                    placeholder="fashion, clothes, summer"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 font-medium"
                    value={category.seo.metaKeywords}
                    onChange={(e) =>
                      setCategory({
                        ...category,
                        seo: { ...category.seo, metaKeywords: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                    Meta Description
                  </label>
                  <input
                    type="text"
                    placeholder="Short SEO summary..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 font-medium"
                    value={category.seo.metaDescription}
                    onChange={(e) =>
                      setCategory({
                        ...category,
                        seo: {
                          ...category.seo,
                          metaDescription: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Attributes Selection & Creation */}
          <section className="bg-white border border-slate-200 rounded-4xl p-7 shadow-sm sticky top-8">
            <h2 className="text-xl font-bold mb-2 text-slate-800 flex items-center gap-2">
              <Layers size={20} className="text-blue-500" /> Attributes
            </h2>
            <p className="text-[11px] text-slate-400 mb-6 font-bold uppercase tracking-wider">
              Product values inherit from here
            </p>

            <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {availableAttributes.map((attr) => {
                const isSelected = category.attributes.some(
                  (a) => a.attributeId === attr.id,
                );
                return (
                  <div
                    key={attr.id}
                    onClick={() => handleAttributeToggle(attr.id)}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer group ${isSelected ? "border-blue-500 bg-blue-50/30 ring-4 ring-blue-500/5" : "border-slate-50 hover:border-slate-200 bg-slate-50/50"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${isSelected ? "bg-blue-600 text-white" : "bg-white text-slate-400 group-hover:text-slate-600"}`}
                      >
                        <Settings size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-700 leading-tight">
                          {attr.name}
                        </p>
                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-tighter">
                          {attr.type}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <CheckCircle2
                        size={20}
                        className="text-blue-600 fill-blue-50"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Inline Creation */}
            {!showAttrModal ? (
              <button
                onClick={() => setShowAttrModal(true)}
                className="w-full py-4 border-2 border-dashed border-slate-200 rounded-[1.25rem] text-slate-400 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <Plus size={16} /> New Attribute
              </button>
            ) : (
              <div className="p-5 bg-slate-900 rounded-[1.5rem] border border-slate-800 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase">
                    Attr Name
                  </label>
                  <input
                    autoFocus
                    placeholder="e.g. RAM Size"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs font-bold text-white outline-none focus:border-blue-500 transition-colors"
                    value={newAttr.name}
                    onChange={(e) =>
                      setNewAttr({ ...newAttr, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase">
                    Input Type
                  </label>
                  <select
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs font-bold text-white outline-none cursor-pointer"
                    value={newAttr.type}
                    onChange={(e) =>
                      setNewAttr({ ...newAttr, type: e.target.value })
                    }
                  >
                    <option value="TEXT">Short Text</option>
                    <option value="SELECT">Dropdown List</option>
                    <option value="COLOR">Color Swatch</option>
                    <option value="NUMBER">Numeric Value</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={createNewAttribute}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl text-[11px] font-black uppercase hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => setShowAttrModal(false)}
                    className="px-4 bg-slate-800 border border-slate-700 py-3 rounded-xl text-[11px] font-black text-slate-400 hover:text-white uppercase transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Sorting Info */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                Sort Order
              </label>
              <div className="mt-2 flex items-center gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <LayoutGrid size={18} className="text-slate-400" />
                <input
                  type="number"
                  className="bg-transparent border-none outline-none font-bold text-slate-700 w-full"
                  value={category.sortOrder}
                  onChange={(e) =>
                    setCategory({
                      ...category,
                      sortOrder: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer Toast Notification */}
      {notification && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 fade-in duration-500">
          <div className="bg-white border border-slate-200 px-8 py-5 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center gap-4 border-l-4 border-l-blue-600">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <p className="text-sm font-black text-slate-900 uppercase tracking-tight">
                System Message
              </p>
              <p className="text-xs font-medium text-slate-500">
                {notification.message}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return <CategoryCreate />;
}
