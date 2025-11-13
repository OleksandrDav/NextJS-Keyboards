import React from "react";
import { Categories } from "./categories";
import { SortPopup } from "./sort-popup";
import { cn } from "@/shared/lib/utils";
import { Container } from "./container";
import { Layout } from "@prisma/client";

type TopBarLayout = { id: string; name: string };

interface Props {
  layouts: TopBarLayout[];
  className?: string;
}

export const TopBar: React.FC<Props> = ({ className, layouts }) => {
  return (
    <div data-topbar className={cn("sticky top-[72px] bg-white py-3 shadow-lg shadow-black/5 z-40", className)}>
      <Container className="flex items-center justify-between">
        <Categories layouts={layouts} />
        <SortPopup />
      </Container>
    </div>
  );
};
