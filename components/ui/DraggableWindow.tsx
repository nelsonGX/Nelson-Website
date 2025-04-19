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
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
  </IconWrapper>
);

const MaxSquare = () => (
    <IconWrapper>
        <rect x="5" y="7" width="12" height="12" rx="2" ry="2"></rect>
        <line x1="8" y1="2" x2="22" y2="2"></line>
        <line x1="22" y1="14" x2="22" y2="2"></line>
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
      // Ensure window stays within viewport on mobile
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
  
  // Content (front) side variants
  const contentVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95,
      transition: { 
        duration: 0.1
      }
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { 
        delay: 0.3,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };
  
  // Card flip variants
  const cardVariants = {
    hidden: { 
      rotateY: 180,
      backgroundColor: "#111",
      borderColor: "#111"
    },
    visible: { 
      rotateY: 0,
      backgroundColor: "rgba(24, 24, 27, 0.9)",
      borderColor: "rgb(63, 63, 70)",
      transition: { 
        type: "spring",
        stiffness: 120,
        damping: 12,
        duration: 0.8
      }
    }
  };

  return (
    <motion.div 
      id={id}
      ref={el => { windowRef.current = el; windowRef2.current = el; }}
      className={`${maximized ? 'fixed inset-0 z-50' : 'absolute z-30'} backdrop-blur-md rounded-lg overflow-hidden ${isSmallScreen && !maximized ? 'shadow-lg border border-zinc-700/50' : 'shadow-orange'}`}
      style={{
        left: !maximized ? position.x : undefined, 
        top: !maximized ? position.y : undefined, 
        width: !maximized ? (isSmallScreen ? '90%' : 'min(750px, 90vw)') : undefined, 
        height: !maximized ? (isSmallScreen ? '450px' : '400px') : undefined
      }}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      >
      <motion.div 
        className="absolute inset-0 bg-black rounded-lg"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ 
          delay: 0.5,
          duration: 0.3
        }}
      />
      
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full h-full relative"
      >
        {/* Window header - Windows-style title bar */}
        <div 
          className={`bg-zinc-800/70 px-4 py-2 flex justify-between items-center ${!isSmallScreen && !maximized ? 'cursor-move' : ''} select-none`}
          onMouseDown={(e) => !maximized && !isSmallScreen && startDrag(id, e)}
        >
          <div className="flex space-x-2">
            {titleIcon && titleIcon}
            <h3 className="text-zinc-300 font-mono truncate hidden md:block">{title}</h3>
          </div>
          <div className="flex gap-1 ml-4">
            <button className="p-1 hover:bg-zinc-600 rounded cursor-default">
              <Minus />
            </button>
            <button onClick={handleMaximize} className="p-1 hover:bg-zinc-600 rounded">
              {maximized ? 
                <MaxSquare />
                :
                <Square />
              }
            </button>
            <button className="p-1 hover:bg-zinc-600 rounded cursor-default">
              <X/>
            </button>
          </div>
        </div>
        
        {/* Window content */}
        <div className="p-4 h-[calc(100%-40px)] overflow-auto">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DraggableWindow;