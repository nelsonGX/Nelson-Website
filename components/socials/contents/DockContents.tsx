import React, { useState, useRef } from 'react';

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