import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const code = req.nextUrl.searchParams.get("code");
        if (!code) {
            return NextResponse.json("Verification code is missing", { status: 400 });
        }

        const verificationCode = await prisma.verificationCode.findFirst({
            where: {
                code,
            },
        }); 
        if (!verificationCode) {
            return NextResponse.json("Invalid verification code", { status: 400 });
        }
        const user = await prisma.user.update({
            where: {
                id: verificationCode.userId,
            },
            data: {
                verified: new Date(),
            },
        });

        await prisma.verificationCode.deleteMany({
            where: {
                userId: user.id,
            },
        });

        return NextResponse.redirect(new URL("/?verified", req.url));
    } catch (error) {
        console.error("Error [Verify GET]", error);

    }
}