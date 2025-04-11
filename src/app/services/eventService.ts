import { Event, EventFormData, PublicEvent } from '../types';
import { sampleEvents } from '../data/sampleEvents';

const STORAGE_KEY = 'events';
const STORAGE_VERSION = '1.0.1';

const initializeEvents = () => {
  if (typeof window === 'undefined') return;
  
  const version = localStorage.getItem('events_version');
  if (!version || version !== STORAGE_VERSION) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleEvents));
    localStorage.setItem('events_version', STORAGE_VERSION);
  }
  
  const events = localStorage.getItem(STORAGE_KEY);
  if (!events) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleEvents));
  }
};

export const getEvents = (): Event[] => {
  if (typeof window === 'undefined') return [];
  
  initializeEvents();
  const events = localStorage.getItem(STORAGE_KEY);
  return events ? JSON.parse(events) : [];
};

export const saveEvent = (eventData: EventFormData): Event => {
  const events = getEvents();
  const newEvent: Event = {
    ...eventData,
    id: Date.now().toString(),
    availableTickets: eventData.capacity,
    artistImageUrl: eventData.imageUrl
  };
  
  events.push(newEvent);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  return newEvent;
};

export const updateEvent = (id: string, eventData: EventFormData): Event | null => {
  const events = getEvents();
  const index = events.findIndex(event => event.id === id);
  
  if (index === -1) return null;
  
  const updatedEvent: Event = {
    ...events[index],
    ...eventData,
    availableTickets: eventData.capacity,
    artistImageUrl: eventData.imageUrl
  };
  
  events[index] = updatedEvent;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  return updatedEvent;
};

export const deleteEvent = (id: string): boolean => {
  const events = getEvents();
  const filteredEvents = events.filter(event => event.id !== id);
  
  if (filteredEvents.length === events.length) return false;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredEvents));
  return true;
};

export const getEventById = (id: string): Event | null => {
  const events = getEvents();
  return events.find(event => event.id === id) || null;
};

export const getPublicEvents = (): PublicEvent[] => {
  const events = getEvents();
  return events.map(event => {
    const { capacity, ...publicEvent } = event;
    return publicEvent as PublicEvent;
  });
};

export const getPublicEventById = (id: string): PublicEvent | null => {
  const event = getEventById(id);
  if (!event) return null;
  
  const { capacity, ...publicEvent } = event;
  return publicEvent as PublicEvent;
}; 