import { FaPython, FaJava, FaJs, FaReact, FaLeaf, FaLinux } from 'react-icons/fa';
import { Globe, Server } from 'lucide-react';
import Image from 'next/image';
import { Key } from 'react';

export default function CodingAndDev() {
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
  
  interface RelativeProjects {
    [key: string]: Array<{ name: string; link: string }>;
  }

  const relativeProjects: RelativeProjects = {
    "Python": [
      { name: "My first OpenSourced Bot", link: "https://github.com/nelsonGX/DiscordURLshortenBot" },
      { name: "MultiAI Chatbot", link: "https://github.com/nelsonGX/multiai-chatbot"},
      { name: "AI Video Analyze Bot", link: "https://github.com/nelsonGX/ai-video-analyze-bot" },
      { name: "Nelson x2", link: "https://github.com/nelsonGX/Nelson-x2"},
      { name: "Siri Pro", link: "https://github.com/nelsonGX/siri-pro"},
    ],
    "Next.JS": [
      { name: "This personal website", link: "https://nelsongx.com" },
      { name: "FreeServer", link: "https://freeserver.tw" },
      { name: "FreeServer Network", link: "https://freeserver.network" },
      { name: "Simple Info. Website", link: "https://www.simple.taipei" },
      { name: "SITCON 2025 Website (contributor)", link: "https://sitcon.org/2025/venue" },
    ],
    "Java": [
      { name: "Most of them on FreeServer Network Github", link: "https://github.com/freeServer-Network" },
    ]
  }

  return (
    <>
    <div className="mt-4">
      <h4 className="text-lg font-medium text-orange-300 mb-2">Tech stack:</h4>
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

      <h1 className="text-3xl font-bold py-4 pt-8">How it all started...</h1>
      <p className="mb-4 text-gray-300">
        Started with Python like everyone else. The first real project was started from a Discord bot. I was interested and learnt how to use Discord APIs. About few years later, LLMs came out and I started making Discord chatbots. It was pretty fun.
      </p>

      <h1 className="text-3xl font-bold py-4 pt-8">Web Development</h1>
      <p className="mb-4 text-gray-300">
        About the website, I always wanted to make websites but I hated pure HTML and CSS. One time our team needed to make a web app for a project, and one of my friend bring me into Next.JS. I was like, omg its so better, and started to learn and use it. Now I have several projects using Next.JS.
      </p>

      <h1 className="text-3xl font-bold py-4 pt-8">Java & Bukkit API</h1>
      <p className="mb-4 text-gray-300">
        After opening FreeServer (please view the Server Managing & Networking part if you havn&apos;t), I waned to make a Minecraft server called FreeServer Network. I need custom plugins for the server, but I don&apos;t want to pay others to do it. So I started to learn Java and Bukkit API. I made several plugins for the server, and it was a great experience. I am still learning.
      </p>

      <h1 className="text-3xl font-bold py-4 pt-8">My Projects</h1>
      <div className="space-y-8">
        {Object.keys(relativeProjects).map((tech) => (
          <div key={tech} className="relative">
            <h4 className="text-xl font-medium text-orange-300 mb-3">{tech} Projects:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relativeProjects[tech].map((project: { link: string | undefined; name: string | undefined; }, index: Key | null | undefined) => (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  key={index}
                  className="group block"
                >
                  <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-lg p-4 transition-all duration-300 hover:bg-zinc-700/70 hover:scale-105">
                    <h5 className="text-white font-medium group-hover:text-orange-300 transition-colors duration-300">{project.name}</h5>
                    <p className="text-gray-400 text-sm mt-1 flex items-center">
                      <span className="underline text-gray-500">View project</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 inline group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
  )
}