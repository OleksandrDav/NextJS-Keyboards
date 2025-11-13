import { Container, Header } from "@/shared/components/shared";
import type { Metadata } from "next";

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
        <Header hasSearch={false} hasCart={false} className="border-gray-200" />
        {children}
    </main>
  );
}
