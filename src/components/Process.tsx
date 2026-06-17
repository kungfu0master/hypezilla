import { motion } from 'framer-motion';

export function Process() {
  const steps = [
    { num: '01', title: 'Discovery', desc: 'We learn about your business, goals, target audience, and current digital presence.' },
    { num: '02', title: 'Strategy', desc: 'Our experts craft a customized digital marketing roadmap tailored to your objectives.' },
    { num: '03', title: 'Execution', desc: 'We launch campaigns, create content, run ads, and implement SEO with precision.' },
    { num: '04', title: 'Optimize & Report', desc: 'We continuously monitor, test, and improve to maximize your results and ROI.' }
  ];

  return (
    <section id="process" className="px-[5%] py-[100px]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="mb-[4rem]"
      >
        <div className="text-[0.78rem] font-semibold tracking-[0.15em] uppercase text-[#cc2428] mb-[0.8rem]">How We Work</div>
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.15] tracking-[-0.02em] mb-[1rem] text-white">Our Simple 4-Step Process</h2>
        <p className="text-zinc-200 font-medium text-[1.05rem] max-w-[520px]">From strategy to execution — we make it simple and result-driven.</p>
      </motion.div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[2rem]">
        {steps.map((step, i) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            key={i}
            className="card-bg border border-color rounded-2xl p-8 relative overflow-hidden transition-all duration-300 hover:border-[#cc2428]/50 hover:bg-[#cc2428]/5 group"
          >
            <div className="absolute -right-4 -bottom-4 font-display text-[8rem] font-bold text-white/[0.02] group-hover:text-[#cc2428]/[0.05] transition-colors select-none leading-none z-0">{step.num}</div>
            <div className="w-14 h-14 rounded-full bg-[#cc2428]/10 text-[#cc2428] flex items-center justify-center font-bold text-xl mb-6 relative z-10 border border-[#cc2428]/20">{step.num}</div>
            <h3 className="font-display text-[1.2rem] font-bold mb-3 text-white relative z-10">{step.title}</h3>
            <p className="text-zinc-200 font-medium text-[0.95rem] leading-relaxed relative z-10">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
