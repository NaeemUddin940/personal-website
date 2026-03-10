import { Button } from "@/components/ui/button";
import { Eye, Save } from "lucide-react";

export default function AttrHeader({
  setShowPreview,
  showPreview,
  handleSubmit,
  isSubmitting,
}) {
  return (
    <div className="flex items-center justify-between mb-6 rounded-xl custom-shadow p-4">
      <div>
        <h1 className="text-2xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Create New Attribute
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Define product attributes for your e-commerce store
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="slide"
          icon={<Eye size={16} />}
          onClick={() => setShowPreview(!showPreview)}
        >
          {showPreview ? "Hide" : "Show"} Preview
        </Button>
        <Button
          onClick={handleSubmit}
          isLoading={isSubmitting}
          variant="primary"
          icon={<Save size={16} />}
        >
          {isSubmitting ? "Saving..." : "Save Attribute"}
        </Button>
      </div>
    </div>
  );
}
