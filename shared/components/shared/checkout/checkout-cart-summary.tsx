import React from "react";
import { CheckoutItem } from "./checkout-item";
import { CheckoutItemSkeleton } from "./checkout-item-skeleton";
import { CartStateItem } from "@/shared/lib/get-cart-details";
import { WhiteBlock } from "./white-block";

interface Props {
  items: CartStateItem[];
  onClickCountButton: (id: number, type: "plus" | "minus", currentQuantity: number) => void;
  removeCartItem: (id: number) => void;
  loading?: boolean;
  className?: string;
}

export const CheckoutCartSummary: React.FC<Props> = ({ 
  className, 
  items, 
  onClickCountButton, 
  removeCartItem,
  loading 
}) => {
  return (
    <WhiteBlock title="Cart Summary" className={className}>
      <div className="flex flex-col gap-4">
        {loading ? (
          // Show 3 skeleton items while loading
          Array.from({ length: 3 }).map((_, index) => (
            <CheckoutItemSkeleton key={index} />
          ))
        ) : items.length === 0 ? (
          // Empty state
          <div className="text-center py-8 text-gray-500">
            Your cart is empty
          </div>
        ) : (
          // Actual items
          items.map((item) => (
            <CheckoutItem
              key={item.id}
              id={item.id}
              disabled={item.disabled}
              imageUrl={item.colorVariant.imageUrl}
              details={`${item.switch.name} - (${item.switch.type}) • ${item.colorVariant.colorName}`}
              name={item.keyboard.name}
              price={item.price}
              quantity={item.quantity}
              onClickCountButton={(type) => onClickCountButton(item.id, type, item.quantity)}
              onClickRemoveButton={() => removeCartItem(item.id)}
            />
          ))
        )}
      </div>
    </WhiteBlock>
  );
};