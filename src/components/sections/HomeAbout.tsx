import { motion } from 'framer-motion';
import { MapPin, ArrowRight, ShieldCheck, Award, Fish, Wheat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export function HomeAbout() {
  return (
    <section className="py-24 bg-[#1b1b1b] text-white border-t border-white/10 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Dual Image Collage */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-2xl border border-white/10">
                <img 
                  src="/products/vannamei.jpg" 
                  alt="Seafood Division - Vannamei Shrimp" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-bold tracking-widest text-teal-400 uppercase block">DIVISION 01</span>
                  <h4 className="text-sm font-bold text-white">Seafood Export</h4>
                </div>
              </div>

              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-2xl border border-white/10 mt-6">
                <img 
                  src="/products/rice.jpg" 
                  alt="Agricultural Division - Sona Masoori Rice" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase block">DIVISION 02</span>
                  <h4 className="text-sm font-bold text-white">Agri Products</h4>
                </div>
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
              India's Premier Seafood & Agricultural Exporter
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              Based in Eluru, Andhra Pradesh, <strong>VISHRA GLOBAL EXPORTS</strong> delivers premium seafood and certified agricultural commodities with global shipping precision.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#252525] border border-white/10 flex items-start gap-3">
                <Fish className="w-6 h-6 text-teal-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-sm text-white">Seafood Division</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Cold-chain frozen shrimp, fish & squid.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#252525] border border-white/10 flex items-start gap-3">
                <Wheat className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-sm text-white">Agri Division</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Rice, Guntur spices, millets & pulses.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
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
