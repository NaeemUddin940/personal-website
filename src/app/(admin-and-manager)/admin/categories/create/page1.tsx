"use client";
import { CategoryAttribute } from "@/@types/category-form.";
import { CardHeader } from "@/components/ui/card";
import { clsx, type ClassValue } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Search } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import {
  HiOutlineChevronDown,
  HiOutlineCog,
  HiOutlineDocumentText,
  HiOutlineDotsVertical,
  HiOutlineFolder,
  HiOutlineInformationCircle,
  HiOutlinePhotograph,
  HiOutlinePlus,
  HiOutlineSave,
  HiOutlineSearch,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineTag,
  HiOutlineTrash,
} from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import CategoryHeader from "./category-header";
import CategoryBasicInfo from "./components/category-basic-info";

// --- Mock Data ---
const AVAILABLE_ATTRIBUTES: AvailableAttribute[] = [
  {
    id: "brand",
    name: "Brand",
    type: "text",
    description: "Product brand name",
  },
  {
    id: "color",
    name: "Color",
    type: "select",
    options: ["Red", "Blue", "Green", "Black", "White"],
    description: "Product color",
  },
  {
    id: "size",
    name: "Size",
    type: "select",
    options: ["XS", "S", "M", "L", "XL", "XXL"],
    description: "Product size",
  },
  {
    id: "weight",
    name: "Weight",
    type: "number",
    description: "Product weight in kg",
  },
  {
    id: "material",
    name: "Material",
    type: "text",
    description: "Product material composition",
  },
  {
    id: "warranty",
    name: "Warranty",
    type: "select",
    options: ["No Warranty", "6 Months", "1 Year", "2 Years", "Lifetime"],
    description: "Warranty period",
  },
  {
    id: "country",
    name: "Country of Origin",
    type: "text",
    description: "Manufacturing country",
  },
  {
    id: "rating",
    name: "Rating",
    type: "number",
    description: "Product rating (1-5)",
  },
  {
    id: "inStock",
    name: "In Stock",
    type: "boolean",
    description: "Availability status",
  },
  { id: "sku", name: "SKU", type: "text", description: "Stock keeping unit" },
];

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const inputClass =
  "w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 text-sm";

const textareaClass =
  "w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 resize-none text-sm";

const Card = ({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
    className={cn(
      "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden",
      className,
    )}
  >
    {children}
  </motion.div>
);

const RequiredToggle = ({
  isRequired,
  onToggle,
}: {
  isRequired: boolean;
  onToggle: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "relative flex items-center gap-2.5 px-3 py-2 rounded-lg border-2 transition-all duration-300 select-none group/toggle",
        isRequired
          ? "bg-violet-50 border-violet-300 hover:border-violet-400"
          : "bg-gray-50 border-gray-200 hover:border-gray-300",
      )}
    >
      <div
        className={cn(
          "relative w-11 h-6 rounded-full transition-colors duration-300 shrink-0",
          isRequired ? "bg-violet-600" : "bg-gray-300",
        )}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
          className={cn(
            "absolute top-[3px] w-[18px] h-[18px] rounded-full shadow-sm flex items-center justify-center bg-white",
            isRequired ? "left-[23px]" : "left-[3px]",
          )}
        >
          <AnimatePresence mode="wait">
            {isRequired ? (
              <motion.div
                key="check"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                <HiOutlineShieldCheck className="w-3 h-3 text-violet-600" />
              </motion.div>
            ) : (
              <motion.div
                key="x"
                initial={{ scale: 0, rotate: 90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -90 }}
                transition={{ duration: 0.15 }}
              >
                <span className="w-3 h-3 flex items-center justify-center text-gray-400 text-xs">
                  ○
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <div className="flex items-center gap-1.5">
        <AnimatePresence mode="wait">
          <motion.span
            key={isRequired ? "req" : "opt"}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "text-xs font-semibold tracking-wide uppercase whitespace-nowrap",
              isRequired ? "text-violet-600" : "text-gray-500",
            )}
          >
            {isRequired ? "Required" : "Optional"}
          </motion.span>
        </AnimatePresence>
      </div>
    </button>
  );
};

