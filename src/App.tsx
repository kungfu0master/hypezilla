import { Fragment, useEffect, useState, lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { SEO } from './components/SEO';
import { WebsiteSkeleton } from './components/WebsiteSkeleton';
import { LoadingScreen } from './components/LoadingScreen';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { AnimatePresence } from 'framer-motion';
import { ReactLenis } from 'lenis/react';

// Lazy load below-the-fold components to reduce initial JS payload
const About = lazy(() => import('./components/About').then(m => ({ default: m.About })));
const CaseStudies = lazy(() => import('./components/CaseStudies').then(m => ({ default: m.CaseStudies })));
const Chatbot = lazy(() => import('./components/Chatbot').then(m => ({ default: m.Chatbot })));
const Contact = lazy(() => import('./components/Contact').then(m => ({ default: m.Contact })));
const FAQ = lazy(() => import('./components/FAQ').then(m => ({ default: m.FAQ })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));
const Industries = lazy(() => import('./components/Industries').then(m => ({ default: m.Industries })));
const Pricing = lazy(() => import('./components/Pricing').then(m => ({ default: m.Pricing })));
const Process = lazy(() => import('./components/Process').then(m => ({ default: m.Process })));
const Projects = lazy(() => import('./components/Projects').then(m => ({ default: m.Projects })));
const Services = lazy(() => import('./components/Services').then(m => ({ default: m.Services })));
const Team = lazy(() => import('./components/Team').then(m => ({ default: m.Team })));
const Technologies = lazy(() => import('./components/Technologies').then(m => ({ default: m.Technologies })));
const Testimonials = lazy(() => import('./components/Testimonials').then(m => ({ default: m.Testimonials })));
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs').then(m => ({ default: m.WhyChooseUs })));

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <HelmetProvider>
      <SEO />
      <Router>
        <ScrollToTop />
        
        <AnimatePresence mode="wait">
          {isLoading ? (
            <Fragment key="loading-container">
              <WebsiteSkeleton />
              <LoadingScreen onComplete={() => setIsLoading(false)} />
            </Fragment>
          ) : (
            <ReactLenis root options={{ lerp: 0.08, duration: 1.2 }}>
              <main className="bg-[#0a0a0f] min-h-screen text-[#f0f0ff] font-sans overflow-x-hidden selection:bg-[#cc2428] selection:text-white relative flex flex-col">
                {/* Noise overlay */}
                <div className="fixed inset-0 pointer-events-none z-[1000] opacity-50" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.04\'/%3E%3C/svg%3E")' }}></div>

                <ScrollProgress />
                <Chatbot />

                <div className="relative flex-1 z-10 w-full max-w-[100vw]">
                  <Navbar />
                  <Hero />
                  
                  <Suspense fallback={<div className="h-20 w-full" />}>
                    <About />
                    <Services />
                    <Technologies />
                    <Industries />
                    <Team />
                    <Projects />
                    <CaseStudies />
                    <Process />
                    <WhyChooseUs />
                    <Testimonials />
                    <Pricing />
                    <FAQ />
                    <Contact />
                  </Suspense>
                </div>
                
                <div className="z-10 w-full max-w-[100vw]">
                  <Suspense fallback={<div className="h-20 w-full" />}>
                    <Footer />
                  </Suspense>
                </div>
              </main>
            </ReactLenis>
          )}
        </AnimatePresence>
      </Router>
    </HelmetProvider>
  );
}

