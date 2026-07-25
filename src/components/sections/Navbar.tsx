import { useState, useEffect } from 'react';
import { Menu, X, Ship, ShoppingBag, Trash2, ArrowRight, User, Phone, MapPin, ArrowLeft, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { FaWhatsapp } from 'react-icons/fa';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [cartEmailModalOpen, setCartEmailModalOpen] = useState(false);
  const [location] = useLocation();
  
  // Checkout Details Step State
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details'>('cart');
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    phone: false,
    address: false,
  });

  const { cart, removeFromCart, updateQuantity, totalItemsCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    setMobileMenuOpen(false);
    if (location !== '/') {
      window.location.href = '/#contact';
      return;
    }
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProceedToDetails = () => {
    if (cart.length === 0) return;
    setCheckoutStep('details');
  };

  const handleFinalSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = {
      name: !userInfo.name.trim(),
      phone: !userInfo.phone.trim(),
      address: !userInfo.address.trim(),
    };
    setFormErrors(errors);

    if (errors.name || errors.phone || errors.address) {
      return;
    }

    if (cart.length === 0) return;

    let text = `Hello VISHRA GLOBAL EXPORTS team,\n\nI would like to request an official export quotation for my cart.\n\n`;
    text += `*CUSTOMER DETAILS:*\n`;
    text += `👤 *Name:* ${userInfo.name.trim()}\n`;
    text += `📞 *Phone:* ${userInfo.phone.trim()}\n`;
    text += `📍 *Delivery Address:* ${userInfo.address.trim()}\n\n`;
    text += `*ORDER ITEMS:*\n`;
    cart.forEach((item, index) => {
      text += `${index + 1}. *${item.name}* - Qty: ${item.quantity}\n`;
    });
    text += `\n*Total Items:* ${totalItemsCount}\n\nPlease reply with pricing and shipping timeline.\nThank you!`;

    window.open(`https://wa.me/919121297999?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleOpenCartEmailModal = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = {
      name: !userInfo.name.trim(),
      phone: !userInfo.phone.trim(),
      address: !userInfo.address.trim(),
    };
    setFormErrors(errors);

    if (errors.name || errors.phone || errors.address) {
      return;
    }

    setCartEmailModalOpen(true);
  };

  const openGmailWebCart = () => {
    let itemsList = cart.map((item, idx) => `${idx + 1}. ${item.name} (Qty: ${item.quantity})`).join('%0D%0A');
    let subject = encodeURIComponent(`Order Quote Request - ${userInfo.name.trim()}`);
    let body = encodeURIComponent(
      `Hello VISHRA GLOBAL EXPORTS team,\n\nI would like to request an official export quotation for my cart.\n\nCUSTOMER DETAILS:\nName: ${userInfo.name.trim()}\nPhone: ${userInfo.phone.trim()}\nDelivery Address: ${userInfo.address.trim()}\n\nORDER ITEMS:\n`
    ) + itemsList + encodeURIComponent(`\n\nTotal Items: ${totalItemsCount}\n\nPlease reply with pricing and shipping timeline.\nThank you!`);

    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=vishraglobalexports@gmail.com&su=${subject}&body=${body}`, '_blank');
    setCartEmailModalOpen(false);
  };

  const openDefaultMailAppCart = () => {
    let itemsList = cart.map((item, idx) => `${idx + 1}. ${item.name} (Qty: ${item.quantity})`).join('%0D%0A');
    let subject = encodeURIComponent(`Order Quote Request - ${userInfo.name.trim()}`);
    let body = encodeURIComponent(
      `Hello VISHRA GLOBAL EXPORTS team,\n\nI would like to request an official export quotation for my cart.\n\nCUSTOMER DETAILS:\nName: ${userInfo.name.trim()}\nPhone: ${userInfo.phone.trim()}\nDelivery Address: ${userInfo.address.trim()}\n\nORDER ITEMS:\n`
    ) + itemsList + encodeURIComponent(`\n\nTotal Items: ${totalItemsCount}\n\nPlease reply with pricing and shipping timeline.\nThank you!`);

    window.location.href = `mailto:vishraglobalexports@gmail.com?subject=${subject}&body=${body}`;
    setCartEmailModalOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#202020]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-xl'
            : 'bg-[#202020]/90 backdrop-blur-md py-4 border-b border-white/10'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 cursor-pointer group">
              <div className="bg-transparent group-hover:scale-105 transition-transform flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="VG Exports Logo" 
                  className="h-10 w-auto object-contain brightness-0 invert drop-shadow-md" 
                />
              </div>
              <div>
                <h1 className="font-extrabold text-xl tracking-tight leading-none text-white drop-shadow-md">
                  VISHRA
                </h1>
                <p className="text-[10px] font-bold tracking-widest text-teal-400">
                  GLOBAL EXPORTS
                </p>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link 
                href="/" 
                className={`text-sm font-semibold transition-colors ${location === '/' ? 'text-teal-400' : 'text-slate-200 hover:text-teal-400'}`}
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className={`text-sm font-semibold transition-colors ${location === '/products' ? 'text-teal-400' : 'text-slate-200 hover:text-teal-400'}`}
              >
                Products
              </Link>
              <Link 
                href="/about" 
                className={`text-sm font-semibold transition-colors ${location === '/about' ? 'text-teal-400' : 'text-slate-200 hover:text-teal-400'}`}
              >
                About Us
              </Link>
              
              {/* Cart Trigger */}
              <button
                onClick={() => {
                  setCartDrawerOpen(true);
                  setCheckoutStep('cart');
                }}
                className="relative p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all flex items-center gap-2 border border-white/15"
              >
                <ShoppingBag size={18} className="text-teal-400" />
                <span className="text-xs font-bold">{totalItemsCount > 0 ? `${totalItemsCount} item(s)` : 'Cart'}</span>
                {cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-teal-400 text-[#202020] font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#202020]">
                    {totalItemsCount}
                  </span>
                )}
              </button>

              <Button 
                onClick={scrollToContact}
                className="bg-teal-500 hover:bg-teal-400 text-[#141414] font-bold text-xs shadow-md shadow-teal-500/20"
              >
                Get Quote
              </Button>
            </div>

            {/* Mobile Toggle & Cart */}
            <div className="flex md:hidden items-center gap-3">
              <button
                onClick={() => {
                  setCartDrawerOpen(true);
                  setCheckoutStep('cart');
                }}
                className="relative p-2 rounded-lg bg-white/10 text-white"
              >
                <ShoppingBag size={20} className="text-teal-400" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-teal-400 text-[#202020] font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItemsCount}
                  </span>
                )}
              </button>
              <button 
                className="p-2 text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Links */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#202020]/98 border-b border-white/10 shadow-2xl py-4 px-6 flex flex-col gap-4 backdrop-blur-xl">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className={`text-left py-2 font-semibold ${location === '/' ? 'text-teal-400' : 'text-slate-200'}`}>Home</Link>
            <Link href="/products" onClick={() => setMobileMenuOpen(false)} className={`text-left py-2 font-semibold ${location === '/products' ? 'text-teal-400' : 'text-slate-200'}`}>Products</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className={`text-left py-2 font-semibold ${location === '/about' ? 'text-teal-400' : 'text-slate-200'}`}>About Us</Link>
            <Button onClick={scrollToContact} className="w-full bg-teal-400 text-[#202020] font-bold">
              Contact Us
            </Button>
          </div>
        )}
      </nav>

      {/* Slide-out Cart & Checkout Drawer */}
      {cartDrawerOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-[#121212]/80 backdrop-blur-sm transition-opacity"
            onClick={() => setCartDrawerOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-md bg-[#202020] border-l border-white/10 text-white h-full flex flex-col z-10 shadow-2xl animate-in slide-in-from-right duration-300">
            
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#181818]">
              <div className="flex items-center gap-3">
                {checkoutStep === 'details' ? (
                  <button 
                    onClick={() => setCheckoutStep('cart')}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <ArrowLeft size={18} />
                  </button>
                ) : (
                  <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
                    <ShoppingBag size={20} />
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-base leading-tight">
                    {checkoutStep === 'cart' ? 'Order Cart' : 'Customer & Shipping Details'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {checkoutStep === 'cart' ? `${cart.length} item(s) selected` : 'Step 2 of 2 — Provide details for quote'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setCartDrawerOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* STEP 1: CART ITEMS LIST */}
            {checkoutStep === 'cart' && (
              <>
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 py-12">
                      <ShoppingBag size={48} className="text-slate-600 mb-4 opacity-50" />
                      <p className="font-semibold text-lg text-slate-300">Your cart is empty</p>
                      <p className="text-sm text-slate-500 max-w-xs mt-1">Browse our products below and click "Add to Cart" to start your order.</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="flex gap-4 p-3 rounded-xl bg-white/5 border border-white/10 items-center">
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-1">
                          <h4 className="font-bold text-sm text-white">{item.name}</h4>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-slate-400">Quantity:</span>
                            <div className="flex items-center gap-1 bg-[#181818] rounded border border-white/10 px-1 py-0.5">
                              <button 
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="text-slate-400 hover:text-white text-xs px-1 font-bold"
                              >
                                -
                              </button>
                              <input 
                                type="number"
                                min="1"
                                value={item.quantity === 0 ? '' : item.quantity}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value, 10);
                                  updateQuantity(item.id, isNaN(val) ? 0 : val);
                                }}
                                className="w-12 h-6 bg-[#282828] text-center text-xs font-bold text-teal-400 border border-white/10 rounded focus:outline-none focus:border-teal-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              />
                              <button 
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="text-slate-400 hover:text-white text-xs px-1 font-bold"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="p-5 border-t border-white/10 bg-[#181818] space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Total Items:</span>
                      <span className="text-lg font-black text-teal-400">{totalItemsCount}</span>
                    </div>

                    <Button 
                      onClick={handleProceedToDetails}
                      className="w-full h-12 bg-teal-500 hover:bg-teal-400 text-[#141414] font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25"
                    >
                      Proceed to Customer Details
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                )}
              </>
            )}

            {/* STEP 2: USER NAME, PHONE, ADDRESS FORM */}
            {checkoutStep === 'details' && (
              <form onSubmit={handleFinalSubmitWhatsApp} className="flex-1 flex flex-col justify-between overflow-y-auto">
                <div className="p-5 space-y-5">
                  <div className="p-3.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-200 leading-relaxed">
                    Please provide your contact details so we can send the formal quote and shipping options.
                  </div>

                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <User size={14} className="text-teal-400" /> Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. John Smith"
                      value={userInfo.name}
                      onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                      className={`w-full h-11 bg-[#181818] border ${formErrors.name ? 'border-rose-500' : 'border-white/15'} rounded-xl px-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-400 transition-colors`}
                    />
                    {formErrors.name && <p className="text-[11px] text-rose-400">Please enter your name</p>}
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Phone size={14} className="text-teal-400" /> Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +1 (555) 000-1234"
                      value={userInfo.phone}
                      onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                      className={`w-full h-11 bg-[#181818] border ${formErrors.phone ? 'border-rose-500' : 'border-white/15'} rounded-xl px-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-400 transition-colors`}
                    />
                    {formErrors.phone && <p className="text-[11px] text-rose-400">Please enter your phone number</p>}
                  </div>

                  {/* Address Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <MapPin size={14} className="text-teal-400" /> Delivery Address *
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. 123 Main Street, Suite 400, City, Country"
                      value={userInfo.address}
                      onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                      className={`w-full bg-[#181818] border ${formErrors.address ? 'border-rose-500' : 'border-white/15'} rounded-xl p-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-400 transition-colors resize-none`}
                    />
                    {formErrors.address && <p className="text-[11px] text-rose-400">Please enter your delivery address</p>}
                  </div>

                  {/* Summary Box */}
                  <div className="p-3.5 rounded-xl bg-[#181818] border border-white/10 space-y-1 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Products Selected:</span>
                      <span className="font-bold text-white">{cart.length} item type(s)</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Total Quantity:</span>
                      <span className="font-bold text-teal-400">{totalItemsCount}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 border-t border-white/10 bg-[#181818] space-y-2.5">
                  <Button 
                    type="button"
                    onClick={handleFinalSubmitWhatsApp}
                    className="w-full h-12 bg-teal-500 hover:bg-teal-400 text-[#141414] font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25"
                  >
                    <FaWhatsapp size={18} className="text-[#141414]" />
                    Send Order via WhatsApp
                  </Button>

                  <Button 
                    type="button"
                    onClick={handleOpenCartEmailModal}
                    className="w-full h-12 bg-teal-500 hover:bg-teal-400 text-[#141414] font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25"
                  >
                    <Mail size={18} />
                    Send Order via Email
                  </Button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* CART EMAIL POPUP MODAL */}
      <AnimatePresence>
        {cartEmailModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-[#252525] border border-white/15 rounded-2xl p-6 shadow-2xl relative"
            >
              <button 
                onClick={() => setCartEmailModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">Send Order Quote Email</h3>
                  <p className="text-xs text-teal-400 font-semibold">{totalItemsCount} item(s) in Cart</p>
                </div>
              </div>

              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                How would you like to send your cart quote request to <span className="text-white font-bold">vishraglobalexports@gmail.com</span>?
              </p>

              <div className="space-y-3">
                {/* Option 1: Open Gmail in Browser */}
                <Button
                  onClick={openGmailWebCart}
                  className="w-full h-12 bg-red-600 hover:bg-red-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Gmail in Browser
                </Button>

                {/* Option 2: Open Default Mail App */}
                <Button
                  onClick={openDefaultMailAppCart}
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
    </>
  );
}
