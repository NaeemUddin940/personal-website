import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CategoryFullInput } from "@/validation/category-management";
import Image from "next/image";

export default function SocialCardPreview({
  preview,
}: {
  preview: CategoryFullInput;
}) {
  return (
    <Card className=" rounded-2xl shadow-sm border border-border overflow-hidden">
      <CardHeader>
        <CardTitle className="text-muted-foreground">
          Social Media Card
        </CardTitle>
      </CardHeader>

      <CardContent>
        {preview?.seoSettings?.ogImage ? (
          <Image
            height={100}
            width={100}
            src={preview?.seoSettings?.ogImage}
            alt="og preview"
            className="w-full h-24 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://placehold.co/400x200?text=OG+Image";
            }}
          />
        ) : (
          <div className="h-24 bg-linear-to-r from-violet-200 to-blue-200 flex items-center justify-center">
            <span className="text-xs text-violet-500 font-medium">
              OG Image Preview
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 justify-start items-start">
        <p className="text-md text-accent-foreground uppercase tracking-wide">
          example.com
        </p>
        <p className="text-sm font-semibold text-muted-foreground leading-tight mt-0.5 line-clamp-1">
          {preview?.seoSettings?.ogTitle || preview?.name || "Category Title"}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
          {preview?.seoSettings?.ogDescription || preview?.description || "Description"}
        </p>
      </CardFooter>
    </Card>
  );
}
