export interface Event {
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
  price: number;
  date: string;
  time: string;
  endTime: string;
  location: string;
  capacity: number;
  category: string;
}
 