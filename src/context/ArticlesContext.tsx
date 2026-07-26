import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import { ARTICLES as defaultArticles, Article } from '@/data/articles';

interface ArticlesContextType {
  articles: Article[];
  updateArticle: (slug: string, updatedFields: Partial<Article>) => Promise<void>;
  updateArticleBanner: (slug: string, image: string) => Promise<void>;
  resetArticles: () => Promise<void>;
}

const CURRENT_ARTICLES_VERSION = 'v2_articles_longform_custom_banners';

const ArticlesContext = createContext<ArticlesContextType | undefined>(undefined);

export const ArticlesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>(() => {
    const savedVer = localStorage.getItem('vishra_articles_ver');
    const saved = localStorage.getItem('vishra_articles');
    
    if (savedVer === CURRENT_ARTICLES_VERSION && saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= defaultArticles.length) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse saved articles:', e);
      }
    }
    
    try {
      localStorage.setItem('vishra_articles_ver', CURRENT_ARTICLES_VERSION);
      localStorage.setItem('vishra_articles', JSON.stringify(defaultArticles));
    } catch (e) {
      console.error('Failed to set localStorage for articles:', e);
    }
    return defaultArticles;
  });

  // Firestore Sync Listener for Articles
  useEffect(() => {
    if (!db || !isFirebaseConfigured) return;

    const firestore = db;
    const articlesRef = collection(firestore, 'articles');

    const unsubscribe = onSnapshot(
      articlesRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const remoteArticles: Article[] = snapshot.docs.map((docSnap) => docSnap.data() as Article);
          setArticles(remoteArticles);
          localStorage.setItem('vishra_articles', JSON.stringify(remoteArticles));
          localStorage.setItem('vishra_articles_ver', CURRENT_ARTICLES_VERSION);
        }
      },
      (error) => {
        if (error.code !== 'permission-denied') {
          console.warn('Firestore articles listener info:', error.message);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('vishra_articles', JSON.stringify(articles));
      localStorage.setItem('vishra_articles_ver', CURRENT_ARTICLES_VERSION);
    } catch (e) {
      console.error('Failed to save articles to localStorage:', e);
    }
  }, [articles]);

  const updateArticle = async (slug: string, updatedFields: Partial<Article>) => {
    setArticles(prev => prev.map(art => art.slug === slug ? { ...art, ...updatedFields } : art));

    if (db && isFirebaseConfigured) {
      try {
        const target = articles.find(art => art.slug === slug);
        if (target) {
          const merged = { ...target, ...updatedFields };
          await setDoc(doc(db, 'articles', slug), merged);
        }
      } catch (err) {
        console.error('Failed to sync updated article to Firestore:', err);
      }
    }
  };

  const updateArticleBanner = async (slug: string, image: string) => {
    await updateArticle(slug, { image });
  };

  const resetArticles = async () => {
    setArticles(defaultArticles);
    localStorage.setItem('vishra_articles_ver', CURRENT_ARTICLES_VERSION);
    localStorage.setItem('vishra_articles', JSON.stringify(defaultArticles));

    if (db && isFirebaseConfigured) {
      try {
        const firestore = db;
        const batch = writeBatch(firestore);
        defaultArticles.forEach(art => {
          batch.set(doc(firestore, 'articles', art.slug), art);
        });
        await batch.commit();
      } catch (err) {
        console.error('Failed to reset articles in Firestore:', err);
      }
    }
  };

  return (
    <ArticlesContext.Provider value={{ articles, updateArticle, updateArticleBanner, resetArticles }}>
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error('useArticles must be used within an ArticlesProvider');
  }
  return context;
};
