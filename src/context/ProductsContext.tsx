import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, writeBatch } from 'firebase/firestore';

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  category: 'seafood' | 'agri';
  subcategory?: string;
  varieties?: string[];
}

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: number, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  resetProducts: () => Promise<void>;
  getSeafoodProducts: () => Product[];
  getAgriProducts: () => Product[];
  updateSubcategoryImage: (category: 'seafood' | 'agri', subcategory: string, image: string) => Promise<void>;
  getSubcategoryImage: (category: 'seafood' | 'agri', subcategory: string, fallback: string) => string;
}

const defaultSeafoodProducts: Product[] = [
  {
    id: 1,
    name: "Vannamei HOSO",
    description: "Head-On Shell-On raw whole fresh & frozen Vannamei white shrimp. Sizes 10/20 to 80/100.",
    image: "/products/vannamei-hoso.png",
    category: "seafood",
    subcategory: "Shrimp & Prawns"
  },
  {
    id: 2,
    name: "Vannamei HLSO",
    description: "Headless Shell-On raw Vannamei white shrimp. Block & IQF frozen, export grade.",
    image: "/products/vannamei-hlso.png",
    category: "seafood",
    subcategory: "Shrimp & Prawns"
  },
  {
    id: 3,
    name: "Vannamei Easy Peel",
    description: "Raw shell-on back-cut deveined shrimp for effortless peeling and cooking.",
    image: "/products/vannamei-easy-peel.png",
    category: "seafood",
    subcategory: "Shrimp & Prawns"
  },
  {
    id: 4,
    name: "Vannamei PD (Tail-Off)",
    description: "Raw Peeled & Deveined tail-off translucent Vannamei white shrimp packs.",
    image: "/products/vannamei-pd.png",
    category: "seafood",
    subcategory: "Shrimp & Prawns"
  },
  {
    id: 5,
    name: "Vannamei PDTO (Tail-On)",
    description: "Raw Peeled & Deveined Tail-On Vannamei shrimp. Premium retail & wholesale grade.",
    image: "/products/vannamei-pdto.png",
    category: "seafood",
    subcategory: "Shrimp & Prawns"
  },
  {
    id: 6,
    name: "Vannamei Butterfly Cut",
    description: "Raw custom butterfly-cut tail-on jumbo Vannamei shrimp. Ideal for breading & frying.",
    image: "/products/vannamei-butterfly.png",
    category: "seafood",
    subcategory: "Shrimp & Prawns"
  },
  {
    id: 7,
    name: "Raw Shrimp Skewers",
    description: "Raw tail-on Vannamei shrimp hand-threaded on bamboo skewers, ready for cooking.",
    image: "/products/vannamei-skewers.png",
    category: "seafood",
    subcategory: "Shrimp & Prawns"
  },
  {
    id: 8,
    name: "Black Tiger Shrimp",
    description: "Raw wild-caught premium export grade. HOSO, HLSO, PDTO forms. Dark tiger stripes and firm texture.",
    image: "/products/black-tiger.jpg",
    category: "seafood",
    subcategory: "Shrimp & Prawns"
  },
  {
    id: 9,
    name: "Boneless Fish (White Meat)",
    description: "Raw boneless white meat skinless fillets & steaks (Tilapia, Pangasius, Rohu), IQF flash frozen under strict international hygiene standards.",
    image: "/products/fish-white-meat.png",
    category: "seafood",
    subcategory: "Fish Products"
  },
  {
    id: 10,
    name: "Boneless Fish (Red Meat)",
    description: "Raw sashimi & export grade boneless red meat steaks & loins (Yellowfin Tuna, Swordfish), ultra-flash frozen.",
    image: "/products/fish-red-meat.png",
    category: "seafood",
    subcategory: "Fish Products"
  }
];

