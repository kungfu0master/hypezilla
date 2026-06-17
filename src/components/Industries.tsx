import { motion } from 'framer-motion';

export function Industries() {
  const industries = [
    { name: 'Real Estate', icon: '🏢' },
    { name: 'Healthcare', icon: '🏥' },
    { name: 'Fitness', icon: '💪' },
    { name: 'Restaurants', icon: '🍽️' },
    { name: 'Education', icon: '🎓' },
    { name: 'Startups', icon: '🚀' },
    { name: 'Personal Brands', icon: '⭐' },
    { name: 'E-commerce', icon: '🛒' },
    { name: 'Finance', icon: '💰' },
    { name: 'Local Businesses', icon: '🏪' },
    { name: 'Agencies', icon: '🤝' },
    { name: 'Influencers', icon: '📱' },
    { name: 'Coaches & Consultants', icon: '🎯' }
  ];

  return (
    <section className="px-[5%] py-[100px] border-t border-color relative bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-[4rem]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-[0.78rem] font-semibold tracking-[0.15em] uppercase text-[#cc2428] mb-[0.8rem]">Who We Help</div>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.15] tracking-[-0.02em] mb-[1rem] text-white">Industries We Serve</h2>
          <p className="text-[#8888aa] text-[1.05rem]">We bring specialized digital strategies to a wide variety of sectors.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {industries.map((ind, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="card-bg border border-color rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:border-[#cc2428] hover:bg-[#cc2428]/5 transition-all duration-300 cursor-pointer text-center group"
            >
              <div className="text-3xl group-hover:scale-110 transition-transform duration-300">{ind.icon}</div>
              <div className="font-medium text-[0.9rem] text-white/90 group-hover:text-white">{ind.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
