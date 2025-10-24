import React from "react";

interface Props {
  finalPrice: number;
  basePrice: number;
  discountPercentage: number;
}

export const PriceDisplay: React.FC<Props> = ({
  finalPrice,
  basePrice,
  discountPercentage,
}) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-3xl font-bold text-gray-900">
        ${finalPrice.toFixed(2)}
      </span>
      {discountPercentage > 0 && (
        <>
          <span className="text-xl text-gray-500 line-through">
            ${basePrice.toFixed(2)}
          </span>
          <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
            Save {discountPercentage}%
          </span>
        </>
      )}
    </div>
  );
};