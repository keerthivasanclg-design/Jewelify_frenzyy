
import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    const phoneNumber = "916385795969"; // Updated to use the new number with +91 country code
    const greeting = "Hello Jewelify_frenzyy Concierge, I would like to proceed with an order for the following items:\n\n";
    
    const itemsList = items.map((item, index) => {
      const itemSubtotal = (item.price * item.quantity).toLocaleString();
      return `${index + 1}. *${item.name}*\n   Material: ${item.material}\n   Price: ₹${item.price.toLocaleString()} x ${item.quantity}\n   Subtotal: ₹${itemSubtotal}`;
    }).join('\n\n');

    const footer = `\n\n*Total Investment: ₹${total.toLocaleString()}*\n\nPlease let me know the availability and payment process. Thank you!`;
    
    const fullMessage = encodeURIComponent(greeting + itemsList + footer);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${fullMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white shadow-2xl z-[70] transform transition-transform duration-500 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-6 border-b border-stone-100 flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-stone-900">Your Selection</h2>
        <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-400">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-stone-400 space-y-4">
            <ShoppingBag className="w-16 h-16 opacity-20" />
            <p className="font-light tracking-wide italic">Your atelier bag is empty</p>
            <button onClick={onClose} className="text-amber-600 text-sm font-semibold uppercase tracking-widest hover:underline">
              Continue Browsing
            </button>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex gap-4 group">
              <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-stone-50 border border-stone-100">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg text-stone-900 leading-tight">{item.name}</h3>
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-1">{item.material}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center bg-stone-100 rounded-lg p-1">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="p-1 hover:bg-white rounded-md transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 text-xs font-bold w-8 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="p-1 hover:bg-white rounded-md transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="font-semibold text-stone-900">₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              </div>
              <button 
                onClick={() => onRemove(item.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-stone-300 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <div className="p-8 bg-stone-50 border-t border-stone-200">
          <div className="flex justify-between items-center mb-6">
            <span className="text-stone-500 uppercase tracking-[0.2em] text-xs font-bold">Total Investment</span>
            <span className="text-3xl font-serif font-bold text-stone-900">₹{total.toLocaleString()}</span>
          </div>
          <button 
            onClick={handleCheckout}
            className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/10 flex items-center justify-center gap-3"
          >
            <MessageCircle className="w-4 h-4" />
            Proceed to Checkout
          </button>
          <p className="text-center text-[10px] text-stone-400 mt-4 uppercase tracking-widest">
            Redirection to secure WhatsApp concierge
          </p>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
