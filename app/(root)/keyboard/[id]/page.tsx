import KeyboardPageClient from "@/shared/components/shared/keyboard-page/keyboard-page-client";
import { serializePrismaData } from "@/shared/lib/serialize";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function KeyboardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const keyboard = await prisma.keyboard.findFirst({
    where: { id: String(id) },
    include: {
      layout: true,
      switches: true,
      colorVariants: {
        include: {
          additionalImages: true,
        },
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
  });

  if (!keyboard) {
    return notFound();
  }

  const serializedLayouts = serializePrismaData(keyboard);

  return <KeyboardPageClient keyboard={serializedLayouts} />;
}