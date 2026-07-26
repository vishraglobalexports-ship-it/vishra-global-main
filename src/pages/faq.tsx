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

export const FAQS_LIST = [
  {
    q: "1. What products does Vishra Global Exports specialize in exporting?",
    a: "Vishra Global Exports (Vishra Exports) specializes in premium export-grade Indian Basmati Rice (1121, Pusa 1509, Golden Sella), Non-Basmati White Rice (Sona Masuri, IR64, Swarna), Frozen Seafood (Vannamei White Shrimp, Black Tiger Prawns, Boneless Fish Fillets), Guntur Spices, Organic Millets & Pulses."
  },
  {
    q: "2. Where is Vishra Global Exports located in India?",
    a: "Vishra Global Exports is headquartered in Eluru, Andhra Pradesh, India — the premier aquaculture and agricultural processing hub of South India, with direct logistics access to Visakhapatnam (Vizag) and Krishnapatnam ports."
  },
  {
    q: "3. What quality certifications and compliance standards does Vishra Global Exports hold?",
    a: "All export shipments are processed under US-FDA facility registration, EU export certification, HACCP food safety standards, BAP 4-Star aquaculture practices, MPEDA registration, and APEDA standards with complete batch laboratory testing."
  },
  {
    q: "4. What cold-chain storage and freezing technology is used for seafood exports?",
    a: "We utilize state-of-the-art Individual Quick Freezing (IQF) at -40°C and maintain unbroken cold storage at a continuous -18°C from processing facilities in Eluru directly to ocean reefer containers."
  },
  {
    q: "5. How can international buyers request quotations or place bulk export orders?",
    a: "International buyers can request instant trade quotes via our website Enquiry forms, email us directly at vishraglobalexports@gmail.com, or chat on WhatsApp at +91 91212 97999."
  },
  {
    q: "6. What is the grain length and expansion ratio of 1121 Basmati Rice?",
    a: "Our 1121 Basmati Rice boasts an average grain length of 8.30 mm to 8.35 mm raw, elongating up to 2.5x upon cooking (over 20 mm). It features 95% minimum purity, 12.5% maximum moisture, and zero chalky grains."
  },
  {
    q: "7. What varieties of Non-Basmati Rice does Vishra Global Exports supply?",
    a: "We supply Sona Masuri, IR64 White Rice, Swarna, Kolam, Ponni, Parboiled Rice, Brown Rice, and specialty heritage rice like Kerala Red Matta and Karuppu Kavuni Black Rice."
  },
  {
    q: "8. What formats of Vannamei White Shrimp are available for export?",
    a: "We export Vannamei Shrimp in HOSO (Head-On Shell-On), HLSO (Headless Shell-On), Easy Peel (Back-Cut), PD (Peeled & Deveined Tail-Off), PDTO (Peeled Tail-On), Butterfly Cut, and Hand-Threaded Raw Skewers."
  },
  {
    q: "9. What count sizes are available for Black Tiger Prawns?",
    a: "Black Tiger Prawns (Penaeus Monodon) are available in jumbo count sizes: U/5, 6/8, 8/12, 13/15, and 16/20 counts per kg in block frozen or IQF packaging."
  },
  {
    q: "10. What boneless fish fillet options are available?",
    a: "We export boneless white meat skinless fillets (Tilapia 3/5oz & 5/7oz, Pangasius, Rohu steaks) and deep-sea red meat portions (Yellowfin Tuna loins, Sashimi Saku blocks, Swordfish steaks)."
  },
  {
    q: "11. What spiciness SHU levels are available for Guntur Red Chili?",
    a: "Our Guntur Red Chili (Sannam 334 & Teja S17) ranges from 35,000 to 75,000 SHU (Scoville Heat Units) with ASTA color values from 40 to 100+, available Stem-on or Stemless."
  },
  {
    q: "12. What curcumin percentage is guaranteed in Turmeric export shipments?",
    a: "Our double-polished Turmeric fingers and ground powder guarantee 3.5% to 5.0%+ active Curcumin content, fully tested for zero artificial dyes or heavy metals."
  },
  {
    q: "13. What organic millets and pulses are exported?",
    a: "We export machine-sorted Pearl Millet (Bajra), Finger Millet (Ragi), Sorghum (Jowar), Foxtail Millet, Toor Dal, Chana Dal, Urad Dal, Masoor Dal (Red Lentils), and Moong Dal."
  },
  {
    q: "14. What packaging sizes are offered for rice and seafood consignments?",
    a: "For Rice: 5kg, 10kg, 20kg, 25kg, and 50kg PP, Non-Woven, or Jute bags. For Seafood: 1kg/2kg retail printed cartons or 10kg/20kg master cartons with inner polybag liners."
  },
  {
    q: "15. Can international buyers request OEM private label branding?",
    a: "Yes, we offer complete OEM private label packaging customization including buyer logos, language translations, barcode printing, and custom bag designs for global retail distributors."
  },
  {
    q: "16. What sea ports are used for ocean freight dispatch?",
    a: "Cargo is dispatched primarily via Port Visakhapatnam (Vizag) and Krishnapatnam Port in Andhra Pradesh, offering direct shipping lines to the Middle East, Europe, Americas, and Asia."
  },
  {
    q: "17. What pre-shipment laboratory testing is conducted on seafood?",
    a: "Every seafood lot undergoes mandatory ELISA and LC-MS/MS testing for zero antibiotic residues (Chloramphenicol, Nitrofuran), heavy metals, histamine, Salmonella, and V. cholerae."
  },
  {
    q: "18. What are the container load capacities for 20ft and 40ft containers?",
    a: "Rice: 24 to 25 Metric Tons per 20ft FCL container. Frozen Seafood: 25 to 27 Metric Tons per 40ft High Cube (HC) reefer container maintained at continuous -18°C."
  },
  {
    q: "19. What INCOTERMS shipping terms are supported?",
    a: "We support FOB (Free on Board - Vizag/Krishnapatnam), CFR (Cost and Freight), and CIF (Cost, Insurance, and Freight) to any commercial port worldwide."
  },
  {
    q: "20. What payment terms are accepted for international export orders?",
    a: "We accept Irrevocable Confirmed Letter of Credit (L/C at sight from prime international banks) and Telegraphic Transfer (T/T deposit with balance against shipping B/L documents)."
  }
];

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const filteredFaqs = FAQS_LIST.filter(
    f => f.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
         f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#181818] text-white font-sans selection:bg-teal-500 selection:text-black">
      <Navbar />

      {/* HERO HEADER */}
      <section className="relative pt-32 pb-20 border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#222222] via-[#1a1a1a] to-[#181818]">
        <div className="absolute inset-0 z-0 opacity-15">
          <img src="/hero.jpg" alt="Vishra Global Exports Knowledge Hub" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center max-w-4xl">
          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-bold tracking-widest uppercase mb-6">
            <BookOpen className="w-4 h-4" /> VISHRA EXPORTS 20 FREQUENTLY ASKED QUESTIONS
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
            Indian Export <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-amber-300 bg-clip-text text-transparent">20 Trade FAQs Knowledge Hub</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8">
            Complete answers to 20 essential questions covering Indian Basmati Rice, Sona Masuri, Vannamei White Shrimp, Spices, FDA compliance, ocean reefer freight, and payment terms.
          </p>

          {/* FAQ Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 20 export FAQs (e.g. Basmati, Shrimp, Certifications, Shipping, L/C)..."
              className="w-full h-13 bg-[#242424] text-white placeholder:text-slate-500 border border-white/15 rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400/50 transition-all shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* 20 INTERACTIVE FAQS ACCORDION */}
      <section className="py-20 border-b border-white/10 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-teal-400 font-bold text-xs tracking-widest uppercase block mb-2">COMPLETE 20 TRADE QUESTIONS</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">20 Export Frequently Asked Questions</h2>
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
              <p className="text-center text-slate-400 py-8">No matching FAQs found for “{searchQuery}”. Please contact our export desk directly.</p>
            )}
          </div>
        </div>
      </section>

      {/* LINK TO ARTICLES HUB */}
      <section className="py-20 bg-gradient-to-r from-amber-950/40 via-[#202020] to-[#181818] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Want to Read In-Depth Export Articles?
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Explore 10 comprehensive trade articles detailing Indian rice varieties, seafood quality standards, and ocean freight logistics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/articles">
              <Button size="lg" className="h-14 px-8 bg-amber-400 hover:bg-amber-300 text-[#141414] font-bold text-base shadow-lg shadow-amber-400/20">
                Explore 10 Export Articles <FileText className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="h-14 px-8 bg-white/5 border-white/20 hover:bg-white/10 text-white font-bold text-base">
                View Product Catalog <ArrowRight className="ml-2 w-5 h-5 text-teal-400" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
