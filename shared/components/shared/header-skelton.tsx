// shared/components/shared/header-skeleton.tsx
import { cn } from "@/shared/lib/utils";

interface HeaderSkeletonProps {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export function HeaderSkeleton({ className, hasSearch = true, hasCart = true }: HeaderSkeletonProps) {
  return (
    <header className={cn("border-b bg-white", className)}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo section */}
          <div className="flex items-center space-x-2">
            <div className="w-18 h-18 bg-gray-200 rounded animate-pulse" />
            <div className="hidden lg:block">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-1" />
              <div className="h-3 w-40 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          {/* Search bar skeleton */}
          {hasSearch && (
            <div className="flex-1 mx-10 hidden md:block">
              <div className="h-10 bg-gray-200 rounded-full animate-pulse" />
            </div>
          )}

          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
            {hasCart && <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />}
          </div>
        </div>
      </div>
    </header>
  );
}