const defaultAgriProducts: Product[] = [
  {
    id: 14,
    name: "Basmati Rice",
    description: "Extra Long Grain (8.30 mm+) premium Indian Basmati rice. 95% Min Purity, 12.5% Max Moisture. Exceptional grain elongation & natural aroma.",
    image: "/products/photo-basmati-section.svg",
    category: "agri",
    subcategory: "Basmati Rice",
    varieties: [
      "1121 Basmati White",
      "1121 Basmati Steam",
      "1121 Golden Sella",
      "1121 Creamy Sella",
      "Pusa Basmati 1121",
      "Pusa Basmati 1",
      "1509 Basmati",
      "1401 Basmati",
      "Sugandha Basmati",
      "Traditional Basmati"
    ]
  },
  {
    id: 15,
    name: "Non-Basmati White Rice",
    description: "High quality South Indian & Andhra Pradesh white rice. Double silky polished, 100% Sortex clean, 5% max broken.",
    image: "/products/photo-nonbasmati-section.svg",
    category: "agri",
    subcategory: "Non-Basmati White Rice",
    varieties: [
      "Sona Masuri",
      "IR 64 White",
      "Swarna White",
      "Kolam Rice",
      "Ponni Rice",
      "MTU 1010",
      "HMT Kolam",
      "Jaya Rice"
    ]
  },
  {
    id: 16,
    name: "Parboiled Rice",
    description: "Steam parboiled golden & creamy sella rice with high volume expansion, firm texture, and non-sticky cooking.",
    image: "/products/photo-parboiled-section.svg",
    category: "agri",
    subcategory: "Parboiled Rice",
    varieties: [
      "IR 64 Parboiled",
      "Swarna Parboiled",
      "Sona Masuri Parboiled",
      "Ponni Parboiled",
      "PR 11 Parboiled"
    ]
  },
  {
    id: 17,
    name: "Brown Rice",
    description: "Unpolished whole grain healthy rice rich in natural dietary fiber, essential minerals, and rice bran oils.",
    image: "/products/photo-brown-section.svg",
    category: "agri",
    subcategory: "Brown Rice",
    varieties: [
      "Brown Basmati",
      "Brown Sona Masuri",
      "Brown Ponni",
      "Brown IR 64",
      "Brown Kolam"
    ]
  },
  {
    id: 18,
    name: "Specialty & Heritage Rice",
    description: "Traditional GI-tagged aromatic, medicinal red, black, and heritage Indian rice varieties.",
    image: "/products/photo-specialty-section.svg",
    category: "agri",
    subcategory: "Specialty & Heritage Rice",
    varieties: [
      "Kerala Red Matta",
      "Karuppu Kavuni Black Rice",
      "Seeraga Samba (Jeera Samba)",
      "Gobindobhog Rice",
      "Ambemohar Rice",
      "Pokkali Organic Rice"
    ]
  },
  {
    id: 19,
    name: "Indian Export Spices",
    description: "Authentic Indian whole & powdered export spices, rich in essential oils, natural color, and intense aroma.",
    image: "/products/spices.jpg",
    category: "agri",
    subcategory: "Spices",
    varieties: [
      "Guntur Red Chili (Sannam / Teja)",
      "Turmeric Finger & Powder",
      "Tellicherry Black Pepper",
      "Green Cardamom (7mm-8mm+)",
      "Cumin Seeds (Jeera 99% Sortex)",
      "Cloves, Cassia & Cinnamon"
    ]
  },
  {
    id: 20,
    name: "Nutritious Organic Millets",
    description: "High-protein, gluten-free organic superfood millets processed for international export.",
    image: "/products/millets.jpg",
    category: "agri",
    subcategory: "Millets",
    varieties: [
      "Pearl Millet (Bajra)",
      "Finger Millet (Ragi)",
      "Foxtail Millet",
      "Little Millet",
      "Sorghum (Jowar)"
    ]
  },
  {
    id: 21,
    name: "Premium Export Pulses & Lentils",
    description: "Carefully machine-sorted, clean, moisture-controlled export grade Indian pulses and lentils.",
    image: "/products/pulses.jpg",
    category: "agri",
    subcategory: "Pulses",
    varieties: [
      "Toor Dal (Yellow Split Peas)",
      "Chana Dal",
      "Urad Dal",
      "Masoor Dal (Red Lentils)",
      "Moong Dal",
      "Rajma (Kidney Beans)"
    ]
  }
];

const sanitizeSeafoodSubcategories = (items: Product[]): Product[] => {
  return items.map(p => {
    if (p.category === 'seafood') {
      const sub = (p.subcategory || '').toLowerCase();
      const name = (p.name || '').toLowerCase();
      const isFish = sub.includes('fish') || sub.includes('tuna') || sub.includes('fillet') || 
                     name.includes('fish') || name.includes('tuna') || name.includes('fillet') || name.includes('rohu') || name.includes('catla');
      return {
        ...p,
        subcategory: isFish ? 'Fish Products' : 'Shrimp & Prawns',
        varieties: isFish ? undefined : p.varieties
      };
    }
    return p;
  });
};

