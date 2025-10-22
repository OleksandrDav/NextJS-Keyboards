// /api/keyboards/search?query=name
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

// app/api/keyboards/search/route.ts
export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams.get("query") || "";
    const keyboards = await prisma.keyboard.findMany({
        where: {
            name: {
                contains: query,
                mode: 'insensitive',
            }
        },
        include: {
            colorVariants: {
                where: { isDefault: true },
                take: 1
            }
        }
    })
    
    return NextResponse.json(keyboards);
}