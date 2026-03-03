"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { loadMore } from "@/utils/load-more";
import { useState } from "react";

export default function AttributesPreview({
  attributes,
}: {
  attributes: any[];
}) {
  const INITIAL_LOAD = 3;
  const NEXT_LOAD = 3;

  const [limit, setLimit] = useState(INITIAL_LOAD);

  const visibleAttributes = loadMore({
    initialLoad: INITIAL_LOAD,
    nextLoad: limit,
    data: attributes,
  });

  const handleLoadMore = () => {
    setLimit((prev) => prev + NEXT_LOAD);
  };

  return (
    <Card className="rounded-2xl shadow-sm border border-border p-5">
      <CardHeader className="border-b">Attributes Preview</CardHeader>

      <CardContent className="space-y-2">
        {visibleAttributes.map((attr) => (
          <div
            key={attr.id}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-muted-foreground">{attr.name}</span>

            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                attr.isRequired
                  ? "bg-primary text-primary"
                  : "bg-accent text-accent-foreground border",
              )}
            >
              {attr.isRequired ? "Required" : "Optional"}
            </span>
          </div>
        ))}

        {limit < attributes.length && (
          <div className="text-center pt-2">
            <button
              onClick={handleLoadMore}
              className="text-xs text-primary cursor-pointer hover:underline"
            >
              Load More (+{attributes.length - limit})
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
