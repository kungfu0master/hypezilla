import { motion, useMotionValue, useSpring, useTransform, Variants } from 'framer-motion';
import { Zap, Bot, TrendingUp, MessageSquare } from 'lucide-react';
import React from 'react';

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 400 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center px-[5%] pt-[140px] pb-[80px] overflow-hidden bg-transparent"
      onMouseMove={handleMouseMove}
    >
      {/* High-Performance Animated Grid Background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-[0.06] z-0"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 40%, transparent 100%)',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '0px 64px'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* High-Performance CSS Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          className="absolute top-[15%] left-[20%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[#cc2428]/30 blur-[120px] rounded-full"
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[10%] right-[15%] w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] bg-[#eab308]/20 blur-[100px] rounded-full"
          animate={{ x: [0, -30, 0], y: [0, 20, 0], scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center justify-center text-center"
      >
        
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center justify-center gap-2 px-4 py-[0.4rem] rounded-full bg-[#cc2428]/10 border border-[#cc2428]/20 text-[#cc2428] font-medium text-[0.85rem] mb-6 backdrop-blur-sm"
        >
          <Zap size={14} className="text-[#cc2428]" />
          Digital Marketing & AI Automation Agency
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-display text-[clamp(2.4rem,4.5vw,4.2rem)] font-bold leading-[1.15] tracking-tight mb-6 text-white text-balance max-w-[900px]"
        >
          Scale Your Business With <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cc2428] via-[#ff4d50] to-[#eab308]">AI, Digital Marketing</span> & High-Converting Websites
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-[1.05rem] md:text-[1.1rem] leading-relaxed text-[#a1a1aa] font-light max-w-[700px] mb-10 text-balance"
        >
          We help businesses build a powerful digital presence through modern websites, AI automation systems, WhatsApp API integration, paid advertising, SEO, and growth-focused strategies.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-14"
        >
          <a
            href="#contact"
            className="bg-[#cc2428] text-white px-8 py-[0.9rem] rounded-full font-bold text-[0.95rem] shadow-[0_4px_30px_rgba(204,36,40,0.3)] hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(204,36,40,0.5)] transition-all duration-300"
          >
            Book Free Consultation
          </a>
          <a
            href="#services"
            className="bg-white/5 text-white px-8 py-[0.9rem] rounded-full font-semibold text-[0.95rem] border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
          >
            Our Services
          </a>
          <a
            href="https://wa.me/919058221232"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366]/10 text-white px-8 py-[0.9rem] rounded-full font-semibold text-[0.95rem] border border-[#25D366]/20 hover:border-[#25D366] hover:bg-[#25D366]/20 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
          >
            Talk On WhatsApp
          </a>
        </motion.div>

      </motion.div>
    </section>
  );
}