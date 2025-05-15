import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
 
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const awaitedParams = await params;
  const locale = awaitedParams.locale;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
 
  let messages;
  try {
    messages = (await import(`@/message/${locale}.json`)).default;
  } catch (error) {
    console.error(error);
    notFound();
  }
 
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}