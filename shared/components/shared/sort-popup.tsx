"use client";

import { cn } from "@/shared/lib/utils";
import { ArrowUpDown } from "lucide-react";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui";

interface Props {
  className?: string;
}

const sortOptions = [
  { label: "Price: Low → High", value: "price_asc" },
  { label: "Price: High → Low", value: "price_desc" },
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

export const SortPopup: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sortBy") || "popular";

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", value);
    router.push(`?${params.toString()}`);
  };

  const currentLabel = sortOptions.find((opt) => opt.value === currentSort)?.label || "Best Selling";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={cn("inline-flex items-center gap-1 rounded-2xl cursor-pointer transition-colors", className)}>
          <ArrowUpDown size={16} />
          <b>Sort by:</b>
          <b className="text-primary">{currentLabel}</b>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleSortChange(option.value)}
            className={cn("cursor-pointer", currentSort === option.value && "bg-gray-100 font-semibold")}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

{
  /* <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'inline-flex items-center gap-2 bg-white cursor-pointer group',
            className
          )}
        >
          <span className="text-sm font-medium">Sort by:</span>
          <span className="text-sm font-medium underline decoration-transparent hover:decoration-primary transition-colors duration-200">
            {currentLabel}
          </span>
          <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
            <ChevronDown size={14} className="text-white" />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] p-2">
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleSortChange(option.value)}
            className={cn(
              'cursor-pointer px-4 py-2.5 text-sm rounded-md transition-colors',
              'hover:bg-primary/10 hover:text-primary',
              currentSort === option.value && 'text-primary font-medium'
            )}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu> */
}
