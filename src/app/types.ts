// Tipos base para RRPP
export interface RRPP {
  id: string;
  name: string;
  email: string;
  phone: string;
  code: string;
  commission: number;
  active: boolean;
  totalSales: number;
  createdAt: string;
  updatedAt: string;
}

export interface RRPPFormData {
  name: string;
  email: string;
  phone: string;
  code?: string;
  commission: number;
  active: boolean;
}

// Tipos base para Eventos
export interface Event {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  artistImageUrl: string;
  price: number;
  date: string;
  time: string;
  endTime?: string;
  location: string;
  capacity: number;
  availableTickets: number;
  category: string;
}

export interface PublicEvent {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  artistImageUrl: string;
  price: number;
  date: string;
  time: string;
  endTime: string;
  location: string;
  availableTickets: number;
  category: string;
}

export interface EventFormData {
  title: string;
  description: string;
  imageUrl: string;
  artistImageUrl: string;
  coverImageUrl: string;
  price: number;
  date: string;
  time: string;
  endTime: string;
  location: string;
  capacity: number;
  category: string;
  benefits: string[];
  language: string;
}

// Tipos base para Ventas
export interface Sale {
  id: string;
  eventId: string;
  rrppCode?: string;
  amount: number;
  quantity: number;
  totalAmount: number;
  customerEmail: string;
  buyerEmail?: string;
  createdAt: string;
  date?: string;
  status: 'pending' | 'completed' | 'cancelled';
  paymentMethod: 'mercadopago' | 'card';
  rrppCommission?: number;
} 