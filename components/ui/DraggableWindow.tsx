import React from 'react';
import { Maximize2, X, Minimize2 } from 'lucide-react';

interface DraggableWindowProps {
  id: string;
  title: string;
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
  position,
  maximized,
  isSmallScreen,
  onMaximize,
  onMinimize,
  startDrag,
  children
}) => {
  return (
    <div 
      className={`${maximized ? 'fixed inset-0 z-50' : 'absolute z-30'} bg-gray-800/90 backdrop-blur-md border border-gray-700 rounded-lg overflow-hidden shadow-lg`}
      style={maximized ? {} : { 
        left: position.x, 
        top: position.y, 
        width: isSmallScreen ? '90%' : '500px', 
        height: '300px'
      }}
    >
      {/* Window header */}
      <div 
        className="bg-gray-700/70 px-4 py-2 flex justify-between items-center cursor-move"
        onMouseDown={(e) => !maximized && startDrag(id, e)}
      >
        <h3 className="text-gray-300 font-mono">{title}</h3>
        <div className="flex gap-2">
          <button onClick={onMinimize} className="p-1 hover:bg-gray-600 rounded">
            <Minimize2 size={16} className="text-gray-300" />
          </button>
          <button onClick={onMaximize} className="p-1 hover:bg-gray-600 rounded">
            {maximized ? <X size={16} className="text-gray-300" /> : <Maximize2 size={16} className="text-gray-300" />}
          </button>
        </div>
      </div>
      
      {/* Window content */}
      <div className="p-4 h-[calc(100%-40px)] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default DraggableWindow;