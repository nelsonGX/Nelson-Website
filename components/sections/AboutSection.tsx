import React, { useState } from 'react';
import { FaPython, FaJava, FaJs, FaReact, FaLeaf, FaLinux } from 'react-icons/fa';
import { Globe, Server } from 'lucide-react';
import TerminalComponent from '../ui/TerminalComponent';
import Image from 'next/image';
import { TextReveal } from '../ui/TextReveal';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const AboutSection: React.FC = () => {
  const t = useTranslations('home.about');
  const [viewMode, setViewMode] = useState<'gui' | 'terminal'>('gui');

  const toggleViewMode = () => {
    setViewMode(prevMode => prevMode === 'gui' ? 'terminal' : 'gui');
  };

  const techStack = [
    { 
      name: 'Python', 
      icon: <FaPython className="text-blue-300" />, 
      bg: "bg-zinc-700/50",
      confidence: t('techStack.python.confidence')
    },
    { 
      name: 'Java', 
      icon: <FaJava className="text-red-400" />, 
      bg: "bg-zinc-700/50",
      confidence: t('techStack.java.confidence')
    },
    { 
      name: 'JavaScript', 
      icon: <FaJs className="text-yellow-400" />, 
      bg: "bg-zinc-700/50",
      confidence: t('techStack.javascript.confidence')
    },
    { 
      name: 'Next.JS', 
      icon: <Image src="/assets/images/nextjs.webp" alt="Next.js" width={20} height={20} className="text-white" />, 
      bg: "bg-yellow-400/15",
      confidence: t('techStack.nextjs.confidence')
    },
    { 
      name: 'React', 
      icon: <FaReact className="text-blue-400" />, 
      bg: "bg-yellow-400/15",
      confidence: t('techStack.react.confidence')
    },
    { 
      name: 'Tailwind CSS', 
      icon: <Image src="/assets/images/tailwind.png" alt="Tailwind CSS" width={20} height={20} className="text-white" />, 
      bg: "bg-yellow-400/15",
      confidence: t('techStack.tailwind.confidence')
    },
    { 
      name: 'MongoDB', 
      icon: <FaLeaf className="text-green-800" />, 
      bg: "bg-yellow-400/15",
      confidence: t('techStack.mongodb.confidence')
    },
    { 
      name: 'CraftBukkit',
      icon: <Image src="/assets/images/craftbukkit.png" alt="CraftBukkit" width={20} height={20} className="text-white" />,
      bg: "bg-yellow-400/15",
      confidence: t('techStack.craftbukkit.confidence')
    },
    { 
      name: 'Linux', 
      icon: <FaLinux className="text-gray-400" />, 
      bg: "bg-yellow-400/15",
      confidence: t('techStack.linux.confidence')
    },
    { 
      name: 'Networking', 
      icon: <Globe className="text-green-400" />, 
      bg: "bg-orange-400/15",
      confidence: t('techStack.networking.confidence')
    },
    { 
      name: 'Infrastructure', 
      icon: <Server className="text-orange-400" />, 
      bg: "bg-orange-400/15",
      confidence: t('techStack.infrastructure.confidence')
    }
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 12
      }
    }
  };

  // For Mac window dots animation
  const dotVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.2 }
  };

  return (
    <section id="about" className="min-h-screen py-20 px-2 md:px-6 relative bg-gradient-to-b from-zinc-900 to-zinc-800 overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Section title outside the Mac window */}
        <div className="flex items-center mb-12">
          <div className="text-6xl font-bold">
            <TextReveal as="div" className="flex items-center text-white hover:text-zinc-400 duration-500 ease-in-out">
              <h2>
                <span>{t('title.whoAm')}</span>
                <motion.span 
                  className="text-yellow-100 hover:text-yellow-400 duration-500 ease-in-out"
                  whileHover={{ 
                    scale: 1.1, 
                    textShadow: "0 0 8px rgba(251, 191, 36, 0.7)",
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  &nbsp;{t('title.i')}&nbsp;
                </motion.span>
                <span>?</span>
              </h2>
            </TextReveal>
          </div>
          <motion.div 
            className="h-px bg-gradient-to-r from-orange-500/50 to-transparent flex-grow ml-6"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          ></motion.div>
        </div>
        
        {/* Mac-style window */}
        <motion.div 
          className="bg-zinc-950/20 rounded-lg overflow-hidden shadow-custom border border-zinc-700"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ 
            type: "spring",
            stiffness: 50,
            damping: 15,
            delay: 0.2
          }}
        >
          {/* Mac-style window header */}
          <div className="bg-zinc-800 px-4 py-2 flex items-center justify-between">
            <div className="flex space-x-2">
              <motion.div 
                className="w-3 h-3 rounded-full bg-red-500"
                variants={dotVariants}
                initial="initial"
                whileHover="hover"
              ></motion.div>
              <motion.div 
                className="w-3 h-3 rounded-full bg-yellow-500"
                variants={dotVariants}
                initial="initial"
                whileHover="hover"
              ></motion.div>
              <motion.div 
                className="w-3 h-3 rounded-full bg-green-500"
                variants={dotVariants}
                initial="initial"
                whileHover="hover"
              ></motion.div>
            </div>
            
            <div className="flex items-center space-x-2">
              <motion.button 
                onClick={toggleViewMode}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  viewMode === 'gui' ? 'bg-orange-500 text-white' : 'bg-neutral-700 text-zinc-300 hover:bg-zinc-500'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('buttons.gui')}
              </motion.button>
              <motion.button 
                onClick={toggleViewMode}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  viewMode === 'terminal' ? 'bg-orange-500 text-white' : 'bg-neutral-600 text-zinc-300 hover:bg-zinc-500'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('buttons.terminal')}
              </motion.button>
            </div>
            
            <motion.div 
              className="text-zinc-400 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              nelson@whoami ~ 
            </motion.div>
          </div>
          
          {/* Window content */}
          <div className="p-2 md:p-6">
            {viewMode === 'gui' ? (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key="gui-view"
              >
                {/* Left column - About me text */}
                <motion.div 
                  className="bg-zinc-800/40 backdrop-blur-sm rounded-xl p-6 border border-zinc-700"
                  variants={itemVariants}
                >
                  <TextReveal className="text-lg text-gray-300 mb-6">
                    {t('description.intro')}
                  </TextReveal>
                  <TextReveal className="text-lg text-gray-300 mb-6">
                    {t('description.work')}
                  </TextReveal>
                  <TextReveal className="text-lg text-gray-300 mb-6">
                    {t('description.community')}
                  </TextReveal>
                  <motion.div variants={itemVariants}>
                    <h3 className="text-xl text-orange-400 font-semibold mb-4">{t('sections.techStack')}</h3>
                    <motion.div 
                      className="flex flex-wrap gap-2"
                      variants={containerVariants}
                    >
                      {techStack.map((tech, index) => (
                        <motion.div 
                          key={index} 
                          className={`flex items-center gap-3 px-2 py-1 rounded-lg max-w-fit ${tech.bg} transition-all duration-300 hover:scale-105 relative group cursor-pointer`}
                          variants={itemVariants}
                          whileHover={{ 
                            scale: 1.1,
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                            transition: { duration: 0.2 }
                          }}
                        >
                          {tech.icon}
                          <span className="text-gray-200 text-sm">{tech.name}</span>
                          {/* Tooltip that appears on hover */}
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1 bg-zinc-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                            <span className="font-medium">{tech.confidence}</span>
                            {/* Triangle pointer */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-zinc-900"></div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
                
                {/* Right column - Tech Stack and Projects */}
                <motion.div 
                  className="bg-zinc-800/40 backdrop-blur-sm rounded-xl p-6 border border-zinc-700 h-min overflow-auto"
                  variants={itemVariants}
                >
                  <div className="space-y-8">
                    <motion.h3 
                      className="text-xl text-orange-400 font-semibold mb-4"
                      variants={itemVariants}
                    >
                      {t('sections.projects')}
                    </motion.h3>
                    <motion.div 
                      className="space-y-4"
                      variants={containerVariants}
                    >
                      {pastProjects.map((project, index) => (
                        <motion.div 
                          key={index} 
                          className="bg-zinc-700/50 p-4 rounded-lg"
                          variants={itemVariants}
                          whileHover={{ 
                            y: -5,
                            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                            transition: { type: "spring", stiffness: 300, damping: 20 }
                          }}
                        >
                          <h4 className="text-lg font-medium text-white">{project.title}</h4>
                          <p className="text-zinc-300 text-sm mt-1">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {project.tech.map((tech, index) => (
                              <motion.span 
                                key={index} 
                                className="bg-zinc-600/50 text-xs px-2 py-1 rounded-full"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                          <div className="mt-2 flex justify-between items-center">
                            <span className="text-xs text-zinc-400">{project.since}</span>
                            <motion.a 
                              href={project.link} 
                              className="text-xs text-orange-400 hover:text-orange-300 hover-lift"
                              whileHover={{ x: 5 }}
                            >
                              {t('buttons.website')} →
                            </motion.a>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                className="h-[600px] bg-zinc-800/40 backdrop-blur-sm rounded-xl p-6 border border-zinc-700"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <TerminalComponent />
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
     
    </section>
  );
};

export default AboutSection;