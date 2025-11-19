import React from "react";
import { CheckoutItem } from "./checkout-item";
import { CheckoutItemSkeleton } from "./checkout-item-skeleton";
import { CartStateItem } from "@/shared/lib/get-cart-details";
import { WhiteBlock } from "./white-block";
import Image from "next/image";
import { Title } from "../title";
import { Button } from "../../ui";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

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
  loading,
}) => {
  return (
    <WhiteBlock title="Cart Summary" className={className}>
      <div className="flex flex-col gap-4">
        {loading ? (
          // Show 3 skeleton items while loading
          Array.from({ length: 3 }).map((_, index) => <CheckoutItemSkeleton key={index} />)
        ) : items.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center justify-center w-72 mx-auto px-6">
            <Image
              src="/assets/images/Empty-Cart--Streamline-Bruxelles.png"
              alt="Empty cart"
              width={120}
              height={120}
            />
            <Title size="sm" text="Your cart is empty" className="text-center font-bold my-2" />
            <p className="text-center text-neutral-500 mb-5">Add some products to your cart to see them here.</p>
            <Button className="w-56 h-12 text-base" size="lg">
              <ArrowLeft className="w-5 mr-2" />
              <Link href="/">Continue shopping</Link>
            </Button>
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
