import { useRouter } from "next/navigation";
import qs from "qs";
import React from "react";
import { Filters } from "./use-filters";

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();
  React.useEffect(() => {
    const params = {
      ...filters.priceRange,
      switches: Array.from(filters.selectedSwitches),
      colors: Array.from(filters.selectedColors),
      onSale: filters.onSale ? "true" : undefined,
    };

    const queryString = qs.stringify(params, {
      arrayFormat: "comma",
    });

    router.push(`?${queryString}`, { scroll: false });
  }, [filters]);
};
