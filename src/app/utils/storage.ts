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