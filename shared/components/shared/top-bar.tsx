import React from "react";
import { Categories } from "./categories";
import { SortPopup } from "./sort-popup";
import { cn } from "@/shared/lib/utils";
import { Container } from "./container";

type TopBarLayout = { id: string; name: string };

interface Props {
  layouts: TopBarLayout[];
  className?: string;
}

export const TopBar: React.FC<Props> = ({ className, layouts }) => {
  return (
    <div 
      data-topbar 
      className={cn(
        "sticky top-[72px] bg-white shadow-lg shadow-black/5 z-40",
        "py-2 sm:py-3",
        className
      )}
    >
      <Container className="flex items-center justify-between">
        <Categories layouts={layouts} />
        <div className="hidden lg:block">
          <SortPopup />
        </div>
      </Container>
    </div>
  );
};