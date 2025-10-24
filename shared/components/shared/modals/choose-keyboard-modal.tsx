"use client";

import { Keyboard } from "@prisma/client";
import React from "react";
import { cn } from "@/shared/lib/utils";
import { Dialog } from "@/shared/components/ui";
import { DialogContent } from "@/shared/components/ui/dialog";
import { useRouter } from "next/navigation";
import { ChooseKeyboardModalContent } from "./choose-keyboard-modal-content";
import { KeyboardWithRelations } from "@/@types/keyboard";

interface Props {
  keyboard: KeyboardWithRelations;
  className?: string;
}

export const ChooseKeyboardModal: React.FC<Props> = ({
  className,
  keyboard,
}) => {
  const router = useRouter();
  
  return (
    <Dialog open={Boolean(keyboard)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 bg-white overflow-hidden",
          "max-w-[95vw] lg:max-w-4xl xl:max-w-5xl w-full", // Explicit width control
          "max-h-[90vh]", // Add maximum height
          "sm:rounded-lg", // Ensure rounded corners if needed
          className
        )}
      >
        <ChooseKeyboardModalContent keyboard={keyboard} />
      </DialogContent>
    </Dialog>
  );
};