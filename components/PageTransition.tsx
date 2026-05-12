"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useLoadingContext } from './context/LoadingContext';

export default function PageTransition() {
  const pathname = usePathname();
  const { setIsFirstVisit } = useLoadingContext();
  const prevPathnameRef = useRef<string | null>(null);
  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    if (prevPathnameRef.current === null) {
      prevPathnameRef.current = pathname;
      return;
    }

    if (hasNavigatedRef.current || prevPathnameRef.current !== pathname) {
      setIsFirstVisit(false);
      hasNavigatedRef.current = true;
      prevPathnameRef.current = pathname;
    }
  }, [pathname, setIsFirstVisit]);
  
  return null; // This component doesn't render anything
}