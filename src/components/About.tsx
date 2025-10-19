import React from 'react';
import { motion } from 'framer-motion';
import { useInViewAnimation } from '../hooks/useScrollReveal';
import { useLocalization } from '../contexts/LocalizationContext';
import { categories } from '@/data/skills.json';
import { projects } from '@/data/projects.json';
import { companies } from '@/data/experience.json';
import { about, qualities } from '@/data/portfolio.json';
import { calculateYearsOfExperience } from '../utils';

interface Stat {
  label: string;
  value: string;
}

const About: React.FC = () => {
  const { ref, inView } = useInViewAnimation();
  const { t } = useLocalization();
  
  const calculateStats = (): Stat[] => {
    // Calculate years of experience using centralized function
    const yearsOfExperience = calculateYearsOfExperience();

    // Calculate total technologies from skills data
    const totalTechnologies = categories.reduce((total, category) => {
      return total + category.skills.length;
    }, 0);

    // Calculate awards from experience data
    let totalAwards = 0;
    companies.forEach(company => {
      company.positions.forEach(position => {
        if (position.achievements) {
          // Count specific awards mentioned in achievements
          position.achievements.forEach((achievement: string) => {
            if (achievement.toLowerCase().includes('award') ||
                achievement.toLowerCase().includes('recognized') ||
                achievement.toLowerCase().includes('stars') ||
                achievement.toLowerCase().includes('orienter')) {
              totalAwards++;
            }
          });
        }
      });
    });

    // Projects count from projects data
    const totalProjects = projects.length;

    return [
      {
        label: 'Experience',
        value: `${yearsOfExperience}+`
      },
      {
        label: 'Projects',
        value: `${totalProjects}+`
      },
      {
        label: 'Technologies',
        value: `${totalTechnologies}+`
      },
      {
        label: 'Awards',
        value: `${totalAwards}+`
      }
    ];
  };
  
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
              {about.map((paragraph, index) => (
                <p key={index} className="text-lg text-muted-foreground">
                  {paragraph.replace('{{years}}', calculateYearsOfExperience())}
                </p>
              ))}

              <div className="pt-4">
                {/*<h3 className="text-lg font-semibold mb-4 text-foreground">Core Strengths</h3>*/}
                <div className="grid grid-cols-2 gap-3">
                  {qualities.map((quality, index) => (
                    <motion.div
                      key={quality}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="group"
                    >
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20 hover:border-primary/40 hover:from-primary/10 hover:to-primary/20 transition-all duration-300 cursor-default">
                        <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full group-hover:scale-125 transition-transform duration-300" />
                        <span className="text-sm font-medium text-foreground/90 group-hover:text-primary transition-colors duration-300">
                          {quality}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
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
                    {t(`about.${stat.label}`.toLowerCase())}
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