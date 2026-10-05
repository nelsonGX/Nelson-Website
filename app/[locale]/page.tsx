"use client"


import { useState, useEffect } from 'react';
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
    if (!isFirstVisit) return;
    const id = setTimeout(() => {
      setLoading(false);
      setFadeOut(true);
    }, 800);
    return () => clearTimeout(id);
  }, [isFirstVisit]);

  return (
    <motion.div
      className="relative min-h-screen bg-ink text-zinc-100 overflow-x-clip"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: isSmallScreen ? 0.3 : 0.5 }}
    >
      {/* Page backdrop */}
      <div aria-hidden className="pointer-events-none fixed inset-0 bg-dots [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />

      {/* Page transition effect - only show when navigating between pages */}
      {!isFirstVisit && <TransitionEffect />}

      <ProgressIndicator scrollProgress={scrollProgress} />

      <LoadingScreen loading={loading && isFirstVisit} fadeOut={fadeOut} />

      <Header />

      <main className="relative">
        <HeroSection />
        <AboutSection />
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
        <EventsSection events={EventsData()} />
        <ContactSection />
      </main>

      <Footer />
    </motion.div>
  );
};

export default NelsonPortfolio;
