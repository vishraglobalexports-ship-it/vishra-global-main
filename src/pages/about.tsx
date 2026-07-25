import { Navbar } from '@/components/sections/Navbar';
import { About } from '@/components/sections/About';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { Footer } from '@/components/sections/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full bg-[#202020] text-white flex flex-col font-sans pt-20">
      <Navbar />
      <div className="flex-1">
        <About />
        <WhyChooseUs />
      </div>
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
