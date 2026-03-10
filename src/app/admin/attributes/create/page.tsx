"use client";
import AttrPreview from "@/components/admin/attribute/create-component/attr-preview";
import { generateSlug } from "@/utils/slug-generator";
import {
  FullAttributeInput,
  fullAttributeSchema,
} from "@/validation/attribute-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldErrors, FormProvider, useForm } from "react-hook-form"; // FieldErrors ইমপোর্ট করা হয়েছে
import { toast } from "react-hot-toast"; // অথবা আপনার পছন্দের টোস্ট লাইব্রেরি
import PageHeader from "../../../../components/admin/common/page-header";
import AttributeCreateForm from "./attr-create-form";

export default function CreateAttributePage() {
  const [showPreview, setShowPreview] = useState<boolean>(true);

  const methods = useForm<FullAttributeInput>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(fullAttributeSchema),
    defaultValues: {
      name: "",
      slug: "",
      type: "TEXT",
      group: "BASIC",
      isUnique: false,
      isFilterable: false,
      isVisible: true,
      isVariation: false,
      isSearchable: false,
      isGlobal: false,
      status: "ACTIVE",
      visibility: "PUBLIC",

      label: "",
      placeholder: "",
      helpText: "",
      unit: "",
      unitPosition: "suffix",
      sortOrder: 0,
      cssClass: "",
      icon: "",
      stepValue: 1,
      decimalPlaces: 0,
      validations: [],
      options: [],
    },
  });

  const name = methods.watch("name");
  const { setValue } = methods;

  // Slug generation logic
  useEffect(() => {
    if (name) {
      const slug = generateSlug(name);
      setValue("slug", slug, { shouldValidate: true, shouldDirty: true });
    }
  }, [name, setValue]);

  const onSubmit = (data: FullAttributeInput) => {
    console.log("✅ Final Data to Server:", data);
    toast.success("Attribute created successfully!");
  };

  const onError = (errors: FieldErrors<FullAttributeInput>) => {
    console.error("❌ Form Errors:", errors);
    toast.error("Please fix the validation errors in each tab.");

    // কনসোলে কোন ট্যাবে ভুল আছে তা দেখার জন্য:
    Object.keys(errors).forEach((key) => {
      console.log(`Error in field: ${key}`);
    });
  };

  return (
    <div className="min-h-screen p-2 md:p-5">
      <FormProvider {...methods}>
        {/* HTML Form Tag wrapping the layout */}
        <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
          <PageHeader
            title="Create Attribute"
            description="Define a new attribute and its values to help organize and filter your products."
            actions={[
              {
                label: showPreview ? "Hide Preview" : "Show Preview",
                icon: showPreview ? EyeOff : Eye,
                variant: "outline",
                type: "button", // নিশ্চিত করুন এটি যেন সাবমিট না হয়ে যায়
                onClick: () => setShowPreview(!showPreview),
              },
              {
                label: "Create Attribute",
                icon: Plus,
                variant: "glow",
                type: "submit",
              },
            ]}
          />

          <div
            className={`max-w-7xl mt-3 md:mt-5 lg:mt-7 w-full mx-auto grid gap-6 transition-all duration-300 ${
              showPreview ? "grid-cols-1 lg:grid-cols-12" : "grid-cols-1"
            }`}
          >
            {/* Form Section */}
            <div
              className={
                showPreview ? "lg:col-span-8" : "max-w-4xl mx-auto w-full"
              }
            >
              <AttributeCreateForm />
            </div>

            {/* Preview Section - Sticky position adds great UX */}
            {showPreview && (
              <div className="lg:col-span-4 sticky top-5 h-fit">
                <AttrPreview />
              </div>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
