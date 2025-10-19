import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiCalendar } from 'react-icons/fi';
import { useInViewAnimation } from '../hooks/useScrollReveal';
import { useLocalization } from '../contexts/LocalizationContext';
import { recognition } from '../data/recognition.json';

const Recognition = () => {
  const { ref, inView } = useInViewAnimation();
  const { t } = useLocalization();
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = recognition.length;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      //nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const getPrevIndex = () => (currentIndex - 1 + totalSlides) % totalSlides;
  const getNextIndex = () => (currentIndex + 1) % totalSlides;

  return (
    <section id="recognition" className="section-padding bg-accent/50">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {t('recognition.title').split(' ').map((word, index) => (
              index === 0 ? <span key={index}>{word} </span> : <span key={index} className="gradient-text">{word}</span>
            ))}
          </h2>
          <p className="text-center text-muted-foreground">
            {t('recognition.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Navigation Button - Left */}
            <button
              onClick={prevSlide}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-background hover:bg-accent text-foreground p-2 md:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Previous achievements"
            >
              <FiChevronLeft size={20} className="md:w-6 md:h-6" />
            </button>

            {/* Navigation Button - Right */}
            <button
              onClick={nextSlide}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-background hover:bg-accent text-foreground p-2 md:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Next achievements"
            >
              <FiChevronRight size={20} className="md:w-6 md:h-6" />
            </button>

            {/* Slides Container */}
            <div className="overflow-hidden px-4 md:px-0 pt-8 -mb-8">
              <div className="flex items-center justify-center gap-6">
                {/* Previous Slide - Hidden on mobile, half visible on desktop */}
                <div className="hidden md:block w-40 overflow-hidden">
                  <motion.div
                    key={`prev-${getPrevIndex()}`}
                    className="opacity-70 w-80 -ml-40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-background rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden w-80 mt-8 -mb-8">
                      <div className="relative h-52 bg-muted flex items-center justify-center">
                        {recognition[getPrevIndex()].image ? (
                          <img
                            src={recognition[getPrevIndex()].image}
                            alt={recognition[getPrevIndex()].title}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="text-muted-foreground">
                            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold text-base flex-1 mr-2">
                            {recognition[getPrevIndex()].title}
                          </h4>
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                            <FiCalendar className="w-3 h-3" />
                            {recognition[getPrevIndex()].date}
                          </span>
                        </div>
                        <p className="text-sm text-primary font-semibold mb-2">
                          {recognition[getPrevIndex()].organization}
                        </p>
                        {recognition[getPrevIndex()].description && recognition[getPrevIndex()].description !== "Description" && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {recognition[getPrevIndex()].description}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Current Slide - Larger fixed width */}
                <motion.div
                  key={`current-${currentIndex}`}
                  className="w-full md:w-[32rem] z-10 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-background rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 w-full max-w-md md:max-w-none mt-8 -mb-8">
                    <div className="relative h-48 md:h-64 bg-muted rounded-t-lg overflow-hidden flex items-center justify-center">
                      {recognition[currentIndex].image ? (
                        <img
                          src={recognition[currentIndex].image}
                          alt={recognition[currentIndex].title}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="text-muted-foreground">
                          <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-4 md:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <h4 className="font-bold text-base md:text-lg flex-1">
                          {recognition[currentIndex].title}
                        </h4>
                        <span className="inline-flex items-center gap-1 text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                          <FiCalendar className="w-3 h-3 md:w-4 md:h-4" />
                          {recognition[currentIndex].date}
                        </span>
                      </div>
                      <p className="text-sm md:text-base text-primary font-semibold mb-3">
                        {recognition[currentIndex].organization}
                      </p>
                      {recognition[currentIndex].description && recognition[currentIndex].description !== "Description" && (
                        <p className="text-xs md:text-sm text-muted-foreground">
                          {recognition[currentIndex].description}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Next Slide - Hidden on mobile, half visible on desktop */}
                <div className="hidden md:block w-40 overflow-hidden">
                  <motion.div
                    key={`next-${getNextIndex()}`}
                    className="opacity-70 w-80 -mr-40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-background rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden w-80 mt-8 -mb-8">
                      <div className="relative h-52 bg-muted flex items-center justify-center">
                        {recognition[getNextIndex()].image ? (
                          <img
                            src={recognition[getNextIndex()].image}
                            alt={recognition[getNextIndex()].title}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="text-muted-foreground">
                            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold text-base flex-1 mr-2">
                            {recognition[getNextIndex()].title}
                          </h4>
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                            <FiCalendar className="w-3 h-3" />
                            {recognition[getNextIndex()].date}
                          </span>
                        </div>
                        <p className="text-sm text-primary font-semibold mb-2">
                          {recognition[getNextIndex()].organization}
                        </p>
                        {recognition[getNextIndex()].description && recognition[getNextIndex()].description !== "Description" && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {recognition[getNextIndex()].description}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-16 gap-2">
              {recognition.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-blue-600 dark:bg-blue-500 w-8 shadow-lg shadow-blue-500/30'
                      : 'bg-gray-300 dark:bg-gray-700 hover:bg-blue-400/50 dark:hover:bg-blue-400/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recognition;