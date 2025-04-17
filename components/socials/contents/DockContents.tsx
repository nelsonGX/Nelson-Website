import React, { useState, useRef } from 'react';
import DockMessageContent from './DockMessageContent';

export function MusicContent() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  return (
    <div className="w-full h-full p-4 bg-black flex items-center justify-center">
      <div className="w-full h-full relative mx-auto">
        {!iframeLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-t-2 border-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
        <iframe 
          ref={iframeRef}
          src={"https://www.youtube.com/embed/dQw4w9WgXcQ"}
          title="Rick Astley - Never Gonna Give You Up"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          frameBorder="0"
          onLoad={handleIframeLoad}
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '8px'
          }}
        ></iframe>
      </div>
    </div>
  );
}

export function PhoneContent() {
  return (
    <>
    <div className="items-center justify-center flex flex-col w-full h-full p-4 bg-zinc-800">
      <h1 className="text-2xl font-bold text-center mb-4">🔊🔊🔊🔊<br/>sdong dong dong dong dong dong dong<br/>💥💥💥your phone lining <br/>your phone lining📱📱📞<br/>big boy come pickup yo fone !!!<br/>why you no pick up ??yo phone lininnnng !!!<br/>yo  phone going to voicemail goodba 👋👋<br/>🗣️🗣️🗣️</h1>
    </div>
    </>
  )
}

export function MessageContent() {
  return (
    <>
    <DockMessageContent /></>
  )
}