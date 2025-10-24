import { cn } from "@/shared/lib/utils";
import { Check } from "lucide-react";
import { SwitchType } from "@/@types/keyboard";
import React from "react";

interface Props {
  switches: SwitchType[];
  selectedSwitch: SwitchType | null;
  onSelect: (switchItem: SwitchType) => void;
}

export const SwitchSelector: React.FC<Props> = ({
  switches,
  selectedSwitch,
  onSelect,
}) => {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-900">Switch Type</h3>
      <div className="flex flex-wrap gap-2">
        {switches.map((switchItem) => {
          const isOutOfStock = !switchItem.inStock;
          const isSelected = selectedSwitch?.id === switchItem.id;

          return (
            <button
              key={switchItem.id}
              disabled={isOutOfStock}
              onClick={() => onSelect(switchItem)}
              className={cn(
                "px-4 py-2.5 border rounded-full transition-all relative",
                "flex flex-col items-center justify-center text-center",
                "min-w-[140px] h-[60px] flex-shrink-0",
                isSelected && !isOutOfStock
                  ? "border-gray-900 bg-gray-50 ring-2 ring-gray-900 ring-opacity-20"
                  : isOutOfStock
                  ? "opacity-40 cursor-not-allowed border-gray-200"
                  : "border-gray-200 hover:border-gray-900 hover:bg-gray-50"
              )}
            >
              
              <div
                className={cn(
                  "font-semibold text-sm leading-tight",
                  isOutOfStock ? "text-gray-500" : "text-gray-900"
                )}
              >
                {switchItem.name}
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <span
                  className={cn(
                    "text-xs capitalize",
                    isOutOfStock ? "text-gray-400" : "text-gray-600"
                  )}
                >
                  {switchItem.type}
                </span>
                {!isOutOfStock && (
                  <span className="text-green-600 font-semibold text-xs">
                    +${Number(switchItem.priceModifier).toFixed(2)}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
      {!selectedSwitch && (
        <p className="text-sm text-amber-600">Please select a switch type</p>
      )}
    </div>
  );
};