import { useState, useEffect, useRef, RefObject } from 'react';

interface IntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useIntersectionObserver(options: IntersectionObserverOptions = {}): [RefObject<HTMLElement>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const hasIntersected = useRef(false);
  const ref = useRef<HTMLElement>(null!);
  const { once = true } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (once && hasIntersected.current) {
        return;
      }
      
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        hasIntersected.current = true;
        
        if (once && ref.current) {
          observer.unobserve(ref.current);
        }
      } else if (!once) {
        setIsIntersecting(false);
      }
    }, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px',
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.rootMargin, once]);

  return [ref, isIntersecting];
}