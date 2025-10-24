import type { Metadata } from "next";
import { Nunito } from "next/font/google";

export const metadata: Metadata = {
  title: "Next Keyboards | Main",
  description:
    "Next Keyboards is a keyboard store that sells mechanical keyboards, keycaps, and accessories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      dashboard header
      {children}
    </main>
  );
}
