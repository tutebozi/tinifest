'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PublicEvent } from './types';
import { getPublicEvents } from './services/eventService';

const formatearDia = (fechaStr: string) => {
  const fecha = new Date(fechaStr);
  return fecha.getDate();
};

const formatearMes = (fechaStr: string) => {
  const meses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", 
                 "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
  const fecha = new Date(fechaStr);
  return meses[fecha.getMonth()];
};

export default function Home() {
  const [events, setEvents] = useState<PublicEvent[]>([]);

  useEffect(() => {
    const loadedEvents = getPublicEvents();
    setEvents(loadedEvents);

    // Forzar recarga de imágenes
    const preloadImages = () => {
      loadedEvents.forEach(event => {
        const img = new Image();
        img.src = event.imageUrl;
      });
    };
    preloadImages();
  }, []);

  return (
    <main className="container mx-auto">
      <h1 className="tinifest-title">
        Violetta un viaje en el tiempo <span className="reloj">⌛</span>
        <div className="tinifest-subtitle">by tinifest</div>
      </h1>
      <div className="eventos-grid-minimalista">
        {events.map((event) => (
          <div key={event.id} className="evento-minimalista">
            <div className="evento-imagen-container">
              <img
                src={event.imageUrl}
                alt={event.title}
                loading={event.id === '1' ? 'eager' : 'lazy'}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/images/events/placeholder.jpg';
                }}
              />
            </div>
            <div className="evento-contenido">
              <h2 className="evento-titulo">{event.title}</h2>
              
              <div className="evento-fecha">
                <span className="evento-dia">{formatearDia(event.date)}</span>
                <span className="evento-mes">{formatearMes(event.date)}</span>
              </div>
              
              <div className="evento-hora">{event.time} a {event.endTime}</div>
              
              <div className="evento-lugar">{event.location}</div>
              
              <div className="evento-descripcion">{event.description}</div>

              <Link
                href={`/comprar/${event.id}`}
                className="evento-boton"
              >
                Comprar Tickets
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
} 