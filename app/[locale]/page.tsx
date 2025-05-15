"use client"

export const runtime = 'edge';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Layout components
import ProgressIndicator from '@/components/layout/ProgressIndicator';
import LoadingScreen from '@/components/layout/LoadingScreen';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import TransitionEffect from '@/components/layout/TransitionEffect';
import { useLoadingContext } from '@/components/context/LoadingContext';

// Section components
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import EventsSection from '@/components/sections/EventsSection';
import ContactSection from '@/components/sections/ContactSection';

// Custom hooks
import { 
  useWindowDimensions,
  useScrollProgress, 
  useDraggableWindows 
} from '@/components/hooks';

// Data
import EventsData from '@/components/data/eventsData';

const NelsonPortfolio = () => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  
  // Using custom hooks
  const { isSmallScreen } = useWindowDimensions();
  const scrollProgress = useScrollProgress();
  const { isFirstVisit } = useLoadingContext();
  const { 
    windowPositions, 
    startDrag, 
    window1Maximized, 
    window2Maximized, 
    window3Maximized,
    setWindow1Maximized,
    setWindow2Maximized,
    setWindow3Maximized
  } = useDraggableWindows();
  
  useEffect(() => {   
    if (typeof window !== 'undefined') {
      if (isFirstVisit) {
        setTimeout(() => {
          setLoading(false);
          setFadeOut(true);
        }, 800);
      } else {
        setLoading(false);
      }
    }
  }, [isFirstVisit]);
  
  return (
    <motion.div 
      className="min-h-screen bg-zinc-900 text-gray-100 overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: isSmallScreen ? 0.3 : 0.5 }}
    >
      {/* Page transition effect - only show when navigating between pages */}
      {!isFirstVisit && <TransitionEffect />}
      
      {/* Progress indicator */}
      <ProgressIndicator scrollProgress={scrollProgress} />
      
      {/* Loading screen */}
      <LoadingScreen loading={loading} fadeOut={fadeOut} />
  
      {/* Header */}
      <Header />
      
      {/* Hero section */}
      <HeroSection />
      
      {/* About section */}
      <AboutSection />
      
      {/* Projects section */}
      <ProjectsSection 
        windowPositions={windowPositions}
        window1Maximized={window1Maximized}
        window2Maximized={window2Maximized}
        window3Maximized={window3Maximized}
        setWindow1Maximized={setWindow1Maximized}
        setWindow2Maximized={setWindow2Maximized}
        setWindow3Maximized={setWindow3Maximized}
        startDrag={startDrag}
        isSmallScreen={isSmallScreen}
      />
      
      {/* Events section */}
      <EventsSection events={EventsData()} />
      
      {/* Contact section */}
      <ContactSection />
      
      {/* Footer */}
      <Footer />
    </motion.div>
  );
};

export default NelsonPortfolio;