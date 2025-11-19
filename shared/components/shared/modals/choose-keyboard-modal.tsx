"use client";

import { KeyboardWithRelations } from "@/@types/keyboard";
import { Dialog } from "@/shared/components/ui";
import { DialogContent, DialogTitle } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useRouter } from "next/navigation";
import React from "react";
import { ChooseKeyboardModalContent } from "./choose-keyboard-modal-content";

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
          "max-w-[95vw] lg:max-w-4xl xl:max-w-5xl w-full",
          "max-h-[90vh]",
          "sm:rounded-lg",
          className
        )}
      >
        <VisuallyHidden>
          <DialogTitle>{keyboard?.name || "Keyboard Details"}</DialogTitle>
        </VisuallyHidden>
        <ChooseKeyboardModalContent keyboard={keyboard} />
      </DialogContent>
    </Dialog>
  );
};