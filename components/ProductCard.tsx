
import React, { useState } from 'react';
import { Product } from '../types';
import { Plus, Eye, Rotate3d, Sparkle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onView: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onView }) => {
  const [isRotating, setIsRotating] = useState(false);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-stone-100 hover:shadow-2xl hover:shadow-stone-200/50 transition-all duration-500 product-container">
      <div className="relative aspect-[4/5] overflow-hidden preserve-3d bg-stone-50">
        {/* The Rotating Element */}
        <div className={`w-full h-full transition-all duration-700 ease-out relative ${isRotating ? 'animate-rotate-360' : 'group-hover:scale-105'}`}>
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {/* Reflection sweep only visible during rotation to simulate metallic shine */}
          {isRotating && <div className="reflection-sweep" />}
        </div>
        
        {/* Overlay gradient for depth */}
        <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-all duration-300 pointer-events-none z-10" />
        
        {/* Action Buttons */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-2 translate-y-12 group-hover:translate-y-0 transition-transform duration-500 z-30">
          <button 
            onClick={() => onAddToCart(product)}
            className="flex-1 bg-stone-900 text-white py-3 rounded-xl font-medium text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-amber-900 transition-colors shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Add to Bag
          </button>
          <button 
            onClick={() => onView(product)}
            className="w-12 h-12 bg-white/90 backdrop-blur-md text-stone-900 rounded-xl flex items-center justify-center hover:bg-white transition-colors shadow-lg"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
        
        {/* 360 Toggle Badge */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsRotating(!isRotating);
          }}
          className={`absolute top-4 left-4 px-3 py-2 rounded-full backdrop-blur-md transition-all z-40 flex items-center gap-2 border ${
            isRotating 
              ? 'bg-amber-600 text-white border-amber-500 shadow-lg shadow-amber-600/30' 
              : 'bg-white/80 text-stone-600 border-stone-200 hover:bg-white opacity-0 group-hover:opacity-100'
          }`}
        >
          <Rotate3d className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} />
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] pr-1">
            {isRotating ? 'Rotating' : '360° View'}
          </span>
          {isRotating && <Sparkle className="w-3 h-3 text-amber-200 animate-pulse" />}
        </button>

        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-stone-900 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm z-20 border border-stone-100">
          {product.category}
        </div>
      </div>

      <div className="p-6 relative z-10 bg-white border-t border-stone-50">
        <h3 className="text-xl font-serif text-stone-800 mb-3 group-hover:text-amber-800 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-stone-400 uppercase tracking-widest font-bold mb-0.5">Price</span>
            <span className="text-2xl font-serif font-bold text-stone-900">
              ₹{product.price.toLocaleString()}
            </span>
          </div>
          <div className="flex -space-x-1">
            <div className="w-3 h-3 rounded-full bg-amber-400 border border-white shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-stone-100 border border-white shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-stone-300 border border-white shadow-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
