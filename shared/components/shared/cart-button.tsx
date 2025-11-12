'use client';

import { ArrowRight, ShoppingCart } from "lucide-react";
import React, { use } from "react";
import { Button } from "../ui";
import { CartDrawer } from "./cart-drawer";
import { useCartStore } from "@/shared/store/cart";
import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
  const totalAmount = useCartStore((state) => state.totalAmount);
  const loading = useCartStore((state) => state.loading);
  const items = useCartStore((state) => state.cartItems);

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <CartDrawer>
      <Button loading={loading} className={cn("group relative p-2 md:p-2.5", {'w-[95px]': loading} ,className)}>
        <b className="hidden md:inline">{totalAmount} $</b>
        <span className="h-full w-[1px] bg-white/30 mx-2 hidden md:inline" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size={16} className="relative mb-0.5" strokeWidth={2} />
          <b className="md:inline">{totalQuantity}</b>
        </div>
        <ArrowRight
          size={20}
          className="absolute right-4 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 hidden md:block"
        />
      </Button>
    </CartDrawer>
  );
};
