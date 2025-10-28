import { CartItemDTO } from "../services/dto/cart.dto";

export const calcCartItemPrice = (item: CartItemDTO): number => {
    const basePrice = Number(item.keyboard.basePrice);
    const switchModifier = Number(item.switch.priceModifier);
    const discountPercentage = item.keyboard.discountPercentage;

    const discountedBasePrice = basePrice * (1 - discountPercentage / 100);
    const pricePerItem = discountedBasePrice + switchModifier;
    const finalPrice = pricePerItem * item.quantity;

    return finalPrice;
}