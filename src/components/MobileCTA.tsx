import { PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ShimmerButton } from './ui/ShimmerButton';

export function MobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero section
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-md border-t border-white/10 p-4 md:hidden flex items-center justify-between gap-4"
        >
          <div className="flex flex-col">
            <span className="text-white font-bold text-sm">Ready to grow?</span>
            <span className="text-zinc-400 text-xs">Let's craft a winning strategy.</span>
          </div>
          <a href="#contact">
            <ShimmerButton shimmerSize="2px" className="px-6 py-3 text-sm flex items-center gap-2">
              <PhoneCall size={16} />
              Book Now
            </ShimmerButton>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
