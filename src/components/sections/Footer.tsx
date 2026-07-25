export function Footer() {
  return (
    <footer className="bg-primary pt-16 pb-8 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div className="col-span-1">
            <h2 className="font-bold text-2xl tracking-tight text-white mb-4">
              VISHRA<br/>
              <span className="text-secondary text-base tracking-widest block mt-1">GLOBAL EXPORTS</span>
            </h2>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Headquartered in Eluru, Andhra Pradesh — India's premier aquaculture hub. Connecting rich marine & freshwater harvests to international buyers worldwide.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-white/60 text-sm">
              <li><a href="#home" className="hover:text-secondary transition-colors">Home</a></li>
              <li><a href="#products" className="hover:text-secondary transition-colors">Products</a></li>
              <li><a href="#why-choose-us" className="hover:text-secondary transition-colors">Why Choose Us</a></li>
              <li><a href="#about" className="hover:text-secondary transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-secondary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Legal</h3>
            <ul className="space-y-3 text-white/60 text-sm">
              <li><a href="#" className="hover:text-secondary transition-colors">Terms of Trade</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Compliance Certificates</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Vishra Global Exports. All rights reserved.</p>
          <p>Designed for International Excellence.</p>
        </div>
      </div>
    </footer>
  );
}
