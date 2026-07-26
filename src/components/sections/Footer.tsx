export function Footer() {
  return (
    <footer className="bg-[#181818] pt-16 pb-8 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info & SEO Keywords */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-transparent inline-flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="Vishra Global Exports Logo" 
                  className="h-11 w-auto object-contain brightness-0 invert drop-shadow-md" 
                />
              </div>
              <div>
                <h2 className="font-extrabold text-xl tracking-tight text-white leading-none">
                  VISHRA
                </h2>
                <span className="text-teal-400 text-xs font-bold tracking-widest block mt-0.5">GLOBAL EXPORTS</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md mb-4">
              Vishra Global Exports (Vishra Exports) — Govt-recognized Indian exporter of Premium Basmati Rice, Sona Masuri Rice, Vannamei White Shrimp, Black Tiger Prawns, Boneless Fish Fillets & Guntur Spices. Headquartered in Eluru, Andhra Pradesh, India.
            </p>
            {/* Government & Industry Association Backlinks */}
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-semibold pt-2">
              <span className="text-teal-400 font-bold uppercase">Export Affiliations:</span>
              <a href="https://apeda.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 underline transition-colors">APEDA India</a>
              <span>•</span>
              <a href="https://mpeda.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 underline transition-colors">MPEDA Marine</a>
              <span>•</span>
              <a href="https://www.fieo.org" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 underline transition-colors">FIEO Trade</a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Export Catalog</h3>
            <ul className="space-y-2.5 text-slate-400 text-sm font-medium">
              <li><a href="/products" className="hover:text-teal-400 transition-colors">1121 Basmati Rice</a></li>
              <li><a href="/products" className="hover:text-teal-400 transition-colors">Sona Masuri White Rice</a></li>
              <li><a href="/products" className="hover:text-teal-400 transition-colors">Vannamei White Shrimp</a></li>
              <li><a href="/products" className="hover:text-teal-400 transition-colors">Black Tiger Prawns</a></li>
              <li><a href="/products" className="hover:text-teal-400 transition-colors">Boneless Fish Fillets</a></li>
              <li><a href="/products" className="hover:text-teal-400 transition-colors">Guntur Export Spices</a></li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Global Desk</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                <a href="https://wa.me/919121297999" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors flex items-center gap-2">
                  <span className="text-teal-400 font-bold">Call / WhatsApp:</span> +91 91212 97999
                </a>
              </li>
              <li>
                <a href="mailto:vishraglobalexports@gmail.com" className="hover:text-teal-400 transition-colors flex items-center gap-2">
                  <span className="text-teal-400 font-bold">Email:</span> vishraglobalexports@gmail.com
                </a>
              </li>
              <li className="text-xs text-slate-400 pt-2 leading-relaxed">
                Opp St.Theresa Degree College, Kata Subbarao Thota, Eluru, Andhra Pradesh 534003, India.
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Vishra Global Exports (Vishra Exports). All rights reserved.</p>
          <p className="font-semibold text-slate-400">Official Web Domain: <a href="https://vishraglobal.com" className="text-teal-400 hover:underline">vishraglobal.com</a></p>
        </div>
      </div>
    </footer>
  );
}
