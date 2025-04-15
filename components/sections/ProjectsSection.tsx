import React from 'react';
import DraggableWindow from '../ui/DraggableWindow';
import Image from 'next/image';
import { Server, Code, Box, Github } from 'lucide-react';
import Link from 'next/link';

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {children}
        </svg>
);

const Square = () => (
  <IconWrapper>
        <rect x="5" y="5" width="12" height="12" rx="2" ry="2"></rect>
  </IconWrapper>
);

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
    <section id="projects" className="min-h-screen pb-96 pt-10 px-6 relative bg-gradient-to-b from-zinc-800 to-zinc-900">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center mb-16">
          <div className="text-6xl font-bold">
            <div className="flex items-center text-white hover:text-zinc-400 duration-500 ease-in-out">
              <h2><span>What can</span><span className="text-yellow-100 hover:text-yellow-400 duration-500 ease-in-out">&nbsp;I&nbsp;</span><span>do?</span></h2>
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
                <h3 className="text-2xl font-bold text-white mb-3">Server Managing & Networking</h3>
                <p className="text-gray-300 mb-4">
                  I am the founder of several server hostings. I have experience in managing servers and hosting websites.
                </p>
                {window1Maximized && (
                  <>
                  <h1 className="text-4xl py-10 text-center font-bold">Server Hosting I&apos;ve made</h1>
                    {[
                    { date: 'Mar 2022', title: 'FreeServer', imageSrc: "/assets/images/freeserver.png", description: 
                    <>
                      <div>
                        <span>
                          FreeServer was a project started by me and Mayboy. Initially, I saw my friend Mayboy was using Google Cloud Platform (GCP)&apos;s free 300 USD plan, and I was wondering if we can use that as a free hosting. Thus, we found another friend, Windless, to join the project.
                          <br/><br/>
                          The FreeServer provides free hosting for Minecraft servers and discord bots. The free specs include 1 vCPU, 4 GB RAM, and 10 GB Disks. The server located in Taiwan. The specs is pretty a lot for a free hosting in Asia.
                          <br/><br/>
                          The server got a lot of DDoS traffic when started, until we met Fast-Line&apos;s owner Alger Huang. He offers free anti-DDoS service for us. After about 4 months later, we met both GCP&apos;s policy change and EOS of Fast-Line&apos;s free anti-DDoS service. Finally, We decided to shut down the FreeServer at August 2022.
                        </span>
                      </div>
                    </>
                    },
                    { date: 'Aug 2022', title: 'CheapServer', imageSrc: "/assets/images/CheapServer_white.png", description: 
                    <>
                      <div>
                        <span>
                          As we&apos;ve earnt some money from FreeServer, thus we decided to open a paid server hosting service called CheapServer. We added our another friend CH this time, to start the business.
                          <br/><br/>
                          When CheapServer started, there were no such hosting in Taiwan that can provide the same low price as us (as we believed). We was selling when started.
                          <br/><br/>
                          CheapServer is still running until now. We have a lot of customers, and we are still providing the best service to our customers, trying to improve our service.
                        </span>
                      </div>
                    </>
                    },
                   { date: 'Jan 2023', title: 'FreeServer v2', imageSrc: "/assets/images/freeserver.png", description: 
                    <>
                      <div>
                        <span>
                          After CheapServer, we missed the good old days while operating FreeServer. Thus, we spent some money from CheapServer instead of getting free trials from GCP this time, to operate the FreeServer v2.
                          <br/><br/>
                          Firstly, we bought a VPS from Taipei 101 (one of my friend), then started the hosting. We re-used the website components from FreeServer v1. We had some cooperate issues, so we changed the server provider to Hetzner.
                          <br/><br/>
                          However, we had no more money and was getting tired. Thus, we decided to shut down the FreeServer v2 at July 2023.
                        </span>
                      </div>
                    </>
                    },
                   { date: 'Nov 2023', title: 'FreeServer v3', imageSrc: "/assets/images/freeserverv3.png", description: 
                    <>
                      <div>
                        <span>
                          One of my friend, Ricky aka Smitug mentioned re-open of FreeServer when we were in our Discord VC.
                          <br/><br/>
                          I was thinking about that too. So we decided to re-open it again. This time, we use server infrastructures built by ourselves. We are trying to make it better than before.
                          <br/><br/>
                          The FreeServer v3 is still operating to now. We got 7000+ user and 1700+ servers running so far, and still counting. 
                        </span>
                      </div>
                    </>
                    },
                  ].map((data, idx) => (
                    <div className="mb-8 md:flex space-y-4 items-center space-x-6 justify-center" key={idx}>
                      <div className="relative flex bg-zinc-600 shadow-xl w-24 h-12 rounded-lg">
                        <h1 className="mx-auto my-auto font-semibold text-lg text-white">{data.date}</h1>
                      </div>
                      <div className="md:flex bg-zinc-800 rounded-lg shadow-xl md:max-w-2/3 px-6 py-4">
                        <Image src={data.imageSrc} alt={'Image'} width={100} height={10} className="object-cover h-20 w-auto my-auto" />
                        <div className="relative px-4">
                            <h3 className="mb-3 font-bold text-white text-xl">{data.title}</h3>
                            <p className="text-sm leading-snug tracking-wide text-zinc-300 text-opacity-100">{data.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <h1 className="text-4xl py-10 text-center font-bold">Server Infrastructure & Homelab</h1> 
                  </>
                )}
                {!window1Maximized && (
                  <p className="text-yellow-200 text-sm mt-4 flex items-center gap-1">
                    Click maximize ( <Square /> ) button to see more.
                  </p>
                )}
              </div>
            </div>
          </DraggableWindow>
          
          {/* Window 2 */}
          <DraggableWindow
            id="window2"
            title="aboutme.exe - coding_and_development"
            titleIcon={<Code size={24} />}
            position={windowPositions.window2}
            maximized={window2Maximized}
            isSmallScreen={isSmallScreen}
            onMaximize={() => setWindow2Maximized(!window2Maximized)}
            onMinimize={() => {}}
            startDrag={startDrag}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-2/3">
                <h3 className="text-2xl font-bold text-white mb-3">Coding & Development</h3>
                <p className="text-gray-300 mb-4">
                  As you can see, I do code. I have experience in Python, Java, Next.JS/React and more. In the most part, am still learning. You can find my projects on Github:
                </p>
                <Link className="flex space-x-1 text-zinc-400 hover:text-zinc-200 transition-all duration-150" href="https://github.com/nelsonGX">
                  <Github /> <p>Github</p>
                </Link>
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
                    Click maximize ( <Square /> ) button to see more.
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="w-32 h-32 md:w-64 md:h-64 rounded-lg overflow-hidden">
                  <Image src="/assets/images/coding-816x816.webp" height={816} width={816} alt="Coding and Development" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </DraggableWindow>
          
          {/* Window 3 */}
          <DraggableWindow
            id="window3"
            title="aboutme.exe - minecraft"
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
                <h3 className="text-2xl font-bold text-white mb-3">Minecraft</h3>
                <p className="text-gray-300 mb-4">
                  I have been playing Minecraft for over 7 years. I have experience in creating custom plugins and stuff.
                </p>
                {window3Maximized && (
                  <div className="mt-4">
                    <h4 className="text-lg font-medium text-orange-300 mb-2">Experience includes:</h4>
                    <ul className="list-disc pl-5 text-gray-300 space-y-1">
                      <li>Java programming</li>
                      <li>Plugin development</li>
                      <li>Server management</li>
                      <li>Modding</li>
                      <li>Community engagement</li>
                    </ul>
                  </div>
                )}
                {!window3Maximized && (
                  <p className="text-yellow-200 text-sm mt-4 flex items-center gap-1">
                    Click maximize ( <Square /> ) button to see more.
                  </p>
                )}
              </div>
            </div>
          </DraggableWindow>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/3 left-1/4 w-1/3 h-1/3 bg-gradient-to-br from-orange-600/5 to-yellow-600/5 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default ProjectsSection;