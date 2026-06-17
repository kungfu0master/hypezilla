import { motion } from 'framer-motion';

export function Floating3DObjects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" style={{ perspective: '1000px' }}>
      
      {/* 1. Red 3D Sphere */}
      <motion.div
        className="absolute top-[15%] left-[5%] md:left-[10%] w-[100px] h-[100px] md:w-[140px] md:h-[140px] rounded-full"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #ff6b6b, #cc2428 50%, #580c0c 90%)',
          boxShadow: '-10px 15px 25px rgba(0,0,0,0.5), inset -10px -10px 20px rgba(0,0,0,0.6), inset 10px 10px 25px rgba(255,255,255,0.4)',
        }}
        animate={{
          y: [0, -60, 0],
          x: [0, 30, 0],
          rotateZ: [0, 90, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* 2. Gold 3D Torus (Ring) */}
      <motion.div
        className="absolute top-[60%] right-[5%] md:right-[15%] w-[120px] h-[120px] md:w-[180px] md:h-[180px] rounded-full"
        style={{
          border: '32px solid #eab308',
          boxShadow: 'inset 5px 5px 15px rgba(255,255,255,0.5), inset -5px -5px 15px rgba(0,0,0,0.4), 10px 15px 25px rgba(0,0,0,0.4)',
          transformStyle: 'preserve-3d'
        }}
        animate={{
          y: [0, 50, 0],
          rotateX: [20, 70, 20],
          rotateY: [0, 360],
          rotateZ: [0, 180, 360]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />

      {/* 3. Red 3D Crystal */}
      <motion.div
        className="absolute top-[35%] right-[25%] md:right-[30%] w-[80px] h-[120px] md:w-[100px] md:h-[140px]"
        style={{ filter: 'drop-shadow(0px 20px 30px rgba(204,36,40,0.3))' }}
        animate={{
          y: [0, -40, 0],
          rotate: [0, 15, -15, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="100%" height="100%" viewBox="0 0 120 160" fill="none">
          <path d="M60 0L120 40L60 80L0 40L60 0Z" fill="url(#c-top)"/>
          <path d="M60 80L120 40V120L60 160V80Z" fill="url(#c-right)"/>
          <path d="M60 80V160L0 120V40L60 80Z" fill="url(#c-left)"/>
          <defs>
            <linearGradient id="c-top" x1="0" y1="0" x2="120" y2="80">
              <stop stopColor="#fca5a5"/><stop offset="1" stopColor="#cc2428"/>
            </linearGradient>
            <linearGradient id="c-right" x1="60" y1="40" x2="120" y2="160">
              <stop stopColor="#cc2428"/><stop offset="1" stopColor="#7f1d1d"/>
            </linearGradient>
            <linearGradient id="c-left" x1="0" y1="40" x2="60" y2="160">
              <stop stopColor="#991b1b"/><stop offset="1" stopColor="#450a0a"/>
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* 4. Gold Isometric Cube */}
      <motion.div
        className="absolute bottom-[10%] left-[10%] md:left-[20%] w-[100px] h-[100px] md:w-[140px] md:h-[140px]"
        style={{ filter: 'drop-shadow(0px 15px 25px rgba(234,179,8,0.25))' }}
        animate={{
          y: [0, 40, 0],
          rotate: [0, -15, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 20L180 60V140L100 180L20 140V60L100 20Z" fill="url(#cube-bg)" opacity="0.5"/>
          <path d="M100 100L180 60V140L100 180V100Z" fill="url(#cube-right)"/>
          <path d="M20 60L100 100V180L20 140V60Z" fill="url(#cube-left)"/>
          <path d="M100 20L180 60L100 100L20 60L100 20Z" fill="url(#cube-top)"/>
          <defs>
            <linearGradient id="cube-top" x1="100" y1="20" x2="100" y2="100">
              <stop stopColor="#fde047" /><stop offset="1" stopColor="#eab308" />
            </linearGradient>
            <linearGradient id="cube-right" x1="100" y1="100" x2="180" y2="180">
              <stop stopColor="#ca8a04" /><stop offset="1" stopColor="#854d0e" />
            </linearGradient>
            <linearGradient id="cube-left" x1="20" y1="60" x2="100" y2="180">
              <stop stopColor="#a16207" /><stop offset="1" stopColor="#412903" />
            </linearGradient>
            <linearGradient id="cube-bg" x1="20" y1="20" x2="180" y2="180">
              <stop stopColor="#fef08a" /><stop offset="1" stopColor="#713f12" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* 5. Floating Dark Abstract Pill shape */}
      <motion.div
        className="absolute top-[20%] right-[40%] md:right-[50%] w-[50px] h-[120px] md:w-[70px] md:h-[180px] rounded-full"
        style={{
          background: 'linear-gradient(135deg, #525252, #171717)',
          boxShadow: '10px 10px 25px rgba(0,0,0,0.6), inset 5px 5px 15px rgba(255,255,255,0.15), inset -5px -5px 15px rgba(0,0,0,0.5)'
        }}
        animate={{
          y: [0, -50, 0],
          x: [0, 40, 0],
          rotate: [30, 60, 30]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      
      {/* 6. Smaller Yellow Sphere */}
      <motion.div
        className="absolute bottom-[30%] right-[10%] md:right-[20%] w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-full"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #fde047, #eab308 50%, #713f12 90%)',
          boxShadow: '-8px 10px 20px rgba(0,0,0,0.5), inset -8px -8px 15px rgba(0,0,0,0.5), inset 8px 8px 20px rgba(255,255,255,0.6)',
        }}
        animate={{
          y: [0, 40, 0],
          x: [0, -20, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
    </div>
  );
}
