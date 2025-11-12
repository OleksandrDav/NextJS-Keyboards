import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { cleanupOldGuestCarts, cleanupEmptyCarts, getCartStats } from "@/shared/lib/cleanup-carts";

export async function POST(req: NextRequest) {
  try {
    // Check if user is admin
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const { action, daysOld } = body;

    let result;

    switch (action) {
      case "cleanup-old":
        result = await cleanupOldGuestCarts(daysOld || 30);
        return NextResponse.json({
          success: true,
          deletedCount: result,
        });

      case "cleanup-empty":
        result = await cleanupEmptyCarts();
        return NextResponse.json({
          success: true,
          deletedCount: result,
        });

      case "stats":
        const stats = await getCartStats();
        return NextResponse.json(stats);

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("[CLEANUP_CARTS] Error:", error);
    return NextResponse.json({ error: "Failed to cleanup carts" }, { status: 500 });
  }
}
