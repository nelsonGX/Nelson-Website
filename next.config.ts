import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  // Fully static site served by Cloudflare Pages (no server runtime).
  output: 'export',
  images: {
    // The image optimizer needs a server, so images are served as-is.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'yimang.tw',
        pathname: '/images/avatar.webp',
      },
      {
        protocol: 'https',
        hostname: 'owen0924.com',
        pathname: '/assets/home/home.png',
      },
      {
        protocol: 'https',
        hostname: 'gravatar.com',
        pathname: '/avatar/**',
      }
    ],
  },
};

const withNextIntl = createNextIntlPlugin('./i18n/requests.ts');
export default withNextIntl(nextConfig);