import { useState, useRef } from 'react';
import { useProducts, type Product } from '@/context/ProductsContext';
import { useArticles } from '@/context/ArticlesContext';
import { Article } from '@/data/articles';
import { Button } from '@/components/ui/button';
import { 
  Trash2, Pencil, X, Check, ArrowLeft, Fish, Wheat, ShieldAlert, 
  Plus, Upload, Image, RotateCcw, ChevronDown, Eye, EyeOff, BookOpen, FileText
} from 'lucide-react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

function ImageUploader({ 
  currentImage, 
  onImageChange,
  label = "Section Image"
}: { 
  currentImage: string; 
  onImageChange: (dataUrl: string) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target?.result) return;
      const img = document.createElement('img');
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 900;
        let width = img.width;
        let height = img.height;
        
        if (width > height && width > MAX_SIZE) {
          height = (height * MAX_SIZE) / width;
          width = MAX_SIZE;
        } else if (height > MAX_SIZE) {
          width = (width * MAX_SIZE) / height;
          height = MAX_SIZE;
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, width, height);
        
        const compressed = canvas.toDataURL('image/jpeg', 0.75);
        onImageChange(compressed);
      };
      img.src = e.target.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide">{label}</label>
      <div className="flex gap-3 items-start">
        {/* Preview */}
        <div className="w-24 h-24 rounded-xl overflow-hidden border border-white/15 shrink-0 bg-[#1a1a1a] flex items-center justify-center">
          <img src={currentImage} alt="Preview" className="w-full h-full object-contain" />
        </div>

        {/* Upload area */}
        <div 
          className={`flex-1 border-2 border-dashed rounded-xl p-4 text-center transition-all cursor-pointer ${
            dragActive 
              ? 'border-teal-400 bg-teal-500/10' 
              : 'border-white/15 hover:border-white/30 bg-[#1a1a1a]'
          }`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
        >
          <Upload className="w-6 h-6 text-slate-500 mx-auto mb-1.5" />
          <p className="text-xs text-slate-400">
            <span className="text-teal-400 font-semibold">Click to upload banner</span> or drag & drop
          </p>
          <p className="text-[10px] text-slate-600 mt-0.5">JPG, PNG, WebP (max 5MB)</p>
        </div>

        <input 
          ref={inputRef} 
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={(e) => { if (e.target.files?.[0]) processFile(e.target.files[0]); }}
        />
      </div>
    </div>
  );
}

