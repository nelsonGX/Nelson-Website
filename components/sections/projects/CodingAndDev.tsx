import { FaPython, FaJava, FaJs, FaReact, FaLeaf, FaLinux } from 'react-icons/fa';
import { Globe, Server } from 'lucide-react';
import Image from 'next/image';
import { Key } from 'react';
import { useTranslations } from 'next-intl';
import { ExternalLink } from 'lucide-react';

export default function CodingAndDev() {
  const t = useTranslations('projects.codingAndDev');
  const techStack = [
    { 
      name: 'Python', 
      icon: <FaPython className="text-blue-300" />, 
      bg: "bg-zinc-700/50",
      confidence: t('techStack.python') 
    },
    { 
      name: 'Java', 
      icon: <FaJava className="text-red-400" />, 
      bg: "bg-zinc-700/50",
      confidence: t('techStack.java') 
    },
    { 
      name: 'JavaScript', 
      icon: <FaJs className="text-yellow-400" />, 
      bg: "bg-zinc-700/50",
      confidence: t('techStack.javascript')
    },
    { 
      name: 'Next.JS', 
      icon: <Image src="/assets/images/nextjs.webp" alt="Next.js" width={20} height={20} className="text-white" />, 
      bg: "bg-yellow-400/15",
      confidence: t('techStack.nextjs')
    },
    { 
      name: 'React', 
      icon: <FaReact className="text-blue-400" />, 
      bg: "bg-yellow-400/15",
      confidence: t('techStack.react')
    },
    { 
      name: 'Tailwind CSS', 
      icon: <Image src="/assets/images/tailwind.webp" alt="Tailwind CSS" width={20} height={20} className="text-white" />, 
      bg: "bg-yellow-400/15",
      confidence: t('techStack.tailwind')
    },
    { 
      name: 'MongoDB', 
      icon: <FaLeaf className="text-green-800" />, 
      bg: "bg-yellow-400/15",
      confidence: t('techStack.mongodb')
    },
    { 
      name: 'CraftBukkit',
      icon: <Image src="/assets/images/craftbukkit.webp" alt="CraftBukkit" width={20} height={20} className="text-white" />,
      bg: "bg-yellow-400/15",
      confidence: t('techStack.craftbukkit')
    },
    { 
      name: 'Linux', 
      icon: <FaLinux className="text-gray-400" />, 
      bg: "bg-yellow-400/15",
      confidence: t('techStack.linux')
    },
    { 
      name: 'Networking', 
      icon: <Globe className="text-green-400" />, 
      bg: "bg-orange-400/15",
      confidence: t('techStack.networking')
    },
    { 
      name: 'Infrastructure', 
      icon: <Server className="text-orange-400" />, 
      bg: "bg-orange-400/15",
      confidence: t('techStack.infrastructure')
    }
  ];
  
  interface RelativeProjects {
    [key: string]: Array<{ name: string; link: string; image?: string }>;
  }

  const relativeProjects: RelativeProjects = {
    [t('sections.projects.website')]: [
      { name: "This personal website", link: "https://nelsongx.com", image: "nelson_website.webp" },
      { name: "SITCON Tickets", link: "https://tickets.sitcon.org", image: "sitcon_ticket.webp" },
      { name: "SITCON 2026 Website (3D Modeling)", link: "https://sitcon.org/2026/info/academia-sinica/", image: "sitcon_2026.webp" },
      { name: "FreeServer Website", link: "https://freeserver.tw", image: "freeserverv3.webp" },
      { name: "FreeServer Network Website", link: "https://freeserver.network", image: "freeserver_network.webp" },
      { name: "Simple Info. Website", link: "https://www.simple.taipei", image: "simple_info.webp" },
      { name: "Open Company LTD Website", link: "https://open-company-fork.pages.dev/", image: "open_company.webp" },
      { name: "SITCON 2025 Website (contributor)", link: "https://sitcon.org/2025/venue", image: "sitcon_2025.webp" },
    ],
    "Python": [
      { name: "My first OpenSourced Bot", link: "https://github.com/nelsonGX/DiscordURLshortenBot" },
      { name: "MultiAI Chatbot", link: "https://github.com/nelsonGX/multiai-chatbot"},
      { name: "AI Video Analyze Bot", link: "https://github.com/nelsonGX/ai-video-analyze-bot" },
      { name: "Nelson x2", link: "https://github.com/nelsonGX/Nelson-x2"},
      { name: "Siri Pro", link: "https://github.com/nelsonGX/siri-pro"},
    ],
    "Java": [
      { name: "Most of them on FreeServer Network Github", link: "https://github.com/freeServer-Network" },
    ]
  }

  return (
    <>
    <div className="mt-4 mb-8">
      <h4 className="text-lg font-medium text-orange-300 mb-2">{t('techStack.title')}:</h4>
      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
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

      <div className="px-4">
        <h1 className="text-3xl font-bold py-4 pt-8">{t('sections.start.title')}</h1>
        <p className="mb-4 text-gray-300">
          {t('sections.start.description')}
        </p>

        <h1 className="text-3xl font-bold py-4 pt-8">{t('sections.webDev.title')}</h1>
        <p className="mb-4 text-gray-300">
          {t('sections.webDev.description')}
        </p>

        <h1 className="text-3xl font-bold py-4 pt-8">{t('sections.java.title')}</h1>
        <p className="mb-4 text-gray-300">
          {t('sections.java.description')}
        </p>

        <h1 className="text-3xl font-bold py-4 pt-8">{t('sections.projects.title')}</h1>
        <div className="space-y-8">
          {Object.keys(relativeProjects).map((tech) => (
            <div key={tech} className="relative">
              <h4 className="text-xl font-medium text-orange-300 mb-3">{tech} {t('sections.projects.projectsLabel')}:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {relativeProjects[tech].map((project: { link: string | undefined; name: string | undefined; image?: string }, index: Key | null | undefined) => (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    key={index}
                    className="group block"
                  >
                    <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-lg p-2 transition-all duration-300 hover:bg-zinc-700/70 hover:scale-105">
                      {project.image && (
                        <Image src={`/assets/images/coding_and_dev/${project.image}`} alt={project.name || ""} width={300} height={300} className="w-full h-48 object-cover rounded-t-lg" />
                      )}
                      <div className="p-2">
                        <h5 className="text-white font-medium group-hover:text-orange-300 transition-colors duration-300">{project.name}</h5>
                        <p className="text-gray-400 text-sm mt-1 flex items-center">
                          <span className="underline text-gray-500">{t('sections.projects.viewProject')}</span>
                          <ExternalLink className="inline-block w-4 h-4 ml-1 text-gray-500" />
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
  )
}