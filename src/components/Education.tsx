import React from 'react';
import { motion } from 'framer-motion';
import { useInViewAnimation } from '../hooks/useScrollReveal';
import { useLocalization } from '../contexts/LocalizationContext';
import { FiBook, FiCalendar, FiMapPin, FiAward } from 'react-icons/fi';
import educationData from '@/data/education.json';

const Education: React.FC = () => {
  const { ref, inView } = useInViewAnimation();
  const { t } = useLocalization();

  return (
    <section id="education" className="section-padding bg-accent/50">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="gradient-text">{educationData.title}</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12">{educationData.subtitle}</p>

          <div className="max-w-4xl mx-auto">
            {educationData.institutions.map((edu, index) => (
              <motion.div
                key={edu.id}
                className="bg-background rounded-lg p-8 shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <FiBook className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{edu.degree}</h3>
                      <p className="text-lg text-primary font-medium">{edu.field}</p>
                      <p className="text-muted-foreground">{edu.name}</p>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-2 mb-1">
                      <FiCalendar />
                      <span>{edu.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiMapPin />
                      <span>{edu.location}</span>
                    </div>
                  </div>
                </div>

                {edu.description && (
                  <p className="text-muted-foreground mb-4">{edu.description}</p>
                )}

                {edu.achievements && edu.achievements.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <FiAward className="text-primary" />
                      {t('education.achievements')}
                    </h4>
                    <ul className="space-y-2">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className="text-muted-foreground flex items-start">
                          <span className="text-primary mr-2">▸</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {edu.coursework && edu.coursework.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-3">{t('education.coursework')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course) => (
                        <span
                          key={course}
                          className="px-3 py-1 bg-accent text-sm rounded-full"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          {educationData.certifications && educationData.certifications.length > 0 && (
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-6">{t('education.certifications')}</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {educationData.certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    className="bg-background p-4 rounded-lg shadow-md card-hover"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  >
                    <h4 className="font-semibold text-sm mb-1">{cert.name}</h4>
                    <p className="text-xs text-muted-foreground mb-1">{cert.issuer}</p>
                    <p className="text-xs text-primary">{cert.date}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;