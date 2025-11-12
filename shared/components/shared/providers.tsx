'use client';

import React from "react";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from 'nextjs-toploader';

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
      <Toaster position="bottom-right" richColors />
      <NextTopLoader showSpinner={false} />
    </>
  );
};
