import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const colors = await prisma.colorVariant.findMany({
        select: {
            colorName: true,
            colorHex: true,
        },
        distinct: ['colorName'], // Get unique color names
    });

    return NextResponse.json({ colors });
}