import React, { useState, useEffect } from 'react';

export function MusicContent() {
  // Use direct iframe embed instead of YouTube API for maximum compatibility
  return (
    <div className="w-full h-full bg-black">
      <div className="relative w-full h-full pb-0">
        <iframe 
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0&playsinline=1&enablejsapi=0"
          title="Rick Astley - Never Gonna Give You Up"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          frameBorder="0"
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        ></iframe>
      </div>
    </div>
  );
}