const allDefaultProducts = sanitizeSeafoodSubcategories([...defaultSeafoodProducts, ...defaultAgriProducts]);
const CURRENT_VERSION = 'v15_remove_fish_varieties';

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const savedVer = localStorage.getItem('vishra_products_ver');
    const saved = localStorage.getItem('vishra_products');
    
    if (savedVer === CURRENT_VERSION && saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === allDefaultProducts.length) {
          return sanitizeSeafoodSubcategories(parsed);
        }
      } catch (e) {
        console.error('Failed to parse saved products:', e);
      }
    }
    
    // Purge old local cache and initialize clean product set
    try {
      localStorage.setItem('vishra_products_ver', CURRENT_VERSION);
      localStorage.setItem('vishra_products', JSON.stringify(allDefaultProducts));
      localStorage.removeItem('vishra_subcat_images');
    } catch (e) {
      console.error('Failed to set localStorage:', e);
    }
    return allDefaultProducts;
  });

  const [subcategoryImages, setSubcategoryImages] = useState<Record<string, string>>(() => {
    const savedVer = localStorage.getItem('vishra_products_ver');
    const saved = localStorage.getItem('vishra_subcat_images');
    if (savedVer === CURRENT_VERSION && saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved subcategory images:', e);
      }
    }
    try {
      localStorage.removeItem('vishra_subcat_images');
    } catch (e) {}
    return {};
  });

  // Listen for products from Firebase
  useEffect(() => {
    if (!db || !isFirebaseConfigured) return;

    const firestore = db;
    const productsRef = collection(firestore, 'products');

    const unsubscribe = onSnapshot(
      productsRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const rawRemote: Product[] = snapshot.docs.map((docSnap) => {
            const data = docSnap.data() as Product;
            return { ...data, id: Number(data.id || docSnap.id) };
          });

          const remoteProducts = sanitizeSeafoodSubcategories(rawRemote);

          // Strict purge if remote Firestore has outdated or mismatched documents
          const isOutdated = remoteProducts.length !== allDefaultProducts.length ||
            remoteProducts.some(p => p.id === 9 && p.name !== "Boneless Fish (White Meat)");

          if (isOutdated) {
            console.log('Detected outdated products collection in Firestore. Purging and resetting to clean 18-card catalog...');
            try {
              const batch = writeBatch(firestore);
              snapshot.docs.forEach((docSnap) => batch.delete(docSnap.ref));
              allDefaultProducts.forEach((p) => {
                batch.set(doc(firestore, 'products', String(p.id)), p);
              });
              batch.set(doc(firestore, 'settings', 'subcategoryImages'), {});
              batch.commit();
            } catch (err) {
              console.error('Failed to auto-purge Firestore products:', err);
            }
            setProducts(allDefaultProducts);
            setSubcategoryImages({});
            localStorage.setItem('vishra_products', JSON.stringify(allDefaultProducts));
            localStorage.setItem('vishra_products_ver', CURRENT_VERSION);
            localStorage.removeItem('vishra_subcat_images');
            return;
          }

          remoteProducts.sort((a, b) => a.id - b.id);
          setProducts(remoteProducts);
          localStorage.setItem('vishra_products', JSON.stringify(remoteProducts));
          localStorage.setItem('vishra_products_ver', CURRENT_VERSION);
        }
      },
      (error) => {
        // Silently fallback to local state if Firestore rules restrict access
        if (error.code !== 'permission-denied') {
          console.warn('Firestore snapshot listener info:', error.message);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  // Listen for subcategory images from Firebase
  useEffect(() => {
    if (!db || !isFirebaseConfigured) return;

    const unsubscribe = onSnapshot(
      doc(db, 'settings', 'subcategoryImages'),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as Record<string, string>;
          setSubcategoryImages(data);
          try {
            localStorage.setItem('vishra_subcat_images', JSON.stringify(data));
          } catch (e) {
            console.error('Failed to save subcategory images to localStorage:', e);
          }
        }
      },
      (error) => {
        // Silently fallback to local state if Firestore rules restrict access
        if (error.code !== 'permission-denied') {
          console.warn('Firestore subcategory images listener info:', error.message);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('vishra_products', JSON.stringify(products));
    localStorage.setItem('vishra_products_ver', CURRENT_VERSION);
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('vishra_subcat_images', JSON.stringify(subcategoryImages));
    } catch (e) {
      console.error('Failed to save subcategory images to localStorage:', e);
    }
  }, [subcategoryImages]);

  const addProduct = async (productData: Omit<Product, 'id'>) => {
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const rawNew: Product = { ...productData, id: newId };
    const [sanitized] = sanitizeSeafoodSubcategories([rawNew]);
    
    setProducts(prev => [...prev, sanitized]);

    if (db && isFirebaseConfigured) {
      try {
        await setDoc(doc(db, 'products', String(newId)), sanitized);
      } catch (err) {
        console.error('Failed to sync added product to Firestore:', err);
      }
    }
  };

  const updateProduct = async (id: number, updatedFields: Partial<Product>) => {
    setProducts(prev => {
      const updatedList = prev.map(p => p.id === id ? { ...p, ...updatedFields } : p);
      return sanitizeSeafoodSubcategories(updatedList);
    });

    if (db && isFirebaseConfigured) {
      try {
        const target = products.find(p => p.id === id);
        if (target) {
          const merged = { ...target, ...updatedFields };
          const [sanitized] = sanitizeSeafoodSubcategories([merged]);
          await setDoc(doc(db, 'products', String(id)), sanitized);
        }
      } catch (err) {
        console.error('Failed to sync updated product to Firestore:', err);
      }
    }
  };

  const deleteProduct = async (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));

    if (db && isFirebaseConfigured) {
      try {
        await deleteDoc(doc(db, 'products', String(id)));
      } catch (err) {
        console.error('Failed to sync deleted product to Firestore:', err);
      }
    }
  };

  const resetProducts = async () => {
    setProducts(allDefaultProducts);
    setSubcategoryImages({});
    localStorage.setItem('vishra_products_ver', CURRENT_VERSION);
    localStorage.setItem('vishra_products', JSON.stringify(allDefaultProducts));
    localStorage.removeItem('vishra_subcat_images');

    if (db && isFirebaseConfigured) {
      try {
        const firestore = db;
        const batch = writeBatch(firestore);
        allDefaultProducts.forEach(p => {
          batch.set(doc(firestore, 'products', String(p.id)), p);
        });
        batch.set(doc(firestore, 'settings', 'subcategoryImages'), {});
        await batch.commit();
      } catch (err) {
        console.error('Failed to reset products in Firestore:', err);
      }
    }
  };

  const getSeafoodProducts = () => products.filter(p => p.category === 'seafood');
  const getAgriProducts = () => products.filter(p => p.category === 'agri');

  const updateSubcategoryImage = async (category: 'seafood' | 'agri', subcategory: string, image: string) => {
    const key = `${category}::${subcategory}`;
    
    setSubcategoryImages(prev => ({ ...prev, [key]: image }));

    const defaultSubcat = category === 'seafood' ? 'Seafood Products' : 'Agro Products';
    setProducts(prev => prev.map(p => {
      const pSub = p.subcategory || defaultSubcat;
      if (p.category === category && pSub === subcategory) {
        return { ...p, image };
      }
      return p;
    }));

    if (db && isFirebaseConfigured) {
      try {
        const firestore = db;
        const batch = writeBatch(firestore);
        batch.set(doc(firestore, 'settings', 'subcategoryImages'), { [key]: image }, { merge: true });

        const matchingProducts = products.filter(p => {
          const pSub = p.subcategory || defaultSubcat;
          return p.category === category && pSub === subcategory;
        });

        matchingProducts.forEach(p => {
          batch.set(doc(firestore, 'products', String(p.id)), { ...p, image });
        });

        await batch.commit();
      } catch (err) {
        console.error('Failed to sync subcategory image to Firestore:', err);
      }
    }
  };

  const getSubcategoryImage = (category: 'seafood' | 'agri', subcategory: string, fallback: string): string => {
    const key = `${category}::${subcategory}`;
    return subcategoryImages[key] || fallback;
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProducts,
        getSeafoodProducts,
        getAgriProducts,
        updateSubcategoryImage,
        getSubcategoryImage
      }}
    >
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
