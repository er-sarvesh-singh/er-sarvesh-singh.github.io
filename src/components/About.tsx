import React from 'react';
import { motion } from 'framer-motion';
import { useInViewAnimation } from '../hooks/useScrollReveal';
import { useLocalization } from '../contexts/LocalizationContext';
import { calculateStats } from '../utils/calculateStats';
import portfolioData from '@/data/portfolio.json';

const About: React.FC = () => {
  const { ref, inView } = useInViewAnimation();
  const { t } = useLocalization();
  
  // Calculate stats dynamically
  const stats = calculateStats();

  return (
    <section id="about" className="section-padding bg-accent/50">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t('about.title').split(' ').map((word, index) => (
              index === 1 ? <span key={index} className="gradient-text">{word}</span> : <span key={index}>{word} </span>
            ))}
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Content */}
            <div className="space-y-6">
              {portfolioData.about.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-lg text-muted-foreground">
                  {paragraph}
                </p>
              ))}

              <div className="flex flex-wrap gap-4 pt-4">
                {portfolioData.about.qualities.map((quality) => (
                  <span 
                    key={quality}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {quality}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-6 bg-background rounded-lg shadow-lg card-hover"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t(`about.${stat.label.toLowerCase().replace(/\s+/g, '_')}`)}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;