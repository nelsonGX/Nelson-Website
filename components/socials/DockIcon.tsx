import React from 'react';
import { App } from './types';
interface DockIconProps {
  app: App;
  onClick: (app: App, e: React.MouseEvent<HTMLDivElement>) => void;
}

export const DockIcon: React.FC<DockIconProps> = ({ app, onClick }) => {
  return (
    <div 
      className="flex items-center cursor-pointer transform hover:scale-110 transition-transform duration-200 ease-in-out"
      onClick={(e) => onClick(app, e)}
      data-app={app.name}
    >
      <div className={`w-12 h-12 ${app.color} rounded-2xl flex items-center justify-center text-3xl shadow-md active:scale-90 transition-transform duration-150`}>
        {app.icon}
      </div>
    </div>
  );
};
