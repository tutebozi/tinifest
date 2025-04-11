export interface RRPP {
  id: string;
  name: string;
  code: string;
  email: string;
  phone: string;
  active: boolean;
  totalSales: number;
}

export interface Sale {
  id: string;
  eventId: string;
  rrppCode?: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  quantity: number;
  totalAmount: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface RRPPFormData {
  name: string;
  email: string;
  phone: string;
  code: string;
  active: boolean;
} 