import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  const switches = await prisma.switch.findMany({
    where: {
      inStock: true,
    },
    orderBy: {
      keyboards: {
        _count: 'desc',
      },
    },
  });

  return NextResponse.json(switches);
}