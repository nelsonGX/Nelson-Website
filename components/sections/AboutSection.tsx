import React from 'react';
import { Server, Code, Terminal } from 'lucide-react';
import TerminalComponent from '../ui/TerminalComponent';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="min-h-screen py-20 px-6 relative bg-gradient-to-b from-zinc-900 to-zinc-800 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center mb-16">
          <div className="text-6xl font-bold">
            <div className="flex items-center text-white hover:text-zinc-400 duration-500 ease-in-out">
              <h2>Who Am</h2><h2 className="text-yellow-100 hover:text-yellow-400 duration-500 ease-in-out">&nbsp;I&nbsp;</h2><h2>?</h2>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-orange-500/50 to-transparent flex-grow ml-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-zinc-800/40 backdrop-blur-sm rounded-xl p-6 border border-zinc-700">
            <p className="text-lg text-gray-300 mb-6">
              Hello! My name is Nelson. I&apos;m a student from Taiwan. I have a passion in field of computer related stuff.
            </p>
            <p className="text-lg text-gray-300 mb-6">
              I love exploring new technologies, participating in tech events, and building interesting projects. My interests span from server management to web development and everything in between.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <Server className="text-orange-400" size={24} />
                <span className="text-gray-200">Server Administration</span>
              </div>
              <div className="flex items-center gap-3">
                <Code className="text-orange-400" size={24} />
                <span className="text-gray-200">Web Development</span>
              </div>
              <div className="flex items-center gap-3">
                <Terminal className="text-orange-400" size={24} />
                <span className="text-gray-200">System Programming</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <TerminalComponent />
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