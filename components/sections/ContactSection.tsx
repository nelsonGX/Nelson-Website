"use client";

import React, { useState } from 'react';
import { Mail, Link as LLink, Check, Copy, ArrowRight, Send } from 'lucide-react';
import { FaDiscord, FaTelegram } from 'react-icons/fa';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import SectionHeading, { cardClass } from '../ui/SectionHeading';

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
    <div className="group flex items-center gap-4 rounded-xl px-4 py-3.5 transition-colors hover:bg-white/[0.04]">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-orange-300">
        {icon}
      </span>
      <div className="min-w-0 flex-grow">
        <p className="text-xs text-zinc-500">{title}</p>
        <p className="truncate text-zinc-100">{value}</p>
      </div>
      <button 
        type="button"
        onClick={copyToClipboard}
        className="rounded-full p-2 text-zinc-500 transition-all hover:bg-white/10 hover:text-zinc-100 focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100 cursor-pointer"
        aria-label={`Copy ${title}`}
      >
        {copied ? <Check className="text-emerald-400" size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
};

const ContactSection: React.FC = () => {
  const t = useTranslations('home.contact');
  const locale = useLocale();
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
      setSubmitError(t('form.errorMessage'));
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-zinc-100 placeholder-zinc-600 transition-colors focus:border-orange-300/60 focus:outline-none focus:ring-2 focus:ring-orange-300/20";

  return (
    <section id="contact" className="relative scroll-mt-20 px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          label="contact"
          before={t('title.contact')}
          accent={t('title.me')}
        />
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className={`${cardClass} p-3 md:col-span-5`}>
            <div className="px-4 pb-4 pt-3">
              <h3 className="text-xl font-semibold text-zinc-50">{t('getInTouch.title')}</h3>
              <p className="mt-1 text-zinc-400">{t('getInTouch.subtitle')}</p>
            </div>
            <ContactCard icon={<Mail size={18} />} title={t('contact.email')} value="hi@nelsongx.com" />
            <ContactCard icon={<FaDiscord size={18} />} title={t('contact.discord')} value="@nelsonGX" />
            <ContactCard icon={<FaTelegram size={18} />} title={t('contact.telegram')} value="@nelsonGX" />
            <Link
              href={`/${locale}/socials`}
              className="group mt-1 flex items-center gap-4 rounded-xl border-t border-white/[0.06] px-4 py-3.5 transition-colors hover:bg-white/[0.04]"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-orange-300">
                <LLink size={18} />
              </span>
              <div className="flex-grow">
                <p className="text-xs text-zinc-500">{t('viewMore.title')}</p>
                <p className="text-zinc-100">{t('viewMore.link')}</p>
              </div>
              <ArrowRight size={16} className="text-zinc-500 transition-transform group-hover:translate-x-1 group-hover:text-orange-300" />
            </Link>
          </div>
          
          <div className={`${cardClass} p-6 md:col-span-7 md:p-8`}>
            <h3 className="mb-6 text-xl font-semibold text-zinc-50">{t('form.title')}</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm text-zinc-400">{t('form.name.label')}</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder={t('form.name.placeholder')}
                    autoComplete="name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm text-zinc-400">{t('form.email.label')}</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder={t('form.email.placeholder')}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm text-zinc-400">{t('form.message.label')}</label>
                <textarea 
                  id="message" 
                  rows={6} 
                  value={formData.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                  placeholder={t('form.message.placeholder')}
                  required
                ></textarea>
              </div>
              
              {submitSuccess && (
                <p role="status" className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">{t('form.success')}</p>
              )}
              
              {submitError && (
                <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{t('form.error')}</p>
              )}
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-orange-300 py-3 font-medium text-zinc-950 transition-colors hover:bg-orange-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={16} />
                {isSubmitting ? t('form.button.sending') : t('form.button.send')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
