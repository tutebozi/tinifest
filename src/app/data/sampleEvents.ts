import { Event } from '../types';

const placeholderImage = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAyVC0zLyAvLTMpP0E6OjpBKTMtRUpFSkVKUEpFSkVKRUpFSkVKRUr/2wBDAR';

export const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Tini - La Triple T Tour',
    description: 'Tini presenta su nuevo tour con todos sus éxitos y nueva música en un show imperdible.',
    imageUrl: placeholderImage,
    artistImageUrl: placeholderImage,
    price: 350,
    date: '2024-11-15',
    time: '20:00',
    endTime: '23:30',
    location: 'Estadio River Plate',
    capacity: 65000,
    availableTickets: 65000,
    category: 'Conciertos'
  },
  {
    id: '2',
    title: 'Emilia - .mp3 Tour',
    description: 'Emilia llega con su gira .mp3 presentando todos sus hits en un show único.',
    imageUrl: placeholderImage,
    artistImageUrl: placeholderImage,
    price: 280,
    date: '2024-10-20',
    time: '21:00',
    endTime: '00:30',
    location: 'Estadio Único de La Plata',
    capacity: 50000,
    availableTickets: 50000,
    category: 'Conciertos'
  },
  {
    id: '3',
    title: 'Nicki Nicole - Alma Tour',
    description: 'Nicki Nicole presenta su nuevo álbum Alma en un show inolvidable.',
    imageUrl: placeholderImage,
    artistImageUrl: placeholderImage,
    price: 450,
    date: '2024-03-15',
    time: '21:00',
    endTime: '00:00',
    location: 'Movistar Arena',
    capacity: 15000,
    availableTickets: 15000,
    category: 'Conciertos'
  },
  {
    id: '4',
    title: 'Lali - Disciplina Tour',
    description: 'Lali regresa a los escenarios con un show espectacular presentando su nuevo álbum.',
    imageUrl: placeholderImage,
    artistImageUrl: placeholderImage,
    price: 320,
    date: '2024-09-10',
    time: '21:30',
    endTime: '01:00',
    location: 'Estadio Vélez Sarsfield',
    capacity: 45000,
    availableTickets: 45000,
    category: 'Conciertos'
  },
  {
    id: '5',
    title: 'Duki - Antes de Ameri Tour',
    description: 'Duki presenta su nuevo álbum en un show único con toda la potencia del trap argentino.',
    imageUrl: placeholderImage,
    artistImageUrl: placeholderImage,
    price: 380,
    date: '2024-07-05',
    time: '20:30',
    endTime: '23:45',
    location: 'Estadio José Amalfitani',
    capacity: 49000,
    availableTickets: 49000,
    category: 'Conciertos'
  },
  {
    id: '6',
    title: 'María Becerra - La Nena de Argentina Tour',
    description: 'María Becerra presenta su tour La Nena de Argentina con todos sus éxitos.',
    imageUrl: placeholderImage,
    artistImageUrl: placeholderImage,
    price: 300,
    date: '2024-08-25',
    time: '21:00',
    endTime: '00:30',
    location: 'Estadio GEBA',
    capacity: 35000,
    availableTickets: 35000,
    category: 'Conciertos'
  }
]; 