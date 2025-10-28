import { create } from "zustand";
import { Api } from "../services/api-client";
import { CartStateItem, getCartDetails } from "../lib/get-cart-details";
import { CreateCartItemValues } from "../services/dto/cart.dto";

export interface CartState {
    loading: boolean;
    error: boolean;
    totalAmount: string;
    cartItems: CartStateItem[];
    
    // getting items from cart
    fetchCartItems: () => Promise<void>;

    // updating item quantity in cart
    updateItemQuantity: (id: number, quantity: number) => Promise<void>;

    // adding item to cart
    addCartItem: (values: CreateCartItemValues) => Promise<void>;

    // removing item from cart
    removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
    cartItems: [],
    loading: false,
    error: false,
    totalAmount: "0",

    fetchCartItems: async () => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.getCart();
            set(getCartDetails(data))
        } catch (error) {
            console.log(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

    updateItemQuantity: async (id: number, quantity: number) => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.updateItemQuantity(id, quantity);
            set(getCartDetails(data))
        } catch (error) {
            console.log(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

    removeCartItem: async (id: number) => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.removeCartItem(id);
            set(getCartDetails(data))
        } catch (error) {
            console.log(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

    addCartItem: async (values: CreateCartItemValues) => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.addCartItem(values);
            set(getCartDetails(data))
        } catch (error) {
            console.log(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
}));