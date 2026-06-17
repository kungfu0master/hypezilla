import { motion } from 'framer-motion';
import { Interactive3DTilt } from './ui/ThreeDText';

const projects = [
  {
    id: 1,
    title: 'Minimalist Tech Branding',
    category: 'Social Media Posters',
    image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 2,
    title: 'Fitness Apparel Launch',
    category: 'Viral Reels Campaign',
    image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3,
    title: 'Local Cafe Outreach',
    category: 'Google Page Optimization',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 4,
    title: 'Luxury Real Estate',
    category: 'Instagram Management',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-black/10 backdrop-blur-[2px] border-t border-zinc-900/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Featured Work</h2>
            <p className="text-zinc-400 text-lg max-w-xl">
              A glimpse into the high-converting content and strategies we deliver for our partners.
            </p>
          </motion.div>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            href="#contact"
            className="text-[#cc2428] font-semibold hover:text-white transition-colors"
          >
            See all projects &rarr;
          </motion.a>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <Interactive3DTilt key={project.id} intensity={8}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 border border-white/5 bg-zinc-900">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full font-medium border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      View Project
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#cc2428] transition-colors">{project.title}</h3>
                <p className="text-zinc-500 font-medium">{project.category}</p>
              </motion.div>
            </Interactive3DTilt>
          ))}
        </div>
      </div>
    </section>
  );
}
