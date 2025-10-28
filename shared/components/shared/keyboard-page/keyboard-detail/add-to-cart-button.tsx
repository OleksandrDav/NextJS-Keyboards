import { Button } from "@/shared/components/ui";
import { ArrowRight, ShoppingCart, Loader2 } from "lucide-react";
import React from "react";

interface Props {
  finalPrice: number;
  disabled: boolean;
  loading: boolean;
  onSubmit: () => void;
}

export const AddToCartButton: React.FC<Props> = ({ finalPrice, disabled, loading, onSubmit }) => {
  return (
    <Button
      className="w-full group relative overflow-hidden"
      disabled={disabled || loading}
      onClick={onSubmit}
    >
      <div className="flex items-center justify-center gap-2">
        {loading ? <Loader2 size={20} className="animate-spin" /> : <ShoppingCart size={20} />}
        <span>{loading ? "Adding..." : disabled ? "Select a switch" : `Add to Cart • $${finalPrice.toFixed(2)}`}</span>
      </div>
      {!loading && !disabled && (
        <ArrowRight size={20} className="relative left-1 transition duration-300 opacity-0 group-hover:opacity-100" />
      )}
    </Button>
  );
};
