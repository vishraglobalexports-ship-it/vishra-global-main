import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FaWhatsapp } from 'react-icons/fa';
import { ShoppingBag, Check, Mail } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Vannamei Shrimp',
    description: 'HOSO, HLSO, PD, PUD grades available. Sizes 10/20 to 100/200. Premium farm-raised quality from Eluru.',
    image: '/products/vannamei.jpg'
  },
  {
    id: 2,
    name: 'Black Tiger Shrimp',
    description: 'Wild caught, premium export grade. Known for exceptional flavor and firm texture.',
    image: '/products/black-tiger.jpg'
  },
  {
    id: 3,
    name: 'Rohu Fish',
    description: 'Fresh and frozen. Available whole or as fillets. Processed under strict hygiene standards.',
    image: '/products/rohu.jpg'
  },
  {
    id: 4,
    name: 'Catla Fish',
    description: 'Frozen whole, IQF packs. Sourced from pristine waters, maintaining natural freshness.',
    image: '/products/catla.jpg'
  },
  {
    id: 5,
    name: 'Squid',
    description: 'Cleaned tubes and rings, export grade. Tender texture, perfect for global culinary markets.',
    image: '/products/squid.jpg'
  },
  {
    id: 6,
    name: 'Mixed Frozen Seafood',
    description: 'IQF assorted pack ideal for retail buyers and food service. Customizable mix ratios.',
    image: '/products/mixed-seafood.jpg'
  }
];

export function Products() {
  const { addToCart, cart } = useCart();
  const [addedMap, setAddedMap] = useState<Record<number, boolean>>({});

  const handleAddToCart = (product: typeof products[0]) => {
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

  return (
    <section id="products" className="py-24 bg-[#202020] text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal-400 font-bold text-xs tracking-widest uppercase block mb-2">EXPORT READY SEAFOOD RANGE</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Our Premium Export Products</h2>
          <div className="w-20 h-1 bg-teal-500 mx-auto mb-6"></div>
          <p className="text-slate-300 text-lg">
            Sourced directly from Eluru, Andhra Pradesh. Processed in certified facilities and packed to international standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
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
                    className={`w-full font-bold h-11 transition-all ${
                      isAddedJustNow
                        ? 'bg-emerald-600 hover:bg-emerald-600 text-white'
                        : 'bg-teal-500 hover:bg-teal-400 text-[#141414] shadow-md shadow-teal-500/20'
                    }`}
                  >
                    {isAddedJustNow ? (
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
      </div>
    </section>
  );
}
