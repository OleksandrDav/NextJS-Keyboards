"use client";

import React from "react";
import { FilterChecboxProps, FilterCheckbox } from "./filter-checkbox";
import { Button, Input, Skeleton } from "../ui";

type Item = FilterChecboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems: Item[];
  limit?: number;
  loading?: boolean;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  defaultvalue?: string[];
  selected?: Set<string>;
  className?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  limit = 3,
  searchInputPlaceholder = "Search...",
  loading,
  onClickCheckbox,
  defaultvalue,
  selected,
  className,
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>
        <div className="flex flex-col gap-3">
          {[...Array(limit)].map((_, i) => (
            <div key={i} className="flex items-center gap-2.5">
              {/* Square skeleton for checkbox */}
              <Skeleton className="h-6 w-6 rounded-[8px] flex-shrink-0" />
              {/* Rectangular skeleton for label */}
              <Skeleton className="h-6 flex-1 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLowerCase())
      )
    : defaultItems.slice(0, limit);

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>

      {showAll && items.length > 6 && (
        <div className="mb-5">
          <Input
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
            onChange={onSearchInputChange}
            value={searchValue}
          />
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-56 overflow-auto scrollbar">
        {list.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            checked={selected?.has(item.value)}
            endAdornment={item.endAdornment}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-primary mt-3"
          >
            <span>{!showAll ? `+ Show All` : `- Hide`}</span>
          </button>
        </div>
      )}
    </div>
  );
};
