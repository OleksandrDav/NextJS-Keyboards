import { serializePrismaData } from "@/shared/lib/serialize";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { ChooseKeyboardModal } from "@/shared/components/shared/modals/choose-keyboard-modal";

export default async function KeyboardModalPage({
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
    return notFound(); // will give error on props instead
  }

  const serializedKeyboard = serializePrismaData(keyboard);

  return <ChooseKeyboardModal keyboard={serializedKeyboard} />;
}
