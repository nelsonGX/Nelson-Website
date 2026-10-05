import type { Metadata } from "next";
import "./globals.css";

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

// <html>/<body> are rendered by app/[locale]/layout.tsx so lang matches the locale.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
