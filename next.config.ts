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
    ],
  },
};

const withNextIntl = createNextIntlPlugin('./i18n/requests.ts');
export default withNextIntl(nextConfig);