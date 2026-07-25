import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FaWhatsapp } from 'react-icons/fa';
import { ShoppingBag, Check, Mail, Fish, Wheat } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useProducts, type Product } from '@/context/ProductsContext';
import { useState } from 'react';

export function Products() {
  const { addToCart, cart } = useCart();
  const { getSeafoodProducts, getAgriProducts } = useProducts();
  const [addedMap, setAddedMap] = useState<Record<number, boolean>>({});

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
                  onClick={() => {
                    const subject = encodeURIComponent(`Product Enquiry - ${product.name}`);
                    const body = encodeURIComponent(`Hello VISHRA GLOBAL EXPORTS,\n\nI am interested in ordering/inquiring about ${product.name}.\nPlease share availability, pricing, and grade specifications.\n\nThank you!`);
                    window.open(`mailto:vishraglobalexports@gmail.com?subject=${subject}&body=${body}`, '_blank');
                  }}
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

  return (
    <section id="products" className="py-24 bg-[#202020] text-white">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Main Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-teal-400 font-bold text-xs tracking-widest uppercase block mb-2">EXPORT READY PRODUCT RANGE</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Our Export Offerings</h2>
          <div className="w-20 h-1 bg-teal-500 mx-auto mb-6"></div>
          <p className="text-slate-300 text-lg">
            Direct export sourcing from Andhra Pradesh. Certified processing, moisture control, and global shipping standards.
          </p>
        </div>

        {/* SECTION 1: SEAFOOD PRODUCTS */}
        <div className="mb-20">
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
        </div>

        {/* SECTION 2: AGRICULTURAL PRODUCTS */}
        <div>
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
        </div>

      </div>
    </section>
  );
}
