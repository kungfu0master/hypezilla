import { motion } from 'framer-motion';

export function WebsiteSkeleton() {
  return (
    <motion.div 
      className="min-h-screen bg-[#0a0a0f] w-full p-4 md:p-8 flex flex-col gap-8 md:gap-16 pt-24 overflow-hidden pointer-events-none fixed inset-0 z-[9998]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Navbar Skeleton */}
      <div className="fixed top-0 left-0 right-0 h-[80px] border-b border-white/5 flex items-center justify-between px-[5%] z-[9997] bg-[#0a0a0f]">
        <div className="w-[120px] h-[32px] bg-white/10 rounded-md animate-pulse"></div>
        <div className="hidden md:flex gap-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-[60px] h-[20px] bg-white/10 rounded-md animate-pulse"></div>
          ))}
        </div>
        <div className="w-[140px] h-[40px] bg-white/10 rounded-[20px] animate-pulse"></div>
      </div>

      {/* Hero Skeleton */}
      <div className="flex flex-col items-center justify-center text-center mt-12 md:mt-24 space-y-6">
        <div className="w-48 h-8 bg-white/5 rounded-full animate-pulse mb-4"></div>
        <div className="w-3/4 md:w-1/2 h-[60px] md:h-[80px] bg-white/10 rounded-xl animate-pulse"></div>
        <div className="w-2/3 md:w-1/3 h-[40px] md:h-[60px] bg-white/10 rounded-xl animate-pulse"></div>
        
        <div className="w-3/4 md:w-1/2 h-[40px] bg-white/5 rounded-md animate-pulse mt-6"></div>
        <div className="w-2/3 md:w-1/3 h-[40px] bg-white/5 rounded-md animate-pulse"></div>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <div className="w-[180px] h-[56px] bg-white/10 rounded-[28px] animate-pulse"></div>
          <div className="w-[180px] h-[56px] bg-white/5 rounded-[28px] animate-pulse"></div>
        </div>
      </div>

      {/* Services Skeleton */}
      <div className="px-[5%] mt-16 md:mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1.5rem]">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[280px] bg-white/5 rounded-[20px] p-[2rem] flex flex-col items-start border border-white/5">
              <div className="w-[52px] h-[52px] bg-white/10 rounded-[14px] animate-pulse mb-[1.2rem]"></div>
              <div className="w-2/3 h-[24px] bg-white/10 rounded-md animate-pulse mb-[1rem]"></div>
              <div className="w-full h-[16px] bg-white/5 rounded-md animate-pulse mb-[0.5rem]"></div>
              <div className="w-full h-[16px] bg-white/5 rounded-md animate-pulse mb-[0.5rem]"></div>
              <div className="w-4/5 h-[16px] bg-white/5 rounded-md animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
