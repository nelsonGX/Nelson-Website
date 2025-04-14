import { useState, useEffect } from 'react';

const useWindowDimensions = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
      setIsSmallScreen(window.innerWidth < 768);
      
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
        setIsSmallScreen(window.innerWidth < 768);
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);
  
  return { windowWidth, windowHeight, isSmallScreen };
};

export default useWindowDimensions;