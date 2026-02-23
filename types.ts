
export interface Product {
  id: string;
  name: string;
  category: 'Rings' | 'Necklaces' | 'Earrings' | 'Bracelet' | 'Chains' | 'Clutches' | 'Clips' | 'Scrunchies' | 'Charms' | 'Beads';
  price: number;
  description: string;
  images: string[];
  material: string;
  stone?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  image?: string;
  sources?: { title: string; uri: string }[];
}
