import { parentCategories } from "@/@api-response/parent-categories";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CategoryFullInput } from "@/validation/category-management";
import Image from "next/image";
import { HiOutlinePhotograph } from "react-icons/hi";

export default function CategoryCardPreview({
  preview,
}: {
  preview: CategoryFullInput;
}) {
  return (
    <Card className="rounded-2xl shadow-sm border border-border ">
      <CardHeader className="flex items-center justify-between border-b">
        <h3 className="text-sm font-semibold text-card-foreground">
          Live Preview
        </h3>
        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
          Live
        </span>
      </CardHeader>

      <CardContent>
        {preview?.basicInfo?.image ? (
          <div className="mb-4 rounded-xl overflow-hidden">
            <Image
              height={100}
              width={100}
              src={preview?.basicInfo?.image}
              alt={preview?.basicInfo?.name}
              className="w-full h-28 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/400x200?text=Image";
              }}
            />
          </div>
        ) : (
          <div className="mb-4 rounded-xl bg-linear-to-br from-violet-100 to-blue-100 h-28 flex items-center justify-center">
            <HiOutlinePhotograph className="w-10 h-10 text-violet-300" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <h4 className="text-lg font-bold text-accent-foreground mb-1">
          {preview?.basicInfo?.name || (
            <span className="text-accent-foreground">Category Name</span>
          )}
        </h4>
        {preview?.basicInfo?.parentId && (
          <div className="flex items-center gap-1 mb-2">
            <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">
              ↳{" "}
              {
                parentCategories.find(
                  (c) => c.id === preview?.basicInfo?.parentId,
                )?.name
              }
            </span>
          </div>
        )}
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {preview?.basicInfo?.description || "No description provided."}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
          <span className="font-mono">
            /{preview?.basicInfo?.slug || "category-slug"}
          </span>
          <span>Order: {preview?.basicInfo?.sortOrder}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
