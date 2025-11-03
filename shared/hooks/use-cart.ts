import { addCartItem } from './../services/cart';
import { useEffect } from "react";
import { useCartStore } from "../store/cart";

export const useCart = () => {
  const totalAmount = useCartStore((state) => state.totalAmount);
  const items = useCartStore((state) => state.cartItems);
  const fetchCartItems = useCartStore((state) => state.fetchCartItems);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
  const removeCartItem = useCartStore((state) => state.removeCartItem);
  
  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);

  const onClickCountButton = (id: number, type: "plus" | "minus", quantity: number) => {
    const newQuantity = type === "plus" ? quantity + 1 : Math.max(1, quantity - 1);
    updateItemQuantity(id, newQuantity);
  };

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return {
    totalAmount,
    items,
    updateItemQuantity,
    removeCartItem,
    addCartItem,
    loading,
    onClickCountButton,
  }
};
