import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Navigation, Send } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

interface ContactFormInputs {
  name: string;
  company: string;
  email: string;
  phone: string;
  product: string;
  message: string;
}

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<ContactFormInputs>();

  const onSubmit = (e?: React.BaseSyntheticEvent) => {
    setIsSubmitting(true);
    setSubmitStatus('success');

    // 1. Format WhatsApp message
    const formData = getValues();
    let waMessage = `Hello VISHRA GLOBAL EXPORTS!\n\n*NEW WEBSITE ENQUIRY*\n`;
    waMessage += `👤 *Name:* ${formData.name.trim()}\n`;
    waMessage += `🏢 *Company:* ${formData.company.trim()}\n`;
    waMessage += `📧 *Email:* ${formData.email.trim()}\n`;
    waMessage += `📞 *Phone:* ${formData.phone.trim()}\n`;
    waMessage += `📦 *Product of Interest:* ${formData.product}\n`;
    waMessage += `💬 *Message:* ${formData.message.trim()}\n`;

    // 2. Open WhatsApp in background/tab
    window.open(`https://wa.me/919121297999?text=${encodeURIComponent(waMessage)}`, '_blank');

    // 3. Native Form POST to FormSubmit.co for email delivery
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  const fullAddressText = "Opp St.Theresa Degree College, Kata Subbarao Thota, Eluru, Andhra Pradesh - 534003, India";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Opp St Theresa degree college Kata Subbarao thota Eluru 534003")}`;
  const mapEmbedUrl = "https://maps.google.com/maps?q=St%20Theresa%20degree%20college%20Eluru%20534003&t=&z=15&ie=UTF8&iwloc=&output=embed";

  return (
    <section id="contact" className="py-24 bg-[#1e1e1e] text-white border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal-400 font-bold text-xs tracking-widest uppercase block mb-2">GET IN TOUCH</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Request an Export Quote</h2>
          <div className="w-20 h-1 bg-teal-500 mx-auto mb-6"></div>
          <p className="text-slate-300 text-lg">
            Submitting this enquiry form will instantly notify our export team via <strong>Email & WhatsApp</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto mb-16">
          
          {/* Contact Info Box */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#262626] text-white p-8 rounded-2xl h-full shadow-xl border border-white/10 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              
              <div className="space-y-6 relative z-10">
                <h3 className="text-2xl font-extrabold mb-6 text-white border-b border-white/10 pb-4">Contact Information</h3>
                
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-teal-400 shrink-0 mt-1" />
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Email Us</p>
                    <a href="mailto:vishraglobalexports@gmail.com" className="text-sm font-semibold text-white hover:text-teal-400 transition-colors break-all">
                      vishraglobalexports@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-teal-400 shrink-0 mt-1" />
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Call / WhatsApp</p>
                    <a href="https://wa.me/919121297999" target="_blank" rel="noreferrer" className="text-sm font-semibold text-white hover:text-teal-400 transition-colors">
                      +91 91212 97999
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-1" />
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Headquarters & Export Office Address</p>
                    <p className="text-sm font-bold text-[#FFFFFF] leading-relaxed">
                      Opp St.Theresa Degree College,<br />
                      Kata Subbarao Thota, Eluru,<br />
                      Andhra Pradesh - 534003, India
                    </p>
                    <a 
                      href={googleMapsUrl}
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-1 text-xs text-teal-400 font-bold hover:underline mt-2"
                    >
                      <Navigation size={12} /> Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 relative z-10 pt-4 border-t border-white/10">
                <Button 
                  size="lg" 
                  className="w-full bg-teal-500 hover:bg-teal-400 text-[#141414] border-none h-12 text-sm font-bold shadow-lg shadow-teal-500/20"
                  onClick={() => window.open('https://wa.me/919121297999', '_blank')}
                >
                  <FaWhatsapp className="mr-2 w-5 h-5 text-[#141414]" />
                  Direct WhatsApp Inquiry
                </Button>
              </div>
            </div>
          </div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-[#262626] p-8 md:p-10 rounded-2xl shadow-xl border border-white/10"
          >
            <form 
              ref={formRef}
              action="https://formsubmit.co/vishraglobalexports@gmail.com" 
              method="POST" 
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* FormSubmit Hidden Fields */}
              <input type="hidden" name="_subject" value="New Export Enquiry - VISHRA GLOBAL EXPORTS" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value={typeof window !== 'undefined' ? window.location.href : '/'} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-bold text-slate-200">Full Name *</Label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    className="bg-[#1a1a1a] border-white/15 text-white placeholder:text-slate-500 focus:border-teal-400"
                    {...register("name", { required: "Name is required" })} 
                  />
                  {errors.name && <p className="text-xs text-rose-400">{errors.name.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-xs font-bold text-slate-200">Company Name *</Label>
                  <Input 
                    id="company" 
                    placeholder="Oceanic Imports LLC" 
                    className="bg-[#1a1a1a] border-white/15 text-white placeholder:text-slate-500 focus:border-teal-400"
                    {...register("company", { required: "Company name is required" })} 
                  />
                  {errors.company && <p className="text-xs text-rose-400">{errors.company.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-bold text-slate-200">Email Address *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    className="bg-[#1a1a1a] border-white/15 text-white placeholder:text-slate-500 focus:border-teal-400"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                    })} 
                  />
                  {errors.email && <p className="text-xs text-rose-400">{errors.email.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs font-bold text-slate-200">Phone / WhatsApp *</Label>
                  <Input 
                    id="phone" 
                    placeholder="+1 234 567 8900" 
                    className="bg-[#1a1a1a] border-white/15 text-white placeholder:text-slate-500 focus:border-teal-400"
                    {...register("phone", { required: "Phone number is required" })} 
                  />
                  {errors.phone && <p className="text-xs text-rose-400">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="product" className="text-xs font-bold text-slate-200">Product of Interest</Label>
                <select 
                  id="product"
                  className="flex h-11 w-full rounded-md border border-white/15 bg-[#1a1a1a] px-3 py-1 text-sm text-white shadow-sm transition-colors focus:outline-none focus:border-teal-400"
                  {...register("product")}
                >
                  <option value="General Enquiry">General Enquiry</option>
                  <option value="Vannamei Shrimp">Vannamei Shrimp</option>
                  <option value="Black Tiger Shrimp">Black Tiger Shrimp</option>
                  <option value="Rohu Fish">Rohu Fish</option>
                  <option value="Catla Fish">Catla Fish</option>
                  <option value="Squid">Squid</option>
                  <option value="Mixed Frozen Seafood">Mixed Frozen Seafood Pack</option>
                  <option value="Export Quality Indian Rice">Export Quality Indian Rice (Sona Masoori / Non-Basmati)</option>
                  <option value="Indian Export Spices">Indian Export Spices (Chili, Turmeric, Pepper)</option>
                  <option value="Nutritious Organic Millets">Nutritious Organic Millets (Bajra, Ragi, Foxtail)</option>
                  <option value="Premium Export Pulses">Premium Export Pulses & Lentils (Toor, Chana, Masoor)</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-xs font-bold text-slate-200">Requirements / Message *</Label>
                <Textarea 
                  id="message" 
                  placeholder="Please provide order volume, destination port, and specific grades required..." 
                  className="bg-[#1a1a1a] border-white/15 text-white placeholder:text-slate-500 focus:border-teal-400 min-h-[120px]"
                  {...register("message", { required: "Message is required" })}
                />
                {errors.message && <p className="text-xs text-rose-400">{errors.message.message}</p>}
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold">
                  ✓ Your enquiry has been sent directly to vishraglobalexports@gmail.com! We will get back to you shortly.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-semibold">
                  Notice: Form sent via WhatsApp. First-time email activation may require confirming FormSubmit's verification email in vishraglobalexports@gmail.com.
                </div>
              )}

              <Button 
                type="submit" 
                size="lg" 
                className="w-full h-13 text-base font-bold bg-teal-500 hover:bg-teal-400 text-[#141414] shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending Enquiry...' : 'Submit Enquiry'}
              </Button>
            </form>
          </motion.div>
        </div>

        {/* INTERACTIVE GOOGLE MAP EMBED SECTION */}
        <div className="max-w-6xl mx-auto bg-[#262626] rounded-2xl p-6 border border-white/10 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <MapPin className="text-teal-400 w-5 h-5" /> Our Location on Google Maps
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">{fullAddressText}</p>
            </div>
            <a 
              href={googleMapsUrl}
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-bold hover:bg-teal-500/20 transition-colors shrink-0"
            >
              <Navigation size={14} /> Get Directions
            </a>
          </div>

          <div className="w-full h-80 rounded-xl overflow-hidden border border-white/10 relative bg-[#181818]">
            <iframe 
              title="Vishra Global Exports Office Location Map"
              src={mapEmbedUrl}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale opacity-90 contrast-125 hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
