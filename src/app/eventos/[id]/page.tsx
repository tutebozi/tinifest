'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PublicEvent } from '../../types';
import { getPublicEventById } from '../../services/eventService';

export default function EventoDetallePage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<PublicEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvent = () => {
      try {
        if (params.id) {
          const eventData = getPublicEventById(params.id as string);
          if (!eventData) {
            setError('Evento no encontrado');
            return;
          }
          setEvent(eventData);
        }
      } catch (err) {
        setError('Error al cargar el evento');
      } finally {
        setIsLoading(false);
      }
    };
    loadEvent();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-white">Cargando evento...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="text-center bg-red-50 p-8 rounded-xl">
          <h2 className="text-xl font-bold text-red-700">{error || 'Evento no encontrado'}</h2>
          <button
            onClick={() => router.push('/')}
            className="mt-4 text-red-600 hover:text-red-700"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className="text-purple-400 hover:text-purple-300 flex items-center">
          <span>← Volver a eventos</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden max-w-5xl mx-auto shadow-xl">
        <div className="relative h-96">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = '/images/events/placeholder.jpg';
            }}
          />
        </div>

        <div className="p-8">
          <div className="mb-4">
            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
              {event.category}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>
          
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            {event.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Detalles del evento</h2>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-purple-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Fecha</p>
                    <p className="text-gray-800">{formatDate(event.date)}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-purple-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Horario</p>
                    <p className="text-gray-800">{event.time} a {event.endTime}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-purple-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Ubicación</p>
                    <p className="text-gray-800">{event.location}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Información de compra</h2>
                
                <div className="mb-6">
                  <p className="text-gray-500 text-sm mb-1">Precio</p>
                  <p className="text-3xl font-bold text-purple-600">${event.price}</p>
                </div>
                
                <Link 
                  href={`/comprar/${event.id}`}
                  className="block w-full bg-purple-600 text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition duration-200"
                >
                  Comprar Tickets
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 