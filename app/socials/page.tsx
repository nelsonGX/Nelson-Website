"use client";

import React, { useState } from 'react';
import { Battery, Signal } from 'lucide-react';
import { FaSignal } from 'react-icons/fa6';
import Image from 'next/image';

const IPhoneUI = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLocked, setIsLocked] = useState(false);
  
  // Update time every minute
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };
  
  const apps = [
    { name: 'Messages', color: 'bg-green-500', icon: '💬' },
    { name: 'Calendar', color: 'bg-white', icon: '📅' },
    { name: 'Photos', color: 'bg-gradient-to-br from-purple-500 to-yellow-400', icon: '🖼️' },
    { name: 'Camera', color: 'bg-zinc-800', icon: '📷' },
    { name: 'Weather', color: 'bg-blue-400', icon: '☀️' },
    { name: 'Clock', color: 'bg-black', icon: '⏰' },
    { name: 'Maps', color: 'bg-gradient-to-br from-pink-200 to-indigo-400', icon: '🗺️' },
    { name: 'Notes', color: 'bg-yellow-200', icon: '📝' },
    { name: 'App Store', color: 'bg-gradient-to-br from-blue-500 to-blue-600', icon: 'A' },
    { name: 'Health', color: 'bg-red-500', icon: '❤️' },
    { name: 'Wallet', color: 'bg-black', icon: '💳' },
    { name: 'Settings', color: 'bg-zinc-400', icon: '⚙️' },
    { name: 'Fitness', color: 'bg-red-400', icon: '🏃' },
    { name: 'Books', color: 'bg-orange-400', icon: '📚' },
    { name: 'Stocks', color: 'bg-black', icon: '📈' },
    { name: 'Reminders', color: 'bg-white', icon: '📋' },
  ];
  
  const dockApps = [
    { name: 'Phone', color: 'bg-green-500', icon: '📞' },
    { name: 'Safari', color: 'bg-blue-500', icon: '🧭' },
    { name: 'Mail', color: 'bg-blue-400', icon: '✉️' },
    { name: 'Music', color: 'bg-gradient-to-br from-pink-500 to-purple-500', icon: '🎵' },
  ];
  
  const handleUnlock = () => {
    setIsLocked(false);
  };
  
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-zinc-800 p-4">
      <div className="relative w-[350px] h-[700px] rounded-4xl overflow-hidden bg-black border-4 border-zinc-700 shadow-2xl">
        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-black rounded-2xl z-50"></div>
        
        {/* Screen */}
        <div className="relative w-full h-full bg-cover bg-center" 
          style={{ backgroundImage: isLocked ? 'url(/api/placeholder/640/1280)' : 'none', 
                  backgroundColor: isLocked ? undefined : '#1e293b' }}>
          
          {/* Status Bar */}
          <div className="flex justify-between items-center text-white text-lg font-bold w-4/5 pl-10">
            <div>{formatTime(currentTime)}</div>
            <div className="flex items-center space-x-1">
              <Image src="/assets/images/socials/ios-status.svg" alt="Battery" width={128} height={20} />
            </div>
          </div>
          
          {/* Home Screen - Using flex to push dock to bottom */}
          <div className="flex flex-col h-[calc(100%-24px)] pt-8 justify-between">
            {/* App Grid - Limited to first 12 apps (3 rows of 4) to prevent scrolling */}
            <div className="grid grid-cols-4 gap-4 px-4 py-6">
              {apps.slice(0, 12).map((app, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-14 h-14 ${app.color} rounded-2xl flex items-center justify-center text-3xl shadow-md`}>
                    {app.icon}
                  </div>
                  <div className="text-white text-xs mt-1">{app.name}</div>
                </div>
              ))}
            </div>
            
            {/* Dock - Now at bottom of flex container */}
            <div className="mt-auto">
              <div className="mx-4 mb-4 bg-zinc-500 bg-opacity-20 backdrop-blur-md rounded-3xl p-3 flex justify-around">
                {dockApps.map((app, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-14 h-14 ${app.color} rounded-2xl flex items-center justify-center text-3xl shadow-md`}>
                      {app.icon}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Home Indicator */}
              <div className="flex justify-center pb-1">
                <div className="w-24 h-1 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPhoneUI;