import { motion } from 'framer-motion';

export function Testimonials() {
  const testimonials = [
    { name: 'Prakash', role: 'CEO, Jaswant Telecome', text: '"Hypezilla transformed our online presence completely. Our leads tripled in just 3 months! Their SEO and paid ads team is phenomenal."', avatarColor: 'linear-gradient(135deg,#cc2428,#a11b1e)' },
    { name: 'Shayam', role: 'Founder, Om sweets', text: '"Best investment we made for our e-commerce brand. Their social media campaigns drove 4x more sales. Truly experts in digital marketing."', avatarColor: 'linear-gradient(135deg,#eab308,#fde047)' },
    { name: 'Vishal', role: 'Founder, MounthillsScholarAcademy', text: '"Transparent, professional, and result-driven. Hypezilla delivered everything they promised and more. Our Google rankings improved dramatically."', avatarColor: 'linear-gradient(135deg,#404040,#525252)' }
  ];

  return (
    <section id="testimonials" className="px-[5%] py-[100px]">
      <div className="mb-[4rem]">
        <div className="text-[0.78rem] font-semibold tracking-[0.15em] uppercase text-[#cc2428] mb-[0.8rem]">Client Love</div>
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.15] tracking-[-0.02em] mb-[1rem] text-white">What Our Clients Say</h2>
        <p className="text-[#8888aa] text-[1.05rem] max-w-[520px]">Real results. Real businesses. Real growth.</p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[1.5rem]">
        {testimonials.map((t, i) => (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            key={i}
            className="card-bg border border-color rounded-[20px] p-[2rem]"
          >
            <div className="text-[#eab308] text-[0.9rem] mb-[1rem]">★★★★★</div>
            <blockquote className="text-[#8888aa] text-[0.92rem] leading-[1.7] mb-[1.5rem] italic">{t.text}</blockquote>
            <div className="flex items-center gap-[0.8rem]">
              <div className="w-[42px] h-[42px] rounded-full font-display font-bold text-[1rem] flex items-center justify-center text-white" style={{ background: t.avatarColor }}>
                {t.name.charAt(0)}
              </div>
              <div>
                <div className="font-medium text-[0.9rem] text-white">{t.name}</div>
                <div className="text-[#8888aa] text-[0.78rem]">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
