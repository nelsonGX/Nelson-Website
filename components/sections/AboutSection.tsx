import React, { useState } from 'react';
import { FaPython, FaJava, FaJs, FaReact, FaLeaf, FaLinux } from 'react-icons/fa';
import { Globe, Server, ArrowUpRight, LayoutGrid, SquareTerminal } from 'lucide-react';
import TerminalComponent from '../ui/TerminalComponent';
import Image from 'next/image';
import { TextReveal } from '../ui/TextReveal';
import SectionHeading, { cardClass } from '../ui/SectionHeading';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const AboutSection: React.FC = () => {
  const t = useTranslations('home.about');
  const [viewMode, setViewMode] = useState<'gui' | 'terminal'>('gui');

  const techStack = [
    { name: 'Python', icon: <FaPython className="text-blue-300" />, confidence: t('techStack.python.confidence') },
    { name: 'Java', icon: <FaJava className="text-red-400" />, confidence: t('techStack.java.confidence') },
    { name: 'JavaScript', icon: <FaJs className="text-yellow-400" />, confidence: t('techStack.javascript.confidence') },
    { name: 'Next.JS', icon: <Image src="/assets/images/nextjs.webp" alt="" width={16} height={16} />, confidence: t('techStack.nextjs.confidence') },
    { name: 'React', icon: <FaReact className="text-sky-400" />, confidence: t('techStack.react.confidence') },
    { name: 'Tailwind CSS', icon: <Image src="/assets/images/tailwind.webp" alt="" width={16} height={10} />, confidence: t('techStack.tailwind.confidence') },
    { name: 'MongoDB', icon: <FaLeaf className="text-green-500" />, confidence: t('techStack.mongodb.confidence') },
    { name: 'CraftBukkit', icon: <Image src="/assets/images/craftbukkit.webp" alt="" width={16} height={16} />, confidence: t('techStack.craftbukkit.confidence') },
    { name: 'Linux', icon: <FaLinux className="text-zinc-300" />, confidence: t('techStack.linux.confidence') },
    { name: 'Networking', icon: <Globe className="size-4 text-emerald-400" />, confidence: t('techStack.networking.confidence') },
    { name: 'Infrastructure', icon: <Server className="size-4 text-orange-300" />, confidence: t('techStack.infrastructure.confidence') }
  ];

  const pastProjects = [
    {
      title: 'CheapServer',
      description: t('projects.cheapserver.description'),
      since: t('projects.cheapserver.since'),
      link: 'https://cheapserver.tw',
      tech: ["Networking", "Infrastructure", "Linux"]
    },
    {
      title: 'FreeServer v3',
      description: t('projects.freeserver.description'),
      since: t('projects.freeserver.since'),
      link: 'https://freeserver.tw',
      tech: ["Networking", "Linux", "Next.JS", "JavaScript"]
    },
    {
      title: 'FreeServer Network',
      description: t('projects.freeserverNetwork.description'),
      since: t('projects.freeserverNetwork.since'),
      link: 'https://freeserver.network',
      tech: ["Networking", "Infrastructure", "Linux", "Java", "CraftBukkit", "Next.JS"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] as const } }
  };

  const toggle = (
    <div role="tablist" aria-label="View mode" className="flex w-fit items-center rounded-full border border-white/10 bg-white/[0.03] p-1 text-sm">
      {([
        { mode: 'gui', label: t('buttons.gui'), icon: <LayoutGrid size={15} /> },
        { mode: 'terminal', label: t('buttons.terminal'), icon: <SquareTerminal size={15} /> }
      ] as const).map(({ mode, label, icon }) => (
        <button
          key={mode}
          type="button"
          role="tab"
          aria-selected={viewMode === mode}
          onClick={() => setViewMode(mode)}
          className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition-colors ${
            viewMode === mode ? 'bg-orange-300 text-zinc-950 font-medium' : 'text-zinc-400 hover:text-zinc-100'
          }`}
        >
          {icon}
          {label}
        </button>
      ))}
    </div>
  );

  return (
    <section id="about" className="relative scroll-mt-20 px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="01"
          label="about"
          before={t('title.whoAm')}
          accent={t('title.i')}
          after="?"
          aside={toggle}
        />

        {viewMode === 'gui' ? (
          <motion.div
            key="gui-view"
            className="grid grid-cols-1 gap-4 md:grid-cols-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {/* Intro */}
            <motion.div variants={itemVariants} className={`${cardClass} p-6 md:col-span-7 md:p-8`}>
              <div className="mb-6 flex items-center gap-4">
                <Image src="/assets/images/nelsongx.png" alt="" width={56} height={56} className="rounded-xl ring-1 ring-white/10" />
                <div>
                  <p className="text-xl font-semibold text-zinc-50">Nelson</p>
                  <p className="font-mono text-sm text-zinc-500">@nelsonGX</p>
                </div>
              </div>
              <div className="space-y-4 text-[15px] leading-relaxed text-zinc-300 md:text-base">
                <TextReveal as="p" className="block text-zinc-100">{t('description.intro')}</TextReveal>
                <TextReveal as="p" className="block">{t('description.work')}</TextReveal>
                <TextReveal as="p" className="block">{t('description.community')}</TextReveal>
              </div>
            </motion.div>

            {/* Projects / services */}
            <motion.div variants={itemVariants} className={`${cardClass} flex flex-col p-6 md:col-span-5 md:p-8`}>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">{t('sections.projects')}</h3>
              <ul className="-mx-3 flex flex-1 flex-col">
                {pastProjects.map((project) => (
                  <li key={project.title}>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block rounded-xl px-3 py-4 transition-colors hover:bg-white/[0.04]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium text-zinc-100 transition-colors group-hover:text-orange-200">{project.title}</p>
                          <p className="mt-1 text-sm text-zinc-400">{project.description}</p>
                        </div>
                        <ArrowUpRight size={18} className="mt-0.5 shrink-0 text-zinc-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange-300" />
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        <span className="mr-1 font-mono text-[11px] text-orange-300/80">{project.since}</span>
                        {project.tech.map((tech) => (
                          <span key={tech} className="rounded-full border border-white/[0.08] px-2 py-0.5 text-[11px] text-zinc-400">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Tech stack */}
            <motion.div variants={itemVariants} className={`${cardClass} p-6 md:col-span-12 md:p-8`}>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">{t('sections.techStack')}</h3>
              <ul className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <li
                    key={tech.name}
                    tabIndex={0}
                    className="group relative flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-sm text-zinc-200 outline-none transition-colors hover:border-orange-300/40 focus-visible:border-orange-300/60"
                  >
                    <span className="flex size-4 items-center justify-center">{tech.icon}</span>
                    {tech.name}
                    <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md border border-white/10 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-300 opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                      {tech.confidence}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="terminal-view"
            className="h-[560px] overflow-hidden rounded-2xl border border-white/10 bg-black/80 shadow-2xl shadow-black/50 backdrop-blur"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <TerminalComponent onExit={() => setViewMode('gui')} />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AboutSection;
