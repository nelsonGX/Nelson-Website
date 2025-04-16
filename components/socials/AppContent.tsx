import React from 'react';
import { FaDiscord } from 'react-icons/fa';
import { App } from './types';

interface AppContentProps {
  app: App;
}

export const AppContent: React.FC<AppContentProps> = ({ app }) => {
  switch(app.name) {
    case 'Email':
      return (
        <div className="flex flex-col h-full">
          <div className="bg-zinc-800 text-white p-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Inbox</h3>
            <div className="flex items-center space-x-4">
              <span>🔍</span>
              <span>⚙️</span>
            </div>
          </div>
          <div className="flex-1 bg-zinc-900 p-4">
            <div className="bg-zinc-800 rounded-lg p-3 mb-2">
              <p className="font-semibold">Welcome to Email</p>
              <p className="text-xs text-gray-400">Contact me at: {app.content}</p>
            </div>
            <div className="bg-zinc-800 rounded-lg p-3">
              <p className="font-semibold">Newsletter</p>
              <p className="text-xs text-gray-400">Latest updates and news</p>
            </div>
          </div>
        </div>
      );
    case 'Discord':
      return (
        <div className="flex flex-col h-full">
          <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Discord</h3>
            <div>🔔</div>
          </div>
          <div className="flex-1 bg-indigo-900 p-4">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-700 flex items-center justify-center mr-3">
                <FaDiscord size={24} />
              </div>
              <div>
                <p className="font-semibold text-white">Username: {app.content}</p>
                <p className="text-xs text-gray-300">Online</p>
              </div>
            </div>
            <div className="bg-indigo-800 rounded-lg p-3">
              <p className="text-sm text-gray-200">Connect with me on Discord!</p>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="flex flex-col h-full">
          <div className={`${app.color} text-white p-4 flex justify-between items-center`}>
            <h3 className="text-lg font-semibold">{app.name}</h3>
            <div>⚙️</div>
          </div>
          <div className="flex-1 bg-zinc-900 p-4 flex flex-col items-center justify-center">
            <div className="w-20 h-20 flex items-center justify-center mb-4">
              {app.icon}
            </div>
            <p className="font-semibold text-white">{app.name}</p>
            <p className="text-sm text-gray-300">{app.content}</p>
            {app.link && (
              <a href={app.link} target="_blank" rel="noopener noreferrer" 
                 className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300">
                Visit {app.name}
              </a>
            )}
          </div>
        </div>
      );
  }
};
