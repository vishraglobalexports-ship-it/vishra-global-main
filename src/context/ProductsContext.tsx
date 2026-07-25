import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  category: 'seafood' | 'agri';
  subcategory?: string;
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
  // --- Shrimp & Prawns ---
  {
    id: 1,
    name: 'Vannamei White Shrimp',
    description: 'HOSO, HLSO, EZ Peel, PD, PUD & Butterfly Cut. Sizes 10/20 to 100/200. Premium farm-raised from Eluru.',
    image: '/products/vannamei.jpg',
    category: 'seafood',
    subcategory: 'Shrimp & Prawns'
  },
  {
    id: 2,
    name: 'Black Tiger Shrimp',
    description: 'Wild-caught premium export grade. HOSO, HLSO, PDTO forms. Exceptional flavor, dark tiger stripes, and firm texture.',
    image: '/products/black-tiger.jpg',
    category: 'seafood',
    subcategory: 'Shrimp & Prawns'
  },
  {
    id: 3,
    name: 'Deep Sea Pink Prawns',
    description: 'PUD and PDTO frozen packs. Naturally sweet marine flavor, ideal for retail and gourmet dining.',
    image: '/products/vannamei.jpg',
    category: 'seafood',
    subcategory: 'Shrimp & Prawns'
  },

  // --- Freshwater & Marine Fish ---
  {
    id: 4,
    name: 'Tilapia Fillets & Whole',
    description: 'Whole gutted & IQF boneless skinless fillets. Mild flavor profile, CO treated or natural.',
    image: '/products/tilapia.jpg',
    category: 'seafood',
    subcategory: 'Fish'
  },
  {
    id: 5,
    name: 'Freshwater Rohu Fish',
    description: 'Fresh and frozen whole, steaks & fillets. Sourced from pristine AP freshwater lakes under strict hygiene.',
    image: '/products/rohu.jpg',
    category: 'seafood',
    subcategory: 'Fish'
  },
  {
    id: 6,
    name: 'Catla Fish',
    description: 'Frozen whole, IQF steak packs. Pristine freshwater source maintaining authentic taste and texture.',
    image: '/products/catla.jpg',
    category: 'seafood',
    subcategory: 'Fish'
  },
  {
    id: 7,
    name: 'Pangasius Fillets & Steaks',
    description: 'Boneless white & pink fillets, skinless, well-trimmed. Block frozen or IQF for global wholesale.',
    image: '/products/pangasius.jpg',
    category: 'seafood',
    subcategory: 'Fish'
  },
  {
    id: 8,
    name: 'Yellowfin Tuna Loins & Steaks',
    description: 'Sashimi-grade loins, saku blocks & steaks. Deep ocean ocean-caught, flash frozen ultra-fresh.',
    image: '/products/tuna.jpg',
    category: 'seafood',
    subcategory: 'Fish'
  }
];

const defaultAgriProducts: Product[] = [
  // --- Rice Varieties ---
  {
    id: 9,
    name: 'Sona Masoori Raw Rice',
    description: 'Aromatic medium-grain non-basmati rice. Lightweight, low starch, easy to digest. Directly from AP paddy fields.',
    image: '/products/rice.jpg',
    category: 'agri',
    subcategory: 'Rice Varieties'
  },
  {
    id: 10,
    name: 'Sona Masoori Parboiled Rice',
    description: 'Steam/parboiled 100% sortexed grains. High nutritional retention, firm texture, ideal for global catering.',
    image: '/products/rice.jpg',
    category: 'agri',
    subcategory: 'Rice Varieties'
  },
  {
    id: 11,
    name: '100% Broken White Rice',
    description: 'Clean double polished 100% broken rice. Moisture controlled (<14%), highly demanded for food processing.',
    image: '/products/rice.jpg',
    category: 'agri',
    subcategory: 'Rice Varieties'
  },
  {
    id: 12,
    name: 'IR64 Parboiled Rice',
    description: 'Long grain non-basmati rice. High grain length (6.0mm+), low broken percentage, major export favorite.',
    image: '/products/rice.jpg',
    category: 'agri',
    subcategory: 'Rice Varieties'
  },

  // --- Spices & Herbs ---
  {
    id: 13,
    name: 'Guntur Red Chili & Powder',
    description: 'Stemless & with-stem S334 / Teja red chilis. Intense red color (ASTA 40-80) and fiery pungency.',
    image: '/products/spices.jpg',
    category: 'agri',
    subcategory: 'Spices & Seasonings'
  },
  {
    id: 14,
    name: 'Pure Turmeric Finger & Powder',
    description: 'High curcumin (3.5%+), vibrant golden yellow Nizamabad & Cuddapah turmeric fingers.',
    image: '/products/spices.jpg',
    category: 'agri',
    subcategory: 'Spices & Seasonings'
  },
  {
    id: 15,
    name: 'Black Pepper & Cumin Seeds',
    description: 'Tellicherry 550g/l garbled black pepper & Machine Cleaned Cumin seeds (Jeera) rich in essential oils.',
    image: '/products/spices.jpg',
    category: 'agri',
    subcategory: 'Spices & Seasonings'
  },

  // --- Organic Millets & Superfoods ---
  {
    id: 16,
    name: 'Pearl Millet (Bajra)',
    description: 'High-protein gluten-free grain. Sun-dried, machine cleaned, rich in iron & magnesium.',
    image: '/products/millets.jpg',
    category: 'agri',
    subcategory: 'Millets & Superfoods'
  },
  {
    id: 17,
    name: 'Finger Millet (Ragi)',
    description: 'Calcium-rich red ragi grains. Finely processed & de-husked for export food processing.',
    image: '/products/millets.jpg',
    category: 'agri',
    subcategory: 'Millets & Superfoods'
  },
  {
    id: 18,
    name: 'Foxtail & Little Millet',
    description: 'Dehulled organic foxtail (Korralu) and little millet. Low GI superfood for healthy dietary markets.',
    image: '/products/millets.jpg',
    category: 'agri',
    subcategory: 'Millets & Superfoods'
  },

  // --- Pulses & Lentils ---
  {
    id: 19,
    name: 'Toor Dal (Yellow Split Peas)',
    description: 'Unpolished premium pigeon peas. High protein content, uniform grain size, fast cooking.',
    image: '/products/pulses.jpg',
    category: 'agri',
    subcategory: 'Pulses & Lentils'
  },
  {
    id: 20,
    name: 'Chana Dal & Urad Dal',
    description: 'Bold Bengal gram split & whole/split black gram (Urad). Double-cleaned, zero artificial colors.',
    image: '/products/pulses.jpg',
    category: 'agri',
    subcategory: 'Pulses & Lentils'
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
