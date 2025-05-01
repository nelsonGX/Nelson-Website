import { useState, useEffect } from 'react';

interface SectionInfo {
  id: string;
  element: Element;
  top: number;
  bottom: number;
  height: number;
}

const useSectionInView = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [sections, setSections] = useState<SectionInfo[]>([]);

  useEffect(() => {
    // Initialize sections after mounting
    const initSections = () => {
      const sectionElements = sectionIds.map(id => {
        const element = document.getElementById(id);
        if (!element) return null;

        const rect = element.getBoundingClientRect();
        return {
          id,
          element,
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY,
          height: rect.height
        };
      }).filter((section): section is SectionInfo => section !== null);

      setSections(sectionElements);
    };

    // Wait a bit for the DOM to be fully rendered
    const timer = setTimeout(initSections, 100);

    // Check if we need to recalculate section positions (on resize)
    window.addEventListener('resize', initSections);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', initSections);
    };
  }, [sectionIds]);

  useEffect(() => {
    if (sections.length === 0) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const viewportCenter = scrollY + viewportHeight / 2;

      // Find which section the center of the viewport is in
      let current: string | null = null;
      
      for (const section of sections) {
        // Check if center of viewport is within this section
        if (viewportCenter >= section.top && viewportCenter <= section.bottom) {
          current = section.id;
          break;
        }
      }

      // If no section found (might be in between sections), find the closest one
      if (!current && sections.length > 0) {
        let minDistance = Infinity;
        
        for (const section of sections) {
          const distanceToTop = Math.abs(section.top - viewportCenter);
          const distanceToBottom = Math.abs(section.bottom - viewportCenter);
          const minSectionDistance = Math.min(distanceToTop, distanceToBottom);
          
          if (minSectionDistance < minDistance) {
            minDistance = minSectionDistance;
            current = section.id;
          }
        }
      }

      setActiveSection(current);
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  return activeSection;
};

export default useSectionInView;