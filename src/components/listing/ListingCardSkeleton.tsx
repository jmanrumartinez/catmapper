import { Card, CardContent } from "@/components/ui/card";

export const ListingCardSkeleton = () => {
  return (
    <Card className="w-full overflow-hidden shadow-lg border-0 bg-white py-0">
      <div className="relative">
        <div className="w-full h-60 bg-gray-200 animate-pulse" />
      </div>

      <CardContent className="px-4 pb-4 md:px-6 md:pb-6">
        <div className="space-y-4">
          <div>
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-14 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
          </div>

          <div className="space-y-2">
            <div className="h-8 w-full bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
