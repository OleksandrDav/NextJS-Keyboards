"use client";

import React, { use } from "react";
import { Title } from "./title";
// import { FilterCheckbox } from './filter-checkbox'; // no longer needed
import { cn } from "@/lib/utils";
import { Input } from "../ui";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { RangeSlider } from "./range-slider";
import { useQueryFilters, useFilters, useSwitches, useColors } from "@/hooks";

interface Props {
  className?: string;
}

const saleItems = [
  {
    text: "On sale only",
    value: "sale",
    endAdornment: (
      <span className="ml-2 px-1.5 py-0.5 text-xs text-ring border border-ring rounded-sm">
        %
      </span>
    ),
  },
];

export const Filters: React.FC<Props> = ({ className }) => {
  const { switches, loading: switchesLoading } = useSwitches();
  const { colors, loading: colorsLoading } = useColors();
  const filters = useFilters();

  useQueryFilters(filters);

  const switchItems = switches.map((item) => ({
    text: item.name,
    value: item.id,
  }));

  const colorItems = colors.map((item) => ({
    text: item.colorName,
    value: item.id,
  }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices("min", prices[0]);
    filters.setPrices("max", prices[1]);
  };

  return (
    <div className={cn("min-w-[185px]", className)}>
      <Title
        text="Filters"
        size="sm"
        className="mb-3 font-bold border-b border-b-neutral-100 pb-2"
      />

      {/* Pre-Top filter - sale (checkbox) */}
      <CheckboxFiltersGroup
        title="Sale"
        className="border-b border-b-neutral-100 pb-3"
        defaultItems={saleItems}
        items={saleItems}
        onClickCheckbox={filters.setOnSale}
        selected={new Set(filters.onSale ? ["sale"] : [])}
      />

      {/* Top filters - color (checkbox group) */}
      <CheckboxFiltersGroup
        title="Color"
        className="pt-3"
        limit={3}
        defaultItems={colorItems}
        items={colorItems}
        loading={colorsLoading}
        onClickCheckbox={filters.setSelectedColors}
        selected={filters.selectedColors}
      />

      {/* Middle filters - price range */}
      <div className="mt-5 border-y border-y-neutral-100 py-4 pb-7">
        <p className="mb-3 font-bold">Price from and to:</p>
        <div className="mb-3 flex gap-3">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={200}
            value={String(filters.priceRange.min)}
            onChange={(e) => filters.setPrices("min", Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="200"
            min={10}
            max={200}
            value={String(filters.priceRange.max)}
            onChange={(e) => filters.setPrices("max", Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={200}
          step={5}
          value={[filters.priceRange.min || 0, filters.priceRange.max || 200]}
          onValueChange={updatePrices}
        />
      </div>

      {/* Bottom filters - switches (checkbox group) */}
      <CheckboxFiltersGroup
        title="Switches"
        className="mt-5"
        limit={3}
        defaultItems={switchItems}
        items={switchItems}
        loading={switchesLoading}
        onClickCheckbox={filters.setSelectedSwitches}
        selected={filters.selectedSwitches}
      />
    </div>
  );
};
