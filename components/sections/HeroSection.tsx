import React from 'react';

interface HeroSectionProps {
  setActiveSection: (section: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ setActiveSection }) => {
  return (
    <section className="min-h-screen relative flex items-center justify-center px-6 overflow-hidden">
      {/* Animated background elements mimicking Spline */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-orange-500/10 to-yellow-500/10"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.3,
              transform: `scale(${Math.random() * 1 + 0.5})`,
              filter: `blur(${Math.random() * 50 + 20}px)`,
            }}
          ></div>
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <p className="text-2xl text-zinc-400 minecraft mb-2">Welcome to</p>
          <h1 className="text-7xl font-bold mb-4 flex minecraft">
            <span className="text-orange-300">Nelson</span><span>'s</span>
          </h1>
          <h1 className="text-7xl font-bold text-zinc-300 minecraft mb-8">
            Website
          </h1>
          <div className="mt-8">
            <button 
              onClick={() => setActiveSection('about')}
              className="px-6 py-3 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-lg font-medium hover:from-orange-500 hover:to-yellow-500 transition-all shadow-lg shadow-orange-700/20"
            >
              Explore
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-gray-500 text-sm mb-2">Scroll Down</span>
        <div className="w-5 h-9 border-2 border-gray-500 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-orange-500 rounded-full animate-bounce mt-1"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;