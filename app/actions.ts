"use server";

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "@/shared/components/shared/checkout/checkout-form-schema";
import { OrderConfirmationTemplate } from "@/shared/components/shared/emails/order-confirmation";
import { UserVerification } from "@/shared/components/shared/emails/user-verification";
import {
  ProfileUpdateFormValues
} from "@/shared/components/shared/modals/auth-modal/forms/schema";
import { sendEmail } from "@/shared/lib/email-service";
import { getUserSession } from "@/shared/lib/get-user-session";
import { createPayment } from "@/shared/lib/payment-service";
import { Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies, headers } from "next/headers";
import React from "react";

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = await cookies();
    const cartToken = cookieStore.get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("Cart token not found");
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        cartItems: {
          include: {
            keyboard: true,
            colorVariant: true,
            switch: true,
          },
        },
      },
      where: { token: cartToken },
    });

    if (!userCart) {
      throw new Error("Cart not found");
    }

    if (userCart?.cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    const orderItems = userCart.cartItems.map((item) => ({
      id: item.id,
      cartId: item.cartId,
      keyboardId: item.keyboardId,
      colorVariantId: item.colorVariantId,
      switchId: item.switchId,
      quantity: item.quantity,
      keyboard: {
        id: item.keyboard.id,
        name: item.keyboard.name,
        basePrice: item.keyboard.basePrice,
        discountPercentage: item.keyboard.discountPercentage,
        description: item.keyboard.description,
      },
      colorVariant: {
        id: item.colorVariant.id,
        colorName: item.colorVariant.colorName,
        colorHex: item.colorVariant.colorHex,
        imageUrl: item.colorVariant.imageUrl,
      },
      switch: {
        id: item.switch.id,
        name: item.switch.name,
        type: item.switch.type,
        priceModifier: item.switch.priceModifier,
      },
      calculatedPrice: (
        Number(item.keyboard.basePrice) * (1 - Number(item.keyboard.discountPercentage) / 100) +
        Number(item.switch.priceModifier)
      ).toString(),
    }));

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        userId: userCart.user?.id,
        totalAmount: userCart.totalAmount,
        firstName: data.firstName,
        lastName: data.lastName,
        items: orderItems,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        zipCode: data.zipCode,
        deliveryInstructions: data.deliveryInstructions,
      },
    });

    console.log("[Order] Created order:", order.id);

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    // Get customer IP
    const headersList = await headers();
    const customerIp = headersList.get("x-forwarded-for")?.split(",")[0] || headersList.get("x-real-ip") || "127.0.0.1";

    console.log("[Order] Customer IP:", customerIp);

    const products = userCart.cartItems.map((item) => {
      const basePrice = Number(item.keyboard?.basePrice || 0);
      const switchModifier = Number(item.switch?.priceModifier || 0);
      const discountPercentage = Number(item.keyboard?.discountPercentage || 0);

      const discountedBasePrice = basePrice * (1 - discountPercentage / 100);
      const pricePerItem = discountedBasePrice + switchModifier;

      // Convert CZK → haléře (multiply by 100 and round)
      const unitPriceInHalere = Math.round(pricePerItem * 100);

      return {
        name: item.keyboard?.name || "Product",
        unitPrice: unitPriceInHalere.toString(),
        quantity: item.quantity.toString(),
        colorVariant: {
          colorName: item.colorVariant.colorName,
          imageUrl: item.colorVariant.imageUrl,
        },
        switch: {
          name: item.switch.name,
          type: item.switch.type,
        },
      };
    });

    console.log("[Order] Products for PayU:", products);

    // FIX 3: Convert total amount to haléře (CZK smallest unit)
    const totalAmountInHalere = Math.round(Number(order.totalAmount) * 100);

    console.log("[Order] Total amount in haléře:", totalAmountInHalere);

    // Create payment with PayU
    const paymentData = await createPayment({
      amount: totalAmountInHalere,
      orderId: order.id,
      description: `Order #${order.id}`,
      products,
      customerIp,
      buyerEmail: data.email,
      buyerFirstName: data.firstName,
      buyerLastName: data.lastName,
    });

    if (!paymentData) {
      throw new Error("Payment data not found");
    }

    console.log("[Order] Payment created:", paymentData.paymentId);

    // Update order with payment ID
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.paymentId,
      },
    });

    await sendEmail(
      data.email,
      "Next Keyboards / Pay for your order #" + order.id,
      React.createElement(OrderConfirmationTemplate, {
        orderId: order.id,
        data: data,
        paymentUrl: paymentData.redirectUri,
      })
    );

    console.log("[Order] ✅ Order created successfully:", {
      orderId: order.id,
      paymentId: paymentData.paymentId,
      redirectUri: paymentData.redirectUri,
    });

    return {
      success: true,
      orderId: order.id,
      paymentUrl: paymentData.redirectUri,
    };
  } catch (error) {
    console.error("[Order] ❌ Order creation failed:", error);
    if (error instanceof Error) {
      console.error("[Order] Error message:", error.message);
      console.error("[Order] Error stack:", error.stack);
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create order",
    };
  }
}

export async function updateUserInfo(body: ProfileUpdateFormValues) {
  try {
    const currentUser = await getUserSession();
    if (!currentUser) {
      throw new Error("Not authenticated");
    }

    // Build the data object dynamically
    const updateData: Prisma.UserUpdateInput = {
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
    };

    if (body.password) {
      updateData.password = hashSync(body.password, 10);
    }

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: updateData,
    });
  } catch (error) {
    console.error("Error [updateUserInfo]", error);
    throw error;
  }
}

export async function createUser(body: { email: string; firstName: string; lastName: string; password: string }) {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const createdUser = await prisma.user.create({
      data: {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        password: hashSync(body.password, 10),
      },
    });

    const cookieStore = await cookies();
    const cartToken = cookieStore.get("cartToken")?.value;

    if (cartToken) {
      const guestCart = await prisma.cart.findFirst({
        where: {
          token: cartToken,
          userId: null,
        },
      });

      if (guestCart) {
        await prisma.cart.delete({
          where: { id: guestCart.id },
        });
      }
    }

    cookieStore.delete("cartToken");

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        userId: createdUser.id,
        code,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    await sendEmail(
      createdUser.email,
      "Next Keyboards / Verify your account",
      React.createElement(UserVerification, {
        code,
      })
    );
  } catch (error) {
    console.error("Error [createUser]", error);
    throw error;
  }
}
