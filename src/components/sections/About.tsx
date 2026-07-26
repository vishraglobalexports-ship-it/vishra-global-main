import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Award, ShieldCheck, Anchor, Waves, CheckCircle2, Factory, 
  Thermometer, Globe, ArrowRight, Truck, Microscope, Award as Certificate,
  ChevronDown, HelpCircle, ExternalLink, Mail, Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export function About() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const highlights = [
    {
      title: "Eluru Seafood & Agro Hub",
      location: "Eluru, Andhra Pradesh",
      description: "Headquartered in Eluru, the premier aquaculture & agricultural hub of Andhra Pradesh, surrounded by Kolleru region freshwater aquaculture farms and rich Godavari river delta agricultural belts."
    },
    {
      title: "Andhra Pradesh Export Supremacy",
      location: "India's #1 Seafood State",
      description: "Andhra Pradesh contributes over 65% of India's total cultivated shrimp exports. Eluru serves as a pivotal processing hub with direct transport access to Visakhapatnam (Vizag) & Krishnapatnam sea ports."
    },
    {
      title: "Indian Global Export Heritage",
      location: "50+ Export Destinations",
      description: "Leveraging India's world-renowned agricultural and marine export ecosystem, supplying premium grade 1121 Basmati Rice, Sona Masuri, Vannamei Shrimp, Black Tiger, and Boneless Fish Fillets worldwide."
    }
  ];

  const keyStats = [
    { value: "#1", label: "Shrimp Producer Hub", subtext: "Eluru & Godavari Delta" },
    { value: "65%+", label: "AP Contribution", subtext: "To India's Marine Exports" },
    { value: "100%", label: "Traceable Sourcing", subtext: "Certified Farms & Processing" },
    { value: "-18°C", label: "IQF Cold Storage", subtext: "Unbroken Supply Chain" }
  ];

  const processingSteps = [
    {
      step: "01",
      title: "Farm Harvest & Selection",
      desc: "Direct farm-gate harvesting from BAP & MPEDA registered farms in Eluru and West Godavari districts under strict quality grading."
    },
    {
      step: "02",
      title: "Lab Testing & Anti-Biotic Check",
      desc: "Comprehensive ELISA and LC-MS/MS testing for zero antibiotic residues, heavy metals, and microbiological safety compliance."
    },
    {
      step: "03",
      title: "HACCP Processing & De-heading",
      desc: "State-of-the-art automated de-heading, peeling, and grading in US-FDA and EU approved export processing facilities."
    },
    {
      step: "04",
      title: "IQF Freezing & Cold Chain",
      desc: "Rapid Individual Quick Freezing (IQF) at -40°C and cold storage preservation at a continuous -18°C."
    },
    {
      step: "05",
      title: "Port Shipping & Customs Clearance",
      desc: "Sealed reefer container transport to Visakhapatnam (Vizag) and Krishnapatnam ports for immediate ocean freight dispatch."
    }
  ];

  const certifications = [
    { name: "US-FDA Approved", code: "FDA Facility Reg." },
    { name: "EU Export Certified", code: "EU Approval No." },
    { name: "HACCP Certified", code: "Hazard Analysis Standard" },
    { name: "BAP 4-Star Certified", code: "Best Aquaculture Practices" },
    { name: "MPEDA Registered", code: "Marine Products Export Dev." },
    { name: "BRCGS Food Safety", code: "Global Standard Certified" }
  ];

  const exportDestinations = [
    { region: "Middle East & GCC", countries: "UAE, Saudi Arabia, Qatar, Oman, Kuwait" },
    { region: "North America", countries: "United States, Canada" },
    { region: "European Union", countries: "Spain, Italy, Netherlands, Belgium, France" },
    { region: "East Asia & SE Asia", countries: "Japan, Vietnam, China, Malaysia, Thailand" }
  ];

  const faqs = [
    {
      q: "What products does Vishra Global Exports specialize in exporting?",
      a: "Vishra Global Exports (Vishra Exports) specializes in premium export-grade Indian Basmati Rice (1121, Pusa 1509, Golden Sella), Non-Basmati White Rice (Sona Masuri, IR64, Swarna), Frozen Seafood (Vannamei White Shrimp, Black Tiger Prawns, Boneless Fish Fillets), Guntur Spices, Organic Millets & Pulses."
    },
    {
      q: "Where is Vishra Global Exports located?",
      a: "Vishra Global Exports is headquartered in Eluru, Andhra Pradesh, India — the premier aquaculture and agricultural processing hub of South India, with direct transport access to Visakhapatnam (Vizag) and Krishnapatnam ports."
    },
    {
      q: "What quality certifications and compliance standards does Vishra Global Exports hold?",
      a: "All export shipments are processed under US-FDA facility registration, EU export certification, HACCP food safety standards, BAP 4-Star aquaculture practices, MPEDA registration, and APEDA standards with complete batch laboratory testing."
    },
    {
      q: "What cold-chain storage and freezing technology is used for seafood exports?",
      a: "We utilize state-of-the-art Individual Quick Freezing (IQF) at -40°C and maintain unbroken cold storage at a continuous -18°C from processing facilities in Eluru directly to ocean reefer containers."
    },
    {
      q: "How can international importers request quotations or place bulk export orders?",
      a: "International buyers can request instant trade quotes via our website Enquiry forms, email us directly at vishraglobalexports@gmail.com, or chat on WhatsApp at +91 91212 97999."
    }
  ];

  return (
    <div className="bg-[#181818] text-white font-sans">
      
      {/* 1. HERO BANNER FOR ABOUT PAGE */}
      <section className="relative py-20 border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#202020] via-[#1a1a1a] to-[#181818]">
        <div className="absolute inset-0 z-0 opacity-15">
          <img src="/hero.jpg" alt="Vishra Global Exports Ocean background" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center max-w-4xl">
          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold tracking-widest uppercase mb-6">
            <MapPin size={14} /> HEADQUARTERS: ELURU, ANDHRA PRADESH, INDIA
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
            About Vishra Global Exports — Connecting India's Hub To <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">Global Trade Ports</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Vishra Global Exports (Vishra Exports) is built upon Eluru’s rich aquaculture and agricultural heritage in Andhra Pradesh — delivering certified Vannamei Shrimp, Black Tiger, Fish Fillets, Basmati Rice, and Spices to 50+ countries worldwide.
          </p>
        </div>
      </section>

      {/* 2. MAIN STORY SECTION */}
      <section id="about-story" className="py-24 border-b border-white/10 bg-[#1e1e1e]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative shadow-2xl border border-white/10">
                <img 
                  src="/products/vannamei.jpg" 
                  alt="Vishra Global Exports Processing Plant" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                  <p className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Eluru Processing & Cold Storage Hub</p>
                  <p className="text-sm font-semibold text-white mt-0.5">Continuous -18°C Cold Chain & Ultra IQF Freezing</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 space-y-6"
            >
              <span className="text-cyan-400 font-bold text-xs tracking-widest uppercase block">OUR COMPANY FOUNDATION</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                Pioneering Excellence in Indian Agri & Seafood Exports
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Founded with a commitment to uncompromised quality, <strong className="text-white">Vishra Global Exports</strong> bridges the gap between Indian agricultural and marine producers and global import markets. Headquartered in Eluru, Andhra Pradesh, we leverage direct farm-gate sourcing, FDA-approved cold chain infrastructure, and rigorous laboratory testing.
              </p>
              
              {/* Internal Useful Navigation Links */}
              <div className="pt-2 flex flex-wrap gap-3">
                <Link href="/products">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold hover:bg-cyan-500/20 transition-all cursor-pointer">
                    Export Products Catalog <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
                <a href="#faqs" className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20 text-xs font-bold hover:bg-amber-400/20 transition-all">
                  Frequently Asked Questions <HelpCircle className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. HIGHLIGHT CARDS */}
      <section className="py-20 border-b border-white/10 bg-[#181818]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((h, i) => (
              <div key={i} className="p-8 rounded-2xl bg-[#222222] border border-white/10 hover:border-cyan-500/40 transition-all">
                <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider block mb-2">{h.location}</span>
                <h3 className="text-xl font-extrabold text-white mb-3">{h.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{h.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS (FAQS) SECTION */}
      <section id="faqs" className="py-24 border-b border-white/10 bg-[#1e1e1e]">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-amber-400 font-bold text-xs tracking-widest uppercase block mb-2 flex items-center justify-center gap-1.5">
              <HelpCircle className="w-4 h-4" /> EXPORT KNOWLEDGE BASE
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-amber-400 mx-auto mb-6"></div>
            <p className="text-slate-400 text-base">
              Everything you need to know about partnering with Vishra Global Exports.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className="rounded-2xl bg-[#242424] border border-white/10 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base md:text-lg text-white hover:text-cyan-300 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 pt-1 text-slate-300 text-sm leading-relaxed border-t border-white/5">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. GLOBAL DESTINATIONS */}
      <section className="py-24 border-b border-white/10 bg-[#181818]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-cyan-400 font-bold text-xs tracking-widest uppercase block mb-2">WORLDWIDE DISTRIBUTION</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Global Shipping Destinations</h2>
            <div className="w-20 h-1 bg-cyan-500 mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {exportDestinations.map((dest, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#222222] border border-white/10 space-y-3">
                <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 w-fit">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">{dest.region}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{dest.countries}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="py-20 bg-gradient-to-r from-cyan-950 via-[#202020] to-[#181818] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Partner With Vishra Global Exports
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Ready to secure high-grade Basmati Rice, Sona Masuri, Vannamei Shrimp, Black Tiger, or Fish Fillets for your market? Contact our export team in Eluru, Andhra Pradesh today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="h-14 px-8 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-base shadow-lg shadow-cyan-500/25">
                Explore Export Products <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline"
              className="h-14 px-8 bg-white/5 border-white/20 hover:bg-white/10 text-white font-bold text-base"
              onClick={() => window.open('https://wa.me/919121297999', '_blank')}
            >
              Contact Eluru Export Team
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
