import React from 'react';
import { motion } from 'framer-motion';
import { useInViewAnimation } from '../hooks/useScrollReveal';
import { FiBriefcase, FiCalendar, FiMapPin, FiTrendingUp } from 'react-icons/fi';
import experienceData from '@/data/experience.json';

const Experience: React.FC = () => {
  const { ref, inView } = useInViewAnimation();

  return (
    <section id="experience" className="section-padding">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {experienceData.title.split(' ').map((word, index) => 
              index === 1 ? <span key={index} className="gradient-text">{word}</span> : <span key={index}>{word} </span>
            )}
          </h2>
          <p className="text-center text-muted-foreground mb-12">{experienceData.subtitle}</p>

          {/* Timeline Container */}
          <div className="relative max-w-6xl mx-auto">

            {experienceData.companies.map((company, companyIndex) => {
              const isEven = companyIndex % 2 === 0;
              
              return (
                <motion.div
                  key={company.id}
                  className={`relative flex items-start mb-16 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: companyIndex * 0.2 }}
                >
                  {/* Content */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="bg-accent/50 rounded-lg p-6 card-hover relative">
                      {/* Arrow pointing to timeline */}
                      <div 
                        className={`hidden md:block absolute top-12 w-4 h-4 bg-accent/50 transform rotate-45 ${
                          isEven ? '-right-2' : '-left-2'
                        }`}
                      ></div>
                      
                      {/* Company Header with Logo */}
                      <div className="mb-6 pb-4 border-b border-border">
                        <div className="flex items-center gap-3 mb-2">
                          {/* Company Logo */}
                          <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center overflow-hidden">
                            {company.logo ? (
                              <img 
                                src={company.logo} 
                                alt={`${company.company} logo`}
                                className="w-10 h-10 object-contain"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                }}
                              />
                            ) : null}
                            <FiBriefcase className={`text-primary w-6 h-6 ${company.logo ? 'hidden' : ''}`} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">{company.company}</h3>
                            <p className="text-sm text-muted-foreground">{company.type}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
                          <div className="flex items-center gap-1">
                            <FiCalendar className="w-4 h-4" />
                            <span>{company.duration} · {company.totalDuration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FiMapPin className="w-4 h-4" />
                            <span>{company.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Positions within company */}
                      <div className="space-y-6">
                        {company.positions.map((position, posIndex) => (
                          <div key={position.id} className="relative">
                            {/* Promotion indicator */}
                            {posIndex > 0 && (
                              <div className="absolute -top-3 left-0 flex items-center gap-2 text-xs text-primary">
                                <FiTrendingUp className="w-3 h-3" />
                                <span className="font-medium">Promoted</span>
                              </div>
                            )}
                            
                            <div className={`${posIndex > 0 ? 'pt-3' : ''}`}>
                              <div className="flex items-start justify-between gap-4 mb-3">
                                <div>
                                  <h4 className="font-semibold text-lg">{position.title}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {position.duration} · {position.durationText}
                                    {position.current && (
                                      <span className="ml-2 px-2 py-1 bg-primary/20 text-primary rounded text-xs font-medium">
                                        Current
                                      </span>
                                    )}
                                  </p>
                                </div>
                              </div>

                              <p className="text-sm text-muted-foreground mb-3">{position.description}</p>

                              {position.responsibilities && position.responsibilities.length > 0 && (
                                <div className="mb-3">
                                  <h5 className="font-medium text-sm mb-2">Key Responsibilities:</h5>
                                  <ul className="space-y-1">
                                    {position.responsibilities.slice(0, 3).map((resp, i) => (
                                      <li key={i} className="text-xs text-muted-foreground flex items-start">
                                        <span className="text-primary mr-2 mt-0.5">▸</span>
                                        <span>{resp}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {position.achievements && position.achievements.length > 0 && (
                                <div className="mb-3">
                                  <h5 className="font-medium text-sm mb-2">Achievements:</h5>
                                  <ul className="space-y-1">
                                    {position.achievements.map((achievement, i) => (
                                      <li key={i} className="text-xs text-muted-foreground flex items-start">
                                        <span className="text-primary mr-2 mt-0.5">★</span>
                                        <span>{achievement}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              <div className="flex flex-wrap gap-1.5 mt-3">
                                {position.technologies.slice(0, 5).map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-2 py-1 bg-background text-xs rounded-full"
                                  >
                                    {tech}
                                  </span>
                                ))}
                                {position.technologies.length > 5 && (
                                  <span className="px-2 py-1 bg-background text-xs rounded-full text-muted-foreground">
                                    +{position.technologies.length - 5} more
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Divider between positions */}
                            {posIndex < company.positions.length - 1 && (
                              <div className="mt-4 mb-2 border-t border-border/50"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Timeline Dot - Centered */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center justify-center">
                    <motion.div
                      className="w-14 h-14 bg-primary rounded-full border-4 border-background shadow-lg flex items-center justify-center"
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <FiBriefcase className="text-background w-6 h-6" />
                    </motion.div>
                  </div>

                  {/* Empty space for the other side */}
                  <div className="hidden md:block md:w-1/2"></div>

                  {/* Mobile Timeline */}
                  <div className="absolute left-0 top-8 w-6 h-6 bg-primary rounded-full border-4 border-background md:hidden"></div>
                  {companyIndex !== experienceData.companies.length - 1 && (
                    <div className="absolute left-[11px] top-14 bottom-0 w-[2px] bg-border md:hidden"></div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;