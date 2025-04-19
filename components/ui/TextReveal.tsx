import React from 'react';
import { useIntersectionObserver } from '../hooks/userInteractionObserver';

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: string;
  speed?: string;
  as?: React.ElementType;
  flex?: boolean;
}

export function TextReveal({ 
  children, 
  className = '', 
  delay = '', 
  speed = '',
  as = 'span',
  flex = false
}: TextRevealProps) {
  const [ref, isIntersecting] = useIntersectionObserver();
  
  const flexClass = flex ? 'text-reveal-flex' : '';
  const delayClass = delay ? `delay-${delay}` : '';
  const speedClass = speed || '';
  
  const Component = as;
  
  return (
    <Component 
      ref={ref}
      className={`text-reveal on-scroll ${isIntersecting ? 'visible' : ''} ${flexClass} ${delayClass} ${speedClass} ${className}`}
    >
      {children}
    </Component>
  );
}