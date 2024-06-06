import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bitcoin",
  description: "Bitcoin learning - Server-side rendering | Igor Duca",
  openGraph: {
    title: "Bitcoin",
    description: "Bitcoin learning - Server-side rendering | Igor Duca",
    url: "https://bitcoin.igorfelipeduca.com",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Bitcoin",
      },
    ],
    siteName: "Bitcoin",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
