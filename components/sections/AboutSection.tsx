import React, { useState } from 'react';
import { Server, Code, Layers, Database, Globe, Github } from 'lucide-react';
import TerminalComponent from '../ui/TerminalComponent';

const AboutSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'gui' | 'terminal'>('gui');

  const toggleViewMode = () => {
    setViewMode(prevMode => prevMode === 'gui' ? 'terminal' : 'gui');
  };

  const techStack = [
    { name: 'React', icon: <Code className="text-blue-400" size={24} /> },
    { name: 'Node.js', icon: <Server className="text-green-400" size={24} /> },
    { name: 'PostgreSQL', icon: <Database className="text-blue-300" size={24} /> },
    { name: 'Docker', icon: <Layers className="text-blue-500" size={24} /> },
    { name: 'AWS', icon: <Globe className="text-orange-400" size={24} /> },
    { name: 'Git', icon: <Github className="text-white" size={24} /> },
  ];

  const pastProjects = [
    {
      title: 'CheapServer',
      description: 'A hosting service for game servers based in Taiwan.',
      since: '2022 - now',
      link: 'https://cheapserver.tw'
    },
    {
      title: 'FreeServer v3',
      description: 'A free hosting service community.',
      since: '2023 - now',
      link: 'https://freeserver.tw'
    },
    {
      title: 'FreeServer Network',
      description: 'A Minecraft server focusing on map sharing for creators.',
      since: '2024 - now',
      link: 'https://freeserver.network'
    }
  ];

  return (
    <section id="about" className="min-h-screen py-20 px-6 relative bg-gradient-to-b from-zinc-900 to-zinc-800 overflow-hidden">
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
          <div className="p-6">
            {viewMode === 'gui' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left column - About me text */}
                <div className="bg-zinc-800/40 backdrop-blur-sm rounded-xl p-6 border border-zinc-700">
                  <p className="text-lg text-gray-300 mb-6">
                    Hello! My name is Nelson, aka nelsonGX. I&apos;m a student from Taiwan, and I have a passion in field of computer related stuff.
                  </p>
                  <p className="text-lg text-gray-300 mb-6">
                    I currently own Very Fast Network LTD, a company based in Taiwan that operates CheapServer hosting services under AS152619. Alongside this main business, I run FreeServer, a free hosting service community designed for people who want to host their own servers.
                  </p>
                  <p className="text-lg text-gray-300 mb-6">
                    I also love to participate in open-source projects and contribute to the community. I believe in the power of collaboration and sharing knowledge.
                  </p>
                  <div>
                    <h3 className="text-xl text-orange-400 font-semibold mb-4">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {techStack.map((tech, index) => (
                        <div key={index} className="flex items-center gap-3 bg-zinc-700/50 px-2 py-1 rounded-lg max-w-min">
                          {tech.icon}
                          <span className="text-gray-200 text-sm">{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Right column - Tech Stack and Projects */}
                <div className="bg-zinc-800/40 backdrop-blur-sm rounded-xl p-6 border border-zinc-700 h-[512px] overflow-auto">
                  <div className="space-y-8">
                      <h3 className="text-xl text-orange-400 font-semibold mb-4">Projects / Services</h3>
                      <div className="space-y-4">
                        {pastProjects.map((project, index) => (
                          <div key={index} className="bg-zinc-700/50 p-4 rounded-lg">
                            <h4 className="text-lg font-medium text-white">{project.title}</h4>
                            <p className="text-zinc-300 text-sm mt-1">{project.description}</p>
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