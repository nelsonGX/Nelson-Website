import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-white flex items-center">
              <span className="text-orange-300">Nelson</span><span>'s</span>
            </h3>
            <p className="text-zinc-500">Student & Developer from Taiwan</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-orange-400 transition">
              <Github size={20} />
            </a>
            <a href="#" className="hover:text-orange-400 transition">
              <Linkedin size={20} />
            </a>
            <a href="#" className="hover:text-orange-400 transition">
              <Mail size={20} />
            </a>
          </div>
        </div>
        <div className="mt-6 text-center text-zinc-600 text-sm">
          <p>© {new Date().getFullYear()} Nelson. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;