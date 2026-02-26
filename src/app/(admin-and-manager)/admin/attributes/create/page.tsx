"use client";
import { CreateAttribute } from "@/actions/attribute-management/create-attribute";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { attributeSchema } from "@/validation/attribute-validation";
import { AlertCircle, Check, Eye, HelpCircle } from "lucide-react";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import AttrHeader from "./components/attr-header";
import AttrValuesTab from "./components/attr-values-tab";
import BasicInfoTab from "./components/basic-info-tab";
import DisplaySettings from "./components/display-settings";
import { StepNavigator } from "./components/step-navigator";
import TextValidation from "./components/text-validation";
import { tabs } from "./constant/tabs";

// ==================== MAIN COMPONENT ====================
export default function AttributeCreatePage() {
  const [isPending, startTransition] = useTransition();
  const [openTab, setOpenTab] = useState("basic");
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState(null);
  const [formData, setFormData] = useState({
    // Basic Infromation
    name: "",
    slug: "",
    type: "TEXT",
    group: "BASIC",
    status: "ACTIVE",
    visibility: "PUBLIC",

    // --- Behavior Configuration ---
    isRequired: false,
    isUnique: false,
    isFilterable: true,
    isSearchable: true,
    isComparable: true,
    isVariation: false,
    isVisible: true,

    // Display Settings
    label: "",
    placeholder: "",
    helpText: "",
    unit: "",
    unitPosition: "",
    sortOrder: 0,
    cssClass: "",
    icon: "",

    // --- Validation Settings (Conditional) ---
    minValue: "",
    maxValue: "",
    minLength: "",
    maxLength: "",
    stepValue: 1,
    decimalPlaces: 0,
    // --- Values Area ---
    values: [
      {
        value: "RED",
        slug: "red",
        swatchType: "COLOR",
        swatchValue: "#ff0000",
        isDefault: false,
      },
    ],

    // options: [], // Reserved for future meta-configurations
    options: [],
  });

  const validateAndSwitchTab = (targetTab: string) => {
    const tabOrder = tabs.map((t) => t.id);
    const currentIndex = tabOrder.indexOf(openTab);
    const nextIndex = tabOrder.indexOf(targetTab);

    if (nextIndex > currentIndex || currentIndex === nextIndex) {
      const currentSchema = attributeSchema[openTab];

      if (currentSchema) {
        const result = currentSchema.safeParse(formData);
        if (!result.success) {
          const fieldErrors = result.error.flatten().fieldErrors;
          setErrors(fieldErrors);
          return false;
        }
      }
    }

    setErrors({});
    setOpenTab(targetTab);
    return true;
  };

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors?.[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const finalSubmit = () => {
    startTransition(async () => {
      const res = await CreateAttribute(formData);

      if (res.success) {
        toast.success(res.message);
        // Reset form or redirect
        setFormData(formData);
      } else {
        toast.error(res.message);
        if (res.tab) {
          // অপশনাল: প্রথম যে ট্যাবে এরর আছে সেখানে অটো নিয়ে যাওয়া
          setOpenTab(res.tab);
        }
      }
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <AttrHeader
          setShowPreview={setShowPreview}
          showPreview={showPreview}
          handleSubmit={finalSubmit}
          isSubmitting={isPending}
        />

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              finalSubmit();
            }}
            className="col-span-2 space-y-6"
          >
            {/* Tabs */}
            <Card>
              <CardContent>
                <Tabs
                  value={openTab}
                  onValueChange={validateAndSwitchTab}
                  variant="underline"
                  defaultValue={openTab}
                >
                  <TabsList>
                    {tabs.map((tab) => (
                      <TabsTrigger
                        key={tab.id}
                        icon={<tab.icon />}
                        value={tab.id}
                      >
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <TabsContent value="basic">
                    <BasicInfoTab
                      formData={formData}
                      errors={errors}
                      onChange={handleInputChange}
                    />
                  </TabsContent>
                  <TabsContent value="display">
                    <DisplaySettings
                      errors={errors}
                      onChange={handleInputChange}
                      formData={formData}
                    />
                  </TabsContent>
                  <TabsContent value="validation">
                    <TextValidation
                      errors={errors}
                      onChange={handleInputChange}
                      formData={formData}
                    />
                  </TabsContent>
                  <TabsContent value="values">
                    <AttrValuesTab
                      formData={formData}
                      errors={errors}
                      setFormData={setFormData}
                    />
                  </TabsContent>
                </Tabs>
                <CardFooter className="flex items-center justify-end">
                  <StepNavigator
                    openTab={openTab}
                    onFinalSubmit={finalSubmit}
                    validateAndSwitchTab={validateAndSwitchTab}
                    isSubmitting={isPending}
                    tabs={tabs.map((t) => t.id)}
                  />
                </CardFooter>
              </CardContent>
            </Card>
          </form>

          {/* Right Column - Preview & Help */}
          <div className="col-span-1 space-y-4">
            {/* Preview Card */}
            {showPreview && (
              <div className="bg-card border border-border rounded-xl shadow-lg p-4 animate-in slide-in-from-right">
                <h3 className="font-medium mb-3 flex items-center gap-2 text-primary">
                  <Eye size={16} /> Live Preview
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-secondary/20 border border-border rounded-lg">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Name:</span>{" "}
                      <span className="font-medium text-foreground">
                        {formData.name || "Not set"}
                      </span>
                    </div>
                    <div className="text-sm mt-2">
                      <span className="text-muted-foreground">Slug:</span>{" "}
                      <span className="font-medium text-primary">
                        {formData.slug || "not-set"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="p-2 bg-secondary/20 border border-border rounded">
                      <span className="text-muted-foreground">Type:</span>
                      <div className="font-medium text-foreground">
                        {formData.type}
                      </div>
                    </div>
                    <div className="p-2 bg-secondary/20 border border-border rounded">
                      <span className="text-muted-foreground">Group:</span>
                      <div className="font-medium text-foreground">
                        {formData.group}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between p-2 bg-secondary/20 border border-border rounded">
                      <span className="text-muted-foreground">Required</span>
                      {formData.isRequired ? (
                        <Check className="text-primary" size={16} />
                      ) : (
                        <span className="text-muted-foreground">No</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between p-2 bg-secondary/20 border border-border rounded">
                      <span className="text-muted-foreground">Filterable</span>
                      {formData.isFilterable ? (
                        <Check className="text-primary" size={16} />
                      ) : (
                        <span className="text-muted-foreground">No</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between p-2 bg-secondary/20 border border-border rounded">
                      <span className="text-muted-foreground">Variation</span>
                      {formData.isVariation ? (
                        <Check className="text-primary" size={16} />
                      ) : (
                        <span className="text-muted-foreground">No</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between p-2 bg-secondary/20 border border-border rounded">
                      <span className="text-muted-foreground">Visibility</span>
                      {formData.isVisible ? (
                        <Check className="text-primary" size={16} />
                      ) : (
                        <span className="text-muted-foreground">No</span>
                      )}
                    </div>
                  </div>

                  {formData.isVariation && (
                    <div className="bg-primary/10 border p-3 rounded-lg text-sm border-l-4 border-primary">
                      <span className="font-medium block mb-1 text-foreground">
                        ⚠️ Variation Attribute
                      </span>
                      <p className="text-xs text-muted-foreground">
                        This will be used for product variations (size, color,
                        etc.)
                      </p>
                    </div>
                  )}

                  {formData?.values?.length > 0 && (
                    <div className="border-t border-border pt-3">
                      <div className="text-sm font-medium mb-2 text-foreground">
                        Values ({formData.values.length})
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.values.map((v, i) => (
                          <div
                            key={i}
                            className={`px-3 py-1 rounded-full text-xs ${
                              v.isDefault
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground border border-border"
                            }`}
                          >
                            {v.value || "New value"}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Help Card */}
            <div className="bg-card border border-border rounded-xl shadow-sm p-4">
              <h3 className="font-medium mb-3 flex items-center gap-2 text-foreground">
                <HelpCircle size={16} className="text-primary" /> Quick Tips
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Use descriptive names for attributes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Slug is auto-generated from name</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    Mark as &quot;Variation&quot; for product variants
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Add values for SELECT/MULTISELECT types</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Use swatch for visual attributes</span>
                </li>
              </ul>
            </div>

            {/* Info Card */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
              <h3 className="font-medium mb-2 flex items-center gap-2 text-primary">
                <AlertCircle size={16} /> Attribute Usage
              </h3>
              <p className="text-sm text-muted-foreground">
                Attributes define product specifications. They can be used for
                filtering, comparison, and product variations.
              </p>
              <div className="mt-3 text-xs text-primary/80">
                <span className="font-medium">Example:</span> For a
                &quot;RAM&quot; &quot;Size&quot; attribute, values could be:
                4GB, 8GB, 16GB
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
