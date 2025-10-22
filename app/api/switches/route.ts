import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const switches = await prisma.switch.findMany();
  return NextResponse.json({ switches });
}
