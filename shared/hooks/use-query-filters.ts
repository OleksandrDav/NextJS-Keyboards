import { useRouter } from "next/navigation";
import qs from "qs";
import React from "react";
import { Filters } from "./use-filters";

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();
  const initialRender = React.useRef(true);

  React.useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    // Debounce URL updates to prevent too frequent navigation
    const timeoutId = setTimeout(() => {
      const params = {
        ...filters.priceRange,
        switches: Array.from(filters.selectedSwitches),
        colors: Array.from(filters.selectedColors),
        onSale: filters.onSale ? "true" : undefined,
      };
      const queryString = qs.stringify(params, {
        arrayFormat: "comma",
        skipNulls: true,
      });
      router.push(`?${queryString}`, { scroll: false });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [filters, router]);
};
