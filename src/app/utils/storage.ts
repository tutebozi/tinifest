import { Ticket } from '../data/tickets';

const STORAGE_KEY = 'tinifest_tickets';

export const saveTickets = (tickets: Ticket[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  }
};

export const loadTickets = (): Ticket[] | null => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  }
  return null;
};

export const getFromStorage = (key: string): any => {
  if (typeof window === 'undefined') return null;
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const saveToStorage = (key: string, data: any): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
};

export const removeFromStorage = (key: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
}; 