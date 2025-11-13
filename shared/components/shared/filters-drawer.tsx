"use client";

import React from "react";
import { SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/shared/components/ui/button";
import { Filters } from "./filters";

export const FiltersDrawer: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetHeader>
        <VisuallyHidden asChild>
          <SheetTitle>Filters</SheetTitle>
        </VisuallyHidden>
      </SheetHeader>
      <SheetContent side="left" className="w-[350px] sm:w-[500px] overflow-y-auto bg-white px-5 pl-3">
        <div className="mt-2">
          <Filters />
        </div>
      </SheetContent>
    </Sheet>
  );
};
