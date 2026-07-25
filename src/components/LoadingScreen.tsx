import React from 'react';
import { motion } from 'framer-motion';

export function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="fixed inset-0 z-[9999] bg-[#181818] flex flex-col justify-start p-4 md:p-6 text-white overflow-hidden pt-4"
    >
      {/* Skeleton Navbar Wireframe */}
      <div className="w-full max-w-7xl mx-auto space-y-6 animate-pulse">
        
        {/* Navbar Top Bar Skeleton */}
        <div className="flex items-center justify-between p-4 bg-[#222222] rounded-2xl border border-white/10 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-500/20 rounded-xl" />
            <div className="space-y-1.5">
              <div className="w-28 h-4 bg-white/20 rounded-full" />
              <div className="w-20 h-2 bg-teal-400/30 rounded-full" />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <div className="w-16 h-3.5 bg-white/15 rounded-full" />
            <div className="w-16 h-3.5 bg-white/15 rounded-full" />
            <div className="w-16 h-3.5 bg-white/15 rounded-full" />
            <div className="w-20 h-9 bg-white/10 rounded-xl" />
            <div className="w-28 h-9 bg-teal-500/20 rounded-xl" />
          </div>

          <div className="flex md:hidden items-center gap-2">
            <div className="w-9 h-9 bg-white/10 rounded-lg" />
            <div className="w-9 h-9 bg-white/10 rounded-lg" />
          </div>
        </div>

        {/* Hero Section Skeleton Layout */}
        <div className="p-8 md:p-12 bg-[#222222] rounded-3xl border border-white/10 space-y-6 mt-4">
          <div className="w-48 h-6 bg-teal-500/20 rounded-full" />
          <div className="space-y-3">
            <div className="w-full md:w-3/4 h-12 bg-white/15 rounded-2xl" />
            <div className="w-2/3 md:w-1/2 h-12 bg-white/15 rounded-2xl" />
          </div>
          <div className="w-full md:w-2/3 h-4 bg-white/10 rounded-full" />
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="w-48 h-14 bg-teal-500/20 rounded-xl" />
            <div className="w-48 h-14 bg-white/10 rounded-xl" />
          </div>
        </div>

        {/* Content Cards Skeleton Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-[#222222] p-5 rounded-2xl border border-white/10 space-y-4">
              <div className="w-full h-36 bg-white/10 rounded-xl" />
              <div className="w-2/3 h-5 bg-white/15 rounded-full" />
              <div className="w-full h-3 bg-white/10 rounded-full" />
              <div className="w-full h-10 bg-teal-500/20 rounded-xl" />
            </div>
          ))}
        </div>

      </div>
    </motion.div>
  );
}
