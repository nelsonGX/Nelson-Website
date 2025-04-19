import { useState, useEffect, useRef } from 'react';

interface WindowPositions {
  window1: { x: number; y: number };
  window2: { x: number; y: number };
  window3: { x: number; y: number };
}

interface UseDraggableWindowsReturn {
  draggedWindow: string | null;
  dragOffset: { x: number; y: number };
  windowPositions: WindowPositions;
  startDrag: (windowId: string, e: React.MouseEvent) => void;
  window1Maximized: boolean;
  window2Maximized: boolean;
  window3Maximized: boolean;
  setWindow1Maximized: (value: boolean) => void;
  setWindow2Maximized: (value: boolean) => void;
  setWindow3Maximized: (value: boolean) => void;
}

const useDraggableWindows = (): UseDraggableWindowsReturn => {
  const [window1Maximized, setWindow1Maximized] = useState(false);
  const [window2Maximized, setWindow2Maximized] = useState(false);
  const [window3Maximized, setWindow3Maximized] = useState(false);
  
  const [draggedWindow, setDraggedWindow] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [windowPositions, setWindowPositions] = useState<WindowPositions>({
    window1: { x: 50, y: 30 },
    window2: { x: 400, y: 350 },
    window3: { x: 90, y: 700 }
  });
  
  // Reset window positions for small screens
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        // Get window height to calculate proper spacing (aproximate without rendering)
        const windowHeight = 450; // From DraggableWindow.tsx
        const padding = 20;
        
        setWindowPositions({
          window1: { x: 15, y: 30 },
          window2: { x: 15, y: 30 + windowHeight + padding },
          window3: { x: 15, y: 30 + (windowHeight + padding) * 2 }
        });
      }
    };
    
    // Set initial positions
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const windowPositionsRef = useRef(windowPositions);
  const draggedWindowRef = useRef<string | null>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    windowPositionsRef.current = windowPositions;
  }, [windowPositions]);
  
  useEffect(() => {
    const anyWindowMaximized = window1Maximized || window2Maximized || window3Maximized;
    
    if (anyWindowMaximized) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [window1Maximized, window2Maximized, window3Maximized]);
  
  useEffect(() => {
    // Skip drag operations on mobile, windows are stacked
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;
    
    const anyWindowMaximized = window1Maximized || window2Maximized || window3Maximized;
    if (anyWindowMaximized) {
      return;
    }
    
    // Use requestAnimationFrame to reduce DOM operations
    let animationFrameId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!draggedWindowRef.current) return;
      
      // Cancel any existing animation frame
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      // Schedule position update
      animationFrameId = requestAnimationFrame(() => {
        const windowElement = document.getElementById(draggedWindowRef.current!);
        if (!windowElement) return;
        
        // Get viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Calculate new position
        let newX = e.clientX - dragOffsetRef.current.x;
        let newY = e.clientY - dragOffsetRef.current.y;
        
        // Make sure windows don't go off-screen
        const elementWidth = windowElement.offsetWidth;
        
        // Keep at least 40px of the window visible
        const minVisible = 40;
        newX = Math.max(-elementWidth + minVisible, Math.min(newX, viewportWidth - minVisible));
        newY = Math.max(0, Math.min(newY, viewportHeight - minVisible));
        
        windowElement.style.left = `${newX}px`;
        windowElement.style.top = `${newY}px`;
        
        const newPositions = {...windowPositionsRef.current};
        newPositions[draggedWindowRef.current as keyof WindowPositions] = { x: newX, y: newY };
        windowPositionsRef.current = newPositions;
      });
      
      e.preventDefault();
    };
    
    const handleMouseUp = () => {
      if (draggedWindowRef.current) {
        // Cancel any pending animation frame
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        
        setWindowPositions(windowPositionsRef.current);
        document.body.style.userSelect = '';
        draggedWindowRef.current = null;
        setDraggedWindow(null);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      // Clean up animation frame if component unmounts during animation
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [window1Maximized, window2Maximized, window3Maximized]);
  
  const startDrag = (windowId: string, e: React.MouseEvent) => {
    if (window1Maximized || window2Maximized || window3Maximized) return;
    
    const allWindows = document.querySelectorAll('[id^="window"]');
    allWindows.forEach(window => {
      (window as HTMLElement).style.zIndex = '30';
    });
    
    const clickedWindow = document.getElementById(windowId);
    if (clickedWindow) {
      clickedWindow.style.zIndex = '40';
    }
    
    const windowElement = document.getElementById(windowId);
    if (!windowElement) return;
    
    const currentX = parseInt(windowElement.style.left || '0', 10);
    const currentY = parseInt(windowElement.style.top || '0', 10);
    
    const offsetX = e.clientX - currentX;
    const offsetY = e.clientY - currentY;
    
    draggedWindowRef.current = windowId;
    dragOffsetRef.current = { x: offsetX, y: offsetY };
    setDraggedWindow(windowId);
    setDragOffset({ x: offsetX, y: offsetY });
    
    document.body.style.userSelect = 'none';
    e.preventDefault();
  };
  
  return {
    draggedWindow,
    dragOffset,
    windowPositions,
    startDrag,
    window1Maximized,
    window2Maximized,
    window3Maximized,
    setWindow1Maximized,
    setWindow2Maximized,
    setWindow3Maximized
  };
};

export default useDraggableWindows;