import { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import LoadingSpinner from './components/LoadingSpinner';
import ScrollToTop from './components/ScrollToTop';
import { useScrollReveal } from './hooks/useScrollReveal';
import { personal } from '@/data/portfolio.json';

// Lazy load heavy components for better performance
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Education = lazy(() => import('./components/Education'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  useScrollReveal();

  return (
    <ThemeProvider>
      <Helmet>
        <title>{personal.name} - {personal.title} | {personal.subtitle}</title>
      </Helmet>
      
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        
        <main>
          <Hero />
          
          <Suspense fallback={<LoadingSpinner />}>
            <About />
            <Experience />
            <Education />
            <Skills />
            <Projects />
            <Contact />
          </Suspense>
        </main>
        
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        
        <ScrollToTop />
      </div>
    </ThemeProvider>
  );
}

export default App;