import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLocalization } from '../contexts/LocalizationContext';
import { FiSun, FiMoon, FiMenu, FiX, FiGlobe } from 'react-icons/fi';
import { personal, navigation } from '@/data/portfolio.json';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLocalization();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
    setIsMobileMenuOpen(false);
  };

  const handleLanguageChange = (lang: 'en' | 'hi') => {
    setLanguage(lang);
    setIsLanguageMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container-custom" aria-label={t('accessibility.mainNavigation')}>
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-2xl font-bold gradient-text"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={(e) => handleNavClick(e, '#')}
          >
            {personal.name}
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="text-sm font-medium hover:text-primary transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {t(`navigation.${item.label.toLowerCase()}`)}
              </motion.a>
            ))}

            {/* Language Selector */}
            <div className="relative">
              <motion.button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="p-2 rounded-lg hover:bg-accent transition-colors flex items-center space-x-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                aria-label={t('accessibility.toggleLanguage')}
              >
                <FiGlobe className="w-5 h-5" />
                <span className="text-xs uppercase">{language}</span>
              </motion.button>

              <AnimatePresence>
                {isLanguageMenuOpen && (
                  <motion.div
                    className="absolute top-full right-0 mt-2 bg-background border border-border rounded-lg shadow-lg overflow-hidden"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <button
                      onClick={() => handleLanguageChange('en')}
                      className={`block w-full px-4 py-2 text-left hover:bg-accent transition-colors ${
                        language === 'en' ? 'bg-accent' : ''
                      }`}
                    >
                      {t('common.english')}
                    </button>
                    <button
                      onClick={() => handleLanguageChange('hi')}
                      className={`block w-full px-4 py-2 text-left hover:bg-accent transition-colors ${
                        language === 'hi' ? 'bg-accent' : ''
                      }`}
                      disabled
                      title={t('common.comingSoon')}
                    >
                      {t('common.hindi')} ({t('common.soon')})
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              aria-label={t('accessibility.toggleTheme')}
            >
              {theme === 'light' ? (
                <FiMoon className="w-5 h-5" />
              ) : (
                <FiSun className="w-5 h-5" />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            {/* Language Toggle Mobile */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label={t('accessibility.toggleLanguage')}
            >
              <FiGlobe className="w-5 h-5" />
            </button>

            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label={t('accessibility.toggleTheme')}
            >
              {theme === 'light' ? (
                <FiMoon className="w-5 h-5" />
              ) : (
                <FiSun className="w-5 h-5" />
              )}
            </button>

            {/* Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label={t('common.menu')}
            >
              {isMobileMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden absolute top-20 left-0 right-0 bg-background border-t border-border"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container-custom py-4">
                {navigation.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block py-3 text-sm font-medium hover:text-primary transition-colors"
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {t(`navigation.${item.label.toLowerCase()}`)}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;