import React from 'react';
import Image from 'next/image';
import { App, AppRef } from './types';
import { apps, dockApps } from './AppsData';
import { formatTimeIpad, formatDateIpad } from './utils';
import { AppIcon } from './AppIcon';
import { DockIcon } from './DockIcon';
import { AppPopup } from './AppPopup';

interface IpadDeviceProps {
  currentTime: Date;
  selectedApp: App | undefined;
  isAnimating: boolean;
  isClosing: boolean;
  appRef: React.RefObject<AppRef | null>;
  handleAppClick: (app: App, e: React.MouseEvent<HTMLDivElement>) => void;
  closeApp: () => void;
}

export const IpadDevice: React.FC<IpadDeviceProps> = ({
  currentTime,
  selectedApp,
  isAnimating,
  isClosing,
  appRef,
  handleAppClick,
  closeApp
}) => {
  return (
    <div className="hidden md:block relative w-[760px] h-[572px] lg:w-[800px] lg:h-[600px] rounded-2xl overflow-hidden bg-black border-2 border-zinc-700 shadow-2xl">
      
      {/* Screen */}
      <div className="relative w-full h-full bg-cover bg-center bg-gradient-to-br from-blue-700/30 to-red-600/40">
        
        {/* Status Bar */}
        <div className="flex justify-between items-center text-white w-full px-3 pt-1 text-xs">
          <div className="flex">{formatTimeIpad(currentTime)}&nbsp;&nbsp;{formatDateIpad(currentTime)}</div>
          <div className="flex items-center space-x-1">
            <Image src="/assets/images/socials/ipad-wifi.png" alt="Battery" width={18} height={20} className="pb-[1px]" />
            <span className="text-xs">92%</span>
            <Image src="/assets/images/socials/ipad-battery.png" alt="Battery" width={24} height={20} className="pt-[1px]" />
          </div>
        </div>
        
        {/* Home Screen Content */}
        <div className="flex flex-col h-[calc(100%-32px)] justify-between">
          {/* iPad has more space so we show more apps in a grid */}
          <div className="grid grid-cols-6 gap-6 px-8 py-8">
            {apps.map((app, index) => (
              <AppIcon key={index} app={app} onClick={handleAppClick} />
            ))}
          </div>
          
          {/* Dock - iPad dock is centered */}
          <div className="mt-auto flex justify-center pb-1">
            <div className="mx-auto bg-zinc-500 bg-opacity-20 backdrop-blur-md rounded-3xl p-3 flex justify-around space-x-4 w-auto">
              {dockApps.map((app, index) => (
                <DockIcon key={index} app={app} onClick={handleAppClick} />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* App Popup for iPad */}
      {selectedApp && (
        <AppPopup 
          selectedApp={selectedApp}
          appRef={appRef}
          isAnimating={isAnimating}
          isClosing={isClosing}
          closeApp={closeApp}
          isIpad={true}
        />
      )}
    </div>
  );
};
