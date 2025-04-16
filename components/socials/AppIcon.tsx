import React from 'react';
import { App } from './types';

interface AppIconProps {
  app: App;
  onClick: (app: App, e: React.MouseEvent<HTMLDivElement>) => void;
}

export const AppIcon: React.FC<AppIconProps> = ({ app, onClick }) => {
  return (
    <div 
      className="flex flex-col items-center cursor-pointer transform hover:scale-105 transition-transform duration-200 ease-in-out"
      onClick={(e) => onClick(app, e)}
      data-app={app.name}
    >
      <div className={`w-14 h-14 ${app.color} rounded-2xl flex items-center justify-center text-3xl shadow-md active:scale-90 transition-transform duration-150`}>
        {app.icon}
      </div>
      <div className="text-white text-xs mt-1">{app.name}</div>
    </div>
  );
};
