"use client";

import React, { useState } from 'react';
import { FaEnvelope, FaDiscord, FaTelegram, FaTwitter, FaGithub, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const AppleDeviceUI = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 10000);
    return () => clearInterval(timer);
  }, []);
  
  const formatTimeIphone = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };
  const formatTimeIpad = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };
  
  const apps = [
    { name: 'Email', color: 'bg-zinc-700', icon: <FaEnvelope size={32} />, content: "hi@nelsongx.com", link: "mailto:hi@nelsongx.com" },
    { name: 'Discord', color: 'bg-indigo-500', icon: <FaDiscord size={40} />, content: "nelsongx", link: "https://discord.com/users/490731820552290324" },
    { name: 'Telegram', color: 'bg-blue-500', icon: <FaTelegram size={40} />, content: "@nelsonGX", link: "https://t.me/nelsongx" },
    { name: 'Twitter (X)', color: 'bg-blue-400', icon: <FaTwitter size={36} />, content: "@nelsonGX", link: "https://twitter.com/nelsonGX" },
    { name: 'Github', color: 'bg-zinc-800', icon: <FaGithub size={36} />, content: "nelsonGX", link: "https://github.com/nelsonGX" },
    { name: 'Instagram', color: 'bg-gradient-to-br from-pink-500 to-purple-500', icon: <FaInstagram size={40} />, content: "@nelsonGX", link: "https://instagram.com/nelsonGX" },
  ];

  const dockApps = [
    { name: 'Phone', color: 'bg-green-500', icon: '📞' },
    { name: 'Safari', color: 'bg-blue-500', icon: '🧭' },
    { name: 'Mail', color: 'bg-blue-400', icon: '✉️' },
    { name: 'Music', color: 'bg-gradient-to-br from-pink-500 to-purple-500', icon: '🎵' },
  ];
  
  return (
    <>
    <div className="flex flex-col items-center justify-center w-full h-screen bg-zinc-900 p-4">
      <Header />
      {/* iPhone on small screens, iPad on md and up */}
      <div className="relative md:hidden w-[350px] h-[700px] rounded-4xl overflow-hidden bg-black border-4 border-zinc-700 shadow-2xl">
        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-black rounded-2xl z-50"></div>
        
        {/* Screen */}
        <div className="relative w-full h-full bg-cover bg-center bg-linear-to-b from-blue-700/20 to-pink-600/40" >
          
          {/* Status Bar */}
          <div className="flex justify-between items-center text-white text-[15px] w-full pl-10 pr-4 pt-3">
            <div className="items-center relative">{formatTimeIphone(currentTime)}</div>
            <div className="flex items-center space-x-1">
              <Image src="/assets/images/socials/ios-status.png" alt="Battery" width={80} height={20} />
            </div>
          </div>
          
          {/* Home Screen - Using flex to push dock to bottom */}
          <div className="flex flex-col h-[calc(100%-24px)] justify-between">
            {/* App Grid - Limited to first 12 apps (3 rows of 4) to prevent scrolling */}
            <div className="grid grid-cols-4 gap-4 px-4 py-6">
              {apps.map((app, index) => (
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
              <div className="mx-4 mb-6 bg-zinc-500 bg-opacity-20 backdrop-blur-md rounded-3xl p-3 flex justify-around">
                {dockApps.map((app, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-12 h-12 ${app.color} rounded-2xl flex items-center justify-center text-3xl shadow-md`}>
                      {app.icon}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Home Indicator */}
              <div className="hidden justify-center pb-1">
                <div className="w-24 h-1 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* iPad for md screens and up */}
      <div className="hidden md:block relative w-[800px] h-[600px] rounded-2xl overflow-hidden bg-black border-2 border-zinc-700 shadow-2xl">
        
        {/* Screen */}
        <div className="relative w-full h-full bg-cover bg-center bg-gradient-to-br from-blue-700/30 to-red-600/40">
          
          {/* Status Bar */}
          <div className="flex justify-between items-center text-white w-full px-3 pt-1 text-xs">
            <div>{formatTimeIpad(currentTime)}</div>
            <div className="flex items-center space-x-1">
              <Image src="/assets/images/socials/ipad-wifi.png" alt="Battery" width={16} height={20} />
              <span className="text-xs">92%</span>
              <Image src="/assets/images/socials/ipad-battery.png" alt="Battery" width={20} height={20} className="pt-[1px]" />
            </div>
          </div>
          
          {/* Home Screen Content */}
          <div className="flex flex-col h-[calc(100%-32px)] justify-between">
            {/* iPad has more space so we show more apps in a grid */}
            <div className="grid grid-cols-6 gap-6 px-8 py-8">
              {apps.map((app, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-14 h-14 ${app.color} rounded-2xl flex items-center justify-center text-3xl shadow-md`}>
                    {app.icon}
                  </div>
                  <div className="text-white text-xs mt-1">{app.name}</div>
                </div>
              ))}
            </div>
            
            {/* Dock - iPad dock is centered */}
            <div className="mt-auto flex justify-center">
              <div className="mx-auto bg-zinc-500 bg-opacity-20 backdrop-blur-md rounded-3xl p-3 flex justify-around space-x-4 w-auto">
                {dockApps.map((app, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-14 h-14 ${app.color} rounded-2xl flex items-center justify-center text-3xl shadow-md`}>
                      {app.icon}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Home Indicator */}
              <div className="absolute hidden bottom-1 left-1/2 transform -translate-x-1/2">
                <div className="w-32 h-1 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default AppleDeviceUI;