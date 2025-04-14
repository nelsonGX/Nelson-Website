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
          <div className="flex flex-col items-center text-center">
            <p className="text-2xl text-zinc-400 font-minecraft mb-2">Welcome to</p>
            <h1 className="text-7xl font-bold mb-4 flex font-minecraft">
              <span className="text-orange-300">Nelson</span><span>&apos;s</span>
            </h1>
            <h1 className="text-7xl font-bold text-zinc-300 font-minecraft mb-8">
              Website
            </h1>
            <div className="mt-8">
              <button
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-lg font-medium hover:from-orange-500 hover:to-yellow-500 transition-all shadow-lg shadow-orange-700/20"
              >
                Explore
              </button>
            </div>
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