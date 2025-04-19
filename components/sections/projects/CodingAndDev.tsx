import { FaPython, FaJava, FaJs, FaReact, FaLeaf, FaLinux } from 'react-icons/fa';
import { Globe, Server } from 'lucide-react';
import Image from 'next/image';

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
        Started with Python like everyone else. My first real project? A Discord bot that didn't crash (most of the time). Watching people actually use something I built was mind-blowing. I was hooked.
      </p>
      <p className="mb-4 text-gray-300">
        Got tired of static websites, so I jumped into Next.js. Figured out how to make things that don't look terrible on mobile and load faster than a snail climbing a mountain.
      </p>
      <p className="text-gray-300">
        These days I'm wrestling with Java and the Bukkit API for my passion project: FreeServer Network. It's a Minecraft server where I'm throwing everything I've learned into one chaotic experiment. We'll see if it works.
      </p>
    </div>
  </>
  )
}