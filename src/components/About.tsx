import { motion } from 'framer-motion';
import { Users, TrendingUp, FolderGit2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { ThreeBackground } from './ThreeBackground';

function Counter({ end, suffix = '', label }: { end: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="flex flex-col gap-2">
      <div className="text-4xl md:text-5xl font-bold text-white">
        {count}{suffix}
      </div>
      <div className="text-sm text-zinc-400 font-medium">{label}</div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="py-24 relative z-10 border-t border-color bg-[#0a0a0f] overflow-hidden">
      
      {/* Morphing Transparent Shapes Background */}
      <div className="absolute top-0 right-0 w-full lg:w-[60%] h-full opacity-60 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        <ThreeBackground />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              We create complete business growth systems.
            </h2>
            <div className="text-lg text-zinc-400 mb-8 leading-relaxed space-y-4">
              <p>We are a modern digital marketing and AI-powered advertising agency helping startups, local businesses, creators, and brands grow online.</p>
              <p>Our team specializes in branding, web development, AI automation, WhatsApp marketing, lead generation, performance marketing, and scalable digital solutions.</p>
              <p>In today's digital world, simply being online is not enough. Businesses need smart automation, fast websites, powerful marketing, and strong search visibility.</p>
              <p>That is why we combine technology, creativity, and AI to build scalable digital systems that deliver real business growth.</p>
            </div>
            <div className="flex items-center gap-4 text-white">
              <div className="w-12 h-12 rounded-full bg-[#cc2428]/20 border border-[#cc2428]/50 flex items-center justify-center text-[#cc2428]">
                <TrendingUp size={24} />
              </div>
              <span className="font-semibold text-lg">Data-driven & Creative-led</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-8 bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden group"
          >
            {/* Hover gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#cc2428]/0 to-[#cc2428]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="col-span-2 sm:col-span-1">
              <Users className="text-[#cc2428] mb-4" size={32} />
              <Counter end={50} suffix="+" label="Happy Clients" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <TrendingUp className="text-[#cc2428] mb-4" size={32} />
              <Counter end={300} suffix="%" label="Average Growth" />
            </div>
            <div className="col-span-2">
              <FolderGit2 className="text-[#cc2428] mb-4" size={32} />
              <Counter end={120} suffix="+" label="Projects Delivered" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
