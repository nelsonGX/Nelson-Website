import React from 'react';

interface EventsSectionProps {
  events: Record<string, string[]>;
}

const EventsSection: React.FC<EventsSectionProps> = ({ events }) => {
  // Track the line number across all years and events
  let lineNumber = 1;

  return (
    <section id="events" className="min-h-screen py-20 px-6 relative bg-gradient-to-b from-zinc-900 to-black">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center mb-16">
          <div className="text-6xl font-bold">
            <div className="flex items-center text-white hover:text-zinc-400 duration-500 ease-in-out">
              <h2><span>Events</span><span className="text-yellow-100 hover:text-yellow-400 duration-500 ease-in-out">&nbsp;I</span><span>&apos;ve Participated</span></h2>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-orange-500/50 to-transparent flex-grow ml-6"></div>
        </div>
        
        <div className="bg-black rounded-lg border border-zinc-800 overflow-hidden shadow-xl">
          <div className="p-6 md:p-8">
            <div className="font-mono">
              {Object.entries(events).map(([year, eventList]) => (
                <React.Fragment key={year}>
                  <div className="flex font-bold text-purple-700">
                    <span className="text-orange-800 w-8 py-1">{lineNumber++}</span>
                    <span className="text-xl"># {year}</span>
                  </div>
                  {eventList.map((event) => (
                    <div key={event} className="flex">
                      <span className="text-orange-800 w-8">{lineNumber++}</span>
                      <span className="text-gray-300">{event}</span>
                    </div>
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
                  <span>All</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/4 right-1/4 w-1/3 h-1/3 bg-orange-600/5 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default EventsSection;