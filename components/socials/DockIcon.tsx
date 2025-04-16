import React from 'react';
import { DockApp } from './types';

interface DockIconProps {
  app: DockApp;
}

export const DockIcon: React.FC<DockIconProps> = ({ app }) => {
  return (
    <div 
      className="flex items-center cursor-pointer transform hover:scale-110 transition-transform duration-200 ease-in-out"
      data-app={app.name}
    >
      <div className={`w-12 h-12 ${app.color} rounded-2xl flex items-center justify-center text-3xl shadow-md active:scale-90 transition-transform duration-150`}>
        {app.icon}
      </div>
    </div>
  );
};
