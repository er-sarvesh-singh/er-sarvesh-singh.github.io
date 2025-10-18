import React from 'react';
import { motion } from 'framer-motion';
import { useInViewAnimation } from '../hooks/useScrollReveal';
import { useLocalization } from '../contexts/LocalizationContext';
import { calculateYearsOfExperience } from '../utils';
import {
  SiReact, SiNodedotjs, SiTypescript, SiJavascript, SiPython,
  SiHtml5, SiTailwindcss, SiMongodb, SiPostgresql,
  SiMysql, SiRedis, SiDocker, SiKubernetes, SiAmazonaws, SiGit,
  SiWebpack, SiExpress, SiNextdotjs, SiGraphql,
  SiJest, SiGitlab
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { title, subtitle, categories, otherSkills } from '@/data/skills.json';

const iconMap: { [key: string]: React.ComponentType<any> } = {
  'React': SiReact,
  'TypeScript': SiTypescript,
  'JavaScript': SiJavascript,
  'HTML5/CSS3': SiHtml5,
  'Redux': SiReact, // Using React icon for Redux
  'Next.js': SiNextdotjs,
  'Tailwind CSS': SiTailwindcss,
  'Material-UI': SiReact, // Using React icon for Material-UI
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  'GraphQL': SiGraphql,
  'REST APIs': SiNodedotjs, // Using Node icon for APIs
  'Microservices': SiDocker, // Using Docker icon for Microservices
  'Python': SiPython,
  'Java': FaJava,
  'MongoDB': SiMongodb,
  'PostgreSQL': SiPostgresql,
  'MySQL': SiMysql,
  'Redis': SiRedis,
  'AWS': SiAmazonaws,
  'Docker': SiDocker,
  'Kubernetes': SiKubernetes,
  'Git': SiGit,
  'Jest/Testing': SiJest,
  'CI/CD': SiGitlab,
  'Webpack': SiWebpack,
  'Agile/Scrum': SiGit, // Using Git icon as placeholder
  'Jira': SiGit, // Using Git icon as placeholder
};

const colorMap: { [key: string]: string } = {
  'React': '#61DAFB',
  'TypeScript': '#3178C6',
  'JavaScript': '#F7DF1E',
  'HTML5/CSS3': '#E34F26',
  'Redux': '#764ABC',
  'Next.js': '#000000',
  'Tailwind CSS': '#06B6D4',
  'Material-UI': '#0081CB',
  'Node.js': '#339933',
  'Express.js': '#000000',
  'GraphQL': '#E10098',
  'REST APIs': '#009688',
  'Microservices': '#2496ED',
  'Python': '#3776AB',
  'Java': '#007396',
  'MongoDB': '#47A248',
  'PostgreSQL': '#4169E1',
  'MySQL': '#4479A1',
  'Redis': '#DC382D',
  'AWS': '#FF9900',
  'Docker': '#2496ED',
  'Kubernetes': '#326CE5',
  'Git': '#F05032',
  'Jest/Testing': '#C21325',
  'CI/CD': '#FC6D26',
  'Webpack': '#8DD6F9',
  'Agile/Scrum': '#0052CC',
  'Jira': '#0052CC',
};

const Skills: React.FC = () => {
  const { ref, inView } = useInViewAnimation();
  const { t } = useLocalization();

  return (
    <section id="skills" className="section-padding bg-accent/50">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {title.split(' ').map((word, index) => (
              index === 0 ? <span key={index}>{word} </span> : <span key={index} className="gradient-text">{word}</span>
            ))}
          </h2>
          <p className="text-center text-muted-foreground mb-12">{subtitle}</p>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {categories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                className="bg-background rounded-lg p-6 shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="text-2xl">{category.icon}</span>
                  {category.name}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => {
                    const Icon = iconMap[skill.name] || SiReact;
                    const color = colorMap[skill.name] || '#6B7280';
                    const years = calculateYearsOfExperience(skill.startDate);
                    
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.5,
                          delay: categoryIndex * 0.1 + skillIndex * 0.05,
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div style={{ color }}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({years} {t('skills.yearsOfExperience')})
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: color }}
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${skill.level}%` } : {}}
                            transition={{
                              duration: 1,
                              delay: categoryIndex * 0.1 + skillIndex * 0.05,
                              ease: 'easeOut',
                            }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Skills */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="max-w-4xl mx-auto bg-background rounded-lg p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                <span className="text-2xl">🎯</span>
                {t('skills.otherSkills')}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {otherSkills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                    className="group"
                  >
                    <div className="px-4 py-3 border-2 border-border rounded-lg text-sm font-medium text-center transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:shadow-md hover:-translate-y-0.5 cursor-default">
                      {skill}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;