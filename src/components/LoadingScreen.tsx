import { motion } from 'framer-motion';
import { useEffect } from 'react';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    // Hide the scrollbar while loading
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      document.body.style.overflow = 'unset';
      onComplete();
    }, 400); // Drastically reduced loading time for faster TTI

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#0a0a0f]/80 backdrop-blur-md flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex flex-col items-center">
        {/* Logo container */}
        <motion.div 
           className="flex font-display font-black text-6xl md:text-8xl leading-none relative pl-6 pr-8 pt-4 mb-4"
           initial={{ opacity: 0, scale: 0.9, y: 20 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
        >
           {/* Decorative Top Left Corner */}
           <motion.div 
             className="absolute top-0 left-0 w-12 h-16 md:w-16 md:h-24 border-t-[4px] border-l-[4px] border-zinc-500"
             initial={{ opacity: 0, x: 20, y: 20 }}
             animate={{ opacity: 1, x: 0, y: 0 }}
             transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
           />
           
           {/* Decorative Bottom Right Corner */}
           <motion.div 
             className="absolute -bottom-4 right-0 w-12 h-16 md:w-16 md:h-24 border-b-[4px] border-r-[4px] border-[#cc2428]"
             initial={{ opacity: 0, x: -20, y: -20 }}
             animate={{ opacity: 1, x: 0, y: 0 }}
             transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
           />
           
           {/* HY Text */}
           <motion.span 
             className="text-[#cc2428] tracking-tighter"
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
           >
             HY
           </motion.span>
           
           {/* PE Text */}
           <motion.span 
             className="text-zinc-500 tracking-tighter"
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
           >
             PE
           </motion.span>
        </motion.div>
        
        {/* ZILLA Text */}
        <motion.div 
          className="ml-6 md:ml-8 bg-[#eab308] text-black text-sm md:text-xl font-bold tracking-[0.3em] px-12 py-1 md:py-2 mt-0 z-10 relative overflow-hidden"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          transition={{ delay: 1.2, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          style={{ originX: 0, whiteSpace: "nowrap" }}
        >
          ZILLA
        </motion.div>

        {/* Dynamic Loading Bar */}
        <motion.div 
          className="w-48 md:w-64 h-1 bg-white/10 mt-16 rounded-full overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
           <motion.div 
             className="h-full w-[30%] bg-gradient-to-r from-transparent via-[#cc2428] to-transparent absolute rounded-full"
             initial={{ left: '-30%' }}
             animate={{ left: '100%' }}
             transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
           />
        </motion.div>
      </div>
    </motion.div>
  );
}
