import { Button } from "@/shared/components/ui";
import { ArrowRight, ShoppingCart } from "lucide-react";
import React from "react";

interface Props {
  finalPrice: number;
  disabled: boolean;
}

export const AddToCartButton: React.FC<Props> = ({ finalPrice, disabled }) => {
  return (
    <Button 
      className="w-full group relative overflow-hidden"
      disabled={disabled}
    >
      <div className="flex items-center justify-center gap-2">
        <ShoppingCart size={20} />
        <span>Add to Cart • ${finalPrice.toFixed(2)}</span>
      </div>
      <ArrowRight
        size={20}
        className="relative left-1 transition duration-300 opacity-0 group-hover:opacity-100"
      />
    </Button>
  );
};