import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AnimatePresence } from "framer-motion";
import { LoadingProvider } from "@/components/context/LoadingContext";
import PageTransition from "@/components/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nelson's Website",
  description: "Hi, nice to meet you, this is Nelson's Website. Click to view more!",
  openGraph: {
    title: 'Nelson\'s Website',
    description: 'Hi, nice to meet you, this is Nelson\'s Website. Click to view more!',
    images: [
      {
        url: 'https://nelsongx.com/assets/images/banner.webp',
        width: 2800,
        height: 1080,
        alt: '',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoadingProvider>
          <PageTransition />
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </LoadingProvider>
      </body>
    </html>
  );
}
