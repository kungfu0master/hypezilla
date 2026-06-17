import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export function CustomScrollbar() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 1000,
    damping: 50,
    restDelta: 0.001
  });

  const top = useTransform(smoothProgress, [0, 1], ['0%', '100%']);
  const y = useTransform(smoothProgress, [0, 1], ['0%', '-100%']);
  
  // Dynamic color change: Orange -> Yellow -> Orange
  const color = useTransform(
    smoothProgress, 
    [0, 0.5, 1], 
    ['#FF5E00', '#FFD000', '#FF5E00']
  );
  
  const shadow = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [
      '0 0 15px #FF5E00, 0 0 30px #FF5E00',
      '0 0 15px #FFD000, 0 0 30px #FFD000',
      '0 0 15px #FF5E00, 0 0 30px #FF5E00'
    ]
  );

  // Hide the native scrollbar
  useEffect(() => {
    // Only show on desktop
    if (window.innerWidth > 768) {
      setIsVisible(true);
      document.documentElement.style.setProperty('--scrollbar-display', 'none');
    }

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsVisible(true);
        document.documentElement.style.setProperty('--scrollbar-display', 'none');
      } else {
        setIsVisible(false);
        document.documentElement.style.setProperty('--scrollbar-display', 'auto');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed right-1 top-2 bottom-2 w-1.5 z-[9999] pointer-events-none rounded-full bg-white/5 overflow-hidden">
      <motion.div
        className="absolute w-full rounded-full"
        style={{
          top,
          y,
          height: '15vh',
          backgroundColor: color,
          boxShadow: shadow,
          opacity: 0.8
        }}
      />
    </div>
  );
}
