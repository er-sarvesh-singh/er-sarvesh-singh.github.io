import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export const useScrollReveal = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with the 'reveal' class
    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
};

// Hook for individual element observation
export const useInViewAnimation = (options = {}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    ...options,
  });

  return { ref, inView };
};