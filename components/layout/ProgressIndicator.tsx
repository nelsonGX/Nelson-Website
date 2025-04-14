import React from 'react';

interface ProgressIndicatorProps {
  scrollProgress: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ scrollProgress }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div 
        className="h-full bg-orange-500"
        style={{ width: `${scrollProgress * 100}%`, transition: 'width 0.1s' }}
      ></div>
    </div>
  );
};

export default ProgressIndicator;