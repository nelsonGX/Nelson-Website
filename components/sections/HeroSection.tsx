import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import {useTranslations} from 'next-intl';

const HeroSection = ({}) => {
  const t = useTranslations('home.hero');
  const tFooter = useTranslations('layout.footer');

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">

      {/* Warm glow behind the character */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 size-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[120px]" />

      {/* Container for both Spline and content */}
      <div className="relative w-full h-screen">

        {/* First Spline layer (background) */}
        <motion.div
          className="absolute inset-0 opacity-30 blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
        >
          <Spline scene="https://prod.spline.design/qzOMo-qb58mOWKZN/scene.splinecode" />
        </motion.div>

        {/* Second Spline layer (foreground) */}
        <motion.div
          className="absolute inset-0 z-[5]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <Spline scene="https://prod.spline.design/qzOMo-qb58mOWKZN/scene.splinecode" />
        </motion.div>

        {/* Mask (covers the Spline watermark) */}
        <div className="z-10 bg-ink md:px-50 px-50 xl:py-20 py-10 absolute right-0 bottom-0" />

        {/* Content - positioned absolute to overlay on Spline */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="flex flex-col items-center text-center p-4 rounded-3xl">
            <motion.p
              className="text-2xl md:text-3xl text-zinc-400 font-minecraft mb-2 md:absolute md:top-[28%] md:left-[24%]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              {t('welcome')}
            </motion.p>
            <motion.h1
              className="text-7xl md:text-9xl mb-4 flex font-minecraft md:left-[24%] md:absolute md:top-1/3 drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.8,
                type: "spring",
                stiffness: 100
              }}
            >
              <span className="text-orange-300">Nelson</span>
              <span>&apos;s</span>
              <span className="sr-only"> Website</span>
            </motion.h1>
            <motion.p
              aria-hidden
              className="text-7xl md:text-9xl text-zinc-300 font-minecraft mb-8 md:right-[24%] md:absolute md:top-1/2 drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: 1,
                type: "spring",
                stiffness: 100
              }}
            >
              Website
            </motion.p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-20 mx-auto flex max-w-6xl items-end justify-between px-6 pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.6 }}
      >
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
          <MapPin size={14} className="text-orange-300" />
          {tFooter('subtitle')}
        </p>
        <a href="#about" className="hidden md:flex flex-col items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">{t("scroll")}</span>
          <span className="flex h-9 w-5 justify-center rounded-full border border-zinc-600">
            <span className="mt-1.5 h-2 w-1 rounded-full bg-orange-300 animate-bounce" />
          </span>
        </a>
      </motion.div>

      {/* Fade into the next section */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-40 bg-gradient-to-b from-transparent to-ink" />
    </section>
  );
};

export default HeroSection;
