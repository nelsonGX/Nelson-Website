"use client"

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {children}
        </svg>
);

const Minus = () => (
  <IconWrapper>
        <line x1="5" y1="12" x2="19" y2="12"></line>
  </IconWrapper>
);

const Square = () => (
  <IconWrapper>
        <rect x="5" y="5" width="15" height="15" rx="2" ry="2"></rect>
  </IconWrapper>
);

const MaxSquare = () => (
    <IconWrapper>
        <rect x="5" y="7" width="10" height="10" rx="2" ry="2"></rect>
        <line x1="10" y1="3" x2="20" y2="3"></line>
        <line x1="20" y1="12" x2="20" y2="3"></line>
    </IconWrapper>
);

const X = () => (
  <IconWrapper>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
  </IconWrapper>
);

interface DraggableWindowProps {
  id: string;
  title: string;
  titleIcon: React.ReactNode | null;
  position: { x: number; y: number };
  maximized: boolean;
  isSmallScreen: boolean;
  onMaximize: () => void;
  onMinimize: () => void;
  startDrag: (windowId: string, e: React.MouseEvent) => void;
  children: React.ReactNode;
}

const DraggableWindow: React.FC<DraggableWindowProps> = ({
  id,
  title,
  titleIcon,
  position,
  maximized,
  isSmallScreen,
  onMaximize,
  startDrag,
  children
}) => {
  const previousPositionRef = useRef<{ x: number; y: number } | null>(null);
  const windowRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (maximized || !windowRef.current) return;
    
    if (!document.body.style.userSelect) {
      const viewportWidth = window.innerWidth;
      const safeX = Math.min(position.x, viewportWidth - 40);
      
      windowRef.current.style.left = `${safeX}px`;
      windowRef.current.style.top = `${position.y}px`;
    }
  }, [position, maximized, isSmallScreen]);
  
  const handleMaximize = () => {
    if (!maximized && windowRef.current) {
      previousPositionRef.current = {
        x: parseInt(windowRef.current.style.left || '0', 10),
        y: parseInt(windowRef.current.style.top || '0', 10)
      };
    }
    
    onMaximize();
  };
  
  const windowRef2 = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(windowRef2, { once: true, amount: 0.3 });
  
  // Content (front) side variants - simplified for mobile
  const contentVariants = {
    hidden: { 
      opacity: 0,
      scale: isSmallScreen ? 0.98 : 0.95,
      transition: { 
        duration: isSmallScreen ? 0.05 : 0.1
      }
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { 
        delay: isSmallScreen ? 0.1 : 0.3,
        duration: isSmallScreen ? 0.3 : 0.8,
        type: isSmallScreen ? "tween" as const : "spring" as const,
        stiffness: isSmallScreen ? 50 : 100,
        damping: isSmallScreen ? 8 : 12
      }
    }
  };
  
  // Card flip variants - simplified for mobile
  const cardVariants = {
    hidden: { 
      rotateY: isSmallScreen ? 0 : 180, // Disable flip on mobile
      opacity: isSmallScreen ? 0 : 1,
      backgroundColor: "#0a0a0b",
      borderColor: "rgba(255, 255, 255, 0)"
    },
    visible: { 
      rotateY: 0,
      opacity: 1,
      backgroundColor: "rgba(17, 17, 19, 0.88)",
      borderColor: "rgba(255, 255, 255, 0.1)",
      transition: { 
        type: isSmallScreen ? "tween" as const : "spring" as const,
        stiffness: isSmallScreen ? 50 : 120,
        damping: isSmallScreen ? 8 : 12,
        duration: isSmallScreen ? 0.3 : 0.8
      }
    }
  };

  return (
    <motion.div 
      id={id}
      ref={el => { windowRef.current = el; windowRef2.current = el; }}
      className={`${maximized ? 'fixed inset-0 z-150' : 'absolute z-30 rounded-xl border shadow-2xl shadow-black/60'} backdrop-blur-xl overflow-hidden`}
      style={{
        // Inline so it beats the z-index startDrag writes when a window is brought to front
        zIndex: maximized ? 150 : undefined,
        left: !maximized ? position.x : undefined,
        top: !maximized ? position.y : undefined,
        width: !maximized ? (isSmallScreen ? '95%' : 'min(750px, 90vw)') : undefined,
        height: !maximized ? (isSmallScreen ? '450px' : '400px') : undefined
      }}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      >
      {/* Simplified overlay animation for mobile */}
      {!isSmallScreen && (
        <motion.div 
          className="absolute inset-0 bg-ink"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ 
            delay: 0.5,
            duration: 0.3
          }}
        />
      )}
      
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full h-full relative"
      >
        {/* Window header - Windows-style title bar */}
        <div 
          className={`h-11 border-b border-white/[0.08] bg-white/[0.04] pl-4 pr-2 flex justify-between items-center ${!isSmallScreen && !maximized ? 'cursor-grab active:cursor-grabbing' : ''} select-none`}
          onMouseDown={(e) => !maximized && !isSmallScreen && startDrag(id, e)}
        >
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="text-orange-300 [&>svg]:size-4">{titleIcon}</span>
            <h3 className="text-sm text-zinc-400 font-mono truncate">{title}</h3>
          </div>
          <div className="flex ml-4 text-zinc-400 [&_svg]:size-4">
            <button type="button" tabIndex={-1} aria-hidden className="px-3 py-2 hover:bg-white/10 rounded-md cursor-default">
              <Minus />
            </button>
            <button type="button" onClick={handleMaximize} aria-label={maximized ? "Restore" : "Maximize"} className="px-3 py-2 hover:bg-white/10 hover:text-zinc-100 rounded-md">
              {maximized ? 
                <MaxSquare />
                :
                <Square />
              }
            </button>
            <button type="button" onClick={maximized ? handleMaximize : undefined} aria-label={maximized ? "Close" : undefined} tabIndex={maximized ? 0 : -1} className={`px-3 py-2 rounded-md ${maximized ? 'hover:bg-red-500/80 hover:text-white' : 'cursor-default hover:bg-white/10'}`}>
              <X/>
            </button>
          </div>
        </div>
        
        {/* Window content */}
        <div className={`h-[calc(100%-44px)] overflow-auto ${maximized ? "px-4 py-8 md:px-10 md:py-12" : "p-5 md:p-6"}`}>
          <div className={maximized ? "mx-auto max-w-6xl" : ""}>
          {children}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DraggableWindow;