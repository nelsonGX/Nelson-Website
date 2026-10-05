import React from 'react';
import { Mail } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const Footer: React.FC = () => {
  const t = useTranslations('layout.footer');
  const iconLink = "flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 transition-colors hover:border-orange-300/40 hover:text-orange-300";

  return (
    <footer className="relative border-t border-white/[0.08] bg-ink px-4 py-10 text-zinc-400 md:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <Image src="/assets/images/nelsongx.png" alt="" width={36} height={36} className="rounded-lg" />
            <div>
              <p className="font-minecraft text-lg">
                <span className="text-orange-300">Nelson</span><span className="text-zinc-200">&apos;s</span>
              </p>
              <p className="text-sm text-zinc-500">{t('subtitle')}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <a href="mailto:hi@nelsongx.com" aria-label="Email" className={iconLink}>
              <Mail size={18} />
            </a>
            <a href="https://github.com/nelsonGX" aria-label="GitHub" className={iconLink}>
              <SiGithub size={18} />
            </a>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-1 gap-y-1 border-t border-white/[0.06] pt-6 text-sm text-zinc-600">
          <span className="text-zinc-500">{t('websiteName')}</span>
          <span>&copy; {t('copyright')}</span>
          <span>{t('openSource.text')}</span>
          <a href="https://github.com/nelsonGX/Nelson-Website" className="text-zinc-400 underline decoration-zinc-700 underline-offset-4 hover:text-orange-300">{t('openSource.github')}</a>
          <span>{t('openSource.license')}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
