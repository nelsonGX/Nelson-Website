"use client";

import React, { useState, useRef, useEffect } from 'react';
import { FaEnvelope, FaDiscord, FaTelegram, FaTwitter, FaGithub, FaInstagram, FaFacebook, FaReddit, FaSlack, FaTwitch, FaYoutube, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AppleDeviceUI() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedApp, setSelectedApp] = useState<App | undefined>(undefined);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  interface AppRef {
    app: App;
    rect?: DOMRect;
    x: number;
    y: number;
    width: number;
    height: number;
    containerWidth: number;
    containerHeight: number;
  }
  const appRef = useRef<AppRef | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  interface App {
    name: string;
    color: string;
    icon: React.ReactNode;
    content: string;
    link?: string;
  }
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 10000);
    
    function handleResize() {
      if (selectedApp && appRef.current) {
        const appElement = document.querySelector(`[data-app="${selectedApp.name}"]`);
        if (appElement) {
          const rect = appElement.getBoundingClientRect();
          appRef.current = {
            ...appRef.current,
            rect,
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height,
          };
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedApp]);
  
  function formatTimeIphone(date: Date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };
  function formatTimeIpad(date: Date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };
  function formatDateIpad(date: Date) {
    return date.toLocaleDateString([], { weekday: 'short', month: 'long', day: 'numeric' });
  }
  
  const apps = [
    { name: 'Email', color: 'bg-zinc-700', icon: <FaEnvelope size={32} />, content: "hi@nelsongx.com", link: "mailto:hi@nelsongx.com" },
    { name: 'Discord', color: 'bg-indigo-500', icon: <FaDiscord size={40} />, content: "nelsongx", link: "https://discord.com/users/490731820552290324" },
    { name: 'Telegram', color: 'bg-blue-500', icon: <FaTelegram size={40} />, content: "@nelsonGX", link: "https://t.me/nelsongx" },
    { name: 'Twitter (X)', color: 'bg-blue-400', icon: <FaTwitter size={36} />, content: "@nelsonGX", link: "https://twitter.com/nelsonGX" },
    { name: 'Github', color: 'bg-zinc-800', icon: <FaGithub size={36} />, content: "nelsonGX", link: "https://github.com/nelsonGX" },
    { name: 'Instagram', color: 'bg-gradient-to-br from-pink-500 to-purple-500', icon: <FaInstagram size={40} />, content: "@nelsonGX", link: "https://instagram.com/nelsonGX" },
    { name: 'YouTube', color: 'bg-red-600', icon: <FaYoutube size={36} />, content: "@nelsonGX", link: "https://youtube.com/@nelsonGX" },
    { name: 'Reddit', color: 'bg-orange-600', icon: <FaReddit size={36} />, content: "u/nelsonGX", link: "https://reddit.com/user/nelsonGX" },
    { name: 'Facebook', color: 'bg-blue-600', icon: <FaFacebook size={36} />, content: "nelsonGX", link: "https://facebook.com/nelsonGX" },
    { name: 'Slack', color: 'bg-purple-600', icon: <FaSlack size={36} />, content: "@nelsonGX", link: "https://slack.com" },
    { name: 'Twitch', color: 'bg-purple-700', icon: <FaTwitch size={36} />, content: "nelsonGX", link: "https://twitch.tv/nelsonGX" },
  ];

  const dockApps = [
    { name: 'Phone', color: 'bg-green-500', icon: '📞' },
    { name: 'Safari', color: 'bg-blue-500', icon: '🧭' },
    { name: 'Mail', color: 'bg-blue-400', icon: '✉️' },
    { name: 'Music', color: 'bg-gradient-to-br from-pink-500 to-purple-500', icon: '🎵' },
  ];
  
  const handleAppClick = (app: App, e: React.MouseEvent<HTMLDivElement>) => {
    const iconElement = (e.currentTarget as HTMLElement).querySelector('div');
    
    const iconRect = iconElement?.getBoundingClientRect();
    if (!iconRect) return;
    const deviceContainer = (e.currentTarget as HTMLElement).closest('[class*="rounded"]');
    if (!deviceContainer) return;
    const containerRect = deviceContainer.getBoundingClientRect();
  
    const relativeX = iconRect.left - containerRect.left;
    const relativeY = iconRect.top - containerRect.top;
    
    appRef.current = {
      app: app,
      rect: iconRect,
      x: relativeX,
      y: relativeY,
      width: iconRect?.width,
      height: iconRect?.height,
      containerWidth: containerRect.width,
      containerHeight: containerRect.height
    };
    
    setIsAnimating(true);
    setIsClosing(false);
    
    setTimeout(() => {
      setSelectedApp(app);
    }, 1);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 80);
  };
  
  const closeApp = () => {
    if (!selectedApp) return;
    
    const iconElement = document.querySelector(`[data-app="${selectedApp.name}"]`);
    
    if (iconElement) {
      const iconDiv = iconElement.querySelector('div');
      if (!iconDiv) return;
      
      const iconRect = iconDiv.getBoundingClientRect();
      const deviceContainer = iconElement.closest('[class*="rounded"]');
      if (!deviceContainer) return;
      
      const containerRect = deviceContainer.getBoundingClientRect();
      
      const relativeX = iconRect.left - containerRect.left;
      const relativeY = iconRect.top - containerRect.top;
      
      if (appRef.current) {
        appRef.current = {
          ...appRef.current,
          x: relativeX,
          y: relativeY,
          width: iconRect.width,
          height: iconRect.height,
          containerWidth: containerRect.width,
          containerHeight: containerRect.height
        };
      }
    }
    
    setIsAnimating(true);
    setIsClosing(true);
    
    setTimeout(() => {
      setSelectedApp(undefined);
      setIsAnimating(false);
      setIsClosing(false);
    }, 200);
  };
  
  const renderAppContent = (app: App) => {
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

  const getAnimationStyle = () => {
    if (!appRef.current) return {};
    
    const containerWidth = window.innerWidth > 768 ? 800 : 350;
    const containerHeight = window.innerWidth > 768 ? 600 : 700;
    
    if (isAnimating && appRef.current) {
      const appIconX = appRef.current.x;
      const appIconY = appRef.current.y;
      
      const iconCenterX = appIconX + (appRef.current.width / 2);
      const iconCenterY = appIconY + (appRef.current.height / 2);
      
      const centerXPercent = (iconCenterX / containerWidth) * 100;
      const centerYPercent = (iconCenterY / containerHeight) * 100;
      
      const scaleX = appRef.current.width / containerWidth;
      const scaleY = appRef.current.height / containerHeight;
      
      if (isClosing) {
        return {
          transformOrigin: `${centerXPercent}% ${centerYPercent}%`,
          transform: `scale(${scaleX}, ${scaleY})`,
          opacity: 0
        };
      } else {
        return {
          transformOrigin: `${centerXPercent}% ${centerYPercent}%`,
          transform: `scale(${scaleX}, ${scaleY})`,
          opacity: 0.9
        };
      }
    }
    
    return {
      transform: 'scale(1)',
      opacity: 1
    };
  };
  
  return (
    <>
    <div className="flex flex-col items-center justify-center w-full h-screen bg-zinc-900 py-12 font-sfpro">
      <Header />
      {/* iPhone on small screens, iPad on md and up */}
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
                <div 
                  key={index} 
                  className="flex flex-col items-center cursor-pointer transform hover:scale-105 transition-transform duration-200 ease-in-out"
                  onClick={(e) => handleAppClick(app, e)}
                  data-app={app.name}
                >
                  <div className={`w-14 h-14 ${app.color} rounded-2xl flex items-center justify-center text-3xl shadow-md active:scale-90 transition-transform duration-150`}>
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
                  <div 
                    key={index} 
                    className="flex items-center cursor-pointer transform hover:scale-110 transition-transform duration-200 ease-in-out"
                    data-app={app.name}
                  >
                    <div className={`w-12 h-12 ${app.color} rounded-2xl flex items-center justify-center text-3xl shadow-md active:scale-90 transition-transform duration-150`}>
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
        
        {/* App Popup for iPhone */}
        {selectedApp && (
          <div 
            ref={popupRef}
            className={`absolute top-0 left-0 w-full h-full bg-black z-50 
                      transition-all duration-300 ease-out`}
            style={getAnimationStyle()}
          >
            <div className={`w-full h-full text-white overflow-hidden transition-opacity duration-200 
                            ${isAnimating && !isClosing ? 'opacity-0' : 'opacity-100'}`}>
              {/* Close button with slightly delayed appearance */}
              <button 
                onClick={closeApp}
                className={`absolute top-2 right-2 z-50 bg-black bg-opacity-50 rounded-full p-2 
                          transition-all duration-200 hover:bg-opacity-70
                          ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
              >
                <FaTimes size={20} />
              </button>
              
              {renderAppContent(selectedApp)}
            </div>
          </div>
        )}
      </div>

      {/* iPad for md screens and up */}
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
                <div 
                  key={index} 
                  className="flex flex-col items-center cursor-pointer transform hover:scale-105 transition-transform duration-200 ease-in-out"
                  onClick={(e) => handleAppClick(app, e)}
                  data-app={app.name}
                >
                  <div className={`w-14 h-14 ${app.color} rounded-2xl flex items-center justify-center text-3xl shadow-md active:scale-90 transition-transform duration-150`}>
                    {app.icon}
                  </div>
                  <div className="text-white text-xs mt-1">{app.name}</div>
                </div>
              ))}
            </div>
            
            {/* Dock - iPad dock is centered */}
            <div className="mt-auto flex justify-center pb-1">
              <div className="mx-auto bg-zinc-500 bg-opacity-20 backdrop-blur-md rounded-3xl p-3 flex justify-around space-x-4 w-auto">
                {dockApps.map((app, index) => (
                  <div 
                    key={index} 
                    className="flex items-center cursor-pointer transform hover:scale-110 transition-transform duration-200 ease-in-out"
                    data-app={app.name}
                  >
                    <div className={`w-12 h-12 ${app.color} rounded-2xl flex items-center justify-center text-3xl shadow-md active:scale-90 transition-transform duration-150`}>
                      {app.icon}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Home Indicator */}
              {selectedApp && <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 z-50">
                <div className="w-32 h-1 bg-white rounded-full"></div>
              </div>}
            </div>
          </div>
        </div>
        
        {/* App Popup for iPad */}
        {selectedApp && (
          <div 
            ref={popupRef}
            className={`absolute top-0 left-0 w-full h-full bg-black z-50 
                      transition-all duration-300 ease-out`}
            style={getAnimationStyle()}
          >
            <div className={`w-full h-full text-white overflow-hidden transition-opacity duration-200 
                            ${isAnimating && !isClosing ? 'opacity-0' : 'opacity-100'}`}>
              {/* Close button with slightly delayed appearance */}
              <button 
                onClick={closeApp}
                className={`absolute top-4 right-4 z-50 bg-black bg-opacity-50 rounded-full p-2 
                          transition-all duration-200 hover:bg-opacity-70
                          ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
              >
                <FaTimes size={24} />
              </button>
              
              {renderAppContent(selectedApp)}
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
};