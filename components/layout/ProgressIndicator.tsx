import React, { useState, useEffect, useRef } from 'react';

interface ProgressIndicatorProps {
  scrollProgress: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ scrollProgress }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const prevScrollProgressRef = useRef(scrollProgress);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (scrollProgress !== prevScrollProgressRef.current) {
      prevScrollProgressRef.current = scrollProgress;
      
      setIsScrolling(true);
      
      if (timeoutIdRef.current !== null) {
        clearTimeout(timeoutIdRef.current);
      }
      
      timeoutIdRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 500);
    }

    return () => {
      if (timeoutIdRef.current !== null) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [scrollProgress]);

  return (
    <div
      aria-hidden
      className={`fixed inset-x-0 top-0 z-200 h-0.5 transition-opacity duration-300 ${isScrolling ? 'opacity-100' : 'opacity-0'}`}
    >
      <div 
        className="h-full origin-left bg-gradient-to-r from-orange-400 to-orange-200"
        style={{ transform: `scaleX(${scrollProgress})`, transition: 'transform 0.15s ease-out' }}
      />
    </div>
  );
};

export default ProgressIndicator;