function AddProductPanel({ 
  existingProducts,
  onAdd, 
  onCancel 
}: { 
  existingProducts: Product[];
  onAdd: (product: Omit<Product, 'id'>) => void; 
  onCancel: () => void;
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'seafood' | 'agri'>('seafood');
  const [subcategory, setSubcategory] = useState('');

  const canSave = name.trim() && description.trim();

  const handleSave = () => {
    if (!canSave) return;
    const subcatName = subcategory.trim() || undefined;
    const existingImage = existingProducts.find(p => p.category === category && p.subcategory === subcatName)?.image || '/logo.png';
    onAdd({ name: name.trim(), description: description.trim(), image: existingImage, category, subcategory: subcatName });
    setName(''); setDescription(''); setCategory('seafood'); setSubcategory('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, height: 0 }}
      animate={{ opacity: 1, y: 0, height: 'auto' }}
      exit={{ opacity: 0, y: -10, height: 0 }}
      className="bg-[#222] rounded-2xl border border-teal-500/30 overflow-hidden shadow-xl shadow-teal-500/5"
    >
      <div className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-teal-400" />
            Add New Product
          </h3>
          <button onClick={onCancel} className="text-slate-400 hover:text-white transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Vannamei Shrimp"
            className="w-full bg-[#1a1a1a] text-white border border-white/15 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all placeholder:text-slate-600"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short product description for export buyers..."
            rows={3}
            className="w-full bg-[#1a1a1a] text-white border border-white/15 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all resize-none placeholder:text-slate-600"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            onClick={handleSave}
            disabled={!canSave}
            className="bg-teal-500 hover:bg-teal-400 text-[#141414] font-bold text-sm h-11 px-8 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Product
          </Button>
          <Button
            onClick={onCancel}
            variant="outline"
            className="text-slate-300 border-white/20 hover:bg-white/10 font-semibold text-sm h-11 px-6"
          >
            Cancel
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function AdminPage() {
  const { products, addProduct, updateProduct, deleteProduct, resetProducts, getSeafoodProducts, getAgriProducts, updateSubcategoryImage, getSubcategoryImage } = useProducts();
  const { articles, updateArticle, updateArticleBanner, resetArticles } = useArticles();

  // Active Admin Tab State
  const [activeTab, setActiveTab] = useState<'products' | 'articles'>('products');

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('vishra_admin_auth') === 'true';
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const DEFAULT_EMAIL = 'vishraglobalexports@gmail.com';
  const DEFAULT_PASS = 'Rjshepherd@1994';

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const inputEmail = email.trim().toLowerCase();
    const inputPass = password.trim();

    if (inputEmail === DEFAULT_EMAIL && inputPass === DEFAULT_PASS) {
      setIsAuthenticated(true);
      sessionStorage.setItem('vishra_admin_auth', 'true');
    } else {
      setAuthError('Invalid credentials! Please use valid admin email & password.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('vishra_admin_auth');
    setEmail('');
    setPassword('');
  };

  // Product Edit State
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<{ name: string; description: string; image: string; category: 'seafood' | 'agri'; subcategory: string }>({ name: '', description: '', image: '', category: 'seafood', subcategory: '' });
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  // Article Edit State
  const [editingArticleSlug, setEditingArticleSlug] = useState<string | null>(null);
  const [articleEditForm, setArticleEditForm] = useState<{ title: string; excerpt: string; readTime: string; keywordsStr: string }>({ title: '', excerpt: '', readTime: '', keywordsStr: '' });

  const startArticleEdit = (art: Article) => {
    setEditingArticleSlug(art.slug);
    setArticleEditForm({
      title: art.title,
      excerpt: art.excerpt,
      readTime: art.readTime,
      keywordsStr: art.keywords.join(', ')
    });
  };

  const saveArticleEdit = () => {
    if (!editingArticleSlug) return;
    const keywordsArr = articleEditForm.keywordsStr.split(',').map(k => k.trim()).filter(Boolean);
    updateArticle(editingArticleSlug, {
      title: articleEditForm.title.trim(),
      excerpt: articleEditForm.excerpt.trim(),
      readTime: articleEditForm.readTime.trim(),
      keywords: keywordsArr
    });
    setEditingArticleSlug(null);
  };

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm({ name: product.name, description: product.description, image: product.image, category: product.category, subcategory: product.subcategory || '' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: '', description: '', image: '', category: 'seafood', subcategory: '' });
  };

  const saveEdit = () => {
    if (editingId === null) return;
    updateProduct(editingId, {
      name: editForm.name.trim(),
      description: editForm.description.trim(),
      image: editForm.image,
      category: editForm.category,
      subcategory: editForm.subcategory.trim() || undefined,
    });
    cancelEdit();
  };

  const seafood = getSeafoodProducts();
  const agri = getAgriProducts();

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen w-full bg-[#181818] text-white flex items-center justify-center p-4 font-sans relative overflow-hidden">
        <div className="w-full max-w-md bg-[#222] border border-white/10 rounded-2xl p-8 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <Link href="/">
              <button className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors mb-4">
                <ArrowLeft className="w-4 h-4" /> Back to Store
              </button>
            </Link>
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mx-auto mb-3">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-white">Admin Authentication</h1>
            <p className="text-xs text-slate-400 mt-1">Sign in with authorized admin credentials</p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {authError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
                {authError}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#181818] text-white border border-white/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#181818] text-white border border-white/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
              />
            </div>

            <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-400 text-[#141414] font-extrabold text-sm h-12 rounded-xl mt-2">
              Sign In to Admin Dashboard
            </Button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#181818] text-white font-sans selection:bg-teal-500 selection:text-black">
      
      {/* Top Header */}
      <div className="bg-[#202020] border-b border-white/10 sticky top-0 z-30 backdrop-blur-xl bg-[#202020]/90">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <Link href="/">
              <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </button>
            </Link>
            <div>
              <h1 className="text-base font-black text-white leading-tight">Vishra Global Admin</h1>
              <p className="text-[10px] text-teal-400 font-semibold tracking-wider uppercase">Products & Articles Management</p>
            </div>
          </div>

          {/* Admin Navigation Tabs */}
          <div className="flex items-center bg-[#181818] p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'products' ? 'bg-teal-500 text-[#141414] shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Fish className="w-3.5 h-3.5" /> Products & Sections
            </button>
            <button
              onClick={() => setActiveTab('articles')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'articles' ? 'bg-amber-400 text-[#141414] shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> Articles & Banners (10)
            </button>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 transition-all text-xs font-bold shrink-0"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8 space-y-8">

        {/* ── TAB 1: PRODUCTS & SECTION BANNERS ── */}
        {activeTab === 'products' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h2 className="text-xl font-extrabold text-white">Product Catalog & Section Images</h2>
                <p className="text-xs text-slate-400">Manage 18 default product cards and section banner images</p>
              </div>
              <div className="flex items-center gap-3">
                {resetConfirm ? (
                  <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg px-2.5 py-1.5">
                    <span className="text-[11px] text-amber-300 font-semibold">Reset Products?</span>
                    <button onClick={() => { resetProducts(); setResetConfirm(false); }} className="bg-amber-500 text-[#141414] rounded px-2 py-0.5 text-[11px] font-bold">Yes</button>
                    <button onClick={() => setResetConfirm(false)} className="bg-white/10 text-white rounded px-2 py-0.5 text-[11px] font-bold">No</button>
                  </div>
                ) : (
                  <button onClick={() => setResetConfirm(true)} className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-amber-400">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
                <Button onClick={() => setShowAddPanel(!showAddPanel)} className="bg-teal-500 hover:bg-teal-400 text-[#141414] font-bold text-xs">
                  <Plus className="w-4 h-4 mr-1" /> Add Product
                </Button>
              </div>
            </div>

            {/* SEAFOOD SECTION */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-teal-400 flex items-center gap-2">
                <Fish className="w-5 h-5" /> Seafood Division ({seafood.length} items)
              </h3>
              {Array.from(new Set(seafood.map(p => p.subcategory || 'Seafood Products'))).map((subcat) => {
                const subItems = seafood.filter(p => (p.subcategory || 'Seafood Products') === subcat);
                const sectionImage = getSubcategoryImage('seafood', subcat, subItems[0]?.image || '/logo.png');
                return (
                  <div key={subcat} className="bg-[#222] rounded-xl border border-teal-500/20 p-5 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
                      <div>
                        <span className="text-base font-extrabold text-teal-400">{subcat}</span>
                        <span className="text-xs text-slate-400 ml-2">({subItems.length} product cards)</span>
                      </div>
                      <div className="w-full sm:w-auto">
                        <ImageUploader
                          label={`Upload Banner for ${subcat}`}
                          currentImage={sectionImage}
                          onImageChange={(dataUrl) => updateSubcategoryImage('seafood', subcat, dataUrl)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AGRI SECTION */}
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                <Wheat className="w-5 h-5" /> Agricultural Division ({agri.length} items)
              </h3>
              {Array.from(new Set(agri.map(p => p.subcategory || 'Agro Products'))).map((subcat) => {
                const subItems = agri.filter(p => (p.subcategory || 'Agro Products') === subcat);
                const sectionImage = getSubcategoryImage('agri', subcat, subItems[0]?.image || '/logo.png');
                return (
                  <div key={subcat} className="bg-[#222] rounded-xl border border-amber-500/20 p-5 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
                      <div>
                        <span className="text-base font-extrabold text-amber-400">{subcat}</span>
                        <span className="text-xs text-slate-400 ml-2">({subItems.length} product cards)</span>
                      </div>
                      <div className="w-full sm:w-auto">
                        <ImageUploader
                          label={`Upload Banner for ${subcat}`}
                          currentImage={sectionImage}
                          onImageChange={(dataUrl) => updateSubcategoryImage('agri', subcat, dataUrl)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── TAB 2: EXPORT ARTICLES & BANNERS MANAGER ── */}
        {activeTab === 'articles' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h2 className="text-xl font-extrabold text-white">Export Articles & Banners Manager</h2>
                <p className="text-xs text-slate-400">Edit titles, excerpts, read time, SEO tags, and upload custom banners for all 10 articles</p>
              </div>
              <Button onClick={() => resetArticles()} variant="outline" className="border-amber-400/40 text-amber-400 hover:bg-amber-400/10 text-xs font-bold">
                <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Reset Articles to Defaults
              </Button>
            </div>

            <div className="space-y-6">
              {articles.map((art) => {
                const isEditing = editingArticleSlug === art.slug;
                return (
                  <div key={art.slug} className="bg-[#222] rounded-2xl border border-white/10 p-6 space-y-5 shadow-xl">
                    <div className="flex flex-col lg:flex-row gap-6 items-start">
                      
                      {/* Banner Image Uploader */}
                      <div className="w-full lg:w-1/3 shrink-0">
                        <ImageUploader
                          label={`Article Banner (${art.category})`}
                          currentImage={art.image}
                          onImageChange={(dataUrl) => updateArticleBanner(art.slug, dataUrl)}
                        />
                      </div>

                      {/* Article Details & Editing Form */}
                      <div className="flex-1 w-full space-y-4">
                        {isEditing ? (
                          <div className="space-y-4 bg-[#1a1a1a] p-4 rounded-xl border border-amber-400/30">
                            <div>
                              <label className="block text-xs font-bold text-amber-400 uppercase mb-1">Article Title</label>
                              <input 
                                type="text" 
                                value={articleEditForm.title} 
                                onChange={(e) => setArticleEditForm(f => ({ ...f, title: e.target.value }))}
                                className="w-full bg-[#242424] text-white border border-white/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-amber-400 uppercase mb-1">Excerpt / Summary</label>
                              <textarea 
                                value={articleEditForm.excerpt} 
                                onChange={(e) => setArticleEditForm(f => ({ ...f, excerpt: e.target.value }))}
                                rows={2}
                                className="w-full bg-[#242424] text-white border border-white/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 resize-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-amber-400 uppercase mb-1">SEO Keywords (Comma Separated)</label>
                              <input 
                                type="text" 
                                value={articleEditForm.keywordsStr} 
                                onChange={(e) => setArticleEditForm(f => ({ ...f, keywordsStr: e.target.value }))}
                                className="w-full bg-[#242424] text-white border border-white/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                              />
                            </div>
                            <div className="flex gap-2 pt-2">
                              <Button onClick={saveArticleEdit} className="bg-amber-400 text-[#141414] font-bold text-xs h-9 px-4">
                                <Check className="w-3.5 h-3.5 mr-1" /> Save Article
                              </Button>
                              <Button onClick={() => setEditingArticleSlug(null)} variant="outline" className="border-white/20 text-slate-300 text-xs h-9 px-4">
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 uppercase">
                                {art.category}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-400 font-mono">{art.readTime}</span>
                                <Button onClick={() => startArticleEdit(art)} size="sm" variant="outline" className="h-8 border-white/15 hover:border-amber-400 text-slate-300 hover:text-amber-400 text-xs font-bold">
                                  <Pencil className="w-3.5 h-3.5 mr-1" /> Edit Details
                                </Button>
                              </div>
                            </div>

                            <h3 className="text-lg font-extrabold text-white leading-snug">{art.title}</h3>
                            <p className="text-xs text-slate-300 leading-relaxed">{art.excerpt}</p>

                            <div className="flex flex-wrap gap-1.5 pt-2">
                              {art.keywords.map((kw, i) => (
                                <span key={i} className="text-[10px] bg-white/5 text-amber-300/90 px-2.5 py-0.5 rounded-md border border-white/10 font-mono">
                                  #{kw}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
