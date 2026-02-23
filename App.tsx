
// import React, { useState, useCallback } from 'react';
// import Navbar from './components/Navbar';
// import Hero from './components/Hero';
// import ProductCard from './components/ProductCard';
// import CartSidebar from './components/CartSidebar';
// import AIConsultant from './components/AIConsultant';
// import ProductModal from './components/ProductModal';
// import { PRODUCTS } from './constants';
// import { Product, CartItem } from './types';
// import { Instagram, Facebook, Twitter, Mail, MapPin, Phone, Sparkles } from 'lucide-react';

// const App: React.FC = () => {
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [isAIOpen, setIsAIOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [selectedCategory, setSelectedCategory] = useState<string>('All');

//   const filteredProducts = selectedCategory === 'All' 
//     ? PRODUCTS 
//     : PRODUCTS.filter(p => p.category === selectedCategory);

//   const handleAddToCart = useCallback((product: Product) => {
//     setCart(prev => {
//       const existing = prev.find(item => item.id === product.id);
//       if (existing) {
//         return prev.map(item => 
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       }
//       return [...prev, { ...product, quantity: 1 }];
//     });
//     setIsCartOpen(true);
//   }, []);

//   const handleUpdateQuantity = useCallback((id: string, delta: number) => {
//     setCart(prev => prev.map(item => {
//       if (item.id === id) {
//         const newQty = Math.max(1, item.quantity + delta);
//         return { ...item, quantity: newQty };
//       }
//       return item;
//     }));
//   }, []);

//   const handleRemoveFromCart = useCallback((id: string) => {
//     setCart(prev => prev.filter(item => item.id !== id));
//   }, []);

//   const categories = [
//     'All',  
//     'Bracelet', 
//     'Chains', 
//     'Clutches', 
//     'Clips', 
//     'Scrunchies', 
//     'Charms', 
//     'Beads'
//   ];

//   return (
//     <div className="min-h-screen">
//       <Navbar 
//         cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)} 
//         onOpenCart={() => setIsCartOpen(true)}
//         onOpenAI={() => setIsAIOpen(true)}
//       />
      
//       <main className="pt-20">
//         <Hero />
        
//         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
//           <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
//             <div className="max-w-2xl">
//               <span className="text-amber-700 uppercase tracking-widest text-xs font-bold mb-4 block">Curated Selection</span>
//               <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6">Rare & Radiant Collection</h2>
//               <p className="text-stone-500 font-light leading-relaxed">
//                 Every piece in our atelier is born from a legacy of craftsmanship, designed to be passed down through generations as a symbol of elegance and enduring love.
//               </p>
//             </div>
            
//             <div className="flex flex-wrap gap-3">
//               {categories.map(cat => (
//                 <button
//                   key={cat}
//                   onClick={() => setSelectedCategory(cat)}
//                   className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all border ${
//                     selectedCategory === cat 
//                       ? 'bg-stone-900 text-white border-stone-900 shadow-xl scale-105' 
//                       : 'bg-white text-stone-400 border-stone-200 hover:border-stone-400 hover:text-stone-900'
//                   }`}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//             {filteredProducts.map(product => (
//               <ProductCard 
//                 key={product.id} 
//                 product={product} 
//                 onAddToCart={handleAddToCart}
//                 onView={(p) => setSelectedProduct(p)}
//               />
//             ))}
//           </div>
//         </section>

//         {/* Brand Showcase Section */}
//         <section className="bg-stone-900 py-32 overflow-hidden">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
//               <div className="relative group">
//                 <div className="absolute -top-10 -left-10 w-40 h-40 border border-amber-900/30 group-hover:rotate-45 transition-transform duration-1000" />
//                 <div className="absolute -bottom-10 -right-10 w-40 h-40 border border-amber-900/30 group-hover:-rotate-45 transition-transform duration-1000" />
//                 <img 
//                   // src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=1000" 
//                   src="images/Bracelet/Bracelet3.jpeg"
//                   alt="Jewelry making"
//                   className="rounded-2xl shadow-2xl relative z-10 w-full object-cover aspect-[4/3] brightness-75 group-hover:brightness-100 transition-all duration-700"
//                 />
//               </div>
//               <div className="text-white space-y-8">
//                 <span className="text-amber-600 uppercase tracking-[0.4em] text-xs font-bold block">The Atelier Way</span>
//                 <h3 className="text-4xl md:text-6xl font-serif leading-tight">Handcrafted with Heart and Soul</h3>
//                 <p className="text-stone-400 font-light text-lg leading-relaxed">
//                   Our master artisans spend hundreds of hours on a single piece, ensuring every facet reflects our commitment to perfection. We source only conflict-free diamonds and recycled precious metals.
//                 </p>
//                 <div className="grid grid-cols-2 gap-8 pt-6">
//                   <div>
//                     <h4 className="text-2xl font-serif text-amber-500 mb-2">100%</h4>
//                     <p className="text-xs text-stone-500 uppercase tracking-widest">Ethically Sourced</p>
//                   </div>
//                   <div>
//                     <h4 className="text-2xl font-serif text-amber-500 mb-2">Bespoke</h4>
//                     <p className="text-xs text-stone-500 uppercase tracking-widest">Design Services</p>
//                   </div>
//                 </div>
//                 <button className="inline-flex items-center gap-4 text-amber-500 font-semibold uppercase tracking-[0.3em] text-xs group">
//                   Explore our heritage
//                   <div className="h-px w-12 bg-amber-500 group-hover:w-20 transition-all" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="bg-white border-t border-stone-100 pt-24 pb-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
//             <div className="space-y-6">
//               <h2 className="text-2xl font-serif font-bold text-stone-900">Jewelify_frenzyy</h2>
//               <p className="text-stone-500 text-sm font-light leading-relaxed">
//                 Defining luxury through sustainable craftsmanship and timeless design 
//               </p>
//               <div className="flex gap-4">
//                 <Instagram className="w-5 h-5 text-stone-400 hover:text-amber-700 cursor-pointer transition-colors" />
//                 <Facebook className="w-5 h-5 text-stone-400 hover:text-amber-700 cursor-pointer transition-colors" />
//                 <Twitter className="w-5 h-5 text-stone-400 hover:text-amber-700 cursor-pointer transition-colors" />
//               </div>
//             </div>
            
//             <div className="space-y-6">
//               <h4 className="text-xs font-bold uppercase tracking-widest text-stone-900">Boutique</h4>
//               <ul className="space-y-4 text-sm text-stone-500 font-light">
//                 <li className="hover:text-amber-700 cursor-pointer transition-colors">Fine chain</li>
//                 <li className="hover:text-amber-700 cursor-pointer transition-colors">Bridal Collection</li>
//                 <li className="hover:text-amber-700 cursor-pointer transition-colors">Rare Gems</li>
//                 <li className="hover:text-amber-700 cursor-pointer transition-colors">Gift Cards</li>
//               </ul>
//             </div>

//             <div className="space-y-6">
//               <h4 className="text-xs font-bold uppercase tracking-widest text-stone-900">Concierge</h4>
//               <ul className="space-y-4 text-sm text-stone-500 font-light">
//                 <li className="hover:text-amber-700 cursor-pointer transition-colors">Jewelry Care</li>
//                 <li className="hover:text-amber-700 cursor-pointer transition-colors">Sizing Guide</li>
//                 <li className="hover:text-amber-700 cursor-pointer transition-colors">Returns & Exchanges</li>
//                 <li className="hover:text-amber-700 cursor-pointer transition-colors">Shipping & Delivery</li>
//               </ul>
//             </div>

//             <div className="space-y-6">
//               <h4 className="text-xs font-bold uppercase tracking-widest text-stone-900">Contact Us</h4>
//               <div className="space-y-4 text-sm text-stone-500 font-light">
//                 <div className="flex items-start gap-3">
//                   <MapPin className="w-4 h-4 text-amber-700 mt-1" />
//                   <span><br /></span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Phone className="w-4 h-4 text-amber-700" />
//                   <span></span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Mail className="w-4 h-4 text-amber-700" />
//                   <span></span>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="pt-12 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-6">
//             <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em]">
//               © 2024 Aura Jewelry Atelier. All Rights Reserved.
//             </p>
//             <div className="flex gap-8 text-[10px] text-stone-400 uppercase tracking-[0.2em]">
//               <span className="hover:text-stone-900 cursor-pointer transition-colors">Privacy Policy</span>
//               <span className="hover:text-stone-900 cursor-pointer transition-colors">Terms of Service</span>
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* Sidebars & Modals */}
//       <CartSidebar 
//         isOpen={isCartOpen} 
//         onClose={() => setIsCartOpen(false)}
//         items={cart}
//         onUpdateQuantity={handleUpdateQuantity}
//         onRemove={handleRemoveFromCart}
//       />
      
//       <AIConsultant 
//         isOpen={isAIOpen}
//         onClose={() => setIsAIOpen(false)}
//       />

//       <ProductModal 
//         product={selectedProduct}
//         onClose={() => setSelectedProduct(null)}
//         onAddToCart={handleAddToCart}
//       />

//       {/* Persistent AI Trigger Floating Button for Accessibility */}
//       {/* <button 
//         onClick={() => setIsAIOpen(true)}
//         className="fixed bottom-8 right-8 w-16 h-16 gold-gradient rounded-full shadow-2xl flex items-center justify-center z-40 hover:scale-110 transition-transform active:scale-95 group"
//       >
//         <Sparkles className="w-8 h-8 text-amber-900 group-hover:rotate-12 transition-transform" />
//       </button> */}
//     </div>
//   );
// };

// export default App;


import React, { useState, useCallback, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import ProductModal from './components/ProductModal';
import AIConsultant from './components/AIConsultant';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone, Sparkles } from 'lucide-react';

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [shuffleKey, setShuffleKey] = useState(0);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return shuffleArray(PRODUCTS);
    }
    return PRODUCTS.filter(p => p.category === selectedCategory);
  }, [selectedCategory, shuffleKey]);

  const handleAddToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const handleUpdateQuantity = useCallback((id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  }, []);

  const handleRemoveFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  const handleCategoryClick = (cat: string) => {
    if (cat === 'All') {
      setShuffleKey(prev => prev + 1);
    }
    setSelectedCategory(cat);
  };

  const categories = [
    'All', 'Earrings', 'Bracelet', 
    'Chains', 'Clutches', 'Clips', 'Scrunchies', 'Charms', 'Beads'
  ];

  return (
    <div className="min-h-screen">
      <Navbar 
        cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
      />
      
      <main className="pt-20">
        <Hero />
        
        <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8">
            <div className="max-w-2xl text-center md:text-left">
              <span className="text-amber-700 uppercase tracking-widest text-[10px] md:text-xs font-bold mb-3 md:mb-4 block">Curated Selection</span>
              <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-4 md:mb-6">Rare & Radiant Collection</h2>
              <p className="text-stone-500 font-light leading-relaxed text-sm md:text-base">
                Every piece in our atelier is born from a legacy of craftsmanship, designed to be passed down through generations.
              </p>
            </div>
            
            <div className="flex overflow-x-auto pb-4 md:pb-0 md:flex-wrap gap-2 md:gap-3 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`whitespace-nowrap px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] transition-all border ${
                    selectedCategory === cat 
                      ? 'bg-stone-900 text-white border-stone-900 shadow-xl scale-105' 
                      : 'bg-white text-stone-400 border-stone-200 hover:border-stone-400 hover:text-stone-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {filteredProducts.map(product => (
              <ProductCard 
                key={`${product.id}-${shuffleKey}`} 
                product={product} 
                onAddToCart={handleAddToCart}
                onView={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        </section>

        {/* The target section for "Our Story" */}
        <section id="about" className="bg-stone-900 py-16 md:py-32 overflow-hidden scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
              <div className="relative group px-4 md:px-0">
                <div className="hidden md:block absolute -top-10 -left-10 w-40 h-40 border border-amber-900/30 group-hover:rotate-45 transition-transform duration-1000" />
                <div className="hidden md:block absolute -bottom-10 -right-10 w-40 h-40 border border-amber-900/30 group-hover:-rotate-45 transition-transform duration-1000" />
                <img 
                  // src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=1000" 
                 src="images/Bracelet/Bracelet3.jpeg"
                  alt="Jewelry making"
                  className="rounded-2xl shadow-2xl relative z-10 w-full object-cover aspect-[4/3] brightness-75 group-hover:brightness-200 transition-all duration-700"
                />
              </div>
              <div className="text-white space-y-6 md:space-y-8 text-center lg:text-left">
                <span className="text-amber-600 uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold block">The Atelier Way</span>
                <h3 className="text-3xl md:text-6xl font-serif leading-tight">Handcrafted with Heart and Soul</h3>
                <p className="text-stone-400 font-light text-base md:text-lg leading-relaxed">
                  Our master artisans spend hundreds of hours on a single piece, ensuring every facet reflects our commitment to perfection.
                </p>
                <div className="grid grid-cols-2 gap-4 md:gap-8 pt-6">
                  <div>
                    <h4 className="text-xl md:text-2xl font-serif text-amber-500 mb-1 md:mb-2">100%</h4>
                    <p className="text-[8px] md:text-[10px] text-stone-500 uppercase tracking-widest font-bold">Ethically Sourced</p>
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-serif text-amber-500 mb-1 md:mb-2">Bespoke</h4>
                    <p className="text-[8px] md:text-[10px] text-stone-500 uppercase tracking-widest font-bold">Design Services</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="footer" className="bg-white border-t border-stone-100 pt-16 md:pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 md:mb-20">
            <div className="space-y-4 md:space-y-6 text-center md:text-left">
              <h2 className="text-2xl font-serif font-bold text-stone-900 uppercase tracking-tight brand-glow">Jewelify_frenzyy</h2>
              <p className="text-stone-500 text-sm font-light leading-relaxed">
                Defining luxury through sustainable craftsmanship and timeless design.
              </p>
              <div className="flex justify-center md:justify-start gap-4">
                <Instagram className="w-5 h-5 text-stone-400 hover:text-amber-700 cursor-pointer" />
                <Facebook className="w-5 h-5 text-stone-400 hover:text-amber-700 cursor-pointer" />
                <Twitter className="w-5 h-5 text-stone-400 hover:text-amber-700 cursor-pointer" />
              </div>
            </div>
            
            <div className="hidden sm:block space-y-6">
              <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-stone-900">Boutique</h4>
              <ul className="space-y-3 text-sm text-stone-500 font-light">
                <li className="hover:text-amber-700 cursor-pointer">Fine Rings</li>
                <li className="hover:text-amber-700 cursor-pointer">Bridal Collection</li>
                <li className="hover:text-amber-700 cursor-pointer">Rare Gems</li>
              </ul>
            </div>

            <div className="hidden lg:block space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-900">Concierge</h4>
              <ul className="space-y-4 text-sm text-stone-500 font-light">
                <li className="hover:text-amber-700 cursor-pointer">Jewelry Care</li>
                <li className="hover:text-amber-700 cursor-pointer">Sizing Guide</li>
                <li className="hover:text-amber-700 cursor-pointer">Shipping</li>
              </ul>
            </div>

            <div className="space-y-6 text-center md:text-left">
              <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-stone-900">Contact Us</h4>
              <div className="space-y-4 text-sm text-stone-500 font-light flex flex-col items-center md:items-start">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-700" />
                  <span>+91 8015660521</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-amber-700" />
                  <span className="break-all">jewelifyfrenzyy@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-8 md:pt-12 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[8px] md:text-[10px] text-stone-400 uppercase tracking-[0.2em] text-center">
              {/* © 2024 Jewelify_frenzyy. All Rights Reserved. */}
            </p>
            <div className="flex gap-4 md:gap-8 text-[8px] md:text-[10px] text-stone-400 uppercase tracking-[0.2em]">
              {/* <span className="hover:text-stone-900 cursor-pointer">Privacy</span>
              <span className="hover:text-stone-900 cursor-pointer">Terms</span> */}
            </div>
          </div>
        </div>
      </footer>

      {/* Floating AI Button */}
      {/* <button 
        onClick={() => setIsAIOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 gold-gradient text-amber-900 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group border border-amber-400/50"
      >
        <Sparkles className="w-6 h-6 animate-pulse" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 text-xs font-bold uppercase tracking-widest">
          Stylist
        </span>
      </button> */}

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
      />
      
      <ProductModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* <AIConsultant 
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
      /> */}
    </div>
  );
};

export default App;
