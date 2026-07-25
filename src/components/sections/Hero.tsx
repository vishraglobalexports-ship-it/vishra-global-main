import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Globe2, Anchor, Award, ShoppingBag, Sparkles } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import { GiShrimp, GiTropicalFish } from 'react-icons/gi';
import { useLocation } from 'wouter';

export function Hero() {
  const { cart, totalItemsCount } = useCart();
  const [, setLocation] = useLocation();

  const highlights = [
    { icon: Globe2, label: 'Global Shipping', desc: '50+ Export Destinations' },
    { icon: ShieldCheck, label: 'Certified Quality', desc: 'FDA & HACCP Approved' },
    { icon: Anchor, label: 'Cold-Chain Tech', desc: '-18°C Controlled Storage' },
    { icon: Award, label: 'Premium Grade', desc: '100% Traceable Sourcing' },
  ];

  return (
    <section id="home" className="relative min-h-[100dvh] flex flex-col justify-between overflow-hidden pt-28 pb-12 bg-[#202020]">
      
      {/* Dynamic Animated Swimming Fish & Shrimp Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Background Image */}
        <img 
          src="/hero.jpg" 
          alt="Ocean Background" 
          className="w-full h-full object-cover scale-105 transition-transform duration-10000 opacity-30"
        />

        {/* Rising Ocean Water Bubbles */}
        {[15, 35, 60, 80, 92].map((leftPct, i) => (
          <motion.div
            key={i}
            initial={{ y: '105vh', opacity: 0.15 }}
            animate={{ 
              y: '-10vh', 
              opacity: [0.15, 0.6, 0.15],
              x: [0, (i % 2 === 0 ? 12 : -12), 0]
            }}
            transition={{
              duration: 4 + i * 0.9,
              repeat: Infinity,
              ease: 'easeOut',
              delay: i * 0.5,
            }}
            className="absolute rounded-full bg-teal-400/30 border border-teal-300/40"
            style={{ 
              left: `${leftPct}%`, 
              width: `${10 + i * 4}px`, 
              height: `${10 + i * 4}px` 
            }}
          />
        ))}

        {/* Swimming Single Fish Across Hero (Left to Right) with Tail Wiggle */}
        <motion.div
          initial={{ x: '-25vw', y: '32vh' }}
          animate={{ 
            x: '125vw', 
            y: ['32vh', '22vh', '38vh', '26vh', '32vh'],
            rotate: [0, 8, -6, 4, 0],
          }}
          transition={{ 
            duration: 4.2, 
            repeat: Infinity, 
            ease: 'easeInOut' 
          }}
          className="absolute text-teal-400/50 text-8xl md:text-9xl drop-shadow-[0_0_25px_rgba(45,212,191,0.4)]"
        >
          <motion.div
            animate={{ rotate: [-4, 4, -4] }}
            transition={{ duration: 0.22, repeat: Infinity, ease: 'easeInOut' }}
          >
            <GiTropicalFish />
          </motion.div>
        </motion.div>

        {/* Swimming Single Shrimp Across Hero (Right to Left) with Stroke Motion */}
        <motion.div
          initial={{ x: '125vw', y: '68vh' }}
          animate={{ 
            x: '-25vw', 
            y: ['68vh', '58vh', '72vh', '62vh'],
            rotate: [0, -12, 8, -4],
          }}
          transition={{ 
            duration: 4.8, 
            repeat: Infinity, 
            ease: 'easeInOut', 
            delay: 0.5 
          }}
          className="absolute text-emerald-400/45 text-7xl md:text-8xl scale-x-[-1] drop-shadow-[0_0_25px_rgba(52,211,153,0.4)]"
        >
          <motion.div
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 0.3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <GiShrimp />
          </motion.div>
        </motion.div>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#181818]/95 via-[#202020]/90 to-[#252525]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#202020] via-transparent to-[#181818]/80" />
      </div>

      {/* Main Content */}
      <div className="container relative z-10 mx-auto px-4 md:px-6 my-auto">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Tag Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-teal-500/10 border border-teal-400/30 backdrop-blur-md mb-6"
            >
              <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
              <span className="text-teal-300 text-xs md:text-sm font-bold tracking-widest uppercase">
                INDIA'S PREMIER SEAFOOD & AGRI EXPORTER
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6 drop-shadow-lg">
              Delivering Pristine Ocean Wealth To <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-teal-200 bg-clip-text text-transparent">Global Markets.</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
              VISHRA GLOBAL EXPORTS delivers export-ready Vannamei Shrimp, Black Tiger, Rohu, Catla, Squid, and Premium Indian Rice from Eluru, Andhra Pradesh. Certified processing and global shipping precision.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                className="text-base font-bold h-14 px-8 bg-teal-500 hover:bg-teal-400 text-[#141414] shadow-lg shadow-teal-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
                onClick={() => setLocation('/products')}
              >
                <ShoppingBag className="mr-2.5 w-5 h-5" />
                Browse Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button 
                size="lg" 
                variant="outline" 
                className="text-base font-bold h-14 px-8 bg-white/5 backdrop-blur-md text-white border-white/20 hover:bg-white/15 hover:border-white/40 transition-all duration-300"
                onClick={() => window.open('https://wa.me/919121297999', '_blank')}
              >
                <FaWhatsapp className="mr-2.5 w-5 h-5 text-emerald-400" />
                Instant WhatsApp Quote
              </Button>
            </div>

            {/* Active Cart Counter Indicator if items exist */}
            {cart.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 p-3 px-5 rounded-2xl bg-[#181818] border border-teal-500/30 text-teal-200 text-xs font-semibold backdrop-blur-md"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping" />
                <span>You have <strong>{totalItemsCount} item(s)</strong> in your cart</span>
                <button 
                  onClick={() => setLocation('/products')} 
                  className="underline text-teal-400 hover:text-white font-bold ml-2"
                >
                  View Cart
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Feature Glass Cards Bar at Bottom */}
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 p-4 md:p-6 rounded-2xl bg-[#181818]/90 backdrop-blur-xl border border-white/10 shadow-2xl"
        >
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-white/5">
                <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 shrink-0">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="text-white text-xs sm:text-sm font-bold leading-tight">{item.label}</h4>
                  <p className="text-slate-400 text-[11px] sm:text-xs leading-tight mt-0.5">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
