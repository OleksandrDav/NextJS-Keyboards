import { Cart, CartItem, ColorVariant, Keyboard, Switch } from "@prisma/client";

export type CartItemDTO = CartItem & {
  keyboard: Keyboard;
  switch: Switch;
  colorVariant: ColorVariant;
};

export interface CartDTO extends Cart {
  cartItems: CartItemDTO[];
}

export interface CreateCartItemValues {
  keyboardId: string;
  switchId: string;
  colorVariantId: string;
}

[
  {
    id: 4,
    cartId: 3,
    keyboardId: "cmhqij0ad000xtl9wt9jb9fb6",
    colorVariantId: "cmhqij0ad000ytl9wiurlzp27",
    switchId: "cmhqiizzr0007tl9wei0bqo7w",
    quantity: 1,
    createdAt: "2025-11-08T16:44:33.873Z",
    updatedAt: "2025-11-08T16:44:33.873Z",
    keyboard: {
      id: "cmhqij0ad000xtl9wt9jb9fb6",
      name: "MCHOSE G98 Pro Wireless Tri-Mode Custom Mechanical Gaming Keyboard",
      basePrice: "159.99",
      discountPercentage: 20,
      layoutId: "cmhqiizyl0000tl9wt2rf2teu",
      description:
        "Professional gaming keyboard with tri-mode connectivity (2.4GHz, Bluetooth, Wired) and Flame Orange switches.",
      createdAt: "2025-11-08T16:42:30.325Z",
      updatedAt: "2025-11-08T16:42:30.325Z",
    },
    colorVariant: {
      id: "cmhqij0ad000ytl9wiurlzp27",
      keyboardId: "cmhqij0ad000xtl9wt9jb9fb6",
      colorName: "Blue",
      colorHex: "#4169E1",
      imageUrl:
        "https://www.mchose.store/cdn/shop/files/mchose-official-keyboard-blue-flame-orange-switch-mchose-g98-pro-wireless-tri-mode-custom-mechanical-gaming-keyboard-1166639808.jpg?v=1755569473&width=1000",
      isDefault: true,
      sortOrder: 0,
      inStock: true,
      createdAt: "2025-11-08T16:42:30.325Z",
      updatedAt: "2025-11-08T16:42:30.325Z",
    },
    switch: {
      id: "cmhqiizzr0007tl9wei0bqo7w",
      name: "Flame Orange",
      type: "Linear",
      priceModifier: "8",
      inStock: true,
      description: "Fast and responsive linear switch",
      createdAt: "2025-11-08T16:42:29.944Z",
      updatedAt: "2025-11-08T16:42:29.944Z",
    },
  },
  {
    id: 3,
    cartId: 3,
    keyboardId: "cmhqij0ad000xtl9wt9jb9fb6",
    colorVariantId: "cmhqij0ad000ztl9we8rv1fgr",
    switchId: "cmhqiizzr0007tl9wei0bqo7w",
    quantity: 2,
    createdAt: "2025-11-08T16:42:53.674Z",
    updatedAt: "2025-11-08T16:42:57.976Z",
    keyboard: {
      id: "cmhqij0ad000xtl9wt9jb9fb6",
      name: "MCHOSE G98 Pro Wireless Tri-Mode Custom Mechanical Gaming Keyboard",
      basePrice: "159.99",
      discountPercentage: 20,
      layoutId: "cmhqiizyl0000tl9wt2rf2teu",
      description:
        "Professional gaming keyboard with tri-mode connectivity (2.4GHz, Bluetooth, Wired) and Flame Orange switches.",
      createdAt: "2025-11-08T16:42:30.325Z",
      updatedAt: "2025-11-08T16:42:30.325Z",
    },
    colorVariant: {
      id: "cmhqij0ad000ztl9we8rv1fgr",
      keyboardId: "cmhqij0ad000xtl9wt9jb9fb6",
      colorName: "Black",
      colorHex: "#000000",
      imageUrl:
        "https://www.mchose.store/cdn/shop/files/HW-G98S-5_785b7d80-4ae2-48f4-8e1a-aa648afb0766.png?v=1755569473&width=1000",
      isDefault: false,
      sortOrder: 1,
      inStock: true,
      createdAt: "2025-11-08T16:42:30.325Z",
      updatedAt: "2025-11-08T16:42:30.325Z",
    },
    switch: {
      id: "cmhqiizzr0007tl9wei0bqo7w",
      name: "Flame Orange",
      type: "Linear",
      priceModifier: "8",
      inStock: true,
      description: "Fast and responsive linear switch",
      createdAt: "2025-11-08T16:42:29.944Z",
      updatedAt: "2025-11-08T16:42:29.944Z",
    },
  },
];
