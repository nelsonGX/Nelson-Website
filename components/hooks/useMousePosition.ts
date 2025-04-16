import { useState, useEffect } from 'react';

interface UseMousePositionReturn {
  mousePosition: { x: number; y: number };
  getParallaxStyle: (depth?: number) => { transform: string };
}

const useMousePosition = (windowWidth: number, windowHeight: number): UseMousePositionReturn => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const getParallaxStyle = (depth = 1) => {
    const x = (mousePosition.x / windowWidth - 0.5) * depth * 20;
    const y = (mousePosition.y / windowHeight - 0.5) * depth * 20;
    return { transform: `translate(${x}px, ${y}px)` };
  };
  
  return { mousePosition, getParallaxStyle };
};

export default useMousePosition;