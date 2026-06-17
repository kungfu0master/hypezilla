import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Quote, TrendingUp } from 'lucide-react';

const caseStudies = [
  {
    client: 'Elevate Fitness',
    industry: 'Health & Wellness',
    title: 'Scaling Activewear Sales with AI-Driven Meta Ads',
    description: 'Elevate Fitness needed to boost their online sales for a new activewear line. We implemented a complete AI automation funnel and targeted Meta campaigns to increase conversion rates.',
    metrics: [
      { label: 'ROAS', before: '1.5x', after: '4.8x' },
      { label: 'Cost Per Acquisition', before: '$45', after: '$12' },
      { label: 'Monthly Revenue', before: '$20k', after: '$150k' }
    ],
    testimonial: {
      text: 'Hypezilla completely transformed our digital strategy. The AI automation alone saved us countless hours while drastically improving our sales.',
      author: 'David R.',
      role: 'CEO, Elevate Fitness'
    },
    image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&q=80&w=800'
  },
  {
    client: 'Lumina Tech',
    industry: 'SaaS Software',
    title: 'Dominating AI Search with Generative Engine Optimization',
    description: 'As a modern SaaS platform, Lumina struggled with organic visibility. We completely overhauled their content structure optimized for AI Answer Engines and implemented a robust SEO strategy.',
    metrics: [
      { label: 'Organic Traffic', before: '5k/mo', after: '120k/mo' },
      { label: 'Lead Generation', before: '30/mo', after: '450/mo' },
      { label: 'Search Visibility', before: 'Low', after: 'Page 1' }
    ],
    testimonial: {
      text: 'The GEO and AEO strategies they implemented put us years ahead of our competitors. We are now the top recommended platform by AI assistants.',
      author: 'Sarah Jenkins',
      role: 'CMO, Lumina Tech'
    },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
  }
];

const CaseStudySkeleton = () => (
  <div className="card-bg border border-color rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-lg bg-white/[0.02] animate-pulse">
    <div className="w-full lg:w-2/5 h-[300px] lg:h-auto bg-white/[0.05]"></div>
    <div className="w-full lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
      <div className="h-4 w-24 bg-white/10 rounded mb-2"></div>
      <div className="h-8 lg:h-10 w-3/4 bg-white/20 rounded mb-4 mt-2"></div>
      <div className="space-y-3 mb-8">
        <div className="h-4 w-full bg-white/[0.05] rounded"></div>
        <div className="h-4 w-full bg-white/[0.05] rounded"></div>
        <div className="h-4 w-5/6 bg-white/[0.05] rounded"></div>
      </div>
      
      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-white/[0.05]">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex flex-col">
             <div className="h-3 w-16 bg-white/10 rounded mb-2"></div>
             <div className="h-6 lg:h-8 w-24 bg-white/20 rounded"></div>
          </div>
        ))}
      </div>
      
      {/* Testimonial */}
       <div className="relative pl-6 border-l-2 border-[#cc2428]/30">
          <div className="h-4 w-full bg-white/10 rounded mb-2 mt-1"></div>
          <div className="h-4 w-5/6 bg-white/10 rounded mb-4"></div>
          <div className="h-3 w-32 bg-white/20 rounded mb-2"></div>
          <div className="h-3 w-24 bg-white/10 rounded"></div>
       </div>
    </div>
  </div>
);

export function CaseStudies() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="cases" className="px-[5%] py-[100px] border-t border-color relative bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-[4rem]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-[0.78rem] font-semibold tracking-[0.15em] uppercase text-[#cc2428] mb-[0.8rem]">Proven Results</div>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.15] tracking-[-0.02em] mb-[1rem] text-white">Case Studies</h2>
          <p className="text-[#8888aa] text-[1.05rem]">How we deliver measurable growth and transform brands.</p>
        </motion.div>

        <div className="space-y-[4rem]">
          {isLoading 
            ? Array.from({ length: 2 }).map((_, idx) => <CaseStudySkeleton key={`skeleton-${idx}`} />)
            : caseStudies.map((study, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="card-bg border border-color rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-lg"
            >
              {/* Image Section */}
              <div className="w-full lg:w-2/5 h-[300px] lg:h-auto relative overflow-hidden group">
                <img 
                  src={study.image} 
                  alt={study.title} 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 bg-[#cc2428] text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                  {study.industry}
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
                <span className="text-[#8888aa] font-medium text-sm mb-2">{study.client}</span>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-4">{study.title}</h3>
                <p className="text-[#8888aa] text-base leading-relaxed mb-8">{study.description}</p>
                
                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-color">
                  {study.metrics.map((metric, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-2">{metric.label}</span>
                      <div className="flex items-end gap-2">
                        <span className="text-zinc-400 text-sm line-through">{metric.before}</span>
                        <TrendingUp size={16} className="text-[#cc2428] mx-1 mb-1" />
                        <span className="text-white text-xl lg:text-2xl font-bold">{metric.after}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Testimonial */}
                <div className="relative pl-6 border-l-2 border-[#cc2428]/30">
                  <Quote size={24} className="absolute -left-3 -top-2 text-[#cc2428]/20 bg-[#0a0a0f]" />
                  <p className="text-zinc-300 italic text-[0.95rem] mb-4">"{study.testimonial.text}"</p>
                  <div>
                    <p className="text-white font-bold text-sm">{study.testimonial.author}</p>
                    <p className="text-[#cc2428] text-xs font-medium">{study.testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
