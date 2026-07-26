import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FaWhatsapp } from 'react-icons/fa';
import { ShoppingBag, Check, Mail, Fish, Wheat, ExternalLink, X, Search, Layers } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useProducts, type Product } from '@/context/ProductsContext';
import { useState } from 'react';

export function Products() {
  const { addToCart, cart } = useCart();
  const { getSeafoodProducts, getAgriProducts, getSubcategoryImage } = useProducts();
  const [addedMap, setAddedMap] = useState<Record<number, boolean>>({});
  
  // Modal state for email inquiry
  const [emailModalProduct, setEmailModalProduct] = useState<Product | null>(null);

  const handleAddToCart = (product: Product) => {
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

  // Normal design product grid with sub-category variety name pills
  const renderProductGrid = (productList: Product[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {productList.map((product, index) => {
        const inCart = cart.some((i) => i.id === product.id);
        const isAddedJustNow = addedMap[product.id];
        const category = product.category || 'agri';
        const subcat = product.subcategory || 'General';
        const displayImage = getSubcategoryImage(category, subcat, product.image);
        const isSeafood = category === 'seafood';

        return (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className={`bg-[#282828] rounded-2xl overflow-hidden border border-white/10 shadow-xl transition-all duration-300 group flex flex-col justify-between ${
              isSeafood
                ? 'hover:border-teal-400/50 hover:shadow-2xl hover:shadow-teal-500/10'
                : 'hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-500/10'
            }`}
          >
            <div>
              {/* Product Image Banner */}
              <div className="relative h-64 overflow-hidden bg-[#181818]">
                <img 
                  src={displayImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = isSeafood ? '/products/vannamei.jpg' : '/products/rice.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#202020] via-transparent to-transparent opacity-60" />
                
                {/* Vishra Watermark */}
                <div className="absolute top-3 left-3 bg-[#181818]/70 backdrop-blur-md p-1.5 px-2.5 rounded-lg border border-white/10 shadow-md">
                  <img 
                    src="/logo.png" 
                    alt="Vishra Watermark" 
                    className="h-6 w-auto object-contain brightness-0 invert opacity-90" 
                  />
                </div>

                {/* Subcategory Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <span className={`bg-[#181818]/80 backdrop-blur-md font-extrabold text-[11px] px-3 py-1 rounded-full border shadow-md ${
                    isSeafood
                      ? 'text-teal-400 border-teal-400/30'
                      : 'text-amber-400 border-amber-400/30'
                  }`}>
                    {subcat}
                  </span>
                  {inCart && (
                    <span className="bg-teal-400 text-[#141414] font-black text-xs px-3 py-1 rounded-full shadow-md">
                      In Cart
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Description */}
              <div className="p-6 pb-3">
                <h3 className={`text-xl font-bold text-white mb-2 transition-colors ${
                  isSeafood ? 'group-hover:text-teal-300' : 'group-hover:text-amber-300'
                }`}>
                  {product.name}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {product.description}
                </p>

                {/* Subcategory Variety Names Inside Card */}
                {product.varieties && product.varieties.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                    <div className={`flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider ${
                      isSeafood ? 'text-teal-400' : 'text-amber-400'
                    }`}>
                      <Layers className="w-3.5 h-3.5" />
                      <span>Available Types & Grades ({product.varieties.length}):</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1 custom-scrollbar">
                      {product.varieties.map((v) => (
                        <span 
                          key={v} 
                          className={`bg-[#1a1a1a] text-slate-200 border text-xs px-2.5 py-1 rounded-lg font-semibold transition-all shadow-sm ${
                            isSeafood
                              ? 'border-teal-400/20 hover:border-teal-400/60 hover:text-teal-300 hover:bg-teal-400/10'
                              : 'border-amber-400/20 hover:border-amber-400/60 hover:text-amber-300 hover:bg-amber-400/10'
                          }`}
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 pt-2 space-y-2">
              <Button 
                onClick={() => handleAddToCart(product)}
                disabled={inCart}
                className={`w-full font-bold h-11 transition-all ${
                  inCart
                    ? 'bg-slate-700 text-slate-300 border border-white/10 cursor-not-allowed'
                    : isAddedJustNow
                    ? 'bg-emerald-600 hover:bg-emerald-600 text-white'
                    : isSeafood
                    ? 'bg-teal-500 hover:bg-teal-400 text-[#141414] shadow-md shadow-teal-500/20'
                    : 'bg-amber-400 hover:bg-amber-300 text-[#141414] shadow-md shadow-amber-400/20'
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
                  <Mail className={`mr-1.5 w-3.5 h-3.5 ${isSeafood ? 'text-teal-400' : 'text-amber-400'} shrink-0`} />
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
  const [activeTab, setActiveTab] = useState<'seafood' | 'agri'>('agri');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on search
  const filterProducts = (products: Product[]) => {
    let result = products;

    // Apply text search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        (p.subcategory && p.subcategory.toLowerCase().includes(q)) ||
        (p.varieties && p.varieties.some(v => v.toLowerCase().includes(q)))
      );
    }

    return result;
  };

  const filteredSeafood = filterProducts(getSeafoodProducts());
  const filteredAgri = filterProducts(getAgriProducts());
  const activeFiltered = activeTab === 'seafood' ? filteredSeafood : filteredAgri;
  const activeTotal = activeTab === 'seafood' ? getSeafoodProducts().length : getAgriProducts().length;

  return (
    <section id="products" className="py-24 bg-[#202020] text-white relative">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Main Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-teal-400 font-bold text-xs tracking-widest uppercase block mb-2">EXPORT READY PRODUCT RANGE</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Our Export Offerings</h2>
          <div className="w-20 h-1 bg-amber-400 mx-auto mb-6"></div>
          <p className="text-slate-300 text-lg mb-8">
            Direct export sourcing from Andhra Pradesh. Select a division below to explore our offerings.
          </p>

          {/* TWO DIVISION BUTTON TOGGLES */}
          <div className="inline-flex p-1.5 rounded-2xl bg-[#181818] border border-white/10 shadow-2xl gap-2 max-w-full">
            <button
              onClick={() => {
                setActiveTab('seafood');
                setSearchQuery('');
              }}
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
              onClick={() => {
                setActiveTab('agri');
                setSearchQuery('');
              }}
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

          {/* SEARCH BAR */}
          <div className="mt-6 max-w-xl mx-auto">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 group-focus-within:text-amber-400 transition-colors pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeTab === 'seafood' ? 'seafood' : 'agro & rice'} varieties...`}
                className="w-full bg-[#181818] text-white border border-white/15 rounded-xl pl-11 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400/40 transition-all placeholder:text-slate-600 shadow-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-500 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {searchQuery.trim() && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-slate-500 mt-2 text-center"
              >
                Found <span className={`font-bold ${activeFiltered.length > 0 ? 'text-amber-400' : 'text-red-400'}`}>{activeFiltered.length}</span> of {activeTotal} section(s) matching “<span className="text-white font-semibold">{searchQuery.trim()}</span>”
              </motion.p>
            )}
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
              className="space-y-12"
            >
              {(() => {
                const isFish = (p: Product) => {
                  const sub = (p.subcategory || '').toLowerCase();
                  const name = (p.name || '').toLowerCase();
                  return sub.includes('fish') || sub.includes('tuna') || sub.includes('fillet') || 
                         name.includes('fish') || name.includes('tuna') || name.includes('fillet') || name.includes('rohu') || name.includes('catla');
                };

                const shrimpProducts = filteredSeafood.filter(p => !isFish(p));
                const fishProducts = filteredSeafood.filter(p => isFish(p));

                return (
                  <>
                    {shrimpProducts.length > 0 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 pb-3 border-b border-teal-500/20">
                          <div className="w-2.5 h-7 rounded-full bg-teal-400" />
                          <h4 className="text-xl md:text-2xl font-extrabold text-white">Shrimp & Prawns</h4>
                          <span className="text-xs font-mono px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 font-bold">
                            {shrimpProducts.length} product(s)
                          </span>
                        </div>
                        {renderProductGrid(shrimpProducts)}
                      </div>
                    )}

                    {fishProducts.length > 0 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 pb-3 border-b border-teal-500/20">
                          <div className="w-2.5 h-7 rounded-full bg-teal-400" />
                          <h4 className="text-xl md:text-2xl font-extrabold text-white">Fish Products</h4>
                          <span className="text-xs font-mono px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 font-bold">
                            {fishProducts.length} product(s)
                          </span>
                        </div>
                        {renderProductGrid(fishProducts)}
                      </div>
                    )}
                  </>
                );
              })()}

              {filteredSeafood.length === 0 && (
                <div className="text-center py-16">
                  <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 text-lg font-semibold">No seafood products found</p>
                  <p className="text-slate-600 text-sm mt-1">Try a different search term</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="agri-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-14"
            >
              {/* Rice Range: All Rice Categories Side-by-Side in Grid */}
              {(() => {
                const riceProducts = filteredAgri.filter(p => p.subcategory !== 'Spices' && p.subcategory !== 'Millets' && p.subcategory !== 'Pulses');
                const otherAgri = filteredAgri.filter(p => p.subcategory === 'Spices' || p.subcategory === 'Millets' || p.subcategory === 'Pulses');

                return (
                  <>
                    {riceProducts.length > 0 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 pb-3 border-b border-amber-500/20">
                          <div className="w-2.5 h-7 rounded-full bg-amber-400" />
                          <h4 className="text-xl md:text-2xl font-extrabold text-white">Indian Export Rice Range</h4>
                          <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 font-bold">
                            {riceProducts.length} Categories
                          </span>
                        </div>
                        {renderProductGrid(riceProducts)}
                      </div>
                    )}

                    {otherAgri.length > 0 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 pb-3 border-b border-amber-500/20">
                          <div className="w-2.5 h-7 rounded-full bg-amber-400" />
                          <h4 className="text-xl md:text-2xl font-extrabold text-white">Spices, Millets & Pulses</h4>
                          <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 font-bold">
                            {otherAgri.length} Divisions
                          </span>
                        </div>
                        {renderProductGrid(otherAgri)}
                      </div>
                    )}
                  </>
                );
              })()}

              {filteredAgri.length === 0 && (
                <div className="text-center py-16">
                  <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 text-lg font-semibold">No agro products found</p>
                  <p className="text-slate-600 text-sm mt-1">Try a different search term</p>
                </div>
              )}
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
                <div className="p-3 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">Email Enquiry</h3>
                  <p className="text-xs text-amber-400 font-semibold">{emailModalProduct.name}</p>
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
                  <Mail className="w-4 h-4 text-amber-400" />
                  Open Default Mail App
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
