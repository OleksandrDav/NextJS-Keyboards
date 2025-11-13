"use client";

import React from "react";
import { SortPopup } from "./sort-popup";
import { FiltersDrawer } from "./filters-drawer";

export const MobileControls: React.FC = () => {
  return (
    <div className="flex items-center gap-2 mb-4 lg:hidden justify-between">
      <FiltersDrawer />
      <div>
        <SortPopup />
      </div>
    </div>
  );
};
