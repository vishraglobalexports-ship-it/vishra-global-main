import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ArrowRight, ShieldCheck, Scale, Globe2, Truck, Container } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FaWhatsapp } from 'react-icons/fa';

const productOptions = [
  { id: 'shrimp', name: 'Vannamei Shrimp', category: 'Seafood', density: 1.1, unit: 'MT', minOrder: 5 },
  { id: 'tiger', name: 'Black Tiger Shrimp', category: 'Seafood', density: 1.15, unit: 'MT', minOrder: 5 },
  { id: 'rohu', name: 'Rohu / Catla Fish', category: 'Seafood', density: 1.05, unit: 'MT', minOrder: 10 },
  { id: 'squid', name: 'Cleaned Squid Rings', category: 'Seafood', density: 1.0, unit: 'MT', minOrder: 5 },
  { id: 'rice', name: 'Sona Masoori Rice', category: 'Agricultural', density: 1.2, unit: 'MT', minOrder: 12 },
  { id: 'spices', name: 'Guntur Red Chili & Spices', category: 'Agricultural', density: 0.9, unit: 'MT', minOrder: 3 },
  { id: 'millets', name: 'Organic Millets (Ragi/Bajra)', category: 'Agricultural', density: 1.1, unit: 'MT', minOrder: 8 },
];

const containerTypes = [
  { id: '20ft', name: '20ft Reefer Container', capacity: 14 },
  { id: '40ft', name: '40ft High Cube Reefer', capacity: 27 },
];

export function TradeCalculator() {
  const [selectedProduct, setSelectedProduct] = useState(productOptions[0]);
  const [quantity, setQuantity] = useState(15);
  const [container, setContainer] = useState(containerTypes[1]);
  const [destination, setDestination] = useState('USA / North America');

  const containersNeeded = Math.ceil(quantity / container.capacity);
  const totalVolumeEst = (quantity * 1.35).toFixed(1);

  const handleSendCalculation = () => {
    const text = `Hello VISHRA GLOBAL EXPORTS,\n\nI calculated an estimated trade volume on your site:\n- Product: ${selectedProduct.name} (${selectedProduct.category})\n- Volume: ${quantity} MT\n- Packaging: ${container.name} (${containersNeeded} Container/s)\n- Destination Region: ${destination}\n\nPlease share current CIF/FOB pricing and shipment timelines.`;
    window.open(`https://wa.me/919121297999?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="py-24 bg-[#181818] text-white border-t border-white/10 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-bold tracking-widest uppercase mb-3">
            <Calculator size={14} /> INTERACTIVE BUYER TOOL
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Export Shipment & Container Estimator</h2>
          <div className="w-20 h-1 bg-teal-500 mx-auto mb-6"></div>
          <p className="text-slate-300 text-base md:text-lg">
            Plan your sea freight cargo, compute container capacity, and request instant export quotations directly from Eluru.
          </p>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form (Left - 7 cols) */}
          <div className="lg:col-span-7 bg-[#222222] p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
            
            {/* Step 1: Product Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-teal-400 mb-3">
                1. Select Export Commodity
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {productOptions.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => setSelectedProduct(prod)}
                    className={`p-3 rounded-xl text-left border transition-all text-xs font-bold flex flex-col justify-between ${
                      selectedProduct.id === prod.id
                        ? 'bg-teal-500 text-[#141414] border-teal-400 shadow-lg shadow-teal-500/20'
                        : 'bg-[#1b1b1b] text-slate-300 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <span>{prod.name}</span>
                    <span className={`text-[10px] uppercase tracking-wider opacity-80 mt-1 ${selectedProduct.id === prod.id ? 'text-[#141414]' : 'text-slate-400'}`}>
                      {prod.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Quantity Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-widest text-teal-400">
                  2. Order Quantity ({selectedProduct.unit})
                </label>
                <span className="text-lg font-extrabold text-white bg-teal-500/10 px-3 py-1 rounded-lg border border-teal-500/20">
                  {quantity} {selectedProduct.unit}
                </span>
              </div>
              <input 
                type="range" 
                min={selectedProduct.minOrder} 
                max="100" 
                step="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full h-2.5 bg-[#141414] rounded-lg appearance-none cursor-pointer accent-teal-400"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-semibold">
                <span>Min Order: {selectedProduct.minOrder} MT</span>
                <span>50 MT</span>
                <span>100 MT</span>
              </div>
            </div>

            {/* Step 3: Container Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-teal-400 mb-3">
                3. Preferred Cold-Chain Container
              </label>
              <div className="grid grid-cols-2 gap-3">
                {containerTypes.map((cont) => (
                  <button
                    key={cont.id}
                    onClick={() => setContainer(cont)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      container.id === cont.id
                        ? 'bg-teal-500/15 border-teal-400 text-white shadow-md'
                        : 'bg-[#1b1b1b] border-white/10 text-slate-400 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-sm text-white mb-1">
                      <Container className="w-4 h-4 text-teal-400" />
                      {cont.name}
                    </div>
                    <p className="text-xs text-slate-400">Max payload ~{cont.capacity} MT</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Destination */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-teal-400 mb-2">
                4. Destination Port Region
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-[#1b1b1b] text-white border border-white/15 rounded-xl p-3 text-sm focus:outline-none focus:border-teal-400"
              >
                <option value="USA / North America">USA / Canada (East & West Coast)</option>
                <option value="European Union / UK">European Union / UK (Rotterdam / Hamburg)</option>
                <option value="Middle East / GCC">Middle East / GCC (Jebel Ali / Dammam)</option>
                <option value="South East Asia">South East Asia (Singapore / Port Klang)</option>
                <option value="East Asia / Japan">East Asia (Japan / Korea / China)</option>
              </select>
            </div>

          </div>

          {/* Realtime Output Card (Right - 5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#222222] to-[#1a1a1a] p-8 rounded-3xl border border-teal-500/30 shadow-2xl flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <Scale className="text-teal-400 w-5 h-5" /> Cargo Summary
                </h3>
                <span className="text-[10px] font-extrabold bg-teal-500/20 text-teal-300 px-2.5 py-1 rounded-full uppercase border border-teal-500/30">
                  REAL-TIME ESTIMATE
                </span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-sm py-2 border-b border-white/5">
                  <span className="text-slate-400">Selected Item</span>
                  <span className="font-bold text-white">{selectedProduct.name}</span>
                </div>

                <div className="flex justify-between items-center text-sm py-2 border-b border-white/5">
                  <span className="text-slate-400">Order Quantity</span>
                  <span className="font-bold text-teal-300">{quantity} Metric Tons</span>
                </div>

                <div className="flex justify-between items-center text-sm py-2 border-b border-white/5">
                  <span className="text-slate-400">Packaging Type</span>
                  <span className="font-bold text-white">{container.name}</span>
                </div>

                <div className="flex justify-between items-center text-sm py-2 border-b border-white/5">
                  <span className="text-slate-400">Required Containers</span>
                  <span className="font-extrabold text-teal-400 text-base">{containersNeeded} Container(s)</span>
                </div>

                <div className="flex justify-between items-center text-sm py-2 border-b border-white/5">
                  <span className="text-slate-400">Est. CBM Volume</span>
                  <span className="font-bold text-white">~{totalVolumeEst} m³</span>
                </div>

                <div className="flex justify-between items-center text-sm py-2">
                  <span className="text-slate-400">Origin Port Corridor</span>
                  <span className="font-bold text-white">Vizag / Krishnapatnam</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/20 mb-6 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300 leading-relaxed">
                  All shipments packed in temperature-controlled reefer containers with 100% lab certification & origin batch tracking.
                </p>
              </div>
            </div>

            <Button
              onClick={handleSendCalculation}
              className="w-full h-14 bg-teal-500 hover:bg-teal-400 text-[#141414] font-extrabold text-base rounded-2xl shadow-xl shadow-teal-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <FaWhatsapp className="mr-2.5 w-5 h-5 text-emerald-950" />
              Request Instant Quote for {quantity} MT
            </Button>
          </div>

        </div>

      </div>
    </section>
  );
}
