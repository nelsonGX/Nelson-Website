import React from 'react';
import { TextReveal } from '../ui/TextReveal';
import { motion } from 'framer-motion';

interface EventsSectionProps {
  events: Record<string, string[]>;
}

const EventsSection: React.FC<EventsSectionProps> = ({ events }) => {
  let lineNumber = 1;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const yearVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const eventVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        type: "spring",
        stiffness: 70,
        damping: 10
      }
    }
  };

  return (
    <section id="events" className="min-h-screen py-20 px-6 relative bg-gradient-to-b from-zinc-900 to-black overflow-hidden">
      <motion.div 
        className="max-w-6xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex items-center mb-16">
          <div className="text-6xl font-bold">
            <TextReveal as="div" className="flex items-center text-white hover:text-zinc-400 duration-500 ease-in-out">
              <h2>
                <span>Events</span>
                <motion.span 
                  className="text-yellow-100 hover:text-yellow-400 duration-500 ease-in-out"
                  whileHover={{ 
                    scale: 1.1, 
                    textShadow: "0 0 8px rgba(251, 191, 36, 0.7)",
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  &nbsp;I
                </motion.span>
                <span>&apos;ve Participated</span>
              </h2>
            </TextReveal>
          </div>
          <motion.div 
            className="h-px bg-gradient-to-r from-orange-500/50 to-transparent flex-grow ml-6"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          ></motion.div>
        </div>
        
        <motion.div 
          className="bg-black rounded-lg border border-zinc-800 overflow-hidden shadow-custom"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ 
            type: "spring",
            stiffness: 50,
            damping: 15,
            delay: 0.2
          }}
        >
          {/* Terminal top bar */}
          <motion.div 
            className="bg-zinc-900 px-4 py-2 border-b border-zinc-800 flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex space-x-2">
              <motion.div 
                className="w-3 h-3 rounded-full bg-red-500"
                whileHover={{ scale: 1.2 }}
              ></motion.div>
              <motion.div 
                className="w-3 h-3 rounded-full bg-yellow-500"
                whileHover={{ scale: 1.2 }}
              ></motion.div>
              <motion.div 
                className="w-3 h-3 rounded-full bg-green-500"
                whileHover={{ scale: 1.2 }}
              ></motion.div>
            </div>
            <motion.div 
              className="text-center text-zinc-400 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              nelson@events:~/history
            </motion.div>
            <div className="flex space-x-2 text-zinc-500 text-xs">
              <span>vim events.md</span>
            </div>
          </motion.div>
          
          <div className="p-6 md:p-8">
            <motion.div 
              className="font-mono"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {Object.entries(events).map(([year, eventList]) => (
                <React.Fragment key={year}>
                  <motion.div 
                    className="flex font-bold text-purple-700"
                    variants={yearVariants}
                  >
                    <span className="text-orange-800 w-8 py-1">{lineNumber++}</span>
                    <motion.span 
                      className="text-xl"
                      whileHover={{ 
                        color: "#c084fc", 
                        x: 5,
                        transition: { duration: 0.2 } 
                      }}
                    >
                      # {year}
                    </motion.span>
                  </motion.div>
                  {eventList.map((event) => (
                    <motion.div 
                      key={event} 
                      className="flex"
                      variants={eventVariants}
                    >
                      <span className="text-orange-800 w-8">{lineNumber++}</span>
                      <TextReveal as="span" className="text-gray-300 hover-glow">{event}</TextReveal>
                    </motion.div>
                  ))}
                  <div>
                    <span className="text-orange-800 w-8">{lineNumber++}</span>
                  </div>
                </React.Fragment>
              ))}
              
              <div className="text-blue-700 mt-6">
                ~<br/>
                ~<br/>
                ~<br/>
              </div>
              <div className="flex text-gray-500 mt-4 justify-between">
                <span>&quot;events.md&quot; {lineNumber-1}L, 431B</span>
                <div className="flex space-x-12">
                  <span>0,0</span>
                  <div className="flex">
                    <span>All</span>
                    <motion.span 
                      className="w-2 h-5 bg-gray-400 ml-1"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    ></motion.span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
      
    </section>
  );
};

export default EventsSection;