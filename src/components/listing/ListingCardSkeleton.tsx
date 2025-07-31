import { Card, CardContent } from "@/components/ui/card";

export const ListingCardSkeleton = () => {
  return (
    <Card
      className="w-full overflow-hidden shadow-lg border-0 bg-white py-0"
      aria-label="Loading property card"
      aria-busy="true"
    >
      <div className="relative">
        <div
          className="w-full h-60 bg-gray-200 animate-pulse"
          aria-hidden="true"
        />
      </div>

      <CardContent className="px-4 pb-4 md:px-6 md:pb-6">
        <div className="space-y-4">
          <div>
            <div
              className="h-8 bg-gray-200 rounded animate-pulse mb-1"
              aria-hidden="true"
            />
            <div
              className="h-4 bg-gray-200 rounded animate-pulse"
              aria-hidden="true"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-4 bg-gray-200 rounded animate-pulse"
                aria-hidden="true"
              />
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <div
              className="flex-1 h-9 bg-gray-200 rounded animate-pulse"
              aria-hidden="true"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
