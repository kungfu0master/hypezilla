import { motion } from 'framer-motion';

export function Pricing() {
  const plans = [
    {
      name: 'Starter Plan', price: '14,999', period: 'per month', isFeatured: false, subtitle: 'Best For: Local Shops, Cafes, Salons, Startups',
      features: ['6 Professional Reels', '10 Graphic Posters', 'Daily Story Updates', 'Instagram Management', 'Facebook Management', 'Google Business Profile Updates']
    },
    {
      name: 'Growth Plan', price: '19,999', period: 'per month', isFeatured: false, subtitle: 'Best For: Growing Businesses & Restaurants',
      features: ['12 Professional Reels', '20 Graphic Posters', 'Daily Story Updates', 'Instagram Management', 'Facebook Management', 'Google Business Profile Updates', 'Monthly Performance Report']
    },
    {
      name: 'Premium Plan', price: '24,999', period: 'per month', isFeatured: true, badge: 'Most Popular', subtitle: 'Best For: Brands & Established Businesses',
      features: ['15 Premium Reels', '25 Graphic Posters', 'Daily Story Updates', 'Instagram Management', 'Facebook Management', 'Google Business Profile Updates', 'YouTube Management', 'Monthly Analytics Report', 'Dedicated Account Manager']
    }
  ];

  return (
    <section id="pricing" className="px-[5%] py-[100px] surface">
      <div className="mb-[4rem]">
        <div className="text-[0.78rem] font-semibold tracking-[0.15em] uppercase text-[#cc2428] mb-[0.8rem]">Pricing Plans</div>
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.15] tracking-[-0.02em] mb-[1rem] text-white">Transparent & Affordable Plans</h2>
        <p className="text-[#8888aa] text-[1.05rem] max-w-[520px]">No hidden charges. Choose the plan that fits your business.</p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[1.5rem] items-start">
        {plans.map((plan, i) => (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            key={i}
            className={`card-bg border rounded-[24px] p-[2.5rem_2rem] relative transition-transform duration-300 ${plan.isFeatured ? 'border-[#cc2428] shadow-[0_0_40px_rgba(204,36,40,0.25)] scale-100 md:scale-[1.03] z-10' : 'border-color'}`}
          >
            {plan.isFeatured && (
              <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#cc2428] to-[#eab308] text-white text-[0.75rem] font-semibold px-[1rem] py-[0.3rem] rounded-full whitespace-nowrap">
                {plan.badge}
              </div>
            )}
            <div className="font-display text-[1rem] font-bold text-[#8888aa] mb-[0.2rem]">{plan.name}</div>
            {plan.subtitle && <div className="text-[0.75rem] text-[#cc2428] font-semibold mb-[0.5rem] tracking-wide uppercase">{plan.subtitle}</div>}
            <div className="font-display text-[2.8rem] font-extrabold leading-none mb-[0.3rem] text-white">
              <sup className="text-[1.2rem] align-top mt-[0.5rem] inline-block mr-1">₹</sup>{plan.price}
            </div>
            <div className="text-[#8888aa] text-[0.82rem] mb-[1.8rem]">{plan.period}</div>
            
            <ul className="flex flex-col gap-[0.75rem] list-none m-0 p-0 mb-[2rem]">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="text-[0.9rem] flex items-center gap-[0.6rem] text-white">
                  <span className="text-[#404040] font-bold">✓</span> {feature}
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className={`block w-full text-center px-[0.8rem] py-[0.8rem] rounded-full font-medium text-[0.9rem] transition-all duration-200 border ${
                plan.isFeatured
                  ? 'bg-gradient-to-br from-[#cc2428] to-[#a11b1e] border-transparent text-white shadow-[0_4px_20px_rgba(204,36,40,0.35)] hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(204,36,40,0.5)]'
                  : 'bg-transparent text-white border-[#cc2428]/20 hover:border-[#cc2428] hover:bg-[#cc2428]/10'
              }`}
            >
              Get Started
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
