"use client";

import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { CartButton } from "./cart-button";
import { Container } from "./container";
import { ProfileButton } from "./profile-button";
import { SearchInput } from "./search-input";
import { AuthModal } from "./modals/auth-modal/auth-modal";
import { set } from "zod";

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({ className, hasSearch = true, hasCart = true }) => {
  const router = useRouter();
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);

  const searchParams = useSearchParams();

  React.useEffect(() => {
    let toastMessage = "";

    if (searchParams.has("paid")) {
      toastMessage = "Payment successful! Your order is being processed.";
    }

    if (searchParams.has("verified")) {
      toastMessage = "Email verified successfully! You can now log in.";
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace("/");
        toast.success(toastMessage, {
          style: {
            fontSize: "14px",
          },
        });
      }, 500);
    }
  }, []);

  return (
    <header className={cn("border-b", className)}>
      <Container className="flex items-center justify-between">
        {/* Left side */}
        <Link href="/">
          <div className="flex items-center space-x-2">
            {/* Logo - Smaller on mobile */}
            <div className="w-24 h-24">
              <Image src="/logo.png" alt="Next Keyboards" width={150} height={50} className="w-full h-auto" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-2xl uppercase font-bold">Next Keyboards</h1>
              <p className="text-sm text-gray-400 leading-3">Mechanical Keyboards & Keycaps</p>
            </div>
          </div>
        </Link>

        {/** Search Bar - Only on desktop */}
        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Sign In Button - Only icon on mobile */}
          <AuthModal open={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
          <ProfileButton onClickSignIn={() => setIsAuthModalOpen(true)} />

          {/* Cart Block - Only icon on mobile */}
          {hasCart && (
            <div>
              <CartButton />
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};
