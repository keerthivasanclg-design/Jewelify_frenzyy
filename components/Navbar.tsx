
import React from 'react';
import { ShoppingBag, Search, Menu, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAI: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOpenAI }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* <div className="flex items-center gap-4 lg:hidden">
            <Menu className="w-6 h-6 text-stone-700 cursor-pointer" />
          </div> */}

          {/* <div className="hidden lg:flex items-center space-x-8 text-sm uppercase tracking-widest font-medium text-stone-600">
            <a href="#" className="hover:text-stone-900 transition-colors">Collections</a>
            <a href="#" className="hover:text-stone-900 transition-colors">Bespoke</a>
            <a href="#" className="hover:text-stone-900 transition-colors">Heritage</a>
          </div> */}
<div className="flex-1 flex justify-center">
            <h1 className="gold-text text-xl md:text-3xl font-serif font-bold tracking-tight  cursor-pointer uppercase brand-glow">
              Jewelify_frenzyy
            </h1>
          </div>

          <div className="flex items-center space-x-6 text-stone-700">
            {/* <button 
              onClick={onOpenAI}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 transition-all border border-stone-200 group"
            >
              {/* <Sparkles className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline">AI Stylist</span>
            </button> */} 
            
            {/* <button className="hover:text-stone-900 transition-colors">
              <Search className="w-5 h-5" />
            </button>
             */}
            <button onClick={onOpenCart} className="relative hover:text-stone-900 transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
