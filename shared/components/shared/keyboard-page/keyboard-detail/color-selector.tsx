import { cn } from "@/shared/lib/utils";
import { ColorVariantWithImages } from "@/@types/keyboard";
import React from "react";

interface Props {
  variants: ColorVariantWithImages[];
  selectedVariant: ColorVariantWithImages;
  onSelect: (variant: ColorVariantWithImages) => void;
}

export const ColorSelector: React.FC<Props> = ({
  variants,
  selectedVariant,
  onSelect,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1.5">
        <h3 className="font-semibold text-gray-900">Color:</h3>
        <span className="text-sm text-gray-600">
          {selectedVariant.colorName}
        </span>
      </div>
      <div className="flex gap-3">
        {variants.map((variant) => {
          const isOutOfStock = !variant.inStock;
          const isSelected = variant.id === selectedVariant.id;

          return (
            <button
              key={variant.id}
              disabled={isOutOfStock}
              onClick={() => onSelect(variant)}
              className={cn(
                "w-12 h-12 rounded-full border-2 transition-all relative",
                isSelected
                  ? "border-gray-900 ring-2 ring-gray-900 ring-opacity-20"
                  : "border-gray-300 hover:border-gray-400",
                isOutOfStock && "opacity-40 cursor-not-allowed"
              )}
              style={{ backgroundColor: variant.colorHex }}
              title={
                isOutOfStock
                  ? `${variant.colorName} - Out of Stock`
                  : variant.colorName
              }
            >
              {/* Out of stock indicator */}
              {isOutOfStock && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-gray-500 rotate-45 transform origin-center"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};