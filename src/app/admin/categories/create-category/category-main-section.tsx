"use client";
import { Card, CardContent } from "@/components/ui/card";
import CategoryCreateAndEditForm from "./category-create-and-edit-form";

export default function CategoryMainSection({
  showPreview,
}: {
  showPreview?: boolean;
}) {
  return (
    <div className="mt-10">
      <div className="w-full mx-auto flex items-start gap-5 justify-center">
        <CategoryCreateAndEditForm />
        {showPreview && (
          <Card className="bg-secondary">
            <CardContent>skjdfhs</CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
