import { Header } from "@/shared/components/shared";
import { HeaderSkeleton } from "@/shared/components/shared/header-skelton";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Next Keyboards | Cart",
  description: "Next Keyboards is a keyboard store that sells mechanical keyboards, keycaps, and accessories.",
};

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-[#F4F1EE]">
      <Suspense fallback={<HeaderSkeleton hasSearch={false} hasCart={false} className="border-gray-200" />}>
        <Header hasSearch={false} hasCart={false} className="border-gray-200" />
      </Suspense>
      {children}
    </main>
  );
}
