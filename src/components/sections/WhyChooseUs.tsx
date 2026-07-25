import { motion } from 'framer-motion';
import { ShieldCheck, Anchor, Globe, CheckCircle2 } from 'lucide-react';

const reasons = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-cyan-400" />,
    title: 'Export Certified',
    description: 'Fully compliant with international seafood export standards. US-FDA, HACCP, and EU approved facilities.'
  },
  {
    icon: <Anchor className="w-10 h-10 text-cyan-400" />,
    title: 'Cold-Chain Logistics',
    description: 'State-of-the-art temperature controlled logistics ensuring zero degradation from Eluru processing hubs to destination ports.'
  },
  {
    icon: <Globe className="w-10 h-10 text-cyan-400" />,
    title: 'Global Shipping Corridor',
    description: 'Established shipping corridors via Visakhapatnam and Krishnapatnam ports to the Middle East, Europe, North America, and Asia.'
  },
  {
    icon: <CheckCircle2 className="w-10 h-10 text-cyan-400" />,
    title: 'Quality Assured',
    description: 'Every batch undergoes rigorous lab testing for microbiology, antibiotic-free compliance, and trace monitoring before dispatch.'
  }
];

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-24 bg-[#202020] text-white border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-cyan-400 font-bold text-xs tracking-widest uppercase block mb-2">WHY CHOOSE VISHRA</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Why Partner With Us?</h2>
            <div className="w-20 h-1 bg-cyan-500 mb-8"></div>
            <p className="text-slate-300 text-lg mb-6 leading-relaxed">
              In the global seafood trade, trust is built on consistency. At <strong>VISHRA GLOBAL EXPORTS</strong>, based in <strong>Eluru, Andhra Pradesh</strong>, we don't just ship marine products — we deliver guaranteed international quality.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed">
              Our robust infrastructure and stringent quality control mean that when your container arrives, it perfectly matches your grade, size, and packaging specifications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#282828] border border-white/10 p-6 rounded-2xl hover:border-cyan-500/40 transition-colors"
              >
                <div className="mb-4">{reason.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{reason.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
