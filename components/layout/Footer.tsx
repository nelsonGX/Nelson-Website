import React from 'react';
import { Github, Mail } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const Footer: React.FC = () => {
  const t = useTranslations('layout.footer');
  return (
    <footer className="bg-zinc-950 text-zinc-400 pb-8 relative">
      {/* SVG positioned as an overlay at the top of the footer */}
      <div className="absolute top-0 left-0 w-full transform -translate-y-full">
        <Image 
          src="/assets/images/footer-trans.svg" 
          alt="" 
          width={1920}
          height={100}
          className="w-full h-auto"
        />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-white flex items-center">
              <span className="text-orange-300">Nelson</span><span>&apos;</span>
            </h3>
            <p className="text-zinc-500">{t('subtitle')}</p>
          </div>
          <div className="flex space-x-4">
            <a href="mailto:hi@nelsongx.com" className="hover:text-orange-400 transition">
              <Mail size={20} />
            </a>
            <a href="https://github.com/nelsonGX" className="hover:text-orange-400 transition">
              <Github size={20} />
            </a>
          </div>
        </div>
        <div className="mt-6 text-center text-zinc-600 text-sm px-4">
          <div className="flex flex-wrap items-center justify-center gap-1">
            <span className="text-zinc-500">{t('websiteName')}</span>
            <span>&copy; {t('copyright')}</span>
            <span>{t('openSource.text')}</span>
            <a href="https://github.com/nelsonGX/Nelson-Website" className="text-orange-300/50">{t('openSource.github')}</a>
            <span>{t('openSource.license')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;