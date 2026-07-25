import { motion } from 'framer-motion';
import { MapPin, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export function HomeAbout() {
  return (
    <section className="py-24 bg-[#1b1b1b] text-white border-t border-white/10 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Image side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative shadow-2xl border border-white/10">
              <img 
                src="/products/mixed-seafood.jpg" 
                alt="Vishra Exports Processing Base Eluru" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-bold tracking-widest text-teal-400 uppercase">AQUACULTURE CAPITAL</span>
                <h4 className="text-xl font-bold text-white">Eluru, West Godavari Belt, Andhra Pradesh</h4>
              </div>
            </div>
          </motion.div>

          {/* Narrative side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <span className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-bold tracking-widest uppercase">
              <MapPin size={14} /> ELURU, ANDHRA PRADESH, INDIA
            </span>

            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              India's Leading Seafood Exporter From Eluru Hub
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              <strong>VISHRA GLOBAL EXPORTS</strong> operates at the heart of <strong>Eluru, Andhra Pradesh</strong> — the recognized epicenter of Indian aquaculture. Positioned in the fertile Godavari delta, we harvest, process, and export top-tier <em>Vannamei Shrimp</em>, <em>Black Tiger Shrimp</em>, <em>Rohu</em>, and <em>Catla fish</em>.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#252525] border border-white/10">
                <ShieldCheck className="w-6 h-6 text-teal-400 mb-2" />
                <h4 className="font-bold text-sm text-white">65%+ AP Export Share</h4>
                <p className="text-xs text-slate-400 mt-1">Andhra Pradesh dominates India's marine exports.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#252525] border border-white/10">
                <Award className="w-6 h-6 text-teal-400 mb-2" />
                <h4 className="font-bold text-sm text-white">US-FDA & EU Certified</h4>
                <p className="text-xs text-slate-400 mt-1">Export processing with 100% lab traceability.</p>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/about">
                <Button className="h-12 px-6 bg-teal-500 hover:bg-teal-400 text-[#141414] font-bold text-sm shadow-md shadow-teal-500/20">
                  Read Full Company Story & Certifications
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
