"use client";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLoadingContext } from './context/LoadingContext';

export default function PageTransition() {
  const pathname = usePathname();
  const { setIsFirstVisit } = useLoadingContext();
  const [prevPathname, setPrevPathname] = useState<string | null>(null);
  const [hasNavigated, setHasNavigated] = useState(false);
  
  useEffect(() => {
    // On first render, just store the initial pathname
    if (prevPathname === null) {
      console.log('Initial page load, path:', pathname);
      setPrevPathname(pathname);
      return;
    }
    
    // If we've already navigated before or the pathname has changed
    if (hasNavigated || prevPathname !== pathname) {
      console.log('Navigation detected:', prevPathname, '->', pathname);
      setIsFirstVisit(false);
      setHasNavigated(true);
      setPrevPathname(pathname);
    }
  }, [pathname, prevPathname, hasNavigated, setIsFirstVisit]);
  
  return null; // This component doesn't render anything
}