import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Products } from '@/components/sections/Products';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { HomeAbout } from '@/components/sections/HomeAbout';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-background flex flex-col font-sans">
      <Navbar />
      <Hero />
      <Products />
      <WhyChooseUs />
      <HomeAbout />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
