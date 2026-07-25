import { motion } from 'framer-motion';
import { MapPin, Award, ShieldCheck, Anchor, Waves, CheckCircle2, Factory, Thermometer, Globe, ArrowRight, Truck, Microscope, Award as Certificate } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export function About() {
  const highlights = [
    {
      title: "Eluru Seafood Hub",
      location: "Eluru, Andhra Pradesh",
      description: "Headquartered in Eluru, the aquaculture capital of Andhra Pradesh, surrounded by Kolleru region freshwater aquaculture farms and coastal Bay of Bengal marine fisheries."
    },
    {
      title: "Andhra Pradesh Supremacy",
      location: "India's #1 Seafood State",
      description: "Andhra Pradesh contributes over 65% of India's total cultivated shrimp exports. Eluru serves as a pivotal processing hub with direct access to Visakhapatnam & Krishnapatnam ports."
    },
    {
      title: "Indian Export Heritage",
      location: "Global Footprint",
      description: "Leveraging India's world-renowned marine export ecosystem, supplying premium grade Vannamei, Black Tiger, Rohu, and Catla to North America, Europe, Middle East, and East Asia."
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

  return (
    <div className="bg-[#181818] text-white">
      
      {/* 1. HERO BANNER FOR ABOUT PAGE */}
      <section className="relative py-20 border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#202020] via-[#1a1a1a] to-[#181818]">
        <div className="absolute inset-0 z-0 opacity-15">
          <img src="/hero.jpg" alt="Ocean background" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center max-w-4xl">
          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold tracking-widest uppercase mb-6">
            <MapPin size={14} /> HEADQUARTERS: ELURU, ANDHRA PRADESH, INDIA
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
            Connecting India's Premier Seafood Hub To <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">Global Trade Ports</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            VISHRA GLOBAL EXPORTS is built upon Eluru’s rich aquaculture heritage in Andhra Pradesh — delivering certified Vannamei Shrimp, Black Tiger, Rohu, and Catla fish to international markets worldwide.
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
                  alt="Eluru Andhra Pradesh Aquaculture" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">Processing & Sourcing Hub</span>
                  <h4 className="text-xl font-bold">Eluru, West Godavari Belt, Andhra Pradesh</h4>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-cyan-500/15 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -top-6 -left-6 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 space-y-5"
            >
              <span className="text-cyan-400 font-bold text-xs tracking-widest uppercase">REGIONAL DOMINANCE</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-snug">
                Strategic Sourcing from India’s Seafood Capital in Eluru, Andhra Pradesh
              </h2>
              
              <p className="text-slate-300 text-base leading-relaxed">
                <strong>VISHRA GLOBAL EXPORTS</strong> operates directly out of <strong>Eluru, Andhra Pradesh</strong>, situated in the fertile river delta region between the Godavari and Krishna rivers. Eluru is globally celebrated as the heartland of Indian commercial aquaculture, producing world-class <em>Vannamei Shrimp</em>, <em>Black Tiger Shrimp</em>, <em>Rohu</em>, and <em>Catla fish</em>.
              </p>

              <p className="text-slate-300 text-base leading-relaxed">
                With <strong>Andhra Pradesh contributing over 65% of India's total cultivated marine & freshwater exports</strong>, our strategic presence in Eluru gives us direct access to thousands of certified aqua farms, state-of-the-art IQF processing units, and direct seaport corridors via <strong>Visakhapatnam (Vizag) Port</strong> and <strong>Krishnapatnam Port</strong>.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span>US-FDA, EU & HACCP Compliant Processing Facilities in AP</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span>Direct seaport shipping from Vizag & Krishnapatnam Ports to 50+ countries</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span>100% Antibiotic-Free & Zero-Residue Lab Tested Batches</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. THREE REGIONAL PILLARS */}
      <section className="py-24 border-b border-white/10 bg-[#181818]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Our Geographic Advantage</h2>
            <div className="w-20 h-1 bg-cyan-500 mx-auto mb-6"></div>
            <p className="text-slate-400 text-base">
              Why Eluru, Andhra Pradesh serves as the premier origin for global seafood buyers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#222222] p-8 rounded-2xl border border-white/10 shadow-xl hover:border-cyan-500/40 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="p-3.5 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit mb-6 group-hover:scale-110 transition-transform">
                  {index === 0 ? <MapPin className="w-6 h-6" /> : index === 1 ? <Waves className="w-6 h-6" /> : <Anchor className="w-6 h-6" />}
                </div>
                <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase block mb-1">{item.location}</span>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Key Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 rounded-2xl bg-[#202020] text-white shadow-2xl border border-white/10">
            {keyStats.map((stat, idx) => (
              <div key={idx} className="text-center p-4">
                <div className="text-3xl lg:text-5xl font-black text-cyan-400 mb-1">{stat.value}</div>
                <div className="text-sm font-bold text-white mb-1">{stat.label}</div>
                <div className="text-xs text-slate-400">{stat.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROCESSING & QUALITY ASSURANCE WORKFLOW */}
      <section className="py-24 border-b border-white/10 bg-[#1e1e1e]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-cyan-400 font-bold text-xs tracking-widest uppercase block mb-2">END-TO-END QUALITY CONTROL</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Export Processing & Quality Standard</h2>
            <div className="w-20 h-1 bg-cyan-500 mx-auto mb-6"></div>
            <p className="text-slate-400 text-base">
              Every shipment leaving our Eluru facility undergoes strict multi-stage inspection to guarantee international compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {processingSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-[#242424] p-6 rounded-2xl border border-white/10 relative flex flex-col justify-between hover:border-cyan-500/40 transition-colors"
              >
                <div>
                  <div className="text-3xl font-black text-cyan-400/40 mb-3">{step.step}</div>
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GLOBAL CERTIFICATIONS GRID */}
      <section className="py-24 border-b border-white/10 bg-[#181818]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-cyan-400 font-bold text-xs tracking-widest uppercase block mb-2">INTERNATIONAL COMPLIANCE</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Accredited Export Certifications</h2>
            <div className="w-20 h-1 bg-cyan-500 mx-auto mb-6"></div>
            <p className="text-slate-400 text-base">
              Our products meet the regulatory guidelines of major global importing authorities.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {certifications.map((cert, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-[#222222] border border-white/10 text-center flex flex-col items-center justify-center hover:bg-white/5 transition-colors">
                <Certificate className="w-8 h-8 text-cyan-400 mb-3" />
                <h4 className="font-bold text-xs text-white leading-tight mb-1">{cert.name}</h4>
                <p className="text-[10px] text-slate-400">{cert.code}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. GLOBAL TRADE DESTINATIONS */}
      <section className="py-24 border-b border-white/10 bg-[#1e1e1e]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-cyan-400 font-bold text-xs tracking-widest uppercase block mb-2">WORLDWIDE DISTRIBUTION</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Global Shipping Destinations</h2>
            <div className="w-20 h-1 bg-cyan-500 mx-auto mb-6"></div>
            <p className="text-slate-400 text-base">
              Connecting Eluru, Andhra Pradesh to key sea trade routes across continents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {exportDestinations.map((dest, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#242424] border border-white/10 space-y-3">
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

      {/* 7. CALL TO ACTION BANNER */}
      <section className="py-20 bg-gradient-to-r from-cyan-950 via-[#202020] to-[#181818] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Partner With India's Trusted Seafood Exporter
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Ready to secure high-grade Vannamei Shrimp, Black Tiger, Rohu, or Catla for your market? Contact our export team in Eluru, Andhra Pradesh today.
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
              onClick={() => window.open('https://wa.me/917382130706', '_blank')}
            >
              Contact Eluru Export Team
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
