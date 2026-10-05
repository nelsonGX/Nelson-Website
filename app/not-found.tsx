import Link from 'next/link';
import {routing} from '@/i18n/routing';

// Served as out/404.html for any unknown path. The root layout has no
// <html>/<body>, so this page provides its own.
export default function NotFound() {
  return (
    <html lang={routing.defaultLocale}>
      <body className="min-h-screen bg-ink text-zinc-100 flex flex-col items-center justify-center gap-4 antialiased">
        <h1 className="text-4xl font-semibold">404</h1>
        <p className="text-zinc-400">This page could not be found.</p>
        <Link href="/" className="text-orange-300 hover:text-orange-200">Go home</Link>
      </body>
    </html>
  );
}
