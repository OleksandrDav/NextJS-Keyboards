import { prisma } from "@/prisma/prisma-client";
import { calcCartItemPrice } from "./calc-cart-item-price";

export const updateCartTotalAmount = async (token: string) => {
  const userCart = await prisma.cart.findFirst({
    where: { token },
    include: {
      cartItems: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          keyboard: true,
          colorVariant: true,
          switch: true,
        },
      },
    },
  });

  if (!userCart) {
    return;
  }

  const totalAmount = userCart.cartItems.reduce((total, item) => {
    return total + calcCartItemPrice(item);
  }, 0);

  const updatedCart = await prisma.cart.update({
    where: { id: userCart.id },
    data: { totalAmount },
    include: {
      cartItems: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          keyboard: true,
          colorVariant: true,
          switch: true,
        },
      },
    },
  });

  return updatedCart; 
};