import { Button, Dialog, DialogContent, DialogTitle } from "@/shared/components/ui";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@/shared/lib/utils";
import React from "react";
import { OAuth } from "./o-auth";
import { LoginForm } from "./forms/login-form";
import { RegistrationForm } from "./forms/registration-form";

interface Props {
  className?: string;
  open: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ className, onClose, open }) => {
    const [type, setType] = React.useState<"login" | "register">("login");

    const onSwitchType = () => {
        setType(type === "login" ? "register" : "login");
    }

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[450px] bg-white p-10">
        <VisuallyHidden>
          <DialogTitle>{"Authentication form"}</DialogTitle>
        </VisuallyHidden>


        {type === "login" ? (
            <LoginForm onClose={onClose} />
        ) : (
            <RegistrationForm onClose={onClose} />
        )}
        <Button onClick={onSwitchType} className="h-12" variant="outline" type="button">
            {type === "login" ? "Switch to Registration" : "Switch to Login"}
        </Button>


        <hr />
        <OAuth className="flex gap-2" />

        
      </DialogContent>
    </Dialog>
  );
};