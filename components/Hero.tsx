

import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=2000"
          alt="Luxury Jewelry Background"
          className="w-full h-full object-cover brightness-75 md:brightness-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 md:from-stone-900/60 to-transparent"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <span className="inline-block text-amber-200 uppercase tracking-[0.3em] text-[10px] md:text-sm font-semibold mb-4 md:mb-6 animate-pulse">
          Elegance Redefined
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white mb-6 md:mb-8 leading-[1.15] md:leading-tight">
          Where Timeless Art <br className="hidden sm:block" /> Meets Modern Grace
        </h2>
        <p className="text-stone-200 text-sm md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Discover a curated collection of handcrafted pieces, from brilliant diamonds to rare colored gemstones.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#products" 
            className="w-full sm:w-auto px-8 md:px-10 py-3.5 md:py-4 bg-white text-stone-900 rounded-full font-medium hover:bg-stone-100 transition-all flex items-center justify-center gap-2 group text-sm md:text-base cursor-pointer"
          >
            Shop Collection
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="#about" 
            className="w-full sm:w-auto px-8 md:px-10 py-3.5 md:py-4 border border-white/50 text-white rounded-full font-medium backdrop-blur-sm hover:bg-white/10 transition-all text-sm md:text-base flex items-center justify-center cursor-pointer"
          >
            Our Story
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
