"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export const HeaderToastHandler = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
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
  }, [searchParams, router]);

  return null; 
};