import React from "react";
import { Title } from "./title";
// import { FilterCheckbox } from './filter-checkbox'; // no longer needed
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { cn } from "@/lib/utils";
import { FilterCheckbox } from "./filter-checkbox";

interface Props {
  className?: string;
}

const colorItems = [
  { text: "Blue", value: "blue" },
  { text: "Green", value: "green" },
  { text: "Black", value: "black" },
  { text: "White", value: "white" },
  { text: "Purple", value: "purple" },
  { text: "Orange", value: "orange" },
];

const switchItems = [
  { text: "Cherry MX", value: "cherry-mx" },
  { text: "Gateron", value: "gateron" },
  { text: "Kailh", value: "kailh" },
  { text: "Outemu", value: "outemu" },
  { text: "Razer", value: "razer" },
  { text: "Zealios", value: "zealios" },
  { text: "Puki", value: "puki" },
];

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("min-w-[185px]", className)}>
      <Title
        text="Filters"
        size="sm"
        className="mb-3 font-bold border-b border-b-neutral-100 pb-2"
      />

      {/* Pre-Top filter - sale (checkbo) */}
      <div className="border-b border-b-neutral-100 pb-3">
        <FilterCheckbox
          name="sale"
          text="In stock only"
          value="sale"
          // checked={saleOnly}
          // onCheckedChange={(checked) => setSaleOnly(Boolean(checked))}
          endAdornment={
            <span className="ml-2 px-1.5 py-0.5 text-xs text-ring border border-ring rounded-sm">
              ✓
            </span>
          }
        />
      </div>

      {/* Top filters - color (checkbox group) */}
      <CheckboxFiltersGroup
        title="Color"
        className="pt-3"
        limit={3}
        defaultItems={colorItems}
        items={colorItems}
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
            defaultValue={0}
          />
          <Input
            type="number"
            placeholder="200"
            min={10}
            max={200}
            defaultValue={200}
          />
        </div>
        <RangeSlider min={0} max={200} step={5} value={[0, 200]} />
      </div>

      {/* Bottom filters - switches (checkbox group) */}
      <CheckboxFiltersGroup
        title="Switches"
        className="mt-5"
        limit={3}
        defaultItems={switchItems}
        items={switchItems}
      />
    </div>
  );
};
