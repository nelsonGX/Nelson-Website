import { useSyncExternalStore } from 'react';

const subscribe = (callback: () => void) => {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
};

const useWindowDimensions = () => {
  const windowWidth = useSyncExternalStore(subscribe, () => window.innerWidth, () => 0);
  const windowHeight = useSyncExternalStore(subscribe, () => window.innerHeight, () => 0);
  const isSmallScreen = windowWidth > 0 && windowWidth < 768;

  return { windowWidth, windowHeight, isSmallScreen };
};

export default useWindowDimensions;
