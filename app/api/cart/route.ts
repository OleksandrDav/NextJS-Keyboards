import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { findOrCreateCart } from "@/shared/lib/find-or-create-cart";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: "0", cartItems: [] });
    }

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
      return NextResponse.json({ totalAmount: "0", cartItems: [] });
    }

    return NextResponse.json(userCart);
  } catch (error) {
    console.log("[CART_GET] Server error", error);

    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;
    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);
    const data = (await req.json()) as CreateCartItemValues;

    await prisma.cartItem.upsert({
      where: {
        cartId_keyboardId_colorVariantId_switchId: {
          cartId: userCart.id,
          keyboardId: data.keyboardId,
          colorVariantId: data.colorVariantId,
          switchId: data.switchId,
        },
      },
      update: {
        quantity: { increment: 1 },
      },
      create: {
        cartId: userCart.id,
        keyboardId: data.keyboardId,
        colorVariantId: data.colorVariantId,
        switchId: data.switchId,
        quantity: 1,
      },
    });

    const updatedCart = await updateCartTotalAmount(token);

    const response = NextResponse.json(updatedCart, { status: 200 });
    response.cookies.set("cartToken", token);
    return response;
  } catch (error) {
    console.log("[CART_POST] Server error", error);
    return NextResponse.json({ error: "Failed to create cart" }, { status: 500 });
  }
}
