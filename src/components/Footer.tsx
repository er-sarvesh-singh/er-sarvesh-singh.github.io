import React from 'react';
import { motion } from 'framer-motion';
import { useLocalization } from '../contexts/LocalizationContext';
import { FiHeart, FiCode, FiCoffee } from 'react-icons/fi';
import portfolioData from '@/data/portfolio.json';

const Footer: React.FC = () => {
  const { t } = useLocalization();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: t('footer.quickLinks'),
      links: portfolioData.navigation.map(nav => ({
        label: t(`navigation.${nav.label.toLowerCase()}`),
        href: nav.href
      }))
    },
    {
      title: t('footer.socialLinks'),
      links: [
        { label: 'GitHub', href: portfolioData.socialLinks.github },
        { label: 'LinkedIn', href: portfolioData.socialLinks.linkedin },
        //{ label: 'Whatsapp', href: portfolioData.socialLinks.twitter },
        { label: 'Instagram', href: portfolioData.socialLinks.instagram },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: t('footer.resume'), href: portfolioData.personal.resumeUrl },
        { label: 'LeetCode', href: portfolioData.socialLinks.leetcode },
        { label: 'HackerRank', href: portfolioData.socialLinks.hackerrank },
        { label: 'CodeChef', href: portfolioData.socialLinks.codechef },
        { label: 'TechGig', href: portfolioData.socialLinks.techgig },
        { label: 'HackerEarth', href: portfolioData.socialLinks.hackerearth },
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
              <h3 className="text-2xl font-bold gradient-text mb-4">{portfolioData.personal.name}</h3>
              <p className="text-muted-foreground mb-4">
                {portfolioData.personal.title} crafting digital experiences with passion and precision.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Made with</span>
                <FiHeart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>and</span>
                <FiCoffee className="w-4 h-4 text-amber-600" />
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
              {portfolioData.footer.copyright.replace('2024', currentYear.toString())}
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
              <span>{portfolioData.footer.techStack}</span>
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
            "{portfolioData.footer.quote.text}"
          </blockquote>
          <cite className="text-sm text-muted-foreground mt-2 block">
            - {portfolioData.footer.quote.author}
          </cite>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;