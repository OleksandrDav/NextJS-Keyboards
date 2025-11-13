// src/shared/dtos/order.dto.ts

export interface OrderItemKeyboardDto {
  id: string;
  name: string;
  basePrice: string; // Prisma Decimal is stored as string in JSON
  discountPercentage: number;
  description: string | null; // Prisma field can be null
}

export interface OrderItemColorVariantDto {
  id: string;
  colorName: string;
  colorHex: string;
  imageUrl: string;
}

export interface OrderItemSwitchDto {
  id: string;
  name: string;
  type: string;
  priceModifier: string;
}

export interface OrderItemDto {
  id: number; 
  cartId: number;
  keyboardId: string;
  colorVariantId: string;
  switchId: string;
  quantity: number;
  keyboard: OrderItemKeyboardDto;
  colorVariant: OrderItemColorVariantDto;
  switch: OrderItemSwitchDto;
  calculatedPrice: string;
}

export interface CreateOrderDto {
  token: string;
  userId?: number;
  totalAmount: string;
  firstName: string;
  lastName: string;
  items: OrderItemDto[];
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  deliveryInstructions?: string;
}