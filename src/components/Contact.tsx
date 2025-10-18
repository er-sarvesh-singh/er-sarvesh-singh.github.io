import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInViewAnimation } from '../hooks/useScrollReveal';
import { useLocalization } from '../contexts/LocalizationContext';
import { FiMail, FiPhone, FiMapPin, FiSend, FiLinkedin, FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import portfolioData from '@/data/portfolio.json';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const { ref, inView } = useInViewAnimation();
  const { t } = useLocalization();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate form submission
    try {
      // In a real application, you would send the form data to your backend
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // For now, we'll just log the form data
      console.log('Form submitted:', formData);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FiMail,
      label: t('contact.info.email'),
      value: portfolioData.personal.email,
      href: `mailto:${portfolioData.personal.email}`,
    },
    {
      icon: FiPhone,
      label: t('contact.info.phone'),
      value: portfolioData.personal.phone,
      href: `tel:${portfolioData.personal.phone.replace(/[^0-9+]/g, '')}`,
    },
    {
      icon: FiMapPin,
      label: t('contact.info.location'),
      value: portfolioData.personal.location,
      href: '#',
    },
  ];

  const socialLinks = [
    { 
      icon: FiLinkedin, 
      href: portfolioData.socialLinks.linkedin, 
      label: 'LinkedIn',
      color: 'hover:bg-blue-600 hover:text-white'
    },
    { 
      icon: FiGithub, 
      href: portfolioData.socialLinks.github, 
      label: 'GitHub',
      color: 'hover:bg-gray-700 hover:text-white'
    },
    { 
      icon: FiInstagram, 
      href: 'https://instagram.com/sarvesh18', 
      label: 'Instagram',
      color: 'hover:bg-pink-600 hover:text-white'
    },
    { 
      icon: FaWhatsapp, 
      href: `https://wa.me/${portfolioData.personal.whatsapp}?text=${encodeURIComponent('Hi Sarvesh, I found your portfolio and would like to connect!')}`, 
      label: 'WhatsApp',
      color: 'hover:bg-green-600 hover:text-white'
    },
    { 
      icon: FiTwitter, 
      href: portfolioData.socialLinks.twitter, 
      label: 'Twitter',
      color: 'hover:bg-blue-400 hover:text-white'
    },
  ];

  return (
    <section id="contact" className="section-padding bg-accent/50">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {t('contact.title').split(' ').map((word, index) => (
              index === 0 ? <span key={index}>{word} </span> : <span key={index} className="gradient-text">{word}</span>
            ))}
          </h2>
          <p className="text-center text-muted-foreground mb-12">{t('contact.subtitle')}</p>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-6">{t('footer.socialLinks')}</h3>
              <p className="text-muted-foreground mb-8">
                I'm always interested in hearing about new projects and opportunities. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>

              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      className="flex items-center gap-4 group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    >
                      <div className="p-3 bg-background rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{info.label}</p>
                        <p className="font-medium">{info.value}</p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-4">{t('footer.socialLinks')}</p>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 bg-background rounded-lg transition-all hover:scale-110 ${link.color}`}
                        aria-label={`${link.label} - ${t('accessibility.externalLink')}`}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm font-medium mb-1">{t('contact.info.availability')}</p>
                <p className="text-xs text-muted-foreground">Open to new opportunities and collaborations</p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      {t('contact.form.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      {t('contact.form.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    {t('contact.form.subject')}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    placeholder="Project Discussion"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-background rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary px-6 py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                      {t('contact.form.sending')}
                    </>
                  ) : (
                    <>
                      {t('contact.form.send')}
                      <FiSend className="w-5 h-5" />
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-600 text-center"
                  >
                    {t('contact.form.success')}
                  </motion.p>
                )}

                {submitStatus === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-center"
                  >
                    {t('contact.form.error')}
                  </motion.p>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;