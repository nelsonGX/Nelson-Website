import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SectionFocusProps {
  children: ReactNode;
  isActive: boolean;
}

/**
 * Component that applies a focus effect to sections
 * When a section is active, it's displayed normally.
 * When inactive, it's slightly faded and blurred.
 */
const SectionFocus: React.FC<SectionFocusProps> = ({ children, isActive }) => {
  return (
    <AnimatePresence>
      <motion.div
        animate={{
          opacity: isActive ? 1 : 0.3,
          filter: isActive ? 'blur(0px)' : 'blur(2px)',
          scale: isActive ? 1 : 0.98
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut"
        }}
        className={`section-focus ${isActive ? 'active' : 'inactive'}`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default SectionFocus;