import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { Geist, Geist_Mono } from "next/font/google";
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

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}
 
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const awaitedParams = await params;
  const locale = awaitedParams.locale;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
 
  let messages;
  try {
    messages = (await import(`@/message/${locale}.json`)).default;
  } catch (error) {
    console.error(error);
    notFound();
  }
 
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LoadingProvider>
            <PageTransition />
            <AnimatePresence mode="wait">
              {children}
            </AnimatePresence>
          </LoadingProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}