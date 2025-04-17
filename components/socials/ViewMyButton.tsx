import React from 'react';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function ViewMyButton({name, link, bgColor} : {name: string, link: string | undefined, bgColor: string}) {
  if (!link) return null;
  
  return (
    <div>
      <Link 
        href={link} 
        target="_blank"
        className={`relative flex items-center h-11 px-5 pr-12 py-1.5 text-white text-base font-medium tracking-wider rounded-2xl  overflow-hidden cursor-pointer group ${bgColor}`}
      >
        <span>View My {name}</span>
        <div className="absolute right-1 flex items-center justify-center h-9 w-9 bg-white rounded-xl shadow-[0.1em_0.1em_0.6em_0.2em_#7b52b9] transition-all duration-300 group-hover:w-[calc(100%-0.6em)]">
          <ExternalLink 
            size={20} 
            className="text-zinc-700 transition-transform duration-300 group-hover:translate-x-0.5" 
          />
        </div>
      </Link>
    </div>
  );
}