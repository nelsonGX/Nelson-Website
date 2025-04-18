import React, { useEffect, useRef } from 'react';

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
      windowRef.current.style.left = `${position.x}px`;
      windowRef.current.style.top = `${position.y}px`;
    }
  }, [position, maximized]);
  
  const handleMaximize = () => {
    if (!maximized && windowRef.current) {
      previousPositionRef.current = {
        x: parseInt(windowRef.current.style.left || '0', 10),
        y: parseInt(windowRef.current.style.top || '0', 10)
      };
    }
    
    onMaximize();
  };
  
  return (
    <div 
      id={id}
      ref={windowRef}
      className={`${maximized ? 'fixed inset-0 z-50' : 'absolute z-30'} bg-zinc-900/90 backdrop-blur-md border border-zinc-700 rounded-lg overflow-hidden shadow-lg transition-colors duration-200`}
      style={maximized ? {} : { 
        left: position.x, 
        top: position.y, 
        width: isSmallScreen ? '90%' : '750px', 
        height: '400px'
      }}
    >
      {/* Window header - Windows-style title bar */}
      <div 
        className="bg-zinc-800/70 px-4 py-2 flex justify-between items-center cursor-move select-none"
        onMouseDown={(e) => !maximized && startDrag(id, e)}
      >
        <div className="flex space-x-2">
          {titleIcon && titleIcon}
          <h3 className="text-zinc-300 font-mono truncate">{title}</h3>
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
    </div>
  );
};

export default DraggableWindow;