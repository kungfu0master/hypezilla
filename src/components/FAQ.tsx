import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What types of businesses do you work with?',
    answer: 'We work with startups, local businesses, creators, agencies, and enterprises.'
  },
  {
    question: 'How long does it take to build a website?',
    answer: 'Depending on the project requirements, timelines can range from a few days to several weeks.'
  },
  {
    question: 'Do you provide AI automation services?',
    answer: 'Yes, we provide AI chatbots, WhatsApp bots, CRM automation, and workflow automation systems.'
  },
  {
    question: 'Do you provide SEO and marketing services?',
    answer: 'Yes, we provide SEO, GEO, AEO, and paid advertising services.'
  },
  {
    question: 'Do you develop mobile apps?',
    answer: 'Yes, we develop Android and iOS applications.'
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="px-[5%] py-[100px] relative overflow-hidden">
      <div className="max-w-[800px] mx-auto z-10 relative">
        <motion.div 
          className="text-center mb-[4rem]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-[0.78rem] font-semibold tracking-[0.15em] uppercase text-[#cc2428] mb-[0.8rem]">FAQ</div>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.15] tracking-[-0.02em] mb-[1rem] text-white">Frequently Asked Questions</h2>
          <p className="text-[#8888aa] text-[1.05rem]">Everything you need to know about partnering with Hypezilla.</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`border rounded-2xl overflow-hidden transition-colors ${isOpen ? 'bg-white/5 border-[#cc2428]/30' : 'bg-transparent border-white/5 hover:border-white/10'}`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className={`font-medium text-[1.1rem] transition-colors ${isOpen ? 'text-white' : 'text-zinc-300'}`}>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`flex-shrink-0 ml-4 ${isOpen ? 'text-[#cc2428]' : 'text-zinc-500'}`}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-[#8888aa] text-[0.95rem] leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
