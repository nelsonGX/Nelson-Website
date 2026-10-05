import React from 'react';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';

interface SectionHeadingProps {
  index: string;
  label: string;
  before: string;
  accent: string;
  after?: string;
  // Whether a space follows the accent word in English ("What can I do?" vs "Who am I?")
  spaceAfterAccent?: boolean;
  aside?: React.ReactNode;
}

export const cardClass = 'rounded-2xl border border-white/[0.08] bg-white/[0.025]';

export default function SectionHeading({
  index,
  label,
  before,
  accent,
  after = '',
  spaceAfterAccent = false,
  aside
}: SectionHeadingProps) {
  const isEnglish = useLocale() === 'en';
  const gap = isEnglish ? ' ' : '';

  return (
    <div className="mb-10 md:mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <p className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
          <span className="text-orange-300">{index}</span>
          <span className="h-px w-8 bg-zinc-700" />
          {label}
        </p>
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-zinc-50">
          {before && <>{before}{gap}</>}
          <span className="text-orange-300">{accent}</span>
          {after && <>{spaceAfterAccent ? gap : ''}{after}</>}
        </h2>
      </motion.div>
      {aside}
    </div>
  );
}
