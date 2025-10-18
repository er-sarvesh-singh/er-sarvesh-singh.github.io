import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInViewAnimation } from '../hooks/useScrollReveal';
import { useLocalization } from '../contexts/LocalizationContext';
import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi';
import { socialLinks } from '@/data/portfolio.json';
import { title, subtitle, projects } from '@/data/projects.json';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image?: string; ///images/project-taskmanager.jpg
  technologies: string[];
  features: string[];
  links: {
    github?: string;
    live?: string;
  };
  category: string;
}

const Projects: React.FC = () => {
  const { ref, inView } = useInViewAnimation();
  const { t } = useLocalization();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { value: 'All', label: t('projects.filter.all') },
    { value: 'Full Stack', label: t('projects.filter.fullstack') },
    { value: 'Frontend', label: t('projects.filter.frontend') },
    { value: 'Backend', label: t('projects.filter.backend') },
  ];

  const filteredProjects = projects.filter(
    (project: Project) => selectedCategory === 'All' || project.category === selectedCategory
  );

  return (
    <section id="projects" className="section-padding">
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

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCategory === category.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-accent hover:bg-accent/80'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              {filteredProjects.map((project: Project, index: number) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group relative bg-accent/50 rounded-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  {index < 3 && (
                    <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                      Featured
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-4">
                    <FiFolder className="w-10 h-10 text-primary" />
                    <div className="flex gap-3">
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`${project.title} - ${t('projects.viewCode')}`}
                        >
                          <FiGithub className="w-5 h-5" />
                        </a>
                      )}
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`${project.title} - ${t('projects.liveDemo')}`}
                        >
                          <FiExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-background rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-xs px-2 py-1 text-muted-foreground">
                        +{project.technologies.length - 4} {t('common.more')}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* View More Button */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline px-8 py-3 rounded-lg inline-flex items-center gap-2"
              aria-label={t('accessibility.externalLink')}
            >
              {t('projects.allProjects')}
              <FiGithub className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-background rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={t('common.close')}
                >
                  ✕
                </button>
              </div>
              
              <p className="text-muted-foreground mb-6">
                {selectedProject.longDescription}
              </p>
              
              {selectedProject.features && selectedProject.features.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">{t('projects.features')}:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="mb-6">
                <h4 className="font-semibold mb-2">{t('projects.technologies')}:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-accent rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                {selectedProject.links.github && (
                  <a
                    href={selectedProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary px-6 py-2 rounded-lg flex items-center gap-2"
                    aria-label={t('accessibility.externalLink')}
                  >
                    <FiGithub className="w-5 h-5" />
                    {t('projects.viewCode')}
                  </a>
                )}
                {selectedProject.links.live && (
                  <a
                    href={selectedProject.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline px-6 py-2 rounded-lg flex items-center gap-2"
                    aria-label={t('accessibility.externalLink')}
                  >
                    <FiExternalLink className="w-5 h-5" />
                    {t('projects.liveDemo')}
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;