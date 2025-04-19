import { useState, useRef, useEffect } from 'react';
import { App, AppRef } from './types';

export const useAppAnimation = () => {
  const [selectedApp, setSelectedApp] = useState<App | undefined>(undefined);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const appRef = useRef<AppRef | null>(null);
  
  useEffect(() => {
    // Skip excessive recalculations on mobile
    const isMobile = window.innerWidth < 768;
    
    function handleResize() {
      if (selectedApp && appRef.current) {
        // Use requestAnimationFrame to reduce layout thrashing
        requestAnimationFrame(() => {
          const appElement = document.querySelector(`[data-app="${selectedApp.name}"]`);
          if (appElement) {
            const rect = appElement.getBoundingClientRect();
            appRef.current = {
              ...appRef.current,
              rect,
              x: rect.left,
              y: rect.top,
              width: rect.width,
              height: rect.height,
            };
          }
        });
      }
    }
    
    // For mobile, use a more performant approach with fewer updates
    if (isMobile) {
      let resizeTimeout: ReturnType<typeof setTimeout>;
      const throttledResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 100);
      };
      window.addEventListener('resize', throttledResize);
      return () => {
        window.removeEventListener('resize', throttledResize);
        clearTimeout(resizeTimeout);
      };
    } else {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [selectedApp]);
  
  const handleAppClick = (app: App, e: React.MouseEvent<HTMLDivElement>) => {
    const isMobile = window.innerWidth < 768;
    
    // Simplified app opening for mobile
    if (isMobile) {
      // Skip animation calculations on mobile for better performance
      setSelectedApp(app);
      return;
    }
    
    // Full animation for desktop
    const iconElement = (e.currentTarget as HTMLElement).querySelector('div');
    
    const iconRect = iconElement?.getBoundingClientRect();
    if (!iconRect) return;
    const deviceContainer = (e.currentTarget as HTMLElement).closest('[class*="rounded"]');
    if (!deviceContainer) return;
    const containerRect = deviceContainer.getBoundingClientRect();
  
    const relativeX = iconRect.left - containerRect.left;
    const relativeY = iconRect.top - containerRect.top;
    
    appRef.current = {
      app: app,
      rect: iconRect,
      x: relativeX,
      y: relativeY,
      width: iconRect?.width,
      height: iconRect?.height,
      containerWidth: containerRect.width,
      containerHeight: containerRect.height
    };
    
    setIsAnimating(true);
    setIsClosing(false);
    
    requestAnimationFrame(() => {
      setSelectedApp(app);
      
      // Shorter animation duration for better performance
      setTimeout(() => {
        setIsAnimating(false);
      }, 80);
    });
  };
  
  const closeApp = () => {
    if (!selectedApp) return;
    
    const isMobile = window.innerWidth < 768;
    
    // Simplified app closing for mobile
    if (isMobile) {
      // Skip animation calculations on mobile for better performance
      setSelectedApp(undefined);
      return;
    }
    
    // Full animation for desktop
    const iconElement = document.querySelector(`[data-app="${selectedApp.name}"]`);
    
    if (iconElement) {
      const iconDiv = iconElement.querySelector('div');
      if (!iconDiv) return;
      
      const iconRect = iconDiv.getBoundingClientRect();
      const deviceContainer = iconElement.closest('[class*="rounded"]');
      if (!deviceContainer) return;
      
      const containerRect = deviceContainer.getBoundingClientRect();
      
      const relativeX = iconRect.left - containerRect.left;
      const relativeY = iconRect.top - containerRect.top;
      
      if (appRef.current) {
        appRef.current = {
          ...appRef.current,
          x: relativeX,
          y: relativeY,
          width: iconRect.width,
          height: iconRect.height,
          containerWidth: containerRect.width,
          containerHeight: containerRect.height
        };
      }
    }
    
    setIsAnimating(true);
    setIsClosing(true);
    
    // Use shorter animation duration for better performance
    setTimeout(() => {
      setSelectedApp(undefined);
      setIsAnimating(false);
      setIsClosing(false);
    }, isMobile ? 100 : 200);
  };

  return {
    selectedApp,
    isAnimating,
    isClosing,
    appRef,
    handleAppClick,
    closeApp
  };
};