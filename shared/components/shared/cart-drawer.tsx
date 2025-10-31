"use client";

import React, { useEffect } from "react";
import { ReactNode } from "react";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import { Button } from "../ui";
import { ArrowLeft, ArrowRight, Car } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/shared/lib/get-cart-item-details";
import { useCartStore } from "@/shared/store/cart";
import Image from "next/image";
import { Title } from "./title";
import { cn } from "@/shared/lib/utils";

interface CartDrawerProps {
  className?: string;
  children: ReactNode;
}

export function CartDrawer({ children, className }: CartDrawerProps) {
  const totalAmount = useCartStore((state) => state.totalAmount);
  const items = useCartStore((state) => state.cartItems);
  const fetchCartItems = useCartStore((state) => state.fetchCartItems);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
  const removeCartItem = useCartStore((state) => state.removeCartItem);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const onClickCountButton = (id: number, type: "plus" | "minus", quantity: number) => {
    const newQuantity = type === "plus" ? quantity + 1 : Math.max(1, quantity - 1);
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild className={className}>
        {children}
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-0 justify-between bg-[#F4F1EE]">
        <div className={cn("flex flex-col h-[95%]", !Number(totalAmount) && "justify-center")}>
          {Number(totalAmount) > 0 && (
            <SheetHeader>
              <SheetTitle>
                In cart <span className="font-bold">({items.length} items)</span>
              </SheetTitle>
            </SheetHeader>
          )}

          {!Number(totalAmount) && (
            <div className="flex flex-col items-center justify-center w-72 mx-auto">
              <Image
                src="/assets/images/Empty-Cart--Streamline-Bruxelles.png"
                alt="Empty cart"
                width={120}
                height={120}
              />
              <Title size="sm" text="Your cart is empty" className="text-center font-bold my-2" />
              <p className="text-center text-neutral-500 mb-5">Add some products to your cart to see them here.</p>
              <SheetClose asChild>
                <Button className="w-56 h-12 text-base" size="lg">
                  <ArrowLeft className="w-5 mr-2" />
                  Continue shopping
                </Button>
              </SheetClose>
            </div>
          )}

          {Number(totalAmount) > 0 && (
            <>
              <div className="overflow-auto flex-1 scrollbar mb-1">
                {items.map((item) => (
                  <div className="mb-2" key={item.id}>
                    <CartDrawerItem
                      id={item.id}
                      disabled={item.disabled}
                      imageUrl={item.colorVariant.imageUrl}
                      name={item.keyboard.name}
                      price={item.price}
                      quantity={item.quantity}
                      details={`${item.switch.name} - (${item.switch.type}) • ${item.colorVariant.colorName}`}
                      onClickCountButton={(type) => onClickCountButton(item.id, type, item.quantity)}
                      onClickRemoveButton={() => removeCartItem(item.id)}
                    />
                  </div>
                ))}
              </div>

              <SheetFooter className="bg-white p-8 py-6">
                <div className="w-full">
                  <div className="flex mb-4">
                    <span className="flex flex-1 text-lg text-neutral-500">
                      Total:
                      <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                    </span>
                    <span className="font-bold text-lg">{totalAmount} $</span>
                  </div>

                  <Link href="/cart">
                    <Button type="submit" className="w-full h-12 text-base">
                      Go to checkout
                      <ArrowRight className="w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
