
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Camera, Image as ImageIcon, Loader2, ExternalLink } from 'lucide-react';
import { getAuraResponse } from '../services/gemini';
import { ChatMessage } from '../types';

interface AIConsultantProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIConsultant: React.FC<AIConsultantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome to Aura Atelier. I am Aura, your personal jewelry stylist. How may I assist your search for brilliance today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return;

    const userMessage: ChatMessage = {
      role: 'user',
      text: input,
      image: selectedImage || undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    const response = await getAuraResponse(input || "Tell me about this outfit.", selectedImage?.split(',')[1] || undefined);
    
    setMessages(prev => [...prev, { 
      role: 'model', 
      text: response.text,
      sources: response.sources
    }]);
    
    setSelectedImage(null);
    setIsLoading(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-full sm:w-[450px] bg-white shadow-2xl z-[60] transform transition-transform duration-500 ease-in-out border-l border-stone-100 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center shadow-inner">
            <Sparkles className="w-5 h-5 text-amber-900" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-stone-900">Aura AI</h2>
            <p className="text-xs text-stone-500 font-medium uppercase tracking-tighter">Your Master Stylist</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-stone-200 rounded-full transition-colors text-stone-400">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[radial-gradient(#f1f1f1_1px,transparent_1px)] [background-size:20px_20px]">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
              msg.role === 'user' 
                ? 'bg-amber-600 text-white rounded-tr-none' 
                : 'bg-white border border-stone-100 text-stone-800 rounded-tl-none'
            }`}>
              {msg.image && (
                <img src={msg.image} alt="User upload" className="w-full h-40 object-cover rounded-lg mb-3 shadow-md" />
              )}
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-4 pt-3 border-t border-stone-100">
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Sources:</p>
                  <div className="space-y-1">
                    {msg.sources.map((source, sIdx) => (
                      <a key={sIdx} href={source.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-amber-700 hover:underline">
                        <ExternalLink className="w-3 h-3" />
                        {source.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-stone-100 rounded-2xl p-4 rounded-tl-none shadow-sm flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-amber-600 animate-spin" />
              <span className="text-sm text-stone-500 italic">Curating advice...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 bg-stone-50 border-t border-stone-200">
        {selectedImage && (
          <div className="relative inline-block mb-3">
            <img src={selectedImage} alt="Preview" className="w-20 h-20 object-cover rounded-lg border-2 border-amber-600" />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 bg-amber-600 text-white rounded-full p-1 shadow-md hover:bg-amber-700"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
        <div className="flex gap-2">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-3 bg-white border border-stone-300 rounded-xl text-stone-500 hover:bg-stone-50 transition-colors"
          >
            <ImageIcon className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Aura anything..."
              className="w-full bg-white border border-stone-300 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="absolute right-2 top-1.5 p-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 transition-colors shadow-lg shadow-amber-600/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-[10px] text-stone-400 mt-3 text-center uppercase tracking-widest font-medium">
          Powered by Gemini 3.0 • Couture Intelligence
        </p>
      </div>
    </div>
  );
};

export default AIConsultant;
