import React from 'react';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  return (
    <nav className="fixed top-4 right-4 z-40">
      <div className="flex items-center gap-3 backdrop-blur-md bg-zinc-900/60 px-4 py-2 rounded-full border border-gray-700">
        {['home', 'about', 'projects', 'events', 'contact'].map((section) => (
          <button 
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-3 py-1 rounded-full text-sm transition-all ${
              activeSection === section 
                ? 'bg-orange-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;