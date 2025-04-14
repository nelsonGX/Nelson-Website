import React from 'react';

interface LoadingScreenProps {
  loading: boolean;
  fadeOut: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ loading, fadeOut }) => {
  if (!loading) return null;
  
  return (
    <div className={`fixed inset-0 bg-zinc-900 z-50 flex items-center justify-center ${fadeOut ? 'opacity-0 transition-opacity duration-500' : ''}`}>
      <div className="text-6xl font-bold flex">
        <span className="text-orange-300">Nelson</span><span>'s</span>
      </div>
    </div>
  );
};

export default LoadingScreen;