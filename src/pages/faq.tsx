import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, ChevronDown, BookOpen, Search, ArrowRight, ShieldCheck, 
  FileText, Globe, CheckCircle2, MapPin, Truck, Mail, Phone, ExternalLink 
} from 'lucide-react';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeArticleTab, setActiveArticleTab] = useState<'rice' | 'seafood' | 'compliance'>('rice');

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
    },
    {
      q: "What is the grain length and purity standard for 1121 Basmati Rice?",
      a: "Our 1121 Basmati Rice boasts an average grain length of 8.30 mm to 8.35 mm raw, elongating up to 2.5x upon cooking (over 20 mm). It features 95% minimum purity, 12.5% maximum moisture, and zero chalky grains."
    },
    {
      q: "What formats of Vannamei Shrimp are available for international export?",
      a: "We export Vannamei Shrimp in HOSO (Head-On Shell-On), HLSO (Headless Shell-On), Easy Peel (Back-Cut), PD (Peeled & Deveined Tail-Off), PDTO (Peeled Tail-On), Butterfly Cut, and Hand-Threaded Raw Skewers."
    },
    {
      q: "What packaging options are provided for ocean freight shipments?",
      a: "For Rice: 5kg, 10kg, 20kg, 25kg, and 50kg PP/Non-Woven/Jute bags with custom private label branding. For Seafood: 1kg / 2kg retail cartons, 10kg / 20kg master cartons with inner polybag liners, block frozen or IQF."
    }
  ];

  const filteredFaqs = faqs.filter(
    f => f.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
         f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#181818] text-white font-sans selection:bg-teal-500 selection:text-black">
      <Navbar />

      {/* 1. HERO HEADER */}
      <section className="relative pt-32 pb-20 border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#222222] via-[#1a1a1a] to-[#181818]">
        <div className="absolute inset-0 z-0 opacity-15">
          <img src="/hero.jpg" alt="Vishra Global Exports Knowledge Hub" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-bold tracking-widest uppercase mb-6">
            <BookOpen className="w-4 h-4" /> VISHRA EXPORTS KNOWLEDGE & FAQ HUB
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
            Indian Export Guide & <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-amber-300 bg-clip-text text-transparent">Frequently Asked Questions</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8">
            Comprehensive trade documentation, quality compliance standards, and export guide articles for international importers of Indian Basmati Rice, Sona Masuri, Vannamei Shrimp, and Spices.
          </p>

          {/* FAQ Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search export questions (e.g. Basmati, Shrimp, Certifications, Shipping)..."
              className="w-full h-13 bg-[#242424] text-white placeholder:text-slate-500 border border-white/15 rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400/50 transition-all shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE FAQS ACCORDION */}
      <section className="py-20 border-b border-white/10 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-teal-400 font-bold text-xs tracking-widest uppercase block mb-2">QUICK HELP & ANSWERS</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Frequently Asked Trade Questions</h2>
          </div>

          <div className="space-y-4">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl bg-[#222222] border border-white/10 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base md:text-lg text-white hover:text-teal-300 transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-teal-400 shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-teal-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 pt-1 text-slate-300 text-sm md:text-base leading-relaxed border-t border-white/5">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            
            {filteredFaqs.length === 0 && (
              <p className="text-center text-slate-400 py-8">No matching FAQs found for “{searchQuery}”. Please contact our export team directly.</p>
            )}
          </div>
        </div>
      </section>

      {/* 3. EXPORT ARTICLES & GUIDES FOR SEO */}
      <section className="py-24 border-b border-white/10 bg-[#181818]">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-bold text-xs tracking-widest uppercase block mb-2 flex items-center justify-center gap-1.5">
              <FileText className="w-4 h-4" /> KNOWLEDGE ARTICLES & GUIDES
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Indian Export Industry Articles</h2>
            <div className="w-20 h-1 bg-amber-400 mx-auto mb-6"></div>
            <p className="text-slate-400 text-base">
              Detailed technical insights on Indian rice varieties, seafood processing, and international trade compliance.
            </p>

            {/* Article Tabs */}
            <div className="flex justify-center gap-3 mt-8 flex-wrap">
              <Button
                onClick={() => setActiveArticleTab('rice')}
                variant={activeArticleTab === 'rice' ? 'default' : 'outline'}
                className={activeArticleTab === 'rice' ? 'bg-amber-400 text-[#141414] font-bold' : 'border-white/15 text-slate-300'}
              >
                Rice Export Guide
              </Button>
              <Button
                onClick={() => setActiveArticleTab('seafood')}
                variant={activeArticleTab === 'seafood' ? 'default' : 'outline'}
                className={activeArticleTab === 'seafood' ? 'bg-teal-500 text-[#141414] font-bold' : 'border-white/15 text-slate-300'}
              >
                Seafood Quality Guide
              </Button>
              <Button
                onClick={() => setActiveArticleTab('compliance')}
                variant={activeArticleTab === 'compliance' ? 'default' : 'outline'}
                className={activeArticleTab === 'compliance' ? 'bg-cyan-500 text-white font-bold' : 'border-white/15 text-slate-300'}
              >
                Trade Compliance & Shipping
              </Button>
            </div>
          </div>

          {/* ARTICLE CONTENT BOX */}
          <div className="bg-[#202020] rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
            {activeArticleTab === 'rice' && (
              <motion.article 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-xs text-amber-400 font-bold uppercase tracking-wider">
                  <span>Agri Export Insights</span> • <span>Published by Vishra Global Exports</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
                  Comprehensive Guide to Importing Premium Indian Basmati & Sona Masuri Rice
                </h3>
                <p className="text-slate-300 text-base leading-relaxed">
                  India is the global leader in aromatic Basmati and Non-Basmati rice production, supplying over 40% of the world’s rice trade. At <strong className="text-white">Vishra Global Exports (Vishra Exports)</strong>, we manage the complete supply chain from milled grain selection to container dispatch.
                </p>

                <div className="space-y-4 pt-2">
                  <h4 className="text-lg font-bold text-amber-300">1. 1121 Extra Long Grain Basmati Rice</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    1121 Basmati is world-renowned for its unmatched 8.35mm raw grain length and exceptional elongation upon cooking. Available in White Raw, Steam, Golden Sella, and Creamy Sella finishes. Golden Sella parboiled rice undergoes specialized steam treatment that locks in nutrients and prevents grain breakage during commercial catering.
                  </p>

                  <h4 className="text-lg font-bold text-amber-300">2. South Indian Sona Masuri & Short Grain Rice</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Sona Masuri is a lightweight, aromatic medium-grain rice cultivated extensively in Andhra Pradesh. Polished to double silky standards with 100% Sortex clean technology, Sona Masuri is prized across the Middle East, USA, and Malaysia for its low starch and easy digestibility.
                  </p>

                  <h4 className="text-lg font-bold text-amber-300">3. Quality Certification & Container Loading</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Every export consignment undergoes APEDA certification, moisture control checks (under 12.5%), and phytosanitary inspections before loading into moisture-sealed 20ft containers (holding 24–25 Metric Tons).
                  </p>
                </div>
              </motion.article>
            )}

            {activeArticleTab === 'seafood' && (
              <motion.article 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-xs text-teal-400 font-bold uppercase tracking-wider">
                  <span>Marine Export Insights</span> • <span>Published by Vishra Global Exports</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
                  Sea Export Standards: Vannamei White Shrimp & Boneless Fish Fillets
                </h3>
                <p className="text-slate-300 text-base leading-relaxed">
                  Headquartered in <strong className="text-white">Eluru, Andhra Pradesh</strong> — the aquaculture capital of India — Vishra Global Exports delivers premium farm-raised Vannamei white shrimp, wild Black Tiger prawns, and boneless fish fillets (Tilapia, Pangasius, Rohu, Yellowfin Tuna) to international importers.
                </p>

                <div className="space-y-4 pt-2">
                  <h4 className="text-lg font-bold text-teal-300">1. Vannamei Shrimp Processing & Formats</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Harvested from BAP-certified farms in West Godavari, shrimp is rapidly iced and processed within hours. Product forms include Head-On Shell-On (HOSO), Headless (HLSO), Easy Peel, Peeled & Deveined (PD), Peeled Tail-On (PDTO), Butterfly cut, and skewers.
                  </p>

                  <h4 className="text-lg font-bold text-teal-300">2. Individual Quick Freezing (IQF) & Cold Storage</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Utilizing blast freezing at -40°C, individual shrimp and fillets are frozen instantly to lock in natural texture, moisture, and sweet ocean flavor. Products are stored in unbroken cold chains at -18°C.
                  </p>

                  <h4 className="text-lg font-bold text-teal-300">3. US-FDA & EU HACCP Compliance</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Each batch undergoes rigorous ELISA and LC-MS/MS testing for zero antibiotic residues (Chloramphenicol, Nitrofuran), heavy metals, and micro-pathogens to comply with US-FDA and EU food safety standards.
                  </p>
                </div>
              </motion.article>
            )}

            {activeArticleTab === 'compliance' && (
              <motion.article 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-xs text-cyan-400 font-bold uppercase tracking-wider">
                  <span>Logistics & Compliance</span> • <span>Published by Vishra Global Exports</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
                  International Trade Logistics & Shipping from Port Visakhapatnam & Krishnapatnam
                </h3>
                <p className="text-slate-300 text-base leading-relaxed">
                  Exporting from Eluru, Andhra Pradesh provides strategic proximity to India's major eastern sea trade hubs: <strong className="text-white">Visakhapatnam (Vizag) Port</strong> and <strong className="text-white">Krishnapatnam Port</strong>.
                </p>

                <div className="space-y-4 pt-2">
                  <h4 className="text-lg font-bold text-cyan-300">1. Reefer Container Logistics</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Frozen seafood shipments are packed into 40ft High Cube (HC) reefer containers equipped with real-time temperature data loggers set to continuous -18°C.
                  </p>

                  <h4 className="text-lg font-bold text-cyan-300">2. Complete Export Documentation Package</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Vishra Global Exports provides full documentation for international customs clearance: Commercial Invoice, Packing List, Clean Shipped-on-Board Bill of Lading (B/L), Certificate of Origin, Health Certificate (MPEDA/EIC), Phytosanitary Certificate (APEDA), and Inspection Test Reports.
                  </p>
                </div>
              </motion.article>
            )}
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION BANNER */}
      <section className="py-20 bg-gradient-to-r from-teal-950 via-[#202020] to-[#181818] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Have Questions About Bulk Export Consignments?
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Contact our export specialists in Eluru, Andhra Pradesh for product specifications, pricing quotes, and sample requests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="h-14 px-8 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-bold text-base shadow-lg shadow-teal-500/25">
                View Product Catalog <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline"
              className="h-14 px-8 bg-white/5 border-white/20 hover:bg-white/10 text-white font-bold text-base"
              onClick={() => window.open('https://wa.me/919121297999', '_blank')}
            >
              Chat on WhatsApp (+91 91212 97999)
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
