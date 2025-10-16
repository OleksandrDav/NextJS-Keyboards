import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const users = await prisma.user.findMany();
    return NextResponse.json({users}); 
}

export async function POST(req: NextRequest) {
    const data = await req.json();

    const user = await prisma.user.create({
        data
    })
    return NextResponse.json(user);
}

export async function DELETE(req: NextRequest) {
    const { id } = await req.json();
    const user = await prisma.user.delete({
        where: {
            id
        }
    })
    return NextResponse.json(user);
}