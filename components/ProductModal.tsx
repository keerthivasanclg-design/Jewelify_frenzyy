
import React, { useState } from 'react';
import { Product } from '../types';
import { X, ChevronLeft, ChevronRight, ShoppingBag, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
      <div 
        className="absolute inset-0 bg-stone-900/90 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 bg-white/20 backdrop-blur-md text-white md:text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Image Gallery Section */}
        <div className="w-full md:w-3/5 bg-stone-50 relative flex flex-col">
          <div className="flex-1 relative overflow-hidden flex items-center justify-center p-8">
            <img 
              src={product.images[activeImageIdx]} 
              alt={product.name}
              className="max-w-full max-h-full object-contain transition-all duration-500"
            />
            
            {product.images.length > 1 && (
              <>
                <button 
                  onClick={() => setActiveImageIdx(prev => (prev > 0 ? prev - 1 : product.images.length - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setActiveImageIdx(prev => (prev < product.images.length - 1 ? prev + 1 : 0))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          <div className="p-4 flex justify-center gap-4 bg-white/50 border-t border-stone-100 overflow-x-auto">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImageIdx === idx ? 'border-amber-600 shadow-md scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="w-full md:w-2/5 p-8 md:p-12 overflow-y-auto bg-white flex flex-col">
          <div className="flex-1">
            <span className="text-amber-700 uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
              {product.category} • Handcrafted Excellence
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">{product.name}</h2>
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-3xl font-serif text-stone-900">₹{product.price.toLocaleString()}</span>
              <span className="text-stone-400 text-sm font-light italic">Includes luxury packaging</span>
            </div>

            <div className="space-y-6 mb-10">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-stone-900 mb-2">Description</h4>
                <p className="text-stone-500 font-light leading-relaxed">{product.description}</p>
              </div>
            </div>

            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3 text-sm text-stone-600">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <span>Lifetime Authenticity Guarantee</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-stone-600">
                <Truck className="w-5 h-5 text-amber-600" />
                <span>Complimentary Insured Shipping</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-stone-600">
                <RefreshCcw className="w-5 h-5 text-amber-600" />
                <span>30-Day Bespoke Exchange</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-100">
            <button 
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/10 flex items-center justify-center gap-3"
            >
              <ShoppingBag className="w-4 h-4" />
              Acquire this piece
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
