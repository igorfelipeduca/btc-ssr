import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Bitcoin",
  description: "Learn all about Bitcoin - Server-side rendering | Igor Duca",
  openGraph: {
    title: "Bitcoin",
    description: "Learn all about Bitcoin - Server-side rendering | Igor Duca",
    url: "https://btc-ssr.vercel.app/en",
    images: [
      {
        url: "https://i.ibb.co/YcBdyJ0/og.png",
        width: 1200,
        height: 630,
        alt: "Bitcoin",
      },
    ],
    siteName: "Bitcoin Learning",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@ducaswtf",
    title: "Bitcoin",
    description: "Learn all about Bitcoin - Server-side rendering | Igor Duca",
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
