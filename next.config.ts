import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
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
      }
    ],
  },
};

const withNextIntl = createNextIntlPlugin('./i18n/requests.ts');
export default withNextIntl(nextConfig);