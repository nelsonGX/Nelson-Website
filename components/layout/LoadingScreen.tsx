import React from 'react';
import Image from 'next/image';
import { useWindowDimensions } from '@/components/hooks';

interface LoadingScreenProps {
  loading: boolean;
  fadeOut: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ loading, fadeOut }) => {
  const { isSmallScreen } = useWindowDimensions();
  
  if (!loading) return null;
  
  return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center transform ease-linear bg-zinc-900 ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          style={{ transition: `opacity ${isSmallScreen ? 200 : 300}ms` }}
      >
        <div className="relative" itemProp=''>
          <h1 className="text-3xl minecraft left-1/4 top-0 relative font-minecraft text-white">Loading...</h1>
          <Image src="/assets/images/loading.webp" unoptimized alt='loading...' width={249} height={250}/>
        </div>
      </div>
  );
};

export default LoadingScreen;