const AttributeRow = ({
  attribute,
  index,
  onUpdate,
  onDelete,
  totalCount,
}: {
  attribute: CategoryAttribute;
  index: number;
  onUpdate: (id: string, updates: Partial<CategoryAttribute>) => void;
  onDelete: (id: string) => void;
  totalCount: number;
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.2 } }}
      transition={{
        duration: 0.35,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      <div
        className={cn(
          "relative rounded-xl border-2 transition-all duration-300 overflow-hidden",
          attribute.isRequired
            ? "border-violet-300 bg-violet-50/30"
            : "border-gray-200 bg-white hover:border-gray-300",
        )}
      >
        <motion.div
          initial={false}
          animate={{
            scaleY: attribute.isRequired ? 1 : 0,
            opacity: attribute.isRequired ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute left-0 top-0 bottom-0 w-1 bg-violet-500 rounded-l-xl origin-center"
        />

        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="text-gray-400 cursor-grab active:cursor-grabbing hover:text-gray-600 transition-colors">
                <HiOutlineDotsVertical className="w-4 h-4" />
              </div>
              <div
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold",
                  attribute.isRequired
                    ? "bg-violet-100 text-violet-700"
                    : "bg-gray-100 text-gray-600",
                )}
              >
                <HiOutlineTag className="w-3 h-3" />
                {index + 1}
              </div>
              {attribute.isRequired && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 text-[10px] font-bold uppercase tracking-wider"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                  Must fill
                </motion.span>
              )}
            </div>

            <button
              onClick={() => onDelete(attribute.id)}
              disabled={totalCount <= 1}
              className={cn(
                "p-2 rounded-lg transition-all duration-200",
                totalCount <= 1
                  ? "opacity-30 cursor-not-allowed text-gray-400"
                  : "text-gray-400 hover:text-red-600 hover:bg-red-50 active:scale-95",
              )}
              title={
                totalCount <= 1
                  ? "At least one attribute is needed"
                  : "Remove attribute"
              }
            >
              <HiOutlineTrash className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-1.5 group/input">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider group-focus-within/input:text-violet-600 transition-colors">
                Attribute Name
              </label>
              <input
                type="text"
                value={attribute.name}
                onChange={(e) =>
                  onUpdate(attribute.id, { name: e.target.value })
                }
                placeholder="e.g. Size, Color, Material"
                className="w-full bg-white border-2 border-transparent rounded-lg px-3 py-2.5 text-sm text-gray-900 transition-all outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-1.5 group/input">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider group-focus-within/input:text-violet-600 transition-colors">
                Attribute Type
              </label>
              <div className="relative">
                <select
                  value={attribute.type}
                  onChange={(e) =>
                    onUpdate(attribute.id, {
                      type: e.target.value as CategoryAttribute["type"],
                    })
                  }
                  className="w-full bg-white border-2 border-transparent rounded-lg px-3 py-2.5 text-sm text-gray-900 transition-all outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 appearance-none pr-10 cursor-pointer"
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="select">Dropdown Select</option>
                  <option value="boolean">Yes/No</option>
                  <option value="date">Date</option>
                </select>
                <HiOutlineChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>

          {attribute.type === "select" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-4 space-y-1.5"
            >
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Options (comma separated)
              </label>
              <input
                type="text"
                value={attribute.options?.join(", ") || ""}
                onChange={(e) =>
                  onUpdate(attribute.id, {
                    options: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
                placeholder="Red, Blue, Green, Yellow"
                className="w-full bg-white border-2 border-transparent rounded-lg px-3 py-2.5 text-sm text-gray-900 transition-all outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 placeholder:text-gray-400"
              />
            </motion.div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-xs text-gray-500 leading-relaxed max-w-md">
              {attribute.isRequired
                ? "Products in this category must include this attribute before publishing."
                : "This attribute is optional — products can be published without it."}
            </p>
            <RequiredToggle
              isRequired={attribute.isRequired}
              onToggle={() =>
                onUpdate(attribute.id, { isRequired: !attribute.isRequired })
              }
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(true);
  const [saved, setSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attributeFilter, setAttributeFilter] = useState("");
  const [attributeTypeFilter, setAttributeTypeFilter] = useState<string>("all");
  const [attributes, setAttributes] = useState<CategoryAttribute[]>([
    {
      id: "attr-1",
      name: "Color",
      type: "select",
      isRequired: true,
      sortOrder: 0,
      options: ["Red", "Blue", "Green"],
    },
    {
      id: "attr-2",
      name: "Size",
      type: "select",
      isRequired: true,
      sortOrder: 1,
      options: ["S", "M", "L", "XL"],
    },
    {
      id: "attr-3",
      name: "Material",
      type: "text",
      isRequired: false,
      sortOrder: 2,
    },
  ]);
  const filteredAvailableAttributes = useMemo(() => {
    return AVAILABLE_ATTRIBUTES.filter((attr) => {
      const matchesSearch = attr.name
        .toLowerCase()
        .includes(attributeFilter.toLowerCase());
      const matchesType =
        attributeTypeFilter === "all" || attr.type === attributeTypeFilter;
      const isInUse = attributes.some((a) => a.id === attr.id);
      return matchesSearch && matchesType && !isInUse;
    });
  }, [attributeFilter, attributeTypeFilter, attributes]);

  const [formData, setFormData] = useState<CategoryForm>({
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
      canonicalUrl: "",
      robots: "index,follow",
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
    },
  });

  const parentCategories = [
    { id: "1", name: "Electronics" },
    { id: "2", name: "Fashion" },
    { id: "3", name: "Home & Garden" },
  ];

  const steps = [
    { number: 1, title: "Basic Info", icon: HiOutlineFolder },
    { number: 2, title: "SEO Settings", icon: HiOutlineDocumentText },
    { number: 3, title: "Attributes", icon: HiOutlineCog },
  ];

  const generateSlug = (name: string) =>
    name
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData({ ...formData, name, slug: generateSlug(name) });
  };

  const handleUpdateAttribute = useCallback(
    (id: string, updates: Partial<CategoryAttribute>) => {
      setAttributes((prev) =>
        prev.map((attr) => (attr.id === id ? { ...attr, ...updates } : attr)),
      );
    },
    [],
  );

  const handleDeleteAttribute = useCallback((id: string) => {
    setAttributes((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((attr) => attr.id !== id);
    });
  }, []);

  const handleAddAttribute = () => {
    const newAttr: CategoryAttribute = {
      id: `attr-${Date.now()}`,
      name: "",
      type: "text",
      isRequired: false,
      sortOrder: attributes.length,
    };
    setAttributes((prev) => [...prev, newAttr]);
  };

  const handleSave = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1800);
  };

  const requiredCount = attributes.filter((a) => a.isRequired).length;
  const optionalCount = attributes.filter((a) => !a.isRequired).length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-2 text-sm font-medium"
          >
            <HiOutlineSave className="w-4 h-4" />
            Category saved successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submitting Toast */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0, y: 60, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 60, x: "-50%" }}
            className="fixed bottom-8 left-1/2 bg-gray-900 text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 z-100"
          >
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span className="font-medium text-sm">Creating category...</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <CategoryHeader
        showPreview={showPreview}
        setShowPreview={setShowPreview}
        steps={steps}
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
        isSubmitting={isSubmitting}
        handleSave={handleSave}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          className={`grid gap-8 ${showPreview ? "grid-cols-1 lg:grid-cols-3" : "grid-cols-1 max-w-3xl mx-auto"}`}
        >
          {/* Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 space-y-6"
          >
            <AnimatePresence mode="wait">
              {/* STEP 1: Basic Info */}
              {currentStep === 1 && (
                <CategoryBasicInfo
                  formData={formData}
                  setFormData={setFormData}
                  handleNameChange={handleNameChange}
                  parentCategories={parentCategories}
                />
              )}

              {/* STEP 2: SEO Settings */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ x: -80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 80, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 120 }}
                >
                  <Card className="p-6">
                    <CardHeader
                      title="Search Engine Optimization"
                      subtitle="Control how this category appears in search results"
                      icon={HiOutlineDocumentText}
                    />
                    <div className="space-y-5">
                      <div>
                        <div className="flex justify-between mb-1.5">
                          <label className="text-sm font-medium text-gray-700">
                            Meta Title
                          </label>
                          <span
                            className={`text-xs ${
                              formData.seo.metaTitle.length > 60
                                ? "text-red-500"
                                : "text-gray-400"
                            }`}
                          >
                            {formData.seo.metaTitle.length}/60
                          </span>
                        </div>
                        <motion.input
                          whileFocus={{ scale: 1.01 }}
                          type="text"
                          value={formData.seo.metaTitle}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              seo: {
                                ...formData.seo,
                                metaTitle: e.target.value,
                              },
                            })
                          }
                          className={`${inputClass} ${formData.seo.metaTitle.length > 60 ? "border-red-300 focus:ring-red-400" : ""}`}
                          placeholder="SEO-optimized title"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between mb-1.5">
                          <label className="text-sm font-medium text-gray-700">
                            Meta Description
                          </label>
                          <span
                            className={`text-xs ${
                              formData.seo.metaDescription.length > 160
                                ? "text-red-500"
                                : "text-gray-400"
                            }`}
                          >
                            {formData.seo.metaDescription.length}/160
                          </span>
                        </div>
                        <motion.textarea
                          whileFocus={{ scale: 1.01 }}
                          rows={3}
                          value={formData.seo.metaDescription}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              seo: {
                                ...formData.seo,
                                metaDescription: e.target.value,
                              },
                            })
                          }
                          className={`${textareaClass} ${formData.seo.metaDescription.length > 160 ? "border-red-300 focus:ring-red-400" : ""}`}
                          placeholder="Concise description for search engines (max 160 chars)"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Meta Keywords
                        </label>
                        <motion.input
                          whileFocus={{ scale: 1.01 }}
                          type="text"
                          value={formData.seo.metaKeywords}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              seo: {
                                ...formData.seo,
                                metaKeywords: e.target.value,
                              },
                            })
                          }
                          className={inputClass}
                          placeholder="keyword1, keyword2, keyword3"
                        />
                        <p className="text-xs text-gray-400 mt-1.5">
                          Separate keywords with commas.
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Canonical URL
                        </label>
                        <motion.input
                          whileFocus={{ scale: 1.01 }}
                          type="url"
                          value={formData.seo.canonicalUrl}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              seo: {
                                ...formData.seo,
                                canonicalUrl: e.target.value,
                              },
                            })
                          }
                          className={inputClass}
                          placeholder="https://example.com/canonical-url"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Robots Directive
                        </label>
                        <div className="relative">
                          <select
                            value={formData.seo.robots}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                seo: {
                                  ...formData.seo,
                                  robots: e.target.value,
                                },
                              })
                            }
                            className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                          >
                            <option value="index,follow">index, follow</option>
                            <option value="noindex,follow">
                              noindex, follow
                            </option>
                            <option value="index,nofollow">
                              index, nofollow
                            </option>
                            <option value="noindex,nofollow">
                              noindex, nofollow
                            </option>
                          </select>
                          <HiOutlineChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-100">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">
                          Open Graph (Social Sharing)
                        </h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              OG Title
                            </label>
                            <motion.input
                              whileFocus={{ scale: 1.01 }}
                              type="text"
                              value={formData.seo.ogTitle}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  seo: {
                                    ...formData.seo,
                                    ogTitle: e.target.value,
                                  },
                                })
                              }
                              className={inputClass}
                              placeholder="Title for social media shares"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              OG Description
                            </label>
                            <motion.textarea
                              whileFocus={{ scale: 1.01 }}
                              rows={2}
                              value={formData.seo.ogDescription}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  seo: {
                                    ...formData.seo,
                                    ogDescription: e.target.value,
                                  },
                                })
                              }
                              className={textareaClass}
                              placeholder="Description for social media shares"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              OG Image URL
                            </label>
                            <motion.input
                              whileFocus={{ scale: 1.01 }}
                              type="url"
                              value={formData.seo.ogImage}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  seo: {
                                    ...formData.seo,
                                    ogImage: e.target.value,
                                  },
                                })
                              }
                              className={inputClass}
                              placeholder="https://example.com/og-image.jpg"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Search Preview */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="p-5 bg-gray-50 rounded-xl border border-gray-200"
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <HiOutlineSearch className="w-4 h-4 text-blue-500" />
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                            Google Search Preview
                          </span>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-blue-600 font-medium text-base hover:underline cursor-pointer truncate">
                            {formData.seo.metaTitle ||
                              formData.name ||
                              "Category Name"}{" "}
                            | Your Brand
                          </h4>
                          <p className="text-green-700 text-sm truncate">
                            https://yoursite.com/category/
                            {formData.slug || "slug"}
                          </p>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {formData.seo.metaDescription ||
                              formData.description ||
                              "Your meta description will appear here as the search snippet..."}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* STEP 3: Attributes */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ x: -80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 80, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 120 }}
                  className="space-y-6"
                >
                  {/* Stats Bar */}
                  <Card className="p-5">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">
                          Attributes Overview
                        </h3>
                        <p className="text-sm text-gray-500 mt-0.5">
                          {attributes.length} attribute
                          {attributes.length !== 1 ? "s" : ""} defined for this
                          category
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <motion.div
                          key={`req-${requiredCount}`}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-100 rounded-lg"
                        >
                          <HiOutlineShieldCheck className="w-3.5 h-3.5 text-violet-600" />
                          <span className="text-xs font-bold text-violet-700">
                            {requiredCount}
                          </span>
                          <span className="text-xs text-violet-600/70">
                            Required
                          </span>
                        </motion.div>
                        <motion.div
                          key={`opt-${optionalCount}`}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-lg"
                        >
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-400 flex items-center justify-center">
                            <span className="text-[8px] text-gray-400">○</span>
                          </div>
                          <span className="text-xs font-bold text-gray-600">
                            {optionalCount}
                          </span>
                          <span className="text-xs text-gray-500/70">
                            Optional
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </Card>

                  {/* Attributes List */}
                  <Card className="p-6">
                    <CardHeader
                      title="Category Attributes"
                      subtitle="Define the fields products in this category should have"
                      icon={HiOutlineCog}
                    />

                    <div className="space-y-4">
                      <AnimatePresence mode="popLayout">
                        {attributes.map((attr, i) => (
                          <AttributeRow
                            key={attr.id}
                            attribute={attr}
                            index={i}
                            onUpdate={handleUpdateAttribute}
                            onDelete={handleDeleteAttribute}
                            totalCount={attributes.length}
                          />
                        ))}
                      </AnimatePresence>

                      {/* Add New Button */}
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={handleAddAttribute}
                        className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-sm font-semibold text-gray-500 hover:border-violet-400 hover:text-violet-600 hover:bg-violet-50 transition-all duration-300 flex items-center justify-center gap-2 group"
                      >
                        <div className="p-1 rounded-md bg-gray-100 group-hover:bg-violet-100 transition-colors">
                          <HiOutlinePlus className="w-4 h-4" />
                        </div>
                        Add New Attribute
                      </motion.button>
                    </div>
                  </Card>

                  <Card className="p-5 sm:p-6">
                    <CardHeader
                      title="Available Attributes"
                      subtitle="Browse and assign pre-defined attributes"
                      icon={HiOutlinePlus}
                    />

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search attributes..."
                          value={attributeFilter}
                          onChange={(e) => setAttributeFilter(e.target.value)}
                          className="w-full bg-white border-2 border-gray-200 rounded-lg pl-10 pr-3 py-2.5 text-sm text-gray-900 transition-all outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-500"
                        />
                      </div>
                      <div className="relative">
                        <select
                          value={attributeTypeFilter}
                          onChange={(e) =>
                            setAttributeTypeFilter(e.target.value)
                          }
                          className="w-full sm:w-48 bg-white border-2 border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 transition-all outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-500 appearance-none cursor-pointer"
                        >
                          <option value="all">All Types</option>
                          <option value="text">Text</option>
                          <option value="number">Number</option>
                          <option value="select">Select</option>
                          <option value="boolean">Boolean</option>
                        </select>
                        <HiOutlineChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                      </div>
                    </div>

                    {/* Available Attributes List */}
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {filteredAvailableAttributes.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                          <HiOutlineSearch className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No attributes found</p>
                        </div>
                      ) : (
                        filteredAvailableAttributes.map((attr) => (
                          <motion.div
                            key={attr.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.01 }}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-violet-300 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-white rounded-lg border border-gray-200">
                                {attr.type === "text" && (
                                  <HiOutlineDocumentText className="w-4 h-4 text-gray-600" />
                                )}
                                {attr.type === "number" && (
                                  <span className="text-sm font-bold text-gray-600">
                                    #
                                  </span>
                                )}
                                {attr.type === "select" && (
                                  <HiOutlineChevronDown className="w-4 h-4 text-gray-600" />
                                )}
                                {attr.type === "boolean" && (
                                  <Check className="w-4 h-4 text-gray-600" />
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900">
                                  {attr.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {attr.description}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() =>
                                handleCreateAttribute({
                                  name: attr.name,
                                  type: attr.type,
                                  isRequired: false,
                                })
                              }
                              className="px-3 py-1.5 bg-violet-600 text-white text-xs font-medium rounded-lg hover:bg-violet-700 transition-colors"
                            >
                              Assign
                            </button>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </Card>

                  {/* Tip Box */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100"
                  >
                    <HiOutlineInformationCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-700 leading-relaxed">
                      <strong className="text-amber-900">Tip:</strong> Toggle
                      each attribute between{" "}
                      <strong className="text-amber-900">Required</strong> and
                      Optional. Required attributes must be filled in before a
                      product can be published. You can reorder them using the
                      sort order field.
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex justify-between pt-2"
            >
              <motion.button
                whileHover={{ scale: currentStep === 1 ? 1 : 1.04 }}
                whileTap={{ scale: currentStep === 1 ? 1 : 0.96 }}
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  currentStep === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm"
                }`}
              >
                ← Previous
              </motion.button>
              <motion.button
                whileHover={{ scale: currentStep === 3 ? 1 : 1.04 }}
                whileTap={{ scale: currentStep === 3 ? 1 : 0.96 }}
                onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                disabled={currentStep === 3}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  currentStep === 3
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-violet-600 text-white hover:bg-violet-700 shadow-md shadow-violet-200"
                }`}
              >
                Next Step →
              </motion.button>
            </motion.div>
          </motion.div>

          {/* PREVIEW PANEL */}
          <AnimatePresence>
            {showPreview && (
              <motion.div
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 80, opacity: 0 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="lg:col-span-1"
              >
                <div className="sticky top-36 space-y-4">
                  {/* Category Card Preview */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-700">
                        Live Preview
                      </h3>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                        Live
                      </span>
                    </div>

                    <div className="p-5">
                      {formData.image ? (
                        <div className="mb-4 rounded-xl overflow-hidden">
                          <img
                            src={formData.image}
                            alt={formData.name}
                            className="w-full h-28 object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://placehold.co/400x200?text=Image";
                            }}
                          />
                        </div>
                      ) : (
                        <div className="mb-4 rounded-xl bg-gradient-to-br from-violet-100 to-blue-100 h-28 flex items-center justify-center">
                          <HiOutlinePhotograph className="w-10 h-10 text-violet-300" />
                        </div>
                      )}
                      <h4 className="text-lg font-bold text-gray-900 mb-1">
                        {formData.name || (
                          <span className="text-gray-300">Category Name</span>
                        )}
                      </h4>
                      {formData.parentId && (
                        <div className="flex items-center gap-1 mb-2">
                          <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">
                            ↳{" "}
                            {
                              parentCategories.find(
                                (c) => c.id === formData.parentId,
                              )?.name
                            }
                          </span>
                        </div>
                      )}
                      <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                        {formData.description || "No description provided."}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-3">
                        <span className="font-mono">
                          /{formData.slug || "category-slug"}
                        </span>
                        <span>Order: {formData.sortOrder}</span>
                      </div>
                    </div>
                  </div>

                  {/* Google SERP Preview */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                      Google Search Preview
                    </p>
                    <div className="space-y-1">
                      <p className="text-blue-600 text-sm font-medium leading-snug line-clamp-1">
                        {formData.seo.metaTitle ||
                          formData.name ||
                          "Category Title"}
                      </p>
                      <p className="text-green-700 text-xs">
                        example.com/{formData.slug || "category-slug"}
                      </p>
                      <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                        {formData.seo.metaDescription ||
                          formData.description ||
                          "No description available for this category."}
                      </p>
                    </div>
                  </div>

                  {/* Social Card Preview */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Social Media Card
                      </p>
                    </div>
                    <div className="bg-gray-50">
                      {formData.seo.ogImage ? (
                        <img
                          src={formData.seo.ogImage}
                          alt="og preview"
                          className="w-full h-24 object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://placehold.co/400x200?text=OG+Image";
                          }}
                        />
                      ) : (
                        <div className="h-24 bg-gradient-to-r from-violet-200 to-blue-200 flex items-center justify-center">
                          <span className="text-xs text-violet-500 font-medium">
                            OG Image Preview
                          </span>
                        </div>
                      )}
                      <div className="p-3 bg-white border-t border-gray-200">
                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                          example.com
                        </p>
                        <p className="text-sm font-semibold text-gray-800 leading-tight mt-0.5 line-clamp-1">
                          {formData.seo.ogTitle ||
                            formData.name ||
                            "Category Title"}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                          {formData.seo.ogDescription ||
                            formData.description ||
                            "Description"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Attributes Preview */}
                  {attributes.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                        Attributes Preview
                      </p>
                      <div className="space-y-2">
                        {attributes.slice(0, 3).map((attr) => (
                          <div
                            key={attr.id}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="text-gray-700">{attr.name}</span>
                            <span
                              className={cn(
                                "text-xs px-2 py-0.5 rounded-full",
                                attr.isRequired
                                  ? "bg-violet-100 text-violet-700"
                                  : "bg-gray-100 text-gray-600",
                              )}
                            >
                              {attr.isRequired ? "Required" : "Optional"}
                            </span>
                          </div>
                        ))}
                        {attributes.length > 3 && (
                          <p className="text-xs text-gray-400 text-center">
                            +{attributes.length - 3} more attributes
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Quick Tips */}
                  <div className="bg-amber-50 rounded-2xl border border-amber-100 p-5">
                    <h3 className="text-sm font-semibold text-amber-800 mb-3 flex items-center gap-1.5">
                      <HiOutlineSparkles className="w-4 h-4" /> Quick Tips
                    </h3>
                    <ul className="space-y-2 text-xs text-amber-700">
                      {[
                        "Use descriptive names for better SEO",
                        "Keep slugs short and keyword-rich",
                        "Meta titles should be under 60 characters",
                        "Meta descriptions under 160 characters",
                        "Add high-quality images for engagement",
                        "Mark key attributes as required",
                      ].map((tip, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-500 mt-0.5">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile FAB */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowPreview(!showPreview)}
        className="sm:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-violet-600 text-white shadow-xl flex items-center justify-center"
      >
        <HiOutlineSparkles className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
