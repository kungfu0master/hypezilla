import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { LiquidLogo } from './LiquidLogo';
import { ArrowRight } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Section tracking for nav highlighting
      const sections = ['home', 'services', 'process', 'why', 'pricing'];
      let currentSection = 'home';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'Services', href: '/#services' },
    { name: 'Process', href: '/#process' },
    { name: 'Why Us', href: '/#why' },
    { name: 'Pricing', href: '/#pricing' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[900] flex items-center justify-between px-[5%] transition-all duration-500 ${
          isScrolled || isOpen
            ? 'py-[1rem] bg-[#0a0a0f]/80 backdrop-blur-2xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]'
            : 'py-[1.2rem] bg-transparent'
        }`}
      >
        <Link to="/" className="relative z-[1000] scale-90 md:scale-100 origin-left">
          <LiquidLogo />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
          <ul className="flex gap-1 list-none m-0 p-1.5 items-center bg-white/[0.03] border border-white/5 rounded-full backdrop-blur-md">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('/#', '');
              const isActive = activeSection === sectionId;
              
              return (
                <li key={link.name} className="relative">
                  <a
                    href={link.href}
                    className={`relative z-10 block px-4 py-1.5 text-[0.85rem] font-medium transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-[#8888aa] hover:text-[#f0f0ff]'
                    }`}
                  >
                    {link.name}
                  </a>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-white/10 rounded-full z-0"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Get Started Button */}
        <div className="hidden md:block">
           <a
            href="#contact"
            className="group relative overflow-hidden bg-[#cc2428] text-white px-[1.5rem] py-[0.6rem] rounded-full font-semibold text-[0.85rem] flex items-center gap-2 transition-all hover:bg-[#b01e22] hover:shadow-[0_0_25px_rgba(204,36,40,0.4)]"
          >
            <span className="relative z-10">Get Started</span>
            <ArrowRight size={14} className="relative z-10 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative cursor-pointer bg-transparent border-none z-[1000] focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-[2px] bg-white rounded-full block transition-all duration-300 absolute ${isOpen ? 'rotate-45' : '-translate-y-1.5'}`}></span>
          <span className={`w-6 h-[2px] bg-white rounded-full block transition-all duration-300 absolute ${isOpen ? 'opacity-0 scale-0' : 'opacity-100'}`}></span>
          <span className={`w-6 h-[2px] bg-white rounded-full block transition-all duration-300 absolute ${isOpen ? '-rotate-45' : 'translate-y-1.5'}`}></span>
        </button>
      </nav>

      {/* Backdrop overlay for closing menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[800] md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0, x: "100%" },
              visible: { 
                opacity: 1, 
                x: 0,
                transition: { type: "spring", damping: 25, stiffness: 200, staggerChildren: 0.08, delayChildren: 0.15 }
              },
              exit: { 
                opacity: 0, 
                x: "100%",
                transition: { type: "spring", damping: 25, stiffness: 200 }
              }
            }}
            className="fixed top-0 bottom-0 right-0 w-[85vw] max-w-[320px] bg-[#0c0c12]/95 backdrop-blur-xl flex flex-col items-start pt-[120px] px-8 gap-4 border-l border-white/5 md:hidden z-[900] m-0 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
          >
            {navLinks.map((link) => {
              const sectionId = link.href.replace('/#', '');
              const isActive = activeSection === sectionId;
              
              return (
                <motion.li 
                  key={link.name} 
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
                    exit: { opacity: 0, x: 10 }
                  }}
                  className="w-full"
                >
                  <a
                    href={link.href}
                    className={`block w-full py-3 text-[1.2rem] font-medium transition-colors border-b border-white/5 ${
                      isActive ? 'text-white' : 'text-[#8888aa] hover:text-[#f0f0ff]'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                </motion.li>
              );
            })}
            <motion.li 
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
                exit: { opacity: 0, x: 10 }
              }}
              className="w-full mt-6"
            >
              <a
                href="#contact"
                className="bg-[#cc2428] text-white px-[1.5rem] py-[0.8rem] rounded-full font-semibold text-center w-full flex items-center justify-center gap-2 transition-all hover:bg-[#b01e22]"
                onClick={() => setIsOpen(false)}
              >
                Get Started
                <ArrowRight size={16} />
              </a>
            </motion.li>
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  );
}


