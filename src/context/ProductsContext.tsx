import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  category: 'seafood' | 'agri';
}

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, updates: Partial<Omit<Product, 'id'>>) => void;
  deleteProduct: (id: number) => void;
  resetProducts: () => void;
  getSeafoodProducts: () => Product[];
  getAgriProducts: () => Product[];
}

const defaultSeafoodProducts: Product[] = [
  {
    id: 1,
    name: 'Vannamei Shrimp',
    description: 'HOSO, HLSO, EZ Peel, PD, PUD & Butterfly Cut. Sizes 10/20 to 100/200. Premium farm-raised from Eluru.',
    image: '/products/vannamei.jpg',
    category: 'seafood'
  },
  {
    id: 2,
    name: 'Black Tiger Shrimp',
    description: 'Wild-caught premium export grade. HOSO, HLSO, PDTO forms. Exceptional flavor and firm texture.',
    image: '/products/black-tiger.jpg',
    category: 'seafood'
  },
  {
    id: 3,
    name: 'Tilapia',
    description: 'Whole, fillets & portions. IQF processed, mild flavor profile ideal for global retail and foodservice.',
    image: '/products/tilapia.jpg',
    category: 'seafood'
  },
  {
    id: 4,
    name: 'Rohu Fish',
    description: 'Fresh and frozen whole or fillets. Freshwater sourced, processed under strict hygiene standards.',
    image: '/products/rohu.jpg',
    category: 'seafood'
  },
  {
    id: 5,
    name: 'Catla Fish',
    description: 'Frozen whole, IQF packs. Sourced from pristine freshwater, maintaining natural taste and texture.',
    image: '/products/catla.jpg',
    category: 'seafood'
  },
  {
    id: 6,
    name: 'Pangasius',
    description: 'Boneless fillets, steaks & portions. Block frozen or IQF. Clean taste, versatile for global markets.',
    image: '/products/pangasius.jpg',
    category: 'seafood'
  },
  {
    id: 7,
    name: 'Yellowfin Tuna',
    description: 'Steaks, loins & saku blocks. Sashimi-grade available. Deep ocean sourced, ultra-fresh processing.',
    image: '/products/tuna.jpg',
    category: 'seafood'
  }
];

const defaultAgriProducts: Product[] = [
  {
    id: 8,
    name: 'Export Quality Indian Rice',
    description: 'Premium Sona Masoori, 100% Broken, Parboiled, and Non-Basmati Rice. Sourced directly from Andhra Pradesh paddy fields.',
    image: '/products/rice.jpg',
    category: 'agri'
  },
  {
    id: 9,
    name: 'Indian Export Spices',
    description: 'Authentic Guntur Red Chili, Turmeric finger & powder, Black Pepper, Cardamom, and Cumin seeds. Rich aroma and color.',
    image: '/products/spices.jpg',
    category: 'agri'
  },
  {
    id: 10,
    name: 'Nutritious Organic Millets',
    description: 'Pearl Millet (Bajra), Finger Millet (Ragi), Foxtail & Little Millet. High-fiber superfoods processed for global export.',
    image: '/products/millets.jpg',
    category: 'agri'
  },
  {
    id: 11,
    name: 'Premium Export Pulses & Lentils',
    description: 'Toor Dal (Yellow Split Peas), Chana Dal, Urad Dal, and Red Lentils (Masoor). Carefully sorted, clean, and moisture-controlled.',
    image: '/products/pulses.jpg',
    category: 'agri'
  }
];

const allDefaults = [...defaultSeafoodProducts, ...defaultAgriProducts];

const STORAGE_KEY = 'vishra-products';

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}
    return allDefaults;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    setProducts((prev) => {
      const maxId = prev.reduce((max, p) => Math.max(max, p.id), 0);
      return [...prev, { ...product, id: maxId + 1 }];
    });
  };

  const updateProduct = (id: number, updates: Partial<Omit<Product, 'id'>>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const resetProducts = () => {
    setProducts(allDefaults);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getSeafoodProducts = () => products.filter((p) => p.category === 'seafood');
  const getAgriProducts = () => products.filter((p) => p.category === 'agri');

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, resetProducts, getSeafoodProducts, getAgriProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
