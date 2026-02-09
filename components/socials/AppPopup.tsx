import React, { useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { App, AppRef } from './types';
import { AppContent } from './AppContent';

interface AppPopupProps {
  selectedApp: App | undefined;
  appRef: React.RefObject<AppRef | null>;
  isAnimating: boolean;
  isClosing: boolean;
  closeApp: () => void;
  isIpad?: boolean;
}

export const AppPopup: React.FC<AppPopupProps> = ({ 
  selectedApp, 
  appRef, 
  isAnimating, 
  isClosing, 
  closeApp,
  isIpad = false
}) => {
  const popupRef = useRef<HTMLDivElement | null>(null);

  if (!selectedApp) return null;

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
    <div 
      ref={popupRef}
      className={`absolute top-0 left-0 w-full h-full bg-black z-40 
                transition-all duration-300 ease-out`}
      style={getAnimationStyle()}
    >
      <div className={`w-full h-full text-white overflow-hidden transition-opacity duration-200 
                      ${isAnimating && !isClosing ? 'opacity-0' : 'opacity-100'}`}>
        {/* Close button with slightly delayed appearance */}
        <button 
          onClick={closeApp}
          className={`absolute ${isIpad ? 'top-3 right-3' : 'top-2 right-2'} z-50 bg-black bg-opacity-50 rounded-full p-2 
                  transition-all duration-200 hover:bg-opacity-70
                  ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
        >
          <FaTimes size={isIpad ? 24 : 20} className="cursor-pointer" />
        </button>
        
        <AppContent app={selectedApp} />
                    
        {/* Home Indicator */}
        {isIpad ? 
        <div className="justify-center pb-1 absolute bottom-0 left-1/2 transform -translate-x-1/2" onClick={closeApp}>
          <div className="w-48 h-1 bg-white rounded-full"></div>
        </div>
        :
        <div className="justify-center pb-1 absolute bottom-0 left-1/2 transform -translate-x-1/2" onClick={closeApp}>
          <div className="w-30 h-1 bg-white rounded-full"></div>
        </div>
        }
      </div>
    </div>
  );
};
