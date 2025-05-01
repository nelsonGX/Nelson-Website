"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Layout components
import ProgressIndicator from '../components/layout/ProgressIndicator';
import LoadingScreen from '../components/layout/LoadingScreen';
import Footer from '../components/layout/Footer';
import Header from '@/components/layout/Header';
import TransitionEffect from '@/components/layout/TransitionEffect';
import { useLoadingContext } from '@/components/context/LoadingContext';
import SectionFocus from '@/components/layout/SectionFocus';

// Section components
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import EventsSection from '../components/sections/EventsSection';
import ContactSection from '../components/sections/ContactSection';

// Custom hooks
import { 
  useWindowDimensions,
  useScrollProgress, 
  useDraggableWindows,
  useSectionInView
} from '../components/hooks';

// Data
import events from '../components/data/eventsData';

// Section IDs for the focus effect
const SECTION_IDS = ['hero', 'about', 'projects', 'events', 'contact'];

const NelsonPortfolio = () => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  
  // Using custom hooks
  const { isSmallScreen } = useWindowDimensions();
  const scrollProgress = useScrollProgress();
  const { isFirstVisit } = useLoadingContext();
  const activeSection = useSectionInView(SECTION_IDS);
  
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
  
  // Initialize loading animation only on first visit
  useEffect(() => {
    console.log('Page.tsx - isFirstVisit:', isFirstVisit);
    
    // Loading animation
    if (typeof window !== 'undefined') {
      if (isFirstVisit) {
        console.log('Showing loading screen...');
        setTimeout(() => {
          setLoading(false);
          setFadeOut(true);
        }, 800); // Give more time for initial loading animation
      } else {
        console.log('Skipping loading screen, showing transition...');
        // Skip loading screen if not first visit (navigating between pages)
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
      <SectionFocus isActive={activeSection === 'hero'}>
        <HeroSection />
      </SectionFocus>
      
      {/* About section */}
      <SectionFocus isActive={activeSection === 'about'}>
        <AboutSection />
      </SectionFocus>
      
      {/* Projects section */}
      <SectionFocus isActive={activeSection === 'projects'}>
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
      </SectionFocus>
      
      {/* Events section */}
      <SectionFocus isActive={activeSection === 'events'}>
        <EventsSection events={events} />
      </SectionFocus>
      
      {/* Contact section */}
      <SectionFocus isActive={activeSection === 'contact'}>
        <ContactSection />
      </SectionFocus>
      
      {/* Footer */}
      <Footer />
    </motion.div>
  );
};

export default NelsonPortfolio;