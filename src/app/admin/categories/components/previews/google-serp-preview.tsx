import { Card, CardContent } from "@/components/ui/card";
import { CategoryFullInput } from "@/validation/category-management";

export default function GoogleSerpPreview({
  preview,
}: {
  preview: CategoryFullInput;
}) {
  return (
    <Card className="rounded-2xl shadow-sm border border-border p-5">
      <CardContent>
        <p className="text-xs font-semibold text-card-foreground uppercase tracking-wide mb-3">
          Google Search Preview
        </p>
        <div className="space-y-1">
          <p className="text-blue-600 text-sm font-medium leading-snug line-clamp-1">
            {preview?.seoSettings.metaTitle || preview.name || "Category Title"}
          </p>
          <p className="text-green-700 text-xs">
            example.com/{preview.slug || "category-slug"}
          </p>
          <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
            {preview?.seoSettings.metaDescription ||
              preview.description ||
              "No description available for this category."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
