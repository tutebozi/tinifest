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

export interface Sale {
  id: string;
  eventId: string;
  rrppCode?: string;
  amount: number;
  quantity: number;
  createdAt: string;
  status: 'pending' | 'completed' | 'cancelled';
  paymentMethod: 'mercadopago' | 'card';
  customerEmail: string;
} 