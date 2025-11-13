// src/shared/lib/order.mapper.ts

import { CartItem, Keyboard, ColorVariant, Switch } from "@prisma/client";
import { OrderItemDto } from "../services/dto/order.dto";

export interface CartItemWithRelations extends CartItem {
  keyboard: Keyboard;
  colorVariant: ColorVariant;
  switch: Switch;
}

export function mapCartItemsToOrderItems(cartItems: CartItemWithRelations[]): OrderItemDto[] {
  return cartItems.map(item => ({
    id: item.id, // This is number from Prisma
    cartId: item.cartId,
    keyboardId: item.keyboardId,
    colorVariantId: item.colorVariantId,
    switchId: item.switchId,
    quantity: item.quantity,
    keyboard: {
      id: item.keyboard.id,
      name: item.keyboard.name,
      basePrice: item.keyboard.basePrice.toString(), // Convert Decimal to string
      discountPercentage: item.keyboard.discountPercentage,
      description: item.keyboard.description,
    },
    colorVariant: {
      id: item.colorVariant.id,
      colorName: item.colorVariant.colorName,
      colorHex: item.colorVariant.colorHex,
      imageUrl: item.colorVariant.imageUrl,
    },
    switch: {
      id: item.switch.id,
      name: item.switch.name,
      type: item.switch.type,
      priceModifier: item.switch.priceModifier.toString(), // Convert Decimal to string
    },
    calculatedPrice: calculateItemPrice(item).toString()
  }));
}

export function calculateItemPrice(item: CartItemWithRelations): number {
  const basePrice = Number(item.keyboard.basePrice);
  const switchModifier = Number(item.switch.priceModifier);
  const discountPercentage = Number(item.keyboard.discountPercentage);

  const discountedBasePrice = basePrice * (1 - discountPercentage / 100);
  return discountedBasePrice + switchModifier;
}