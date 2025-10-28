import { Cart, CartItem, ColorVariant, Keyboard, Switch } from "@prisma/client";

export type CartItemDTO = CartItem & {
    keyboard: Keyboard;
    switch: Switch;
    colorVariant: ColorVariant;
}

export interface CartDTO extends Cart {
    cartItems: CartItemDTO[];
}

export interface CreateCartItemValues {
    keyboardId: string;
    switchId: string;
    colorVariantId: string;
}