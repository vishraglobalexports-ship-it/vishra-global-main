import { useRoute } from 'wouter';
import { motion } from 'framer-motion';
import { useArticles } from '@/context/ArticlesContext';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, Tag, ShieldCheck, CheckCircle2 } from 'lucide-react';
import NotFound from '@/pages/not-found';

export default function ArticleDetailPage() {
  const [, params] = useRoute('/articles/:slug');
  const slug = params?.slug;
  const { articles } = useArticles();

  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return <NotFound />;
  }

  const relatedArticles = articles.filter(a => a.slug !== article.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-[#181818] text-white font-sans selection:bg-teal-500 selection:text-black">
      <Navbar />

      {/* ARTICLE HEADER */}
      <section className="relative pt-32 pb-16 border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#222222] via-[#1a1a1a] to-[#181818]">
        <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-4xl">
          <Link href="/articles">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors mb-6 cursor-pointer">
              <ArrowLeft className="w-4 h-4" /> Back to All 10 Articles & Guides
            </span>
          </Link>

          <div className="flex items-center gap-3 text-xs text-amber-400 font-bold uppercase tracking-wider mb-4">
            <span className="bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">{article.category}</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-teal-400" /> {article.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-teal-400" /> {article.readTime}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
            {article.title}
          </h1>

          <p className="text-slate-300 text-lg leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </section>

      {/* MAIN ARTICLE BODY */}
      <section className="py-16 border-b border-white/10 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          
          {/* Featured Banner Image */}
          <div className="relative rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl bg-gradient-to-br from-[#252525] via-[#1d1d1d] to-[#151515] p-6 md:p-10 flex items-center justify-center min-h-[280px] md:min-h-[420px]">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full max-h-[380px] md:max-h-[440px] object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]"
            />
          </div>

          {/* Article Content Box */}
          <article className="prose prose-invert max-w-none space-y-8 bg-[#202020] p-8 md:p-12 rounded-3xl border border-white/10 shadow-xl">
            {/* Intro */}
            <p className="text-slate-200 text-base md:text-lg leading-relaxed font-normal border-b border-white/10 pb-6">
              {article.content.intro}
            </p>

            {/* Sections */}
            {article.content.sections.map((sec, i) => (
              <div key={i} className="space-y-3 pt-4">
                <h2 className="text-xl md:text-2xl font-extrabold text-amber-400 tracking-wide">
                  {sec.heading}
                </h2>
                <p className="text-slate-300 text-base leading-relaxed">
                  {sec.body}
                </p>
              </div>
            ))}

            {/* Summary Callout */}
            <div className="mt-8 p-6 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-200 flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-teal-400 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-white text-base mb-1">Vishra Global Exports Quality Assurance</h4>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  {article.content.summary}
                </p>
              </div>
            </div>
          </article>

          {/* SEO Keywords Tags */}
          <div className="mt-10 p-6 rounded-2xl bg-[#202020] border border-white/10">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-3">SEO Search Index Keywords:</span>
            <div className="flex flex-wrap gap-2">
              {article.keywords.map((kw, i) => (
                <span key={i} className="text-xs bg-[#282828] text-slate-300 px-3.5 py-1.5 rounded-xl border border-white/10 font-mono hover:text-amber-300 hover:border-amber-400/40 transition-colors">
                  #{kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RELATED ARTICLES */}
      <section className="py-20 border-b border-white/10 bg-[#181818]">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <h3 className="text-2xl font-black text-white mb-8">Related Export Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map(rel => (
              <div key={rel.slug} className="p-6 rounded-2xl bg-[#222222] border border-white/10 flex flex-col justify-between space-y-4 hover:border-amber-400/40 transition-all">
                <div className="space-y-2">
                  <span className="text-[11px] text-amber-400 font-bold uppercase">{rel.category}</span>
                  <h4 className="text-base font-bold text-white line-clamp-2 leading-snug">{rel.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{rel.excerpt}</p>
                </div>
                <Link href={`/articles/${rel.slug}`}>
                  <span className="text-xs font-bold text-amber-400 hover:underline inline-flex items-center gap-1 cursor-pointer">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
