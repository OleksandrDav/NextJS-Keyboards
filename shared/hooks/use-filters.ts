import { useSearchParams } from "next/navigation";
import React from "react";
import { useSet } from "react-use";

interface PriceRangeProps {
  min?: number;
  max?: number;
}

interface QueryFilters extends PriceRangeProps {
  onSale: boolean;
  switches: string;
  colors: string;
}

export interface Filters {
  onSale: boolean;
  selectedSwitches: Set<string>;
  selectedColors: Set<string>;
  priceRange: PriceRangeProps;
}

interface ReturnProps extends Filters {
  setOnSale: () => void;
  setSelectedSwitches: (value: string) => void;
  setSelectedColors: (value: string) => void;
  setPrices: (name: keyof PriceRangeProps, value: number) => void;
}

// Need to use Suspense to avoid hydration issues!!!
export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  /* Switches filter */
  const [selectedSwitches, { toggle: toggleSwitches }] = useSet(
    new Set<string>(searchParams.get("switches")?.split(","))
  );

  /* Colors filter */
  const [selectedColors, { toggle: toggleColors }] = useSet(
    new Set<string>(searchParams.get("colors")?.split(","))
  );

  /* On Sale filter */
  const [onSale, setOnSale] = React.useState(false);
  const toggleSale = () => setOnSale((prev) => !prev);

  /* Price Range filter */
  const [priceRange, setPriceRange] = React.useState<PriceRangeProps>({
    min: Number(searchParams.get("min")) || undefined,
    max: Number(searchParams.get("max")) || undefined,
  });

  const updatePrice = (name: keyof PriceRangeProps, value: number) => {
    setPriceRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return React.useMemo(
    () => ({
    onSale,
    selectedSwitches,
    selectedColors,
    priceRange,
    setOnSale: toggleSale,
    setSelectedSwitches: toggleSwitches,
    setSelectedColors: toggleColors,
    setPrices: updatePrice,
  }), [onSale, selectedSwitches, selectedColors, priceRange])
};
