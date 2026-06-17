import { motion } from 'framer-motion';

export function WhyChooseUs() {
  const reasons = [
    { icon: '✨', title: 'Creative Content Team', desc: 'Expert designers and creators crafting engaging visuals for your brand.' },
    { icon: '🤝', title: 'Dedicated Support', desc: 'Direct access to your account manager whenever you need assistance.' },
    { icon: '📊', title: 'Monthly Reporting', desc: 'Transparent analytics to track growth and optimize strategies.' },
    { icon: '⚡', title: 'Fast Delivery', desc: 'Quick turnaround times without compromising on professional quality.' },
    { icon: '📈', title: 'Result-Oriented Strategy', desc: 'Data-driven campaigns focused on real leads and conversions.' },
    { icon: '💰', title: 'Affordable Pricing', desc: 'Premium quality services structured to fit small and growing businesses.' }
  ];

  return (
    <section id="why" className="px-[5%] py-[100px] surface">
      <div className="grid md:grid-cols-2 gap-[4rem] items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-[0.78rem] font-semibold tracking-[0.15em] uppercase text-[#cc2428] mb-[0.8rem]">Why Hypezilla</div>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.15] tracking-[-0.02em] mb-[1rem] text-white">Why Businesses Trust Us</h2>
            <p className="text-[#8888aa] text-[1.05rem] mb-[2.5rem]">We don't just run campaigns — we become your growth partner.</p>
          </motion.div>
          
          <ul className="flex flex-col gap-[1.2rem] list-none m-0 p-0">
            {reasons.map((reason, i) => (
              <motion.li
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                key={i}
                className="flex gap-[1rem] items-start"
              >
                <div className="w-[40px] h-[40px] min-w-[40px] bg-[rgba(204,36,40,0.12)] rounded-[10px] flex items-center justify-center text-[1.1rem] mt-[2px]">
                  {reason.icon}
                </div>
                <div>
                  <h4 className="font-display font-bold mb-[0.2rem] text-white">{reason.title}</h4>
                  <p className="text-[#8888aa] text-[0.88rem]">{reason.desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="card-bg border border-color rounded-[24px] p-[2.5rem] flex flex-col gap-[1.5rem]"
        >
          <h4 className="font-display text-[1rem] font-bold mb-[-1rem] text-white">Average Client Results</h4>
          <p className="text-[#8888aa] text-[0.82rem] mb-[0.5rem]">After 6 months with Hypezilla</p>

          <div>
            <div className="flex justify-between mb-[0.5rem] text-[0.88rem]">
              <span className="text-[#8888aa]">Organic Traffic</span>
              <span className="text-[#cc2428] font-semibold">+185%</span>
            </div>
            <div className="h-[8px] bg-[rgba(255,255,255,0.07)] rounded-[50px] overflow-hidden">
              <motion.div initial={{ width: 0 }} whileInView={{ width: '85%' }} transition={{ duration: 1.5, delay: 0.2 }} className="h-full rounded-[50px] bg-gradient-to-r from-[#cc2428] to-[#a11b1e]"></motion.div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-[0.5rem] text-[0.88rem]">
              <span className="text-[#8888aa]">Lead Generation</span>
              <span className="text-[#eab308] font-semibold">+220%</span>
            </div>
            <div className="h-[8px] bg-[rgba(255,255,255,0.07)] rounded-[50px] overflow-hidden">
              <motion.div initial={{ width: 0 }} whileInView={{ width: '92%' }} transition={{ duration: 1.5, delay: 0.3 }} className="h-full rounded-[50px] bg-gradient-to-r from-[#eab308] to-[#fde047]"></motion.div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-[0.5rem] text-[0.88rem]">
              <span className="text-[#8888aa]">Ad ROI</span>
              <span className="text-[#404040] font-semibold">10x</span>
            </div>
            <div className="h-[8px] bg-[rgba(255,255,255,0.07)] rounded-[50px] overflow-hidden">
              <motion.div initial={{ width: 0 }} whileInView={{ width: '78%' }} transition={{ duration: 1.5, delay: 0.4 }} className="h-full rounded-[50px] bg-gradient-to-r from-[#404040] to-[#56f5a3]"></motion.div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-[0.5rem] text-[0.88rem]">
              <span className="text-[#8888aa]">Social Engagement</span>
              <span className="text-[#eab308] font-semibold">+310%</span>
            </div>
            <div className="h-[8px] bg-[rgba(255,255,255,0.07)] rounded-[50px] overflow-hidden">
              <motion.div initial={{ width: 0 }} whileInView={{ width: '95%' }} transition={{ duration: 1.5, delay: 0.5 }} className="h-full rounded-[50px] bg-gradient-to-r from-[#eab308] to-[#f59e0b]"></motion.div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-[0.5rem] text-[0.88rem]">
              <span className="text-[#8888aa]">Brand Visibility</span>
              <span className="text-[#fbbf24] font-semibold">+140%</span>
            </div>
            <div className="h-[8px] bg-[rgba(255,255,255,0.07)] rounded-[50px] overflow-hidden">
              <motion.div initial={{ width: 0 }} whileInView={{ width: '70%' }} transition={{ duration: 1.5, delay: 0.6 }} className="h-full rounded-[50px] bg-gradient-to-r from-[#fbbf24] to-[#eab308]"></motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
