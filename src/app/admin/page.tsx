'use client';

import React, { useState, useEffect } from 'react';
import EventForm from '../components/EventForm';
import { Event } from '../types';
import { getEvents, saveEvent, deleteEvent, updateEvent } from '../services/eventService';

export default function AdminPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  useEffect(() => {
    setEvents(getEvents());
  }, []);

  const handleSaveEvent = (eventData: any) => {
    if (editingEvent) {
      updateEvent(editingEvent.id, eventData);
    } else {
      saveEvent(eventData);
    }
    setEvents(getEvents());
    setIsAddingEvent(false);
    setEditingEvent(null);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setIsAddingEvent(true);
  };

  const handleDeleteEvent = (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      deleteEvent(id);
      setEvents(getEvents());
    }
  };

  const handleCancel = () => {
    setIsAddingEvent(false);
    setEditingEvent(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Administración de Eventos</h1>
        {!isAddingEvent && (
          <button
            onClick={() => setIsAddingEvent(true)}
            className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700"
          >
            Nuevo Evento
          </button>
        )}
      </div>

      {isAddingEvent ? (
        <EventForm
          initialData={editingEvent || undefined}
          onSubmit={handleSaveEvent}
          onCancel={handleCancel}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative w-full h-48">
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
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h2>
                <p className="text-purple-600 text-lg font-semibold mb-2">${event.price}</p>
                <div className="space-y-1 text-gray-600">
                  <p>{event.location}</p>
                  <p>{event.date} - {event.time}</p>
                  <p>Capacidad: {event.capacity}</p>
                  <p>Tickets disponibles: {event.availableTickets}</p>
                </div>
                <div className="mt-4 flex justify-end space-x-4">
                  <button
                    onClick={() => handleEditEvent(event)}
                    className="text-purple-600 hover:text-purple-700"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 