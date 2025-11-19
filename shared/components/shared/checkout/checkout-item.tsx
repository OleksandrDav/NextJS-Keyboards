"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { Trash2Icon } from "lucide-react";
import * as CheckoutItemDetails from "../cart-item-details";
import { CartItemProps } from "../cart-item-details/cart-item-details.types";
import { CartDrawerItem } from "../cart-drawer-item";

interface Props extends CartItemProps {
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickRemoveButton?: () => void;
  className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  quantity,
  details,
  className,
  disabled,
  onClickCountButton,
  onClickRemoveButton,
}) => {
  return (
    <>
      {/* Desktop layout */}
      <div className="hidden md:block">
        <div
          className={cn(
            "flex items-center justify-between",
            {
              "opacity-50 pointer-events-none": disabled,
            },
            className
          )}
        >
          <div className="flex items-center gap-5 flex-1">
            <CheckoutItemDetails.Image src={imageUrl} />
            <CheckoutItemDetails.Info name={name} details={details} truncate={{ default: 25, xl: 50 }} />
          </div>

          <CheckoutItemDetails.Price value={price} />

          <div className="flex items-center gap-5 ml-20">
            <CheckoutItemDetails.CountButton onClick={onClickCountButton} value={quantity} />
            <button type="button" onClick={onClickRemoveButton}>
              <Trash2Icon className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="block md:hidden">
        <CartDrawerItem
          id={id}
          disabled={disabled}
          imageUrl={imageUrl}
          name={name}
          price={price}
          quantity={quantity}
          details={details}
          onClickCountButton={onClickCountButton}
          onClickRemoveButton={onClickRemoveButton}
        />
      </div>
    </>
  );
};
