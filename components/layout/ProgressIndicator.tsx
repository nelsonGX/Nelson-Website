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
    <div className={`fixed top-0 left-0 w-full h-1 z-50 transition-opacity duration-300 ${isScrolling ? 'opacity-100' : 'opacity-0'}`}>
      <div 
        className="h-full bg-orange-400/70 relative"
        style={{ width: `${scrollProgress * 100}%`, transition: 'width 0.3s ease-out' }}
      >
        <p
          className="absolute text-xs text-white font-mono -bottom-4 whitespace-nowrap"
          style={{ right: '0' }}
        >{Math.round(scrollProgress * 10000)/100}%</p>
      </div>
    </div>
  );
};

export default ProgressIndicator;