import { useState, useRef } from 'react';
import { useProducts, Product } from '@/context/ProductsContext';
import { Button } from '@/components/ui/button';
import { 
  Trash2, Pencil, X, Check, ArrowLeft, Fish, Wheat, ShieldAlert, 
  Plus, Upload, Image, RotateCcw, ChevronDown
} from 'lucide-react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

function ImageUploader({ 
  currentImage, 
  onImageChange 
}: { 
  currentImage: string; 
  onImageChange: (dataUrl: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageChange(e.target.result as string);
      }
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
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide">Product Image</label>
      <div className="flex gap-3 items-start">
        {/* Preview */}
        <div className="w-24 h-24 rounded-xl overflow-hidden border border-white/15 shrink-0 bg-[#1a1a1a]">
          <img src={currentImage} alt="Preview" className="w-full h-full object-cover" />
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
            <span className="text-teal-400 font-semibold">Click to upload</span> or drag & drop
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
  onAdd, 
  onCancel 
}: { 
  onAdd: (product: Omit<Product, 'id'>) => void; 
  onCancel: () => void;
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState<'seafood' | 'agri'>('seafood');
  const [categoryOpen, setCategoryOpen] = useState(false);

  const canSave = name.trim() && description.trim() && image.trim();

  const handleSave = () => {
    if (!canSave) return;
    onAdd({ name: name.trim(), description: description.trim(), image: image.trim(), category });
    setName(''); setDescription(''); setImage(''); setCategory('seafood');
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

        {/* Name */}
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

        {/* Description */}
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

        {/* Image Upload */}
        <ImageUploader currentImage={image || '/logo.png'} onImageChange={setImage} />

        {/* Or enter path manually */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Or Enter Image Path</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="/products/my-product.jpg"
            className="w-full bg-[#1a1a1a] text-white border border-white/15 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all placeholder:text-slate-600 font-mono text-xs"
          />
        </div>

        {/* Category Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Category</label>
          <div className="relative">
            <button 
              onClick={() => setCategoryOpen(!categoryOpen)}
              className="w-full flex items-center justify-between bg-[#1a1a1a] border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white hover:border-white/30 transition-all"
            >
              <span className="flex items-center gap-2">
                {category === 'seafood' 
                  ? <><Fish className="w-4 h-4 text-teal-400" /> Seafood Division</> 
                  : <><Wheat className="w-4 h-4 text-amber-400" /> Agricultural Division</>
                }
              </span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${categoryOpen ? 'rotate-180' : ''}`} />
            </button>
            {categoryOpen && (
              <div className="absolute z-20 top-full mt-1 left-0 right-0 bg-[#1e1e1e] border border-white/15 rounded-lg overflow-hidden shadow-xl">
                <button 
                  onClick={() => { setCategory('seafood'); setCategoryOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 hover:bg-white/5 transition-colors ${category === 'seafood' ? 'text-teal-400' : 'text-white'}`}
                >
                  <Fish className="w-4 h-4" /> Seafood Division
                </button>
                <button 
                  onClick={() => { setCategory('agri'); setCategoryOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 hover:bg-white/5 transition-colors ${category === 'agri' ? 'text-amber-400' : 'text-white'}`}
                >
                  <Wheat className="w-4 h-4" /> Agricultural Division
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
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
  const { products, addProduct, updateProduct, deleteProduct, resetProducts, getSeafoodProducts, getAgriProducts } = useProducts();

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('vishra_admin_auth') === 'true';
  });
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
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

    if (authMode === 'login' || authMode === 'signup') {
      if (inputEmail === DEFAULT_EMAIL && inputPass === DEFAULT_PASS) {
        setIsAuthenticated(true);
        sessionStorage.setItem('vishra_admin_auth', 'true');
      } else {
        setAuthError('Invalid credentials! Please use valid admin email & password.');
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('vishra_admin_auth');
    setEmail('');
    setPassword('');
  };

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<{ name: string; description: string; image: string; category: 'seafood' | 'agri' }>({ name: '', description: '', image: '', category: 'seafood' });
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [categoryDropOpen, setCategoryDropOpen] = useState(false);

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm({ name: product.name, description: product.description, image: product.image, category: product.category });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: '', description: '', image: '', category: 'seafood' });
    setCategoryDropOpen(false);
  };

  const saveEdit = () => {
    if (editingId === null) return;
    updateProduct(editingId, {
      name: editForm.name.trim(),
      description: editForm.description.trim(),
      image: editForm.image.trim(),
      category: editForm.category,
    });
    cancelEdit();
  };

  const confirmDelete = (id: number) => {
    deleteProduct(id);
    setDeleteConfirmId(null);
  };

  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    addProduct(product);
    setShowAddPanel(false);
  };

  const renderProductRow = (product: Product) => {
    const isEditing = editingId === product.id;
    const isDeleting = deleteConfirmId === product.id;

    return (
      <motion.div
        key={product.id}
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -40, height: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-[#252525] rounded-xl border border-white/10 overflow-hidden"
      >
        {isEditing ? (
          /* ── EDIT MODE ── */
          <div className="p-6 space-y-5">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-sm font-bold text-teal-400 uppercase tracking-wider flex items-center gap-2">
                <Pencil className="w-4 h-4" /> Editing Product
              </h4>
              <button onClick={cancelEdit} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Product Name</label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full bg-[#1a1a1a] text-white border border-white/15 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Description</label>
              <textarea
                value={editForm.description}
                onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
                rows={3}
                className="w-full bg-[#1a1a1a] text-white border border-white/15 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all resize-none"
              />
            </div>

            {/* Image Upload */}
            <ImageUploader 
              currentImage={editForm.image} 
              onImageChange={(dataUrl) => setEditForm((f) => ({ ...f, image: dataUrl }))} 
            />

            {/* Or path */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Or Enter Image Path</label>
              <input
                type="text"
                value={editForm.image.startsWith('data:') ? '' : editForm.image}
                onChange={(e) => setEditForm((f) => ({ ...f, image: e.target.value }))}
                placeholder="/products/my-product.jpg"
                className="w-full bg-[#1a1a1a] text-white border border-white/15 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all font-mono text-xs placeholder:text-slate-600"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Category</label>
              <div className="relative">
                <button 
                  onClick={() => setCategoryDropOpen(!categoryDropOpen)}
                  className="w-full flex items-center justify-between bg-[#1a1a1a] border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white hover:border-white/30 transition-all"
                >
                  <span className="flex items-center gap-2">
                    {editForm.category === 'seafood' 
                      ? <><Fish className="w-4 h-4 text-teal-400" /> Seafood Division</> 
                      : <><Wheat className="w-4 h-4 text-amber-400" /> Agricultural Division</>
                    }
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${categoryDropOpen ? 'rotate-180' : ''}`} />
                </button>
                {categoryDropOpen && (
                  <div className="absolute z-20 top-full mt-1 left-0 right-0 bg-[#1e1e1e] border border-white/15 rounded-lg overflow-hidden shadow-xl">
                    <button 
                      onClick={() => { setEditForm(f => ({...f, category: 'seafood'})); setCategoryDropOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 hover:bg-white/5 transition-colors ${editForm.category === 'seafood' ? 'text-teal-400' : 'text-white'}`}
                    >
                      <Fish className="w-4 h-4" /> Seafood Division
                    </button>
                    <button 
                      onClick={() => { setEditForm(f => ({...f, category: 'agri'})); setCategoryDropOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 hover:bg-white/5 transition-colors ${editForm.category === 'agri' ? 'text-amber-400' : 'text-white'}`}
                    >
                      <Wheat className="w-4 h-4" /> Agricultural Division
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Save / Cancel */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={saveEdit}
                className="bg-teal-500 hover:bg-teal-400 text-[#141414] font-bold text-sm h-11 px-8"
              >
                <Check className="w-4 h-4 mr-2" /> Save Changes
              </Button>
              <Button
                onClick={cancelEdit}
                variant="outline"
                className="text-slate-300 border-white/20 hover:bg-white/10 font-semibold text-sm h-11 px-6"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          /* ── VIEW MODE ── */
          <div className="flex items-center gap-4 p-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-[#1a1a1a]">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h4 className="text-base font-bold text-white truncate">{product.name}</h4>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  product.category === 'seafood'
                    ? 'bg-teal-500/15 text-teal-400 border border-teal-500/30'
                    : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                }`}>
                  {product.category}
                </span>
              </div>
              <p className="text-sm text-slate-400 line-clamp-1">{product.description}</p>
              <p className="text-[10px] text-slate-600 font-mono mt-1 truncate">{product.image.startsWith('data:') ? '📷 Uploaded image' : product.image}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {isDeleting ? (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                  <span className="text-xs text-red-300 font-semibold">Delete?</span>
                  <button
                    onClick={() => confirmDelete(product.id)}
                    className="bg-red-500 hover:bg-red-400 text-white rounded-md px-3 py-1 text-xs font-bold transition-colors"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    className="bg-white/10 hover:bg-white/20 text-white rounded-md px-3 py-1 text-xs font-bold transition-colors"
                  >
                    No
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => startEdit(product)}
                    className="p-2.5 rounded-lg bg-white/5 hover:bg-teal-500/15 border border-white/10 hover:border-teal-500/30 text-slate-300 hover:text-teal-400 transition-all"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(product.id)}
                    className="p-2.5 rounded-lg bg-white/5 hover:bg-red-500/15 border border-white/10 hover:border-red-500/30 text-slate-300 hover:text-red-400 transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  const seafood = getSeafoodProducts();
  const agri = getAgriProducts();

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen w-full bg-[#181818] text-white flex items-center justify-center p-4 font-sans relative overflow-hidden">
        {/* Ambient background blur */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-[#222] border border-white/10 rounded-2xl p-8 shadow-2xl relative z-10"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/">
              <button className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors mb-4">
                <ArrowLeft className="w-4 h-4" /> Back to Store
              </button>
            </Link>
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mx-auto mb-3">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-white">VISHRA GLOBAL EXPORTS</h1>
            <p className="text-xs text-slate-400 mt-1">Admin Control Portal</p>

            {/* Toggle Tabs */}
            <div className="flex bg-[#181818] p-1 rounded-xl border border-white/10 mt-6">
              <button
                type="button"
                onClick={() => { setAuthMode('login'); setAuthError(''); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  authMode === 'login' 
                    ? 'bg-teal-500 text-[#141414] shadow-md' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode('signup'); setAuthError(''); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  authMode === 'signup' 
                    ? 'bg-teal-500 text-[#141414] shadow-md' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Form */}
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
                placeholder="vishraglobalexports@gmail.com"
                className="w-full bg-[#181818] text-white border border-white/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all placeholder:text-slate-600"
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
                placeholder="••••••••••••"
                className="w-full bg-[#181818] text-white border border-white/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all placeholder:text-slate-600"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-400 text-[#141414] font-bold text-sm h-12 rounded-xl shadow-lg shadow-teal-500/20 transition-all mt-2"
            >
              {authMode === 'login' ? 'Access Admin Portal' : 'Create Admin Account'}
            </Button>
          </form>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#181818] text-white font-sans">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-[#181818]/95 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 flex items-center gap-3 h-14">
          <Link href="/">
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all shrink-0">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>

          <div className="flex-1 min-w-0">
            <h1 className="text-base md:text-lg font-extrabold text-white flex items-center gap-2 whitespace-nowrap">
              <ShieldAlert className="w-5 h-5 text-teal-400 shrink-0" />
              Admin Panel
            </h1>
            <p className="text-[10px] md:text-[11px] text-slate-500 truncate">{products.length} products · Logged in as Admin</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {resetConfirm ? (
              <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg px-2.5 py-1.5">
                <span className="text-[11px] text-amber-300 font-semibold whitespace-nowrap">Reset?</span>
                <button onClick={() => { resetProducts(); setResetConfirm(false); }} className="bg-amber-500 hover:bg-amber-400 text-[#141414] rounded px-2 py-0.5 text-[11px] font-bold transition-colors">Yes</button>
                <button onClick={() => setResetConfirm(false)} className="bg-white/10 hover:bg-white/20 text-white rounded px-2 py-0.5 text-[11px] font-bold transition-colors">No</button>
              </div>
            ) : (
              <button 
                onClick={() => setResetConfirm(true)}
                className="p-2 rounded-lg bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 text-slate-400 hover:text-amber-400 transition-all shrink-0"
                title="Reset to defaults"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}

            <Button
              onClick={() => setShowAddPanel(!showAddPanel)}
              className="bg-teal-500 hover:bg-teal-400 text-[#141414] font-bold text-xs h-9 px-2.5 sm:px-4 shrink-0"
            >
              <Plus className="w-4 h-4 sm:mr-1.5" /><span className="hidden sm:inline">Add Product</span>
            </Button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 transition-all text-xs font-bold shrink-0"
              title="Log Out"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8 space-y-8">

        {/* Add Product Panel */}
        <AnimatePresence>
          {showAddPanel && (
            <AddProductPanel onAdd={handleAddProduct} onCancel={() => setShowAddPanel(false)} />
          )}
        </AnimatePresence>

        {/* SEAFOOD SECTION */}
        <div>
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/10">
            <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Fish className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">Seafood Products</h2>
              <p className="text-xs text-slate-500">{seafood.length} item(s)</p>
            </div>
          </div>
          <div className="space-y-3">
            <AnimatePresence>
              {seafood.map((p) => renderProductRow(p))}
            </AnimatePresence>
            {seafood.length === 0 && (
              <p className="text-center text-slate-500 py-8 text-sm">No seafood products. Click "Add Product" to create one.</p>
            )}
          </div>
        </div>

        {/* AGRI SECTION */}
        <div>
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/10">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Wheat className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">Agricultural Products</h2>
              <p className="text-xs text-slate-500">{agri.length} item(s)</p>
            </div>
          </div>
          <div className="space-y-3">
            <AnimatePresence>
              {agri.map((p) => renderProductRow(p))}
            </AnimatePresence>
            {agri.length === 0 && (
              <p className="text-center text-slate-500 py-8 text-sm">No agricultural products. Click "Add Product" to create one.</p>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
