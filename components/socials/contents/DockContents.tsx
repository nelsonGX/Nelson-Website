import React, { useState, useEffect } from 'react';

export function MusicContent() {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if device is iOS
    const checkIOS = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };
    
    setIsIOS(checkIOS());
  }, []);

  // For iOS, use a specific format that works better with Safari
  const videoUrl = isIOS 
    ? "https://www.youtube.com/embed/dQw4w9WgXcQ?playsinline=1&controls=1"
    : "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0";

  return (
    <div className="w-full h-full bg-black flex items-center justify-center">
      <div className="w-full h-full max-w-[90vw] max-h-[50vh] md:max-w-xl md:max-h-[60vh] relative mx-auto">
        <iframe 
          src={videoUrl}
          title="Rick Astley - Never Gonna Give You Up"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          frameBorder="0"
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