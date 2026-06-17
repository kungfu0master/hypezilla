import { motion } from 'framer-motion';
import { Twitter, Linkedin } from 'lucide-react';

export function Team() {
  const teamMembers = [
    {
      name: "Dhwaj Dubey",
      role: "Founder & CEO",
      image: "/dhwaj-dubey-new.jpg",
      desc: "10+ years driving digital growth for enterprise and consumer brands."
    },
    {
      name: "Himanshu Verma",
      role: "Co-Founder & CEO",
      image: "/himanshu-verma.jpg",
      desc: "Data-obsessed marketer turning analytics into actionable scaling strategies."
    },

  ];

  return (
    <section id="team" className="px-[5%] py-[100px]">
      <div className="mb-[4rem]">
        <div className="text-[0.78rem] font-semibold tracking-[0.15em] uppercase text-[#cc2428] mb-[0.8rem]">Our Experts</div>
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.15] tracking-[-0.02em] mb-[1rem] text-white">Meet the Team</h2>
        <p className="text-[#8888aa] text-[1.05rem] max-w-[520px]">The brilliant minds orchestrating your brand's digital dominance.</p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[1.5rem]">
        {teamMembers.map((member, i) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ 
              y: [-8, -12, -8], 
              scale: 1.02,
              transition: { 
                y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                scale: { type: "spring", stiffness: 400, damping: 10 }
              }
            }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: (i % 4) * 0.15 }}
            key={i}
            className="card-bg border border-color rounded-[20px] p-[2rem] transition-colors duration-300 hover:border-[#cc2428] hover:shadow-[0_8px_30px_rgba(204,36,40,0.15)] flex flex-col items-start cursor-pointer group"
          >
            <div className="w-[64px] h-[64px] rounded-[14px] overflow-hidden mb-[1.2rem] transition-all duration-500 ease-out group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(204,36,40,0.4)] border-2 border-transparent group-hover:border-[#cc2428]">
              <img 
                src={member.image || "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?auto=format&fit=crop&q=80&h=400&w=400"} 
                alt={member.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  if (member.name === "Dhwaj Dubey") {
                    e.currentTarget.src = "/dhwaj-dubey-new.jpg";
                  } else if (member.name === "Himanshu Verma") {
                    e.currentTarget.src = "/himanshu-verma.jpg";
                  } else {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&h=400&w=400";
                  }
                }}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
            </div>
            <h3 className="font-display text-[1.1rem] font-bold mb-[0.2rem] text-white">{member.name}</h3>
            <p className="text-[#cc2428] font-medium text-[0.85rem] mb-[0.8rem]">{member.role}</p>
            <p className="text-[#8888aa] text-[0.9rem] leading-[1.6] mb-[1.5rem] flex-grow">{member.desc}</p>
            
            <div className="flex items-center gap-3 mt-auto">
              <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#cc2428] transition-all">
                <Twitter size={14} />
              </span>
              <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#cc2428] transition-all">
                <Linkedin size={14} />
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
