import React from 'react';
import Image from 'next/image';
import { App, AppRef } from './types';
import { apps, dockApps } from './AppsData';
import { formatTimeIphone } from './utils';
import { AppIcon } from './AppIcon';
import { DockIcon } from './DockIcon';
import { AppPopup } from './AppPopup';

interface IphoneDeviceProps {
  currentTime: Date;
  selectedApp: App | undefined;
  isAnimating: boolean;
  isClosing: boolean;
  appRef: React.RefObject<AppRef | null>;
  handleAppClick: (app: App, e: React.MouseEvent<HTMLDivElement>) => void;
  closeApp: () => void;
}

export const IphoneDevice: React.FC<IphoneDeviceProps> = ({
  currentTime,
  selectedApp,
  isAnimating,
  isClosing,
  appRef,
  handleAppClick,
  closeApp
}) => {
  return (
    <div className="relative md:hidden w-[350px] h-[700px] rounded-4xl overflow-hidden bg-black border-4 border-zinc-700 shadow-2xl">
      {/* Dynamic Island */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-black rounded-2xl z-50"></div>
      
      {/* Screen */}
      <div className="relative w-full h-full bg-cover bg-center bg-gradient-to-b from-blue-700/20 to-pink-600/40" >
        
        {/* Status Bar */}
        <div className="flex justify-between items-center text-white text-[15px] w-full pl-10 pr-4 pt-2">
          <div className="items-center relative pt-1">{formatTimeIphone(currentTime)}</div>
          <div className="flex items-center space-x-1">
            <Image src="/assets/images/socials/ios-status.png" alt="Battery" width={80} height={20} />
          </div>
        </div>
        
        {/* Home Screen - Using flex to push dock to bottom */}
        <div className="flex flex-col h-[calc(100%-24px)] justify-between">
          {/* App Grid - Limited to first 12 apps (3 rows of 4) to prevent scrolling */}
          <div className="grid grid-cols-4 gap-4 px-4 py-6">
            {apps.map((app, index) => (
              <AppIcon key={index} app={app} onClick={handleAppClick} />
            ))}
          </div>
          
          {/* Dock - Now at bottom of flex container */}
          <div className="mt-auto">
            <div className="mx-4 mb-6 bg-zinc-500 bg-opacity-20 backdrop-blur-md rounded-3xl p-3 flex justify-around">
              {dockApps.map((app, index) => (
                <DockIcon key={index} app={app} />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* App Popup for iPhone */}
      {selectedApp && (
        <AppPopup 
          selectedApp={selectedApp}
          appRef={appRef}
          isAnimating={isAnimating}
          isClosing={isClosing}
          closeApp={closeApp}
        />
      )}
    </div>
  );
};
