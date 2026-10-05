import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import SectionHeading from '../ui/SectionHeading';

interface EventsSectionProps {
  events: Record<string, string[]>;
}

// Roles that just mean "I was there" — anything else (organiser, instructor...) gets highlighted
const PLAIN_ROLES = new Set(['Attendee', 'Participator', '會眾', '參與者']);

function splitEvent(event: string) {
  const idx = event.lastIndexOf(' - ');
  if (idx === -1) return { name: event, role: '' };
  return { name: event.slice(0, idx), role: event.slice(idx + 3) };
}

const EventsSection: React.FC<EventsSectionProps> = ({ events }) => {
  const t = useTranslations('home.events');
  let lineNumber = 1;

  // Integer-like object keys iterate in ascending order, so sort newest first explicitly
  const years = Object.entries(events).sort(([a], [b]) => Number(b) - Number(a));
  const byteCount = new TextEncoder().encode(
    years.map(([year, list]) => `# ${year}\n${list.join('\n')}\n`).join('\n')
  ).length;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03 }
    }
  };

  const lineVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.35, ease: [0.2, 0.7, 0.2, 1] as const }
    }
  };

  const gutter = "w-8 md:w-10 shrink-0 select-none pr-3 text-right text-zinc-700";

  return (
    <section id="events" className="relative scroll-mt-20 px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          label="events"
          before={t('title.events')}
          accent={t('title.i')}
          after={t('title.participated')}
        />

        <motion.div
          className="overflow-hidden rounded-2xl border border-white/10 bg-black/80 shadow-2xl shadow-black/50 backdrop-blur"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {/* Terminal top bar */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-white/[0.08] bg-white/[0.03] px-4 py-2.5">
            <div className="flex gap-2">
              <span className="size-3 rounded-full bg-[#ff5f57]" />
              <span className="size-3 rounded-full bg-[#febc2e]" />
              <span className="size-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="font-mono text-xs text-zinc-400">{t('terminal.prompt')}</div>
            <div className="hidden justify-self-end font-mono text-xs text-zinc-600 sm:block">{t('terminal.command')}</div>
          </div>

          <div className="overflow-x-auto px-2 py-5 md:px-4 md:py-6">
            <motion.div
              className="min-w-fit font-mono text-[13px] leading-7 md:text-sm"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {years.map(([year, eventList]) => (
                <React.Fragment key={year}>
                  <motion.div className="flex" variants={lineVariants}>
                    <span className={gutter}>{lineNumber++}</span>
                    <span className="font-bold text-violet-400">
                      <span className="text-violet-400/60"># </span>{year}
                    </span>
                  </motion.div>
                  {eventList.map((event) => {
                    const { name, role } = splitEvent(event);
                    const highlighted = role !== '' && !PLAIN_ROLES.has(role);
                    return (
                      <motion.div
                        key={event}
                        className="group flex whitespace-nowrap hover:bg-white/[0.03]"
                        variants={lineVariants}
                      >
                        <span className={`${gutter} group-hover:text-zinc-400`}>{lineNumber++}</span>
                        <span className="text-zinc-600">-&nbsp;</span>
                        <span className="text-zinc-200">{name}</span>
                        {role && (
                          <span className={highlighted ? 'text-orange-300' : 'text-zinc-500'}>
                            &nbsp;- {role}
                          </span>
                        )}
                      </motion.div>
                    );
                  })}
                  <div className="flex">
                    <span className={gutter}>{lineNumber++}</span>
                  </div>
                </React.Fragment>
              ))}

              <div className="flex flex-col pl-2 text-sky-700">
                <span>~</span>
                <span>~</span>
                <span>~</span>
              </div>
            </motion.div>
          </div>

          {/* Status line */}
          <div className="flex items-center justify-between gap-4 border-t border-white/[0.08] bg-white/[0.03] px-4 py-2 font-mono text-xs text-zinc-500">
            <span className="truncate">{t('terminal.file')} {lineNumber - 1}L, {byteCount}B</span>
            <div className="flex shrink-0 items-center gap-8 md:gap-12">
              <span>1,1</span>
              <span className="flex items-center">
                {t('terminal.all')}
                <motion.span
                  className="ml-1 inline-block h-4 w-2 bg-zinc-400"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;
