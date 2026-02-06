import React from 'react';
import DraggableWindow from '../ui/DraggableWindow';
import Image from 'next/image';
import Link from 'next/link';
import { Server, Code, Box } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import ServerManager from './projects/ServerManage';
import CodingAndDev from './projects/CodingAndDev';
import Minecraft from './projects/Minecraft';
import { TextReveal } from '../ui/TextReveal';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('home.projects');
  return (
    <section id="projects" className="min-h-screen pb-40 md:pb-96 pt-10 px-4 md:px-6 relative bg-gradient-to-b from-zinc-800 to-zinc-900">
      <div className="max-w-6xl mx-auto relative">
        <div className="flex items-center mb-16">
          <div className="text-6xl font-bold">
            <TextReveal as="div" className="flex items-center text-white hover:text-zinc-400 duration-500 ease-in-out">
              <h2><span>{t('title.whatCan')}</span><span className="text-yellow-100 hover:text-yellow-400 duration-500 ease-in-out">&nbsp;{t('title.i')}&nbsp;</span><span>{t('title.do')}</span></h2>
            </TextReveal>
          </div>
          <div className="h-px bg-gradient-to-r from-orange-500/50 to-transparent flex-grow ml-6"></div>
        </div>
        
        {/* Draggable Windows */}
        <div className="relative h-[1500px] md:h-[800px] z-110">
          {/* Window 1 */}
          <DraggableWindow
            id="window1"
            title={t('windows.serverManagement.title')}
            titleIcon={<Server size={24} />}
            position={windowPositions.window1}
            maximized={window1Maximized}
            isSmallScreen={isSmallScreen}
            onMaximize={() => setWindow1Maximized(!window1Maximized)}
            onMinimize={() => {}}
            startDrag={startDrag}
          >
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              { !window1Maximized &&
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="w-32 h-32 md:w-64 md:h-64 rounded-lg overflow-hidden">
                  <Image src="/assets/images/server-1080x1080.webp" height={1080} width={1080} alt="Server Management" className="w-full h-full object-cover" />
                </div>
              </div>
              }
              <div className="w-fit items-center justify-center relative">
                <TextReveal as="h3" className="text-2xl font-bold text-white mb-3">{t('windows.serverManagement.heading')}</TextReveal>
                <TextReveal as="p" className="text-gray-300 mb-4">
                  {t('windows.serverManagement.description')}
                </TextReveal>
                {window1Maximized && (
                  <ServerManager />
                )}
                {!window1Maximized && !isSmallScreen && (
                <div className="text-yellow-200 rotate-3 absolute right-5 -top-14">
                  <svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="-rotate-12 absolute right-4 -top-8">
                    <path d="M1 27 C12 22, 15 15, 18 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 2" />
                    <path d="M14 12 L18 10 L20 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <div className="text-xs ">{t('windows.expand')}</div>
                </div>
                )}
              </div>
            </div>
          </DraggableWindow>

          {/* Window 2 */}
          <DraggableWindow
            id="window2"
            title={t('windows.codingDevelopment.title')}
            titleIcon={<Code size={24} />}
            position={windowPositions.window2}
            maximized={window2Maximized}
            isSmallScreen={isSmallScreen}
            onMaximize={() => setWindow2Maximized(!window2Maximized)}
            onMinimize={() => {}}
            startDrag={startDrag}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full justify-center md:hidden">
                <div className="w-32 h-32 rounded-lg overflow-hidden">
                  <Image src="/assets/images/coding-816x816.webp" height={816} width={816} alt="Coding and Development" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <TextReveal as="h3" className="text-2xl font-bold text-white mb-3">{t('windows.codingDevelopment.heading')}</TextReveal>
                <TextReveal as="p" className="text-gray-300 mb-4">
                  {t('windows.codingDevelopment.description')}
                </TextReveal>
                <Link className="flex space-x-1 text-zinc-400 hover:text-zinc-200 transition-all duration-150" href="https://github.com/nelsonGX">
                  <SiGithub /> <p>Github</p>
                </Link>
                {window2Maximized && (
                  <CodingAndDev />
                )}
              </div>
              { !window2Maximized &&
              <div className="w-1/3 justify-center hidden md:flex">
                <div className="w-64 h-64 rounded-lg overflow-hidden">
                  <Image src="/assets/images/coding-816x816.webp" height={816} width={816} alt="Coding and Development" className="w-full h-full object-cover" />
                </div>
              </div>
              }
            </div>
          </DraggableWindow>
          
          {/* Window 3 */}
          <DraggableWindow
            id="window3"
            title={t('windows.minecraft.title')}
            titleIcon={<Box size={24} />}
            position={windowPositions.window3}
            maximized={window3Maximized}
            isSmallScreen={isSmallScreen}
            onMaximize={() => setWindow3Maximized(!window3Maximized)}
            onMinimize={() => {}}
            startDrag={startDrag}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="w-32 h-32 md:w-64 md:h-64 rounded-lg overflow-hidden">
                  <Image src="/assets/images/minecraft-1080x1080.webp" height={1080} width={1080} alt="Minecraft" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <TextReveal as="h3" className="text-2xl font-bold text-white mb-3">{t('windows.minecraft.heading')}</TextReveal>
                <TextReveal as="p" className="text-gray-300 mb-4">
                  {t('windows.minecraft.description')}
                </TextReveal>
                {window3Maximized && (
                  <Minecraft />
                )}
                {!window3Maximized && !isSmallScreen && (
                <div className="text-yellow-200 rotate-3 absolute right-10 top-20">
                  <svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="-rotate-12 absolute right-4 -top-8">
                    <path d="M1 27 C12 22, 15 15, 18 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 2" />
                    <path d="M14 12 L18 10 L20 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <div className="text-xs ">{t('windows.expand')}</div>
                </div>
                )}
              </div>
            </div>
          </DraggableWindow>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;