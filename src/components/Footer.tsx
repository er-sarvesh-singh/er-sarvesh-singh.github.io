import React from 'react';
import { motion } from 'framer-motion';
import { useLocalization } from '../contexts/LocalizationContext';
import { FiCode } from 'react-icons/fi';
import { socialLinks, navigation, personal, tagline, quote, copyright, techStack } from '@/data/portfolio.json';

const Footer: React.FC = () => {
  const { t } = useLocalization();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: t('footer.quickLinks'),
      links: navigation.map(nav => ({
        label: t(`navigation.${nav.label.toLowerCase()}`),
        href: nav.href
      }))
    },
    {
      title: t('footer.socialLinks'),
      links: [
        { label: 'LinkedIn', href: socialLinks.linkedin },
        { label: 'GitHub', href: socialLinks.github },
        { label: 'Instagram', href: socialLinks.instagram },
        { label: 'Whatsapp', href: socialLinks.whatsapp }
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: t('common.resume'), href: personal.resumeUrl },
        { label: 'LeetCode', href: socialLinks.leetcode },
        { label: 'HackerRank', href: socialLinks.hackerrank },
        { label: 'CodeChef', href: socialLinks.codechef },
        { label: 'HackerEarth', href: socialLinks.hackerearth },
        { label: 'TechGig', href: socialLinks.techgig },
      ],
    },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        const offset = 80; // Header height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="container-custom py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold gradient-text mb-4">{personal.name}</h3>
              <p className="text-muted-foreground mb-4">
                {tagline.replace('{{title}}', personal.subtitle)}
              </p>
              <div className="text-sm text-muted-foreground">
                {t('footer.madeWithLove').replace('{{heart}}', '❤️').replace('{{coffee}}', '☕')}
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      aria-label={link.href.startsWith('http') ? `${link.label} - ${t('accessibility.externalLink')}` : link.label}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <motion.p
              className="text-sm text-muted-foreground text-center md:text-left"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {copyright.replace('{{year}}', currentYear.toString())}
            </motion.p>

            {/* Tech Stack */}
            <motion.div
              className="flex items-center gap-2 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <FiCode className="w-4 h-4" />
              <span>{techStack}</span>
            </motion.div>
          </div>
        </div>

        {/* Motivational Quote */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <blockquote className="text-lg italic text-muted-foreground">
            "{quote.text}"
          </blockquote>
          <cite className="text-sm text-muted-foreground mt-2 block">
            - {quote.author}
          </cite>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;