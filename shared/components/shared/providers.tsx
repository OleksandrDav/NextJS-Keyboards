"use client";

import React from "react";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
      <Toaster position="bottom-right" richColors />
      <NextTopLoader 
        color="#1e90ff"
        showSpinner={true}
        template='<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner spinner-center" role="spinner"><span class="loader"></span></div>'
      />
    </>
  );
};