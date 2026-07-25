import { Navbar } from '@/components/sections/Navbar';
import { Products } from '@/components/sections/Products';
import { Footer } from '@/components/sections/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';

export default function ProductsPage() {
  return (
    <main className="min-h-screen w-full bg-[#202020] text-white flex flex-col font-sans pt-20">
      <Navbar />
      <div className="flex-1">
        <Products />
      </div>
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
