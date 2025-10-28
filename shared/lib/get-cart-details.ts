import { CartDTO } from "../services/dto/cart.dto";
import { calcCartItemPrice } from "./calc-cart-item-price";

export interface CartStateItem {
  id: number;
  quantity: number;
  price: string;
  keyboard: {name: string;};
  colorVariant: {colorName: string; imageUrl: string;};
  switch: {name: string; type: string;};
}

interface ReturnProps {
    cartItems: CartStateItem[]; 
    totalAmount: string;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
    const cartItems = data.cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: calcCartItemPrice(item).toFixed(2),
        keyboard: {
            name: item.keyboard.name,
        },
        colorVariant: {
            colorName: item.colorVariant.colorName,
            imageUrl: item.colorVariant.imageUrl,
        },
        switch: {
            name: item.switch.name,
            type: item.switch.type,
        },
    }))

    return {
        totalAmount: data.totalAmount.toString(),
        cartItems,
    }
}