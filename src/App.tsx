import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import Home from '@/pages/home';
import ProductsPage from '@/pages/products';
import AboutPage from '@/pages/about';
import FaqPage from '@/pages/faq';
import ArticlesPage from '@/pages/articles';
import ArticleDetailPage from '@/pages/article-detail';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { CartProvider } from '@/context/CartContext';
import { ProductsProvider } from '@/context/ProductsContext';
import { ArticlesProvider } from '@/context/ArticlesContext';
import { LoadingScreen } from '@/components/LoadingScreen';
import { AnimatePresence } from 'framer-motion';
import AdminPage from '@/pages/admin';

const queryClient = new QueryClient();

function PageTracker() {
  const [location] = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'G-G41J2KGX42', {
        page_path: location,
      });
    }
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <PageTracker />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/faq" component={FaqPage} />
        <Route path="/articles" component={ArticlesPage} />
        <Route path="/articles/:slug" component={ArticleDetailPage} />
        <Route path="/admin-vishra-exports" component={AdminPage} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ProductsProvider>
        <ArticlesProvider>
          <CartProvider>
            <TooltipProvider>
              <AnimatePresence mode="wait">
                {isLoading && <LoadingScreen key="loading" />}
              </AnimatePresence>
              <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
                <Router />
              </WouterRouter>
              <Toaster />
            </TooltipProvider>
          </CartProvider>
        </ArticlesProvider>
      </ProductsProvider>
    </QueryClientProvider>
  );
}

export default App;
