import { motion } from 'framer-motion';

export function Technologies() {
  const techCategories = [
    {
      title: 'Frontend',
      techs: ['React', 'Next.js', 'Vue.js', 'HTML5 & CSS3', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Bootstrap']
    },
    {
      title: 'Backend',
      techs: ['Node.js', 'Express.js', 'Python', 'PHP', 'Firebase', 'Supabase', 'MongoDB', 'MySQL', 'PostgreSQL']
    },
    {
      title: 'AI & Automation',
      techs: ['OpenAI API', 'Gemini API', 'DeepSeek API', 'Claude API', 'Grok API', 'Hugging Face API', 'LangChain', 'AI Agents', 'AI Workflows', 'RAG Systems']
    },
    {
      title: 'Cloud & Hosting',
      techs: ['Vercel', 'Netlify', 'Cloudflare', 'AWS', 'Google Cloud', 'Microsoft Azure', 'DigitalOcean', 'VPS Hosting']
    },
    {
      title: 'Marketing & Analytics',
      techs: ['Google Analytics', 'Google Search Console', 'Meta Business Suite', 'Google Tag Manager', 'SEMrush', 'Ahrefs', 'HubSpot', 'Zapier', 'Make.com']
    },
    {
      title: 'Communication & APIs',
      techs: ['WhatsApp Cloud API', 'Twilio API', 'Telegram Bot API', 'Stripe API', 'Razorpay API', 'PayPal API', 'SMTP Email', 'CRM Integrations']
    }
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
          <div className="text-[0.78rem] font-semibold tracking-[0.15em] uppercase text-[#cc2428] mb-[0.8rem]">Our Stack</div>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.15] tracking-[-0.02em] mb-[1rem] text-white">Technologies We Use</h2>
          <p className="text-[#8888aa] text-[1.05rem]">We utilize world-class modern technologies to build robust and scalable systems.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techCategories.map((category, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-bg border border-color rounded-2xl p-8 hover:border-[#cc2428]/30 transition-colors"
            >
              <h3 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#cc2428]/10 text-[#cc2428] flex items-center justify-center text-sm font-black border border-[#cc2428]/20">
                  {i + 1}
                </span>
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.techs.map((tech, j) => (
                  <span 
                    key={j}
                    className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-[#8888aa] text-[0.85rem] hover:bg-white/10 hover:text-white transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
