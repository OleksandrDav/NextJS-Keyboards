import { cn } from "@/shared/lib/utils";
import { Trash2Icon } from "lucide-react";
import React from "react";
import * as CartItem from "./cart-item-details";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import { CountButton } from "./count-button";

interface Props extends CartItemProps {
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickRemoveButton?: () => void;
  className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  quantity,
  details,
  className,
  onClickCountButton,
  onClickRemoveButton,
  disabled,
}) => {
  return (
    <div className={cn("flex flex-col sm:flex-row bg-white p-5 gap-0 sm:gap-6", { "opacity-50 pointer-events-none": disabled }, className)}>
      <div className="flex gap-6">
        <CartItem.Image src={imageUrl} />
        <div className="flex-1">
          <CartItem.Info name={name} details={details} />

          <hr className="my-2.5" />

          {/* Desktop: controls inside */}
          <div className="hidden sm:flex items-center justify-between">
            <CountButton onClick={onClickCountButton} value={quantity} />
            <div className="flex items-center gap-3">
              <CartItem.Price value={price} />
              <Trash2Icon
                className="text-gray-400 cursor-pointer hover:text-gray-600"
                size={16}
                onClick={onClickRemoveButton}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: controls outside, below image and description */}
      <div className="flex sm:hidden items-center justify-between">
        <CountButton onClick={onClickCountButton} value={quantity} />
        <div className="flex items-center gap-3">
          <CartItem.Price value={price} />
          <Trash2Icon
            className="text-gray-400 cursor-pointer hover:text-gray-600"
            size={16}
            onClick={onClickRemoveButton}
          />
        </div>
      </div>
    </div>
  );
};