import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [clickCount, setClickCount] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wa_clicks');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down a bit
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    localStorage.setItem('wa_clicks', newCount.toString());
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          href="https://wa.me/919058221232"
          onClick={handleClick}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 left-6 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 active:scale-95 transition-transform group"
        >
          <MessageCircle size={32} />
          
          {/* Tooltip */}
          <div className="absolute left-full ml-4 bg-white text-black px-4 py-2 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
            Chat with us
            {clickCount > 0 && <span className="block text-[10px] text-gray-500 font-normal mt-0.5">Engagement clicks: {clickCount}</span>}
            {/* Arrow */}
            <div className="absolute top-1/2 -left-2 -translate-y-1/2 border-8 border-transparent border-r-white" />
          </div>
          
          {/* Ping effect */}
          <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-20" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
