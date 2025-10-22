"use client";

import React, { use } from "react";
import { Title } from "./title";
// import { FilterCheckbox } from './filter-checkbox'; // no longer needed
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { cn } from "@/lib/utils";
import { FilterCheckbox } from "./filter-checkbox";
import { useSwitches } from "@/hooks/use-switches";
import { useSearchParam, useSet } from "react-use";
import { useColors } from "@/hooks/use-colors";
import qs from "qs";  
import { useRouter, useSearchParams } from "next/navigation";


interface Props {
  className?: string;
}

interface PriceRangeProps {
  min: number;
  max: number;
}

interface QueryFilters extends PriceRangeProps {
  onSale: boolean;
  switches: string;
  colors: string;
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
  const searchParams = useSearchParams() ;
  const router = useRouter(); // IMPORTANT: useRouter from 'next/navigation'

  const {
    switches,
    loading: switchesLoading,
    onAddId,
    selectedSwitches,
  } = useSwitches();
  const switchItems = switches.map((item) => ({
    text: item.name,
    value: item.id,
  }));

  const {
    colors,
    loading: colorsLoading,
    onAddId: onAddColor,
    selectedColors,
  } = useColors();
  const colorItems = colors.map((item) => ({
    text: item.colorName,
    value: item.id,
  }));

  const [onSale, setOnSale] = React.useState(false);
  const toggleSale = () => setOnSale((prev) => !prev);

  const [priceRange, setPriceRange] = React.useState<PriceRangeProps>({
    min: 0,
    max: 200,
  });


  console.log(searchParams, 999);
  

  React.useEffect(() => {
    const filters = {
      ...priceRange,
      onSale,
      switches: Array.from(selectedSwitches),
      colors: Array.from(selectedColors),
    };

    const queryString = qs.stringify(filters, { arrayFormat: "comma" });
    router.push(`?${queryString}`, { scroll: false }); // false not teleport scroll to top
  }, [priceRange, onSale, selectedSwitches, selectedColors, router]);

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
        onClickCheckbox={toggleSale}
        selected={new Set(onSale ? ["sale"] : [])}
      />

      {/* Top filters - color (checkbox group) */}
      <CheckboxFiltersGroup
        title="Color"
        className="pt-3"
        limit={3}
        defaultItems={colorItems}
        items={colorItems}
        loading={colorsLoading}
        onClickCheckbox={onAddColor}
        selected={selectedColors}
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
            value={String(priceRange.min)}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: Number(e.target.value) })
            }
          />
          <Input
            type="number"
            placeholder="200"
            min={10}
            max={200}
            value={String(priceRange.max)}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: Number(e.target.value) })
            }
          />
        </div>
        <RangeSlider
          min={0}
          max={200}
          step={5}
          value={[priceRange.min, priceRange.max]}
          onValueChange={([from, to]) => setPriceRange({ min: from, max: to })}
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
        onClickCheckbox={onAddId}
        selected={selectedSwitches}
      />
    </div>
  );
};
