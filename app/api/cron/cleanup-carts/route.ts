import { NextRequest, NextResponse } from "next/server";
import { cleanupOldGuestCarts, cleanupEmptyCarts } from "@/shared/lib/cleanup-carts";

export async function GET(req: NextRequest) {
  try {
    // Verify request is from Vercel Cron
    const authHeader = req.headers.get("authorization");

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      console.error("[CRON] Unauthorized access attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("[CRON] Starting automatic cart cleanup...");

    // Delete guest carts older than 30 days
    const oldCartsDeleted = await cleanupOldGuestCarts(30);

    // Delete empty guest carts
    const emptyCartsDeleted = await cleanupEmptyCarts();

    console.log(`[CRON] Cleanup complete:
      - Old guest carts deleted: ${oldCartsDeleted}
      - Empty guest carts deleted: ${emptyCartsDeleted}
    `);

    return NextResponse.json({
      success: true,
      oldCartsDeleted,
      emptyCartsDeleted,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[CRON] Cleanup failed:", error);
    return NextResponse.json({ error: "Cleanup failed" }, { status: 500 });
  }
}
