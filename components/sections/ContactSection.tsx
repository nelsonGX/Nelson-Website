import React from 'react';
import { Mail, Github } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="min-h-screen py-20 px-6 relative bg-black">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center mb-16">
          <div className="text-6xl font-bold">
            <div className="flex items-center text-white hover:text-zinc-400 duration-500 ease-in-out">
              <h2><span>Contact</span><span className="text-yellow-100 hover:text-yellow-400 duration-500 ease-in-out">&nbsp;Me</span></h2>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-orange-500/50 to-transparent flex-grow ml-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Get In Touch</h3>
                <p className="text-gray-400">
                  Interested in working together or have a question?
                  Feel free to reach out--I&apos;m always open to new opportunities and connections.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-zinc-800/40 backdrop-blur-sm rounded-lg border border-zinc-700">
                  <Mail className="text-orange-400" size={24} />
                  <div>
                    <h4 className="text-gray-300 font-medium">Email</h4>
                    <p className="text-gray-500">nelson@example.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-zinc-800/40 backdrop-blur-sm rounded-lg border border-zinc-700">
                  <Github className="text-orange-400" size={24} />
                  <div>
                    <h4 className="text-gray-300 font-medium">GitHub</h4>
                    <p className="text-gray-500">github.com/nelson</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-zinc-800/40 backdrop-blur-sm rounded-xl p-6 border border-zinc-700">
            <h3 className="text-xl font-semibold text-white mb-6">Send Me a Message</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-2 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="Your email"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="w-full px-4 py-2 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-500 resize-none"
                  placeholder="Your message"
                ></textarea>
              </div>
              
              <button 
                type="button" 
                className="w-full py-3 bg-gradient-to-r from-orange-600 to-yellow-600 text-white font-medium rounded-lg hover:from-orange-500 hover:to-yellow-500 transition-all shadow-lg shadow-orange-700/20"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute bottom-1/4 left-1/4 w-1/3 h-1/3 bg-gradient-to-br from-orange-600/5 to-yellow-600/5 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default ContactSection;