import React from 'react';
import { motion } from 'framer-motion';
import { useLocalization } from '../contexts/LocalizationContext';
import { FaWhatsapp } from 'react-icons/fa';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiInstagram } from 'react-icons/fi';
import { SiLeetcode, SiHackerrank, SiCodechef } from 'react-icons/si';
import { personal, bio, socialLinks } from '@/data/portfolio.json';
import { calculateYearsOfExperience } from '@/utils';

const Hero: React.FC = () => {
  const { t } = useLocalization();

  const socialProfiles = [
    { icon: FiLinkedin, href: socialLinks.linkedin, label: 'LinkedIn', color: 'hover:bg-blue-600' },
    { icon: FiGithub, href: socialLinks.github, label: 'GitHub', color: 'hover:bg-gray-700' },
    { icon: FiInstagram, href: socialLinks.instagram, label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: FaWhatsapp, href: `${socialLinks.whatsapp}${encodeURIComponent(t('common.whatsappMessage').replace('{{name}}', personal.name.split(' ')[0]))}`, label: 'WhatsApp', color: 'hover:bg-green-600' },
    { icon: FiMail, href: `mailto:${personal.email}`, label: 'Email', color: 'hover:bg-red-600' },
  ];

  const codingProfiles = [
    { icon: SiLeetcode, href: socialLinks.leetcode, label: 'LeetCode' },
    { icon: SiHackerrank, href: socialLinks.hackerrank, label: 'HackerRank' },
    { icon: SiCodechef, href: socialLinks.codechef, label: 'CodeChef' },
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
                src={personal.profileImage}
                alt={personal.name}
                className="relative w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-background shadow-xl"
              />
            </div>
          </motion.div>

          {/* Name and Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            {t('hero.greeting')} <span className="gradient-text">{personal.name}</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-muted-foreground mb-6"
          >
            {personal.title} | {personal.subtitle}
          </motion.p>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            {bio.replace('{{years}}', calculateYearsOfExperience())}
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
              href={personal.resumeUrl}
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
            <p className="text-sm text-muted-foreground mb-4">{t('common.socialLinks')}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              {/* Main Social Links */}
              <div className="flex flex-wrap gap-4 justify-center">
                {socialProfiles.map((link) => {
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