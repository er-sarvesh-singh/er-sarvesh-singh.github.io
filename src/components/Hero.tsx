import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiDownload, FiInstagram } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { SiLeetcode, SiHackerrank, SiCodechef } from 'react-icons/si';
import { useLocalization } from '../contexts/LocalizationContext';
import portfolioData from '@/data/portfolio.json';
import { calculateYearsOfExperience, CAREER_START_DATE } from '@/utils/calculateStats';

const Hero: React.FC = () => {
  const { t } = useLocalization();

  const socialLinks = [
    { icon: FiLinkedin, href: portfolioData.socialLinks.linkedin, label: 'LinkedIn', color: 'hover:bg-blue-600' },
    { icon: FiGithub, href: portfolioData.socialLinks.github, label: 'GitHub', color: 'hover:bg-gray-700' },
    { icon: FiInstagram, href: portfolioData.socialLinks.instagram, label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: FaWhatsapp, href: `https://wa.me/${portfolioData.personal.whatsapp}?text=${encodeURIComponent('Hi Sarvesh, I found your portfolio and would like to connect!')}`, label: 'WhatsApp', color: 'hover:bg-green-600' },
    //{ icon: FiTwitter, href: portfolioData.socialLinks.twitter, label: 'Twitter', color: 'hover:bg-blue-400' },
    { icon: FiMail, href: `mailto:${portfolioData.personal.email}`, label: 'Email', color: 'hover:bg-red-600' },
  ];

  const codingProfiles = [
    { icon: SiLeetcode, href: portfolioData.socialLinks.leetcode, label: 'LeetCode' },
    { icon: SiHackerrank, href: portfolioData.socialLinks.hackerrank, label: 'HackerRank' },
    { icon: SiCodechef, href: portfolioData.socialLinks.codechef, label: 'CodeChef' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center section-padding pt-32">
      <div className="container-custom">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Image */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <img
                src={portfolioData.personal.profileImage}
                alt={portfolioData.personal.name}
                className="relative w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-background shadow-xl"
              />
            </div>
          </motion.div>

          {/* Name and Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            {t('hero.greeting')} <span className="gradient-text">{portfolioData.personal.name}</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-muted-foreground mb-6"
          >
            {portfolioData.hero.subtitle}
          </motion.p>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            With {calculateYearsOfExperience(CAREER_START_DATE)}+ years of experience {portfolioData.hero.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4 justify-center mb-12"
          >
            <a
              href="#contact"
              className="btn-primary px-8 py-3 rounded-lg flex items-center gap-2"
            >
              {t('hero.cta.contact')}
            </a>
            <a
              href={portfolioData.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline px-8 py-3 rounded-lg flex items-center gap-2"
              aria-label={t('accessibility.downloadFile')}
            >
              <FiDownload className="w-5 h-5" />
              {t('hero.cta.resume')}
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <p className="text-sm text-muted-foreground mb-4">{t('footer.socialLinks')}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              {/* Main Social Links */}
              <div className="flex flex-wrap gap-4 justify-center">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-lg bg-accent transition-all hover:scale-110 hover:text-white ${link.color}`}
                      aria-label={`${link.label} - ${t('accessibility.externalLink')}`}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="hidden md:block w-full md:w-px bg-border my-4 md:my-0"></div>

              {/* Coding Profiles */}
              <div className="flex gap-4">
                {codingProfiles.map((profile) => {
                  const Icon = profile.icon;
                  return (
                    <a
                      key={profile.label}
                      href={profile.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-accent hover:bg-accent/80 transition-all hover:scale-110"
                      aria-label={`${profile.label} - ${t('accessibility.externalLink')}`}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-muted-foreground/30 rounded-full mt-2"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;