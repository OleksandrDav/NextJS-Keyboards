import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = (await req.json()) as { quantity: number };
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ message: "No cart token provided" }, { status: 401 });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: Number(id),
        cart: { token },
      },
    });

    if (!cartItem) {
      return NextResponse.json({ message: "Cart item not found" }, { status: 404 });
    }

    await prisma.cartItem.update({
      where: { id: Number(id) },
      data: { quantity: body.quantity },
    });

    const updatedCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedCart, { status: 200 });
  } catch (error) {
    console.log("[CART_PATCH] Server error", error);
    return NextResponse.json({ message: "[CART_PATCH] Failed to update cart item" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ message: "No cart token provided" }, { status: 401 });
    }
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: Number(id),
        cart: { token },
      },
    });
    if (!cartItem) {
      return NextResponse.json({ message: "Cart item not found" }, { status: 404 });
    }
    await prisma.cartItem.delete({
      where: { id: Number(id) },
    });

    const updatedCart = await updateCartTotalAmount(token);
    return NextResponse.json(updatedCart, { status: 200 });
  } catch (error) {
    console.log("[CART_DELETE] Server error", error);

    return NextResponse.json({ message: "Failed to delete cart item" }, { status: 500 });
  }
}
