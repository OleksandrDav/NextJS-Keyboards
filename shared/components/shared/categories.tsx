"use client";

import { createSlug } from "@/shared/lib/create-slug";
import { cn } from "@/shared/lib/utils";
import { useCategoryStore } from "@/shared/store/category";
import React from "react";

type TopBarLayout = { id: string; name: string };

interface Props {
  layouts: TopBarLayout[];
  className?: string;
}

export const Categories: React.FC<Props> = ({ className, layouts }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);

  const scrollToCategory = (slug: string) => {
    const element = document.getElementById(slug);
    if (element) {
      // Get header and topbar heights for offset
      const header = document.querySelector("header") as HTMLElement | null;
      const topbar = document.querySelector("[data-topbar]") as HTMLElement | null;

      const headerHeight = header?.offsetHeight || 0;
      const topbarHeight = topbar?.offsetHeight || 0;
      const offset = headerHeight + topbarHeight + 16;

      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const getShortLayoutName = (name: string): string => {
    const match = name.match(/(\d+)%/);
    return match ? `${match[1]}%` : name;
  };

  return (
    <div className={cn(
      "flex gap-1 bg-gray-50 rounded-2xl",
      "p-0.5 sm:p-1",
      "w-full sm:w-auto",
      className
    )}>
      {layouts.map(({ name, id }) => {
        const slug = createSlug(name);
        const shortName = getShortLayoutName(name);

        return (
          <button
            key={id}
            onClick={() => scrollToCategory(slug)}
            className={cn(
              "flex items-center justify-center font-bold rounded-2xl transition-colors",
              "h-8 sm:h-11",
              "px-3 sm:px-5",
              "flex-1 sm:flex-none",
              "sm:min-w-0",
              "text-sm sm:text-base",
              categoryActiveId === id && "bg-white shadow-md shadow-gray-200 text-primary"
            )}
            type="button"
          >
            <span className="hidden sm:inline">{name}</span>
            <span className="inline sm:hidden">{shortName}</span>
          </button>
        );
      })}
    </div>
  );
};