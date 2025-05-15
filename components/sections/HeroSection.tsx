import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import {useTranslations} from 'next-intl';

const HeroSection = ({}) => {
  const t = useTranslations('home.hero');

  return (
    <section className="min-h-screen relative flex items-center justify-center px-6 overflow-hidden">

      {/* Container for both Spline and content */}
      <div className="relative w-full h-screen">
        
        {/* First Spline layer (background) */}
        <motion.div 
          className="absolute inset-0 opacity-30 blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
        >
          <Spline scene="https://prod.spline.design/qzOMo-qb58mOWKZN/scene.splinecode" />
        </motion.div>
        
        {/* Second Spline layer (foreground) */}
        <motion.div 
          className="absolute inset-0 z-[5]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <Spline scene="https://prod.spline.design/qzOMo-qb58mOWKZN/scene.splinecode" />
        </motion.div>

        {/* Mask */}
        <div className="z-10 bg-zinc-900 md:px-20 px-50 py-8 absolute right-0 bottom-0" />
        
        {/* Content - positioned absolute to overlay on Spline */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="flex flex-col items-center text-center backdrop-blur-xs p-4 rounded-3xl md:backdrop-blur-none">
            <motion.p 
              className="text-3xl text-zinc-400 font-minecraft mb-2 md:absolute md:top-[28%] md:left-[24%]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              {t('welcome')}
            </motion.p>
            <motion.h1 
              className="text-7xl md:text-9xl mb-4 flex font-minecraft md:left-[24%] md:absolute md:top-1/3"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.8,
                type: "spring",
                stiffness: 100 
              }}
            >
              <motion.span 
                className="text-orange-300 hover:text-yellow-300 transition-all duration-300"
                whileHover={{ 
                  scale: 1.05, 
                  color: "#fde047",
                  transition: { duration: 0.2 } 
                }}
              >
                Nelson
              </motion.span>
              <span>&apos;s</span>
            </motion.h1>
            <motion.h1 
              className="text-7xl md:text-9xl text-zinc-300 font-minecraft mb-8 md:right-[24%] md:absolute md:top-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: 1,
                type: "spring",
                stiffness: 100 
              }}
            >
              Website
            </motion.h1>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute hidden bottom-8 left-1/2 transform -translate-x-1/2 md:flex flex-col items-center z-15"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 2.8 }}
      >
        <span className="text-gray-500 text-sm mb-2">{t("scroll")}</span>
        <motion.div 
          className="w-5 h-9 border-2 border-gray-500 rounded-full flex justify-center"
          animate={{ 
            boxShadow: [
              "0 0 0 rgba(249, 115, 22, 0)",
              "0 0 8px rgba(249, 115, 22, 0.5)",
              "0 0 0 rgba(249, 115, 22, 0)"
            ]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "loop" 
          }}
        >
          <div className="w-1 h-2 bg-orange-500 rounded-full animate-bounce mt-1"></div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;