import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function SocialCardPreview({
  formData,
}: {
  formData: CategoryForm;
}) {
  return (
    <Card className=" rounded-2xl shadow-sm border border-border overflow-hidden">
      <CardHeader>
        <CardTitle className="text-muted-foreground">
          Social Media Card
        </CardTitle>
      </CardHeader>
      {/* <div className="p-4 border-b border-border"></div> */}
      <CardContent>
        {formData.seo.ogImage ? (
          <Image
            height={100}
            width={100}
            src={formData.seo.ogImage}
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
          {formData.seo.ogTitle || formData.name || "Category Title"}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
          {formData.seo.ogDescription || formData.description || "Description"}
        </p>
      </CardFooter>
    </Card>
  );
}
