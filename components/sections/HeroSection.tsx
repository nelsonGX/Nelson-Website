import React from 'react';
import Spline from '@splinetool/react-spline';

const HeroSection = ({}) => {
  return (
    <section className="min-h-screen relative flex items-center justify-center px-6 overflow-hidden">

      {/* Container for both Spline and content */}
      <div className="relative w-full h-screen">
        {/* This is from spline. Visit https://app.spline.design/ to learn more. */}
        <Spline scene="https://prod.spline.design/qzOMo-qb58mOWKZN/scene.splinecode" />
        
        {/* Content - positioned absolute to overlay on Spline */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="flex flex-col items-center text-center backdrop-blur-xs p-4 rounded-3xl md:backdrop-blur-none">
            <p className="text-3xl text-zinc-400 font-minecraft mb-2 md:absolute md:top-[28%] md:left-[24%]">Welcome to</p>
            <h1 className="text-7xl md:text-9xl mb-4 flex font-minecraft md:left-[24%] md:absolute md:top-1/3">
              <span className="text-orange-300 hover:text-yellow-300 transition-all duration-300">Nelson</span><span>&apos;s</span>
            </h1>
            <h1 className="text-7xl md:text-9xl text-zinc-300 font-minecraft mb-8 md:right-[24%] md:absolute md:top-1/2">
              Website
            </h1>
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