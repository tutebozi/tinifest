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

export interface RRPP {
  id: string;
  name: string;
  code: string;
  email: string;
  commission: number; // Porcentaje de comisión
  totalSales: number;
  active: boolean;
}

export interface Sale {
  id: string;
  eventId: string;
  quantity: number;
  totalAmount: number;
  rrppCode?: string;
  rrppCommission?: number;
  buyerEmail: string;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
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
  price: number;
  date: string;
  time: string;
  endTime?: string;
  location: string;
  capacity: number;
  category: string;
}
 