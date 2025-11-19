// components/SkeletonCard.tsx
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <Card className="overflow-hidden bg-[#070E28] border-none">
      <Skeleton className="w-full h-[220px] sm:h-[280px] md:h-[330px] rounded-[8px] bg-gray-800" />

      <div className="pt-4 sm:pt-5 px-3 sm:px-4 md:px-5 space-y-4">
        <div className="flex justify-between items-start">
          <Skeleton className="h-7 w-40 bg-gray-700" />
          <Skeleton className="h-5 w-24 bg-gray-700" />
        </div>

        <Skeleton className="h-5 w-full max-w-xs bg-gray-700" />

        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-32 bg-gray-700" />
          <Skeleton className="h-8 w-24 bg-gray-700" />
        </div>

        <Skeleton className="h-4 w-full bg-gray-700" />
        <Skeleton className="h-4 w-11/12 bg-gray-700" />
        <Skeleton className="h-4 w-10/12 bg-gray-700" />

        <Skeleton className="h-10 w-full rounded-md bg-gray-700" />
      </div>
    </Card>
  );
}