import { prisma } from "@/prisma/prisma-client";

// Delete guest carts older than specified days
export async function cleanupOldGuestCarts(daysOld: number = 30) {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    const result = await prisma.cart.deleteMany({
      where: {
        userId: null, // Guest carts only
        updatedAt: {
          lt: cutoffDate,
        },
      },
    });

    console.log(`[CLEANUP] Deleted ${result.count} old guest carts`);
    return result.count;
  } catch (error) {
    console.error("[CLEANUP] Error cleaning up guest carts:", error);
    throw error;
  }
}

// Delete empty carts (no items)
export async function cleanupEmptyCarts() {
  try {
    // Find carts with no items
    const emptyCarts = await prisma.cart.findMany({
      where: {
        userId: null, // Only guest carts
        cartItems: {
          none: {},
        },
      },
      select: {
        id: true,
      },
    });

    if (emptyCarts.length === 0) {
      return 0;
    }

    const result = await prisma.cart.deleteMany({
      where: {
        id: {
          in: emptyCarts.map((cart) => cart.id),
        },
      },
    });

    console.log(`[CLEANUP] Deleted ${result.count} empty guest carts`);
    return result.count;
  } catch (error) {
    console.error("[CLEANUP] Error cleaning up empty carts:", error);
    throw error;
  }
}

// Get cart statistics
export async function getCartStats() {
  try {
    const [totalCarts, guestCarts, userCarts, emptyCarts] = await Promise.all([
      prisma.cart.count(),
      prisma.cart.count({ where: { userId: null } }),
      prisma.cart.count({ where: { userId: { not: null } } }),
      prisma.cart.count({
        where: {
          userId: null,
          cartItems: { none: {} },
        },
      }),
    ]);

    return {
      totalCarts,
      guestCarts,
      userCarts,
      emptyCarts,
    };
  } catch (error) {
    console.error("[CLEANUP] Error getting cart stats:", error);
    throw error;
  }
}