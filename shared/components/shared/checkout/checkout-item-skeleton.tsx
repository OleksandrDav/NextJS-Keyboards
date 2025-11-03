"use client";

import React from "react";
import { Skeleton } from "../../ui/skeleton";

export const CheckoutItemSkeleton: React.FC = () => {
  return (
    <div className="flex items-center justify-between">
      {/* Left section: Image and Info */}
      <div className="flex items-center gap-5 flex-1">
        {/* Image skeleton */}
        <Skeleton className="w-[90px] h-[90px] rounded-md" />
        
        {/* Info skeleton */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      {/* Price skeleton */}
      <Skeleton className="h-6 w-16" />

      {/* Right section: Counter and Delete button */}
      <div className="flex items-center gap-5 ml-20">
        {/* Counter skeleton */}
        <Skeleton className="h-10 w-24 rounded-md" />
        
        {/* Delete button skeleton */}
        <Skeleton className="h-5 w-5 rounded" />
      </div>
    </div>
  );
};