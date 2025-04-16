"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { IphoneDevice } from '@/components/socials/IphoneDevice';
import { IpadDevice } from '@/components/socials/IpadDevice';
import { useAppAnimation } from '@/components/socials/useAppAnimation';

export default function AppleDeviceUI() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { 
    selectedApp, 
    isAnimating, 
    isClosing, 
    appRef, 
    handleAppClick, 
    closeApp 
  } = useAppAnimation();
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 10000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  return (
    <>
    <div className="flex flex-col items-center justify-center w-full h-screen bg-zinc-900 py-12 font-sfpro">
      <Header />
      
      {/* iPhone for small screens */}
      <IphoneDevice 
        currentTime={currentTime}
        selectedApp={selectedApp}
        isAnimating={isAnimating}
        isClosing={isClosing}
        appRef={appRef}
        handleAppClick={handleAppClick}
        closeApp={closeApp}
      />

      {/* iPad for medium screens and up */}
      <IpadDevice 
        currentTime={currentTime}
        selectedApp={selectedApp}
        isAnimating={isAnimating}
        isClosing={isClosing}
        appRef={appRef}
        handleAppClick={handleAppClick}
        closeApp={closeApp}
      />
    </div>
    <Footer />
    </>
  );
};