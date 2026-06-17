import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 md:h-1.5 bg-gradient-to-r from-[#cc2428] via-[#eab308] to-[#cc2428] z-[9999] origin-left"
      style={{ scaleX }}
    />
  );
}
