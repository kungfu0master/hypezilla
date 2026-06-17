import { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ServiceItem {
  icon: string;
  color: string;
  title: string;
  desc: string;
}

const ServiceSkeleton = () => (
  <div className="card-bg border border-color rounded-[20px] p-[2rem] flex flex-col items-start bg-white/[0.02] animate-pulse">
    <div className="w-[52px] h-[52px] rounded-[14px] mb-[1.2rem] bg-white/[0.05]"></div>
    <div className="h-[1.1rem] w-3/4 bg-white/10 rounded mb-[0.6rem]"></div>
    <div className="h-[0.9rem] w-full bg-white/[0.05] rounded mt-2"></div>
    <div className="h-[0.9rem] w-5/6 bg-white/[0.05] rounded mt-2"></div>
    <div className="h-[0.9rem] w-4/6 bg-white/[0.05] rounded mt-2"></div>
  </div>
);

const ServiceCard = memo(({ service, index }: { service: ServiceItem; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -10,
        scale: 1.04,
        transition: { 
          type: "spring",
          stiffness: 300,
          damping: 22
        }
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className="card-bg border border-color rounded-[20px] p-[2rem] transition-colors duration-300 hover:border-[#cc2428] hover:shadow-[0_12px_40px_rgba(204,36,40,0.18)] flex flex-col items-start cursor-pointer group"
    >
      <div className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center text-[1.5rem] mb-[1.2rem] transition-all duration-500 ease-out group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(204,36,40,0.4)]" style={{ background: service.color }}>
        <span className="transition-transform duration-500 ease-in-out group-hover:scale-125 group-hover:-translate-y-1 inline-block">
          {service.icon}
        </span>
      </div>
      <h3 className="font-display text-[1.1rem] font-bold mb-[0.6rem] text-white">{service.title}</h3>
      <p className="text-[#8888aa] text-[0.9rem] leading-[1.6]">{service.desc}</p>
    </motion.div>
  );
});

ServiceCard.displayName = 'ServiceCard';

export function Services() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    { icon: '🌐', color: 'rgba(204,36,40,0.15)', title: 'Website Development', desc: 'Modern, fast, and responsive websites that give your business a strong online identity and drive conversions.' },
    { icon: '🤖', color: 'rgba(234,179,8,0.15)', title: 'AI Automation Services', desc: 'Smart AI chatbots, voice agents, and workflow systems that save time and boost productivity 24/7.' },
    { icon: '💬', color: 'rgba(37,211,102,0.15)', title: 'WhatsApp API Services', desc: 'Official WhatsApp Business automation, chatbots, and CRM integration for faster customer communication.' },
    { icon: '📈', color: 'rgba(204,36,40,0.15)', title: 'Digital Marketing', desc: 'Complete online growth solutions including social media, content marketing, and conversion optimization.' },
    { icon: '🎯', color: 'rgba(234,179,8,0.15)', title: 'Advertising Agency', desc: 'High-converting data-driven campaigns across Meta, Google, and YouTube for better ROI and leads.' },
    { icon: '🔍', color: 'rgba(64,64,64,0.15)', title: 'SEO Services', desc: 'Advanced search engine optimization strategies to improve Google rankings and organic traffic.' },
    { icon: '🧠', color: 'rgba(204,36,40,0.15)', title: 'AEO Services', desc: 'Answer Engine Optimization to ensure visibility in AI tools, voice search, and featured snippets.' },
    { icon: '🚀', color: 'rgba(234,179,8,0.15)', title: 'GEO Services', desc: 'Generative Engine Optimization to future-proof your brand in AI-powered search engines.' },
    { icon: '📱', color: 'rgba(64,64,64,0.15)', title: 'Mobile App Development', desc: 'Scalable, secure, and user-friendly Android & iOS applications for your modern business.' },
    { icon: '✨', color: 'rgba(204,36,40,0.15)', title: 'UI/UX Design', desc: 'Clean, modern, and conversion-focused user interfaces and experiences for web and mobile.' },
    { icon: '🎨', color: 'rgba(234,179,8,0.15)', title: 'Branding Services', desc: 'Build a strong digital brand identity through logos, visuals, and comprehensive strategy.' },
    { icon: '📲', color: 'rgba(64,64,64,0.15)', title: 'Social Media Management', desc: 'Professional audience growth, content creation, and engagement strategies across all platforms.' },
    { icon: '🧲', color: 'rgba(204,36,40,0.15)', title: 'Lead Generation', desc: 'Generate high-quality leads through targeted funnels, landing pages, and AI-driven capture systems.' },
    { icon: '🛒', color: 'rgba(234,179,8,0.15)', title: 'E-Commerce Solutions', desc: 'Complete, SEO-optimized, and conversion-ready online store setups for modern retail brands.' },
    { icon: '💻', color: 'rgba(64,64,64,0.15)', title: 'SaaS Development', desc: 'Custom scalable SaaS products, CRM systems, and AI-powered web applications.' },
    { icon: '📲', color: 'rgba(234,179,8,0.15)', title: 'Social Media Marketing', desc: 'Consistent growth across platforms including Instagram Management, Facebook Management, LinkedIn Management, and YouTube Management.' },
    { icon: '🌐', color: 'rgba(37,211,102,0.15)', title: 'Website Services', desc: 'High-performing online hubs from Static Website Development and Business Website Development to Landing Pages and Portfolio Websites.' },
    { icon: '🎨', color: 'rgba(204,36,40,0.15)', title: 'Branding & Design', desc: 'A cohesive brand identity with expert Logo Design, Brand Identity crafting, Business Card Design, and Flex & Banner Design.' },
    { icon: '🎬', color: 'rgba(64,64,64,0.15)', title: 'Video Production', desc: 'Engaging visual content spanning Reel Editing, YouTube Video Editing, Motion Graphics, and cutting-edge AI Video Creation.' },
    { icon: '📈', color: 'rgba(204,36,40,0.15)', title: 'Paid Advertising', desc: 'Data-driven paid strategies including Meta Ads, Google Ads, Lead Generation Campaigns, and dynamic Remarketing Campaigns.' },
    { icon: '📍', color: 'rgba(234,179,8,0.15)', title: 'Local Business Growth', desc: 'Dominate your local market through Google Business Profile Optimization, Google Reviews Strategy, and Local SEO.' }
  ];

  return (
    <section id="services" className="px-[5%] py-[100px] surface">
      <div className="mb-[4rem]">
        <div className="text-[0.78rem] font-semibold tracking-[0.15em] uppercase text-[#cc2428] mb-[0.8rem]">What We Do</div>
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.15] tracking-[-0.02em] mb-[1rem] text-white">Complete Digital<br/>Marketing Solutions</h2>
        <p className="text-[#8888aa] text-[1.05rem] max-w-[520px]">Everything your brand needs to dominate online — under one roof.</p>
      </div>
      
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[1.5rem]">
        {isLoading 
          ? Array.from({ length: 12 }).map((_, i) => <ServiceSkeleton key={`skeleton-${i}`} />)
          : services.map((service, i) => (
             <ServiceCard key={i} service={service} index={i} />
          ))
        }
      </div>
    </section>
  );
}
