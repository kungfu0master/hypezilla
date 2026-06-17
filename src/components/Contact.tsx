import { motion } from 'framer-motion';
import { useState } from 'react';

export function Contact() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<null | 'error' | 'success'>(null);

  const handleSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <section id="contact" className="px-[5%] py-[100px] text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-[32px] p-[2.5rem_1rem] sm:p-[5rem_2rem] bg-gradient-to-br from-[#cc2428]/15 to-[#eab308]/[0.08] border border-color"
      >
        <div className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(204,36,40,0.2),transparent_70%)] pointer-events-none" />
        
        <div className="flex justify-center mb-[0.8rem]">
          <div className="text-[0.78rem] font-semibold tracking-[0.15em] uppercase text-[#cc2428]">🚀 Let's Build Your Brand With HYPEZILLA</div>
        </div>
        <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-extrabold mb-[1rem] tracking-[-0.02em] leading-tight text-white">Ready To Grow Your Business Online?</h2>
        <p className="text-[#8888aa] max-w-[550px] mx-auto text-[1.1rem] mb-10 leading-relaxed">
          Get Professional Social Media Management, Reels, Branding & Advertising Under One Roof.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center max-w-[800px] mx-auto gap-4 mt-4">
           <a 
             href="tel:9058221232"
             className="inline-flex items-center gap-2 rounded-full px-[2rem] py-[1.2rem] text-white font-display text-[1.1rem] font-bold cursor-pointer transition-all duration-200 shadow-[0_4px_20px_rgba(204,36,40,0.35)] hover:-translate-y-[2px] border border-transparent hover:shadow-[0_8px_30px_rgba(204,36,40,0.5)] bg-gradient-to-br from-[#cc2428] to-[#a11b1e]"
           >
             📞 9058221232
           </a>
           <a 
             href="tel:8439922493"
             className="inline-flex items-center gap-2 rounded-full px-[2rem] py-[1.2rem] text-white font-display text-[1.1rem] font-bold cursor-pointer transition-all duration-200 shadow-[0_4px_20px_rgba(204,36,40,0.35)] hover:-translate-y-[2px] border border-transparent hover:shadow-[0_8px_30px_rgba(204,36,40,0.5)] bg-gradient-to-br from-[#cc2428] to-[#a11b1e]"
           >
             📞 8439922493
           </a>
        </div>
      </motion.div>
    </section>
  );
}
