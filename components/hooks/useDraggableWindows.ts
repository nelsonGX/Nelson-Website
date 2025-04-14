import { useState, useEffect } from 'react';

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
    window1: { x: 100, y: 400 },
    window2: { x: 400, y: 600 },
    window3: { x: 150, y: 800 }
  });
  
  // Handle mouse movement for dragging windows
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (draggedWindow) {
        const newPositions = {...windowPositions};
        newPositions[draggedWindow as keyof WindowPositions] = { 
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        };
        setWindowPositions(newPositions);
      }
    };
    
    const handleMouseUp = () => {
      setDraggedWindow(null);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggedWindow, dragOffset, windowPositions]);
  
  // Handle window dragging
  const startDrag = (windowId: string, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDraggedWindow(windowId);
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
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