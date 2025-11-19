import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  const colors = await prisma.colorVariant.findMany({
    where: {
      inStock: true,
    },
    select: {
      id: true,
      colorName: true,
      colorHex: true,
    },
    distinct: ["colorName"], // Get unique color names
  });

  return NextResponse.json(colors);
}
