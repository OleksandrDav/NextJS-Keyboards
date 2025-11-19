import type { Metadata } from "next";
import { Header } from "@/shared/components/shared";
import { Suspense } from "react";
import { HeaderSkeleton } from "@/shared/components/shared/header-skelton";

export const metadata: Metadata = {
  title: "Next Keyboards | Main",
  description: "Next Keyboards is a keyboard store that sells mechanical keyboards, keycaps, and accessories.",
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<HeaderSkeleton className="sticky top-0 bg-white z-50 " />}>
        <Header className="sticky top-0 bg-white z-50 " />
      </Suspense>
      {children}
      {modal}
    </main>
  );
}
