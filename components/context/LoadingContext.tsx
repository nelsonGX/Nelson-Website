"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';

type LoadingContextType = {
  isFirstVisit: boolean;
  setIsFirstVisit: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoadingContext = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoadingContext must be used within LoadingProvider');
  }
  return context;
};

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to true on first load to show loading animation
  // Will be set to false only after user navigates between pages
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(true);

  // Debug output
  useEffect(() => {
    console.log('LoadingContext: isFirstVisit =', isFirstVisit);
  }, [isFirstVisit]);

  return (
    <LoadingContext.Provider value={{ isFirstVisit, setIsFirstVisit }}>
      {children}
    </LoadingContext.Provider>
  );
};