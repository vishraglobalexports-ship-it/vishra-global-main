import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FaWhatsapp } from 'react-icons/fa';
import { ShoppingBag, Check, Mail, Fish, Wheat, ExternalLink, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useProducts, type Product } from '@/context/ProductsContext';
import { useState } from 'react';

export function Products() {
  const { addToCart, cart } = useCart();
  const { getSeafoodProducts, getAgriProducts } = useProducts();
  const [addedMap, setAddedMap] = useState<Record<number, boolean>>({});
  
  // Modal state
  const [emailModalProduct, setEmailModalProduct] = useState<Product | null>(null);

  const handleAddToCart = (product: { id: number; name: string; image: string }) => {
    addToCart({ id: product.id, name: product.name, image: product.image }, 1);
    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  const handleEnquire = (productName: string) => {
    const text = `Hello, I'm interested in ${productName} from VISHRA GLOBAL EXPORTS.`;
    window.open(`https://wa.me/919121297999?text=${encodeURIComponent(text)}`, '_blank');
  };

  const openGmailWeb = (productName: string) => {
    const subject = encodeURIComponent(`Product Enquiry - ${productName}`);
    const body = encodeURIComponent(`Hello VISHRA GLOBAL EXPORTS,\n\nI am interested in ordering/inquiring about ${productName}.\nPlease share availability, pricing, and grade specifications.\n\nThank you!`);
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=vishraglobalexports@gmail.com&su=${subject}&body=${body}`, '_blank');
    setEmailModalProduct(null);
  };

  const openDefaultMailApp = (productName: string) => {
    const subject = encodeURIComponent(`Product Enquiry - ${productName}`);
    const body = encodeURIComponent(`Hello VISHRA GLOBAL EXPORTS,\n\nI am interested in ordering/inquiring about ${productName}.\nPlease share availability, pricing, and grade specifications.\n\nThank you!`);
    window.location.href = `mailto:vishraglobalexports@gmail.com?subject=${subject}&body=${body}`;
    setEmailModalProduct(null);
  };

  const renderProductGrid = (productList: Product[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {productList.map((product, index) => {
        const inCart = cart.some((i) => i.id === product.id);
        const isAddedJustNow = addedMap[product.id];

        return (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="bg-[#282828] rounded-2xl overflow-hidden border border-white/10 shadow-xl hover:border-teal-400/50 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#202020] via-transparent to-transparent opacity-60" />
                <div className="absolute top-3 left-3 bg-[#181818]/60 backdrop-blur-md p-1.5 rounded-lg border border-white/10 shadow-md">
                  <img 
                    src="/logo.png" 
                    alt="Vishra Watermark" 
                    className="h-6 w-auto object-contain brightness-0 invert opacity-90" 
                  />
                </div>
                {inCart && (
                  <span className="absolute top-3 right-3 bg-teal-400 text-[#141414] font-black text-xs px-3 py-1 rounded-full shadow-md">
                    In Cart
                  </span>
                )}
              </div>
              <div className="p-6 pb-2">
                <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-slate-400 mb-4 line-clamp-2 h-12 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 space-y-2">
              <Button 
                onClick={() => handleAddToCart(product)}
                disabled={inCart}
                className={`w-full font-bold h-11 transition-all ${
                  inCart
                    ? 'bg-slate-700 text-slate-300 border border-white/10 cursor-not-allowed'
                    : isAddedJustNow
                    ? 'bg-emerald-600 hover:bg-emerald-600 text-white'
                    : 'bg-teal-500 hover:bg-teal-400 text-[#141414] shadow-md shadow-teal-500/20'
                }`}
              >
                {inCart ? (
                  <>
                    <Check className="mr-2 w-4 h-4 text-teal-400" /> Added to Cart
                  </>
                ) : isAddedJustNow ? (
                  <>
                    <Check className="mr-2 w-4 h-4" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="mr-2 w-4 h-4" /> Add to Cart
                  </>
                )}
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button 
                  onClick={() => handleEnquire(product.name)}
                  variant="outline"
                  className="w-full text-slate-200 border-white/20 hover:bg-white/10 h-9 text-[11px] font-semibold px-2"
                >
                  <FaWhatsapp className="mr-1.5 w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  WhatsApp
                </Button>

                <Button 
                  onClick={() => setEmailModalProduct(product)}
                  variant="outline"
                  className="w-full text-slate-200 border-white/20 hover:bg-white/10 h-9 text-[11px] font-semibold px-2"
                >
                  <Mail className="mr-1.5 w-3.5 h-3.5 text-teal-400 shrink-0" />
                  Email
                </Button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  // Tab state: 'seafood' or 'agri'
  const [activeTab, setActiveTab] = useState<'seafood' | 'agri'>('seafood');

  return (
    <section id="products" className="py-24 bg-[#202020] text-white relative">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Main Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-teal-400 font-bold text-xs tracking-widest uppercase block mb-2">EXPORT READY PRODUCT RANGE</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Our Export Offerings</h2>
          <div className="w-20 h-1 bg-teal-500 mx-auto mb-6"></div>
          <p className="text-slate-300 text-lg mb-8">
            Direct export sourcing from Andhra Pradesh. Select a division below to explore our offerings.
          </p>

          {/* TWO DIVISION BUTTON TOGGLES */}
          <div className="inline-flex p-1.5 rounded-2xl bg-[#181818] border border-white/10 shadow-2xl gap-2 max-w-full">
            <button
              onClick={() => setActiveTab('seafood')}
              className={`flex items-center gap-2 px-3.5 sm:px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeTab === 'seafood'
                  ? 'bg-teal-500 text-[#141414] shadow-lg shadow-teal-500/25 scale-[1.02]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Fish className={`w-5 h-5 shrink-0 ${activeTab === 'seafood' ? 'text-[#141414]' : 'text-teal-400'}`} />
              <span className={activeTab === 'seafood' ? 'inline' : 'hidden sm:inline'}>
                Seafood Division
              </span>
              <span className={`px-2 py-0.5 text-xs rounded-full font-black ${
                activeTab === 'seafood' ? 'bg-[#141414]/20 text-[#141414]' : 'bg-teal-500/10 text-teal-400'
              }`}>
                {getSeafoodProducts().length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('agri')}
              className={`flex items-center gap-2 px-3.5 sm:px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeTab === 'agri'
                  ? 'bg-amber-400 text-[#141414] shadow-lg shadow-amber-400/25 scale-[1.02]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Wheat className={`w-5 h-5 shrink-0 ${activeTab === 'agri' ? 'text-[#141414]' : 'text-amber-400'}`} />
              <span className={activeTab === 'agri' ? 'inline' : 'hidden sm:inline'}>
                Agro Products
              </span>
              <span className={`px-2 py-0.5 text-xs rounded-full font-black ${
                activeTab === 'agri' ? 'bg-[#141414]/20 text-[#141414]' : 'bg-amber-400/10 text-amber-400'
              }`}>
                {getAgriProducts().length}
              </span>
            </button>
          </div>
        </div>

        {/* DISPLAY ACTIVE DIVISION PRODUCTS */}
        <AnimatePresence mode="wait">
          {activeTab === 'seafood' ? (
            <motion.div
              key="seafood-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
                <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  <Fish className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white">Seafood Export Division</h3>
                  <p className="text-xs md:text-sm text-slate-400">Pristine marine & freshwater shrimp, fish, and squid from Eluru aquaculture hubs</p>
                </div>
              </div>

              {renderProductGrid(getSeafoodProducts())}
            </motion.div>
          ) : (
            <motion.div
              key="agri-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Wheat className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white">Agricultural Export Division</h3>
                  <p className="text-xs md:text-sm text-slate-400">Premium Indian Rice, Spices, Millets, and Pulses sourced directly from fertile river belts</p>
                </div>
              </div>

              {renderProductGrid(getAgriProducts())}
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* POPUP EMAIL MODAL */}
      <AnimatePresence>
        {emailModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-[#252525] border border-white/15 rounded-2xl p-6 shadow-2xl relative"
            >
              <button 
                onClick={() => setEmailModalProduct(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">Email Enquiry</h3>
                  <p className="text-xs text-teal-400 font-semibold">{emailModalProduct.name}</p>
                </div>
              </div>

              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                How would you like to send your enquiry to <span className="text-white font-bold">vishraglobalexports@gmail.com</span>?
              </p>

              <div className="space-y-3">
                {/* Option 1: Open in Gmail Web */}
                <Button
                  onClick={() => openGmailWeb(emailModalProduct.name)}
                  className="w-full h-12 bg-red-600 hover:bg-red-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Gmail in Browser
                </Button>

                {/* Option 2: Open in Default Mail App */}
                <Button
                  onClick={() => openDefaultMailApp(emailModalProduct.name)}
                  variant="outline"
                  className="w-full h-12 bg-white/5 border-white/20 hover:bg-white/15 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <Mail className="w-4 h-4 text-teal-400" />
                  Open Default Mail App
                </Button>
              </div>

              <p className="text-[11px] text-slate-500 text-center mt-4">
                Target: vishraglobalexports@gmail.com
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

