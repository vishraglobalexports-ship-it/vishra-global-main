import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, ArrowRight, Calendar, Clock, Tag, User, ShieldCheck, HelpCircle } from 'lucide-react';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ARTICLES, Article } from '@/data/articles';

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Agri Exports', 'Seafood Exports', 'Trade & Logistics', 'Quality & Compliance'];

  const filteredArticles = ARTICLES.filter(art => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#181818] text-white font-sans selection:bg-teal-500 selection:text-black">
      <Navbar />

      {/* HERO BANNER */}
      <section className="relative pt-32 pb-20 border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#222222] via-[#1a1a1a] to-[#181818]">
        <div className="absolute inset-0 z-0 opacity-15">
          <img src="/hero.jpg" alt="Vishra Global Exports Knowledge Hub" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center max-w-4xl">
          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 text-xs font-bold tracking-widest uppercase mb-6">
            <BookOpen className="w-4 h-4" /> EXPORT INDUSTRY KNOWLEDGE & ARTICLES
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
            Indian Export <span className="bg-gradient-to-r from-amber-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Knowledge Hub & Articles</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8">
            Explore 10 comprehensive trade articles, technical export guides, and compliance standards for Indian Basmati Rice, Sona Masuri, Vannamei White Shrimp, Spices, and Ocean Reefer Freight.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative mb-8">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 10 export articles (e.g. Basmati, Shrimp, FDA, Cold Chain)..."
              className="w-full h-13 bg-[#242424] text-white placeholder:text-slate-500 border border-white/15 rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all shadow-xl"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-[#141414] shadow-lg shadow-amber-400/20 scale-105'
                    : 'bg-[#242424] text-slate-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="py-20 border-b border-white/10 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((art, idx) => (
              <motion.article 
                key={art.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="rounded-3xl bg-[#222222] border border-white/10 overflow-hidden flex flex-col hover:border-amber-400/40 transition-all group shadow-xl"
              >
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden relative bg-gradient-to-b from-[#252525] to-[#181818] p-4 flex items-center justify-center">
                  <img 
                    src={art.image} 
                    alt={art.title} 
                    className="w-full h-full object-contain max-h-[180px] group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
                  />
                  <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                    {art.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-amber-400" /> {art.date}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-teal-400" /> {art.readTime}</span>
                    </div>

                    <h2 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors leading-snug line-clamp-2">
                      {art.title}
                    </h2>

                    <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                      {art.excerpt}
                    </p>

                    {/* SEO Keyword Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {art.keywords.slice(0, 4).map((kw, i) => (
                        <span key={i} className="text-[10px] bg-white/5 text-amber-300/80 px-2 py-0.5 rounded-md border border-white/5 font-mono">
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">By Vishra Exports</span>
                    <Link href={`/articles/${art.slug}`}>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer">
                        Read Article <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              No articles found matching “{searchQuery}”. Try clearing your search term.
            </div>
          )}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 bg-gradient-to-r from-amber-950/40 via-[#202020] to-[#181818] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Looking for Specific Export Documentation or Quotes?
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Our trade desk in Eluru, Andhra Pradesh is ready to assist international buyers with custom specifications and container rates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="h-14 px-8 bg-amber-400 hover:bg-amber-300 text-[#141414] font-bold text-base shadow-lg shadow-amber-400/20">
                Explore Export Products <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/faq">
              <Button size="lg" variant="outline" className="h-14 px-8 bg-white/5 border-white/20 hover:bg-white/10 text-white font-bold text-base">
                View Trade FAQs <HelpCircle className="ml-2 w-5 h-5 text-teal-400" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
