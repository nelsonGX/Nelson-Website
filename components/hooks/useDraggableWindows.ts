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
  // Window states
  const [window1Maximized, setWindow1Maximized] = useState(false);
  const [window2Maximized, setWindow2Maximized] = useState(false);
  const [window3Maximized, setWindow3Maximized] = useState(false);
  
  // For draggable windows
  const [draggedWindow, setDraggedWindow] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [windowPositions, setWindowPositions] = useState<WindowPositions>({
    window1: { x: 100, y: 50 },
    window2: { x: 200, y: 150 },
    window3: { x: 300, y: 250 }
  });
  
  // Use refs to avoid re-renders during drag operations
  const windowPositionsRef = useRef(windowPositions);
  const draggedWindowRef = useRef<string | null>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  
  // Update refs when state changes
  useEffect(() => {
    windowPositionsRef.current = windowPositions;
  }, [windowPositions]);
  
  // Handle window maximized states to prevent page scrolling
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
  
  // Direct DOM manipulation for smooth dragging
  useEffect(() => {
    // Don't do anything if any window is maximized
    const anyWindowMaximized = window1Maximized || window2Maximized || window3Maximized;
    if (anyWindowMaximized) {
      return;
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!draggedWindowRef.current) return;
      
      // Get the window element
      const windowElement = document.getElementById(draggedWindowRef.current);
      if (!windowElement) return;
      
      // Calculate new position
      const newX = e.clientX - dragOffsetRef.current.x;
      const newY = e.clientY - dragOffsetRef.current.y;
      
      // Apply position directly to DOM for smoother movement
      windowElement.style.left = `${newX}px`;
      windowElement.style.top = `${newY}px`;
      
      // Cache the position for when we finish dragging
      const newPositions = {...windowPositionsRef.current};
      newPositions[draggedWindowRef.current as keyof WindowPositions] = { x: newX, y: newY };
      windowPositionsRef.current = newPositions;
      
      e.preventDefault();
    };
    
    const handleMouseUp = () => {
      if (draggedWindowRef.current) {
        // Update React state only once at the end of drag
        setWindowPositions(windowPositionsRef.current);
        document.body.style.userSelect = '';
        draggedWindowRef.current = null;
        setDraggedWindow(null);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [window1Maximized, window2Maximized, window3Maximized]);
  
  // Handle window dragging - using direct DOM manipulation for performance
  const startDrag = (windowId: string, e: React.MouseEvent) => {
    // Don't start drag if any window is maximized
    if (window1Maximized || window2Maximized || window3Maximized) return;
    
    // Get the element being dragged
    const element = e.currentTarget;
    
    // Bring clicked window to front
    const allWindows = document.querySelectorAll('[id^="window"]');
    allWindows.forEach(window => {
      (window as HTMLElement).style.zIndex = '30';
    });
    
    const clickedWindow = document.getElementById(windowId);
    if (clickedWindow) {
      clickedWindow.style.zIndex = '40';
    }
    
    // Calculate the offset (position of cursor relative to the element)
    const windowElement = document.getElementById(windowId);
    if (!windowElement) return;
    
    // Get current position from the element's style (DOM) which is up-to-date
    const currentX = parseInt(windowElement.style.left || '0', 10);
    const currentY = parseInt(windowElement.style.top || '0', 10);
    
    // Offset is the difference between mouse position and window position
    const offsetX = e.clientX - currentX;
    const offsetY = e.clientY - currentY;
    
    // Store dragging state both in React state and in refs
    draggedWindowRef.current = windowId;
    dragOffsetRef.current = { x: offsetX, y: offsetY };
    setDraggedWindow(windowId);
    setDragOffset({ x: offsetX, y: offsetY });
    
    // Disable text selection during drag
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