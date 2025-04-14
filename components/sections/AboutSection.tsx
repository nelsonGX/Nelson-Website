import React, { useState } from 'react';
import { FaPython, FaJava, FaJs, FaReact, FaLeaf, FaLinux } from 'react-icons/fa';
import { Globe, Server } from 'lucide-react';
import TerminalComponent from '../ui/TerminalComponent';
import Image from 'next/image';

const AboutSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'gui' | 'terminal'>('gui');

  const toggleViewMode = () => {
    setViewMode(prevMode => prevMode === 'gui' ? 'terminal' : 'gui');
  };

  const techStack = [
    { 
      name: 'Python', 
      icon: <FaPython className="text-blue-300" />, 
      bg: "bg-zinc-700/50",
      confidence: "Pretty confident" 
    },
    { 
      name: 'Java', 
      icon: <FaJava className="text-red-400" />, 
      bg: "bg-zinc-700/50",
      confidence: "I do minecraft plugins" 
    },
    { 
      name: 'JavaScript', 
      icon: <FaJs className="text-yellow-400" />, 
      bg: "bg-zinc-700/50",
      confidence: "Not bad, but I hate it"
    },
    { 
      name: 'Next.JS', 
      icon: <Image src="/assets/images/nextjs.webp" alt="Next.js" width={20} height={20} className="text-white" />, 
      bg: "bg-yellow-400/15",
      confidence: "Pretty confident"
    },
    { 
      name: 'React', 
      icon: <FaReact className="text-blue-400" />, 
      bg: "bg-yellow-400/15",
      confidence: "It's just inside nextjs"
    },
    { 
      name: 'Tailwind CSS', 
      icon: <Image src="/assets/images/tailwind.png" alt="Tailwind CSS" width={20} height={20} className="text-white" />, 
      bg: "bg-yellow-400/15",
      confidence: "better than pure css"
    },
    { 
      name: 'MongoDB', 
      icon: <FaLeaf className="text-green-800" />, 
      bg: "bg-yellow-400/15",
      confidence: "I use it (not really well)"
    },
    { 
      name: 'CraftBukkit',
      icon: <Image src="/assets/images/craftbukkit.png" alt="CraftBukkit" width={20} height={20} className="text-white" />,
      bg: "bg-yellow-400/15",
      confidence: "the minecraft plugin api"
    },
    { 
      name: 'Linux', 
      icon: <FaLinux className="text-gray-400" />, 
      bg: "bg-yellow-400/15",
      confidence: "I can read commands"
    },
    { 
      name: 'Networking', 
      icon: <Globe className="text-green-400" />, 
      bg: "bg-orange-400/15",
      confidence: "not bad"
    },
    { 
      name: 'Infrastructure', 
      icon: <Server className="text-orange-400" />, 
      bg: "bg-orange-400/15",
      confidence: "not bad"
    }
  ];

  const pastProjects = [
    {
      title: 'CheapServer',
      description: 'A hosting service for game servers based in Taiwan.',
      since: '2022 - now',
      link: 'https://cheapserver.tw',
      tech: ["Networking", "Infrastructure", "Linux"]
    },
    {
      title: 'FreeServer v3',
      description: 'A free hosting service community.',
      since: '2023 - now',
      link: 'https://freeserver.tw',
      tech: ["Networking", "Linux", "Next.JS", "JavaScript"]
    },
    {
      title: 'FreeServer Network',
      description: 'A Minecraft server focusing on map sharing for creators.',
      since: '2024 - now',
      link: 'https://freeserver.network',
      tech: ["Networking", "Infrastructure", "Linux", "Java", "CraftBukkit", "Next.JS"]
    }
  ];

  return (
    <section id="about" className="min-h-screen py-20 px-2 md:px-6 relative bg-gradient-to-b from-zinc-900 to-zinc-800 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section title outside the Mac window */}
        <div className="flex items-center mb-12">
          <div className="text-6xl font-bold">
            <div className="flex items-center text-white hover:text-zinc-400 duration-500 ease-in-out">
              <h2><span>Who Am</span><span className="text-yellow-100 hover:text-yellow-400 duration-500 ease-in-out">&nbsp;I&nbsp;</span><span>?</span></h2>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-orange-500/50 to-transparent flex-grow ml-6"></div>
        </div>
        
        {/* Mac-style window */}
        <div className="bg-zinc-950/20 rounded-lg overflow-hidden shadow-xl border border-zinc-700">
          {/* Mac-style window header */}
          <div className="bg-zinc-800 px-4 py-2 flex items-center justify-between">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={toggleViewMode}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  viewMode === 'gui' ? 'bg-orange-500 text-white' : 'bg-neutral-700 text-zinc-300 hover:bg-zinc-500'
                }`}
              >
                GUI
              </button>
              <button 
                onClick={toggleViewMode}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  viewMode === 'terminal' ? 'bg-orange-500 text-white' : 'bg-neutral-600 text-zinc-300 hover:bg-zinc-500'
                }`}
              >
                Terminal
              </button>
            </div>
            
            <div className="text-zinc-400 text-xs">nelson@whoami ~ </div>
          </div>
          
          {/* Window content */}
          <div className="p-2 md:p-6">
            {viewMode === 'gui' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10">
                {/* Left column - About me text */}
                <div className="bg-zinc-800/40 backdrop-blur-sm rounded-xl p-6 border border-zinc-700">
                  <p className="text-lg text-gray-300 mb-6">
                    Hello! My name is Nelson, aka nelsonGX. I&apos;m a student from Taiwan, and I have a passion in field of computer related stuff.
                  </p>
                  <p className="text-lg text-gray-300 mb-6">
                    I currently own Very Fast Network LTD, a company based in Taiwan that operates CheapServer hosting services under AS152619. Alongside this main business, I run FreeServer, a free hosting service community. I also manage a Minecraft server called FreeServer Network, which focuses on map sharing for creators.
                  </p>
                  <p className="text-lg text-gray-300 mb-6">
                    I&apos;m actively involved in tech communities, attending conferences like SITCON, HITCON, and COSCUP to learn and network with fellow enthusiasts.
                  </p>
                  <div>
                    <h3 className="text-xl text-orange-400 font-semibold mb-4">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {techStack.map((tech, index) => (
                        <div 
                          key={index} 
                          className={`flex items-center gap-3 px-2 py-1 rounded-lg max-w-fit ${tech.bg} transition-all duration-300 hover:scale-105 relative group cursor-pointer`}
                        >
                          {tech.icon}
                          <span className="text-gray-200 text-sm">{tech.name}</span>
                          {/* Tooltip that appears on hover */}
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1 bg-zinc-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                            <span className="font-medium">{tech.confidence}</span>
                            {/* Triangle pointer */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-zinc-900"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Right column - Tech Stack and Projects */}
                <div className="bg-zinc-800/40 backdrop-blur-sm rounded-xl p-6 border border-zinc-700 h-[560px] overflow-auto">
                  <div className="space-y-8">
                      <h3 className="text-xl text-orange-400 font-semibold mb-4">Projects / Services</h3>
                      <div className="space-y-4">
                        {pastProjects.map((project, index) => (
                          <div key={index} className="bg-zinc-700/50 p-4 rounded-lg">
                            <h4 className="text-lg font-medium text-white">{project.title}</h4>
                            <p className="text-zinc-300 text-sm mt-1">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {project.tech.map((tech, index) => (
                                <span key={index} className="bg-zinc-600/50 text-xs px-2 py-1 rounded-full">{tech}</span>
                              ))}
                            </div>
                            <div className="mt-2 flex justify-between items-center">
                              <span className="text-xs text-zinc-400">{project.since}</span>
                              <a href={project.link} className="text-xs text-orange-400 hover:text-orange-300">Website →</a>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[512px] bg-zinc-800/40 backdrop-blur-sm rounded-xl p-6 border border-zinc-700">
                <TerminalComponent />
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-orange-600/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-1/4 h-1/4 bg-yellow-600/10 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default AboutSection;