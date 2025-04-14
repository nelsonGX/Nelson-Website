"use client"

import React, { useState, useEffect } from 'react';

// Layout components
import Navigation from '../components/layout/Navigation';
import SocialLinks from '../components/layout/SocialLinks';
import ProgressIndicator from '../components/layout/ProgressIndicator';
import LoadingScreen from '../components/layout/LoadingScreen';
import Footer from '../components/layout/Footer';

// Section components
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import EventsSection from '../components/sections/EventsSection';
import ContactSection from '../components/sections/ContactSection';

// Custom hooks
import { 
  useWindowDimensions, 
  useMousePosition, 
  useScrollProgress, 
  useDraggableWindows 
} from '../components/hooks';

// Data
import events from '../components/data/eventsData';

const NelsonPortfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [terminalActive, setTerminalActive] = useState(false);
  
  // Using custom hooks
  const { windowWidth, windowHeight, isSmallScreen } = useWindowDimensions();
  const { mousePosition, getParallaxStyle } = useMousePosition(windowWidth, windowHeight);
  const scrollProgress = useScrollProgress();
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
  
  // Initialize loading animation
  useEffect(() => {
    // Loading animation
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        setLoading(false);
        setFadeOut(true);
      }, 300);
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-zinc-900 text-gray-100 overflow-x-hidden">
      {/* Progress indicator */}
      <ProgressIndicator scrollProgress={scrollProgress} />
      
      {/* Loading screen */}
      <LoadingScreen loading={loading} fadeOut={fadeOut} />
      
      {/* Navigation */}
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {/* Hero section */}
      <HeroSection setActiveSection={setActiveSection} />
      
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
      <EventsSection events={events} />
      
      {/* Contact section */}
      <ContactSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NelsonPortfolio;