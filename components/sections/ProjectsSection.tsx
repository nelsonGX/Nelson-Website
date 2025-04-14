import React from 'react';
import DraggableWindow from '../ui/DraggableWindow';
import TerminalComponent from '../ui/TerminalComponent';
import { Maximize2 } from 'lucide-react';
import Image from 'next/image';

interface ProjectsSectionProps {
  windowPositions: {
    window1: { x: number; y: number };
    window2: { x: number; y: number };
    window3: { x: number; y: number };
  };
  window1Maximized: boolean;
  window2Maximized: boolean;
  window3Maximized: boolean;
  setWindow1Maximized: (value: boolean) => void;
  setWindow2Maximized: (value: boolean) => void;
  setWindow3Maximized: (value: boolean) => void;
  startDrag: (windowId: string, e: React.MouseEvent) => void;
  isSmallScreen: boolean;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  windowPositions,
  window1Maximized,
  window2Maximized,
  window3Maximized,
  setWindow1Maximized,
  setWindow2Maximized,
  setWindow3Maximized,
  startDrag,
  isSmallScreen
}) => {
  return (
    <section id="projects" className="min-h-screen py-20 px-6 relative bg-gradient-to-b from-zinc-800 to-zinc-900">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center mb-16">
          <div className="text-6xl font-bold">
            <div className="flex items-center text-white hover:text-zinc-400 duration-500 ease-in-out">
              <h2>What can</h2><h2 className="text-yellow-100 hover:text-yellow-400 duration-500 ease-in-out">&nbsp;I&nbsp;</h2><h2>do?</h2>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-orange-500/50 to-transparent flex-grow ml-6"></div>
        </div>
        
        {/* Draggable Windows */}
        <div className="relative h-[800px]">
          {/* Window 1 */}
          <DraggableWindow
            id="window1"
            title="aboutme.exe - server_managing"
            position={windowPositions.window1}
            maximized={window1Maximized}
            isSmallScreen={isSmallScreen}
            onMaximize={() => setWindow1Maximized(!window1Maximized)}
            onMinimize={() => {}}
            startDrag={startDrag}
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-lg overflow-hidden">
                  <Image src="/api/placeholder/300/300?text=Server" height={128} width={128} alt="Server Management" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-2xl font-bold text-white mb-3">Server Managing</h3>
                <p className="text-gray-300 mb-4">
                  I am the founder of several server hostings. I have experience in managing servers and hosting websites.
                </p>
                {window1Maximized && (
                  <div className="mt-4">
                    <h4 className="text-lg font-medium text-orange-300 mb-2">Experience includes:</h4>
                    <ul className="list-disc pl-5 text-gray-300 space-y-1">
                      <li>Linux server administration</li>
                      <li>Docker containerization</li>
                      <li>Web hosting configuration</li>
                      <li>Database management</li>
                      <li>Server security hardening</li>
                      <li>Load balancing and scaling</li>
                    </ul>
                  </div>
                )}
                {!window1Maximized && (
                  <p className="text-yellow-200 text-sm mt-4 flex items-center gap-1">
                    Click maximize <Maximize2 size={14} /> button to see more.
                  </p>
                )}
              </div>
            </div>
          </DraggableWindow>
          
          {/* Window 2 */}
          <DraggableWindow
            id="window2"
            title="aboutme.exe - coding_and_development"
            position={windowPositions.window2}
            maximized={window2Maximized}
            isSmallScreen={isSmallScreen}
            onMaximize={() => setWindow2Maximized(!window2Maximized)}
            onMinimize={() => {}}
            startDrag={startDrag}
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-2/3">
                <h3 className="text-2xl font-bold text-white mb-3">Coding & Development</h3>
                <p className="text-gray-300 mb-4">
                  I specialize in web development using modern technologies like React, Next.js, and TailwindCSS.
                </p>
                {window2Maximized && (
                  <div className="mt-4">
                    <h4 className="text-lg font-medium text-orange-300 mb-2">Tech stack:</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['JavaScript', 'TypeScript', 'React', 'Next.js', 'TailwindCSS', 'Node.js', 'Express', 'MongoDB'].map((tech, idx) => (
                        <span key={idx} className="px-2 py-1 bg-zinc-700 text-gray-300 text-sm rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {!window2Maximized && (
                  <p className="text-yellow-200 text-sm mt-4 flex items-center gap-1">
                    Click maximize <Maximize2 size={14} /> button to see more.
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-lg overflow-hidden">
                  <Image src="/api/placeholder/300/300?text=Coding" height={100} width={128} alt="Coding and Development" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </DraggableWindow>
          
          {/* Window 3 */}
          <DraggableWindow
            id="window3"
            title="terminal.exe"
            position={windowPositions.window3}
            maximized={window3Maximized}
            isSmallScreen={isSmallScreen}
            onMaximize={() => setWindow3Maximized(!window3Maximized)}
            onMinimize={() => {}}
            startDrag={startDrag}
          >
            <TerminalComponent />
          </DraggableWindow>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/3 left-1/4 w-1/3 h-1/3 bg-gradient-to-br from-orange-600/5 to-yellow-600/5 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default ProjectsSection;