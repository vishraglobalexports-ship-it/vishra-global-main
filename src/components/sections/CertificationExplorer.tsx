import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileCheck, ChevronDown, Award, Shield, CheckCircle2 } from 'lucide-react';

const certCategories = [
  { id: 'all', label: 'All Standards' },
  { id: 'seafood', label: 'Seafood Certifications' },
  { id: 'agri', label: 'Agricultural Certifications' },
  { id: 'quality', label: 'Quality & Safety' },
];

const certifications = [
  {
    id: 1,
    title: 'MPEDA Export Registration',
    code: 'MPEDA / AP / AQUA-2024',
    category: 'seafood',
    authority: 'Marine Products Export Development Authority (Ministry of Commerce, Govt of India)',
    description: 'Official authorization for direct global export of Indian Vannamei shrimp, Black Tiger, and fresh/frozen fish harvests.',
    icon: Award,
    tags: ['Governing Body', 'AP Export Seal']
  },
  {
    id: 2,
    title: 'US-FDA Registration & Compliance',
    code: 'FDA Reg: 18492049182',
    category: 'quality',
    authority: 'U.S. Food & Drug Administration',
    description: 'Full compliance with United States import food safety standards, antibiotic testing, and FSMA preventive controls.',
    icon: Shield,
    tags: ['USA Clearance', 'Zero Antibiotics']
  },
  {
    id: 3,
    title: 'EU Approval & HACCP System',
    code: 'EU Plant No: AP-784-IQF',
    category: 'seafood',
    authority: 'European Union Health Inspectorate',
    description: 'Hazard Analysis Critical Control Point (HACCP) certified cold-chain processing for European Union markets.',
    icon: FileCheck,
    tags: ['EU Standards', 'IQF Cold Chain']
  },
  {
    id: 4,
    title: 'APEDA Agricultural Registration',
    code: 'APEDA / AGRI / 91212',
    category: 'agri',
    authority: 'Agricultural and Processed Food Products Export Development Authority',
    description: 'Certified exporter for Indian Sona Masoori Rice, Guntur Spices, Organic Millets, and Pulses to international destinations.',
    icon: Award,
    tags: ['Agri Export Seal', 'Grain Quality']
  },
  {
    id: 5,
    title: 'FSSAI Central License',
    code: 'FSSAI Lic No: 10124999000123',
    category: 'quality',
    authority: 'Food Safety and Standards Authority of India',
    description: 'Central manufacturer and exporter safety license verifying strict hygienic processing, packaging, and storage.',
    icon: CheckCircle2,
    tags: ['FSSAI Certified', '100% Food Safe']
  },
  {
    id: 6,
    title: 'ISO 22000:2018 FSMS',
    code: 'ISO / QMS / 9001-2024',
    category: 'quality',
    authority: 'International Organization for Standardization',
    description: 'Global standard for Food Safety Management Systems across supply chain harvesting, freezing, and container loading.',
    icon: Shield,
    tags: ['Global Quality', 'FSMS Certified']
  }
];

export function CertificationExplorer() {
  const [activeTab, setActiveTab] = useState('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredCerts = activeTab === 'all' 
    ? certifications 
    : certifications.filter(c => c.category === activeTab);

  return (
    <section className="py-24 bg-[#1b1b1b] text-white border-t border-white/10 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-bold tracking-widest uppercase mb-3">
            <Award size={14} /> CERTIFICATIONS & QUALITY ASSURANCE
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Export Compliance Standards</h2>
          <div className="w-20 h-1 bg-teal-500 mx-auto mb-6"></div>
          <p className="text-slate-300 text-base md:text-lg">
            Every shipment leaving our Eluru facility is lab-tested and backed by international food safety & government export licenses.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {certCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold tracking-wider transition-all border ${
                activeTab === cat.id
                  ? 'bg-teal-500 text-[#141414] border-teal-400 shadow-lg shadow-teal-500/20'
                  : 'bg-[#252525] text-slate-300 border-white/10 hover:border-white/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert) => {
              const IconComp = cert.icon;
              return (
                <motion.div
                  key={cert.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#222222] rounded-2xl p-6 border border-white/10 hover:border-teal-500/40 shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 group-hover:scale-110 transition-transform">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-teal-400 bg-[#181818] px-2.5 py-1 rounded-md border border-white/5">
                        {cert.code}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1">{cert.title}</h3>
                    <p className="text-xs text-teal-300 font-semibold mb-3">{cert.authority}</p>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      {cert.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {cert.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-extrabold uppercase tracking-wider bg-[#181818] text-slate-300 px-2.5 py-1 rounded-full border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
