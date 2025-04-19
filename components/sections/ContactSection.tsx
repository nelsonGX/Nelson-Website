"use client";

import React, { useState } from 'react';
import { Mail, Link as LLink, Check, Copy } from 'lucide-react';
import { FaDiscord, FaTelegram } from 'react-icons/fa';
import { TextReveal } from '../ui/TextReveal';

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ icon, title, value }) => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  return (
    <div className="flex items-center gap-4 p-4 bg-zinc-800/40 backdrop-blur-sm rounded-lg border border-zinc-700 relative group">
      {icon}
      <div className="flex-grow">
        <h4 className="text-gray-300 font-medium">{title}</h4>
        <p className="text-gray-500">{value}</p>
      </div>
      <button 
        onClick={copyToClipboard}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-zinc-700/70 cursor-pointer"
        aria-label={`Copy ${title}`}
      >
        {copied ? <Check className="text-green-400" size={18} /> : <Copy className="text-gray-400" size={18} />}
      </button>
    </div>
  );
};

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Google Form submission
      const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdeaeu7dgXFw26tSWma59JcK7KSs8HDYz4MzbXKH9G9gmYNHQ/formResponse';
      
      const formDataObj = new FormData();
      formDataObj.append('entry.967188586', formData.name);
      formDataObj.append('entry.141177975', formData.email);
      formDataObj.append('entry.1827564801', formData.message);
      
      // Using fetch with no-cors mode since Google Forms doesn't allow CORS
      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formDataObj
      });

      // Reset form and show success
      setFormData({ name: '', email: '', message: '' });
      setSubmitSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError('There was an error submitting the form. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen pt-20 px-6 relative bg-black pb-20 md:pb-0">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center mb-16">
          <div className="text-6xl font-bold">
            <TextReveal as="div" className="flex items-center text-white hover:text-zinc-400 duration-500 ease-in-out">
              <h2><span>Contact</span><span className="text-yellow-100 hover:text-yellow-400 duration-500 ease-in-out">&nbsp;Me</span></h2>
            </TextReveal>
          </div>
          <div className="h-px bg-gradient-to-r from-orange-500/50 to-transparent flex-grow ml-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Get In Touch</h3>
                <p className="text-gray-400">
                  Want to talk to me?
                </p>
              </div>
              
              <div className="space-y-4">
                <ContactCard 
                  icon={<Mail className="text-orange-400" size={24} />}
                  title="Email"
                  value="hi@nelsongx.com"
                />
                
                <ContactCard 
                  icon={<FaDiscord className="text-orange-400" size={24} />}
                  title="Discord"
                  value="@nelsonGX"
                />

                <ContactCard 
                  icon={<FaTelegram className="text-orange-400" size={24} />}
                  title="Telegram"
                  value="@nelsonGX"
                />

                <div className="flex items-center gap-4 p-4 bg-zinc-800/40 backdrop-blur-sm rounded-lg border border-zinc-700">
                  <LLink className="text-orange-400" size={24} />
                  <div>
                    <h4 className="text-gray-300 font-medium">View More...</h4>
                    <a href="/socials" className="text-orange-300 hover:underline">Go to the socials page</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-zinc-800/40 backdrop-blur-sm rounded-xl p-6 border border-zinc-700">
            <h3 className="text-xl font-semibold text-white mb-6">Send Me a Message</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="Your email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-500 resize-none"
                  placeholder="Your message"
                  required
                ></textarea>
              </div>
              
              {submitSuccess && (
                <div className="px-4 py-3 bg-green-500/20 border border-green-600 rounded-lg">
                  <p className="text-green-400 text-sm font-medium">Message sent successfully! I&apos;ll get back to you soon.</p>
                </div>
              )}
              
              {submitError && (
                <div className="px-4 py-3 bg-red-500/20 border border-red-600 rounded-lg">
                  <p className="text-red-400 text-sm font-medium">{submitError}</p>
                </div>
              )}
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="cursor-pointer w-full py-3 bg-gradient-to-r from-orange-600 to-yellow-600 text-white font-medium rounded-lg hover:from-orange-500 hover:to-yellow-500 transition-all shadow-lg shadow-orange-700/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
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