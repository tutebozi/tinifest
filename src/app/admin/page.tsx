'use client';

import React, { useState, useEffect } from 'react';
import EventForm from '../components/EventForm';
import RRPPManagement from './components/RRPPManagement';
import UserList from './components/UserList';
import { Event, EventFormData } from '../types';
import { getEvents, saveEvent, deleteEvent, updateEvent } from '../services/eventService';

export default function AdminPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState<'events' | 'rrpp' | 'users'>('events');

  useEffect(() => {
    setEvents(getEvents());
  }, []);

  const handleSaveEvent = (eventData: EventFormData) => {
    if (editingEvent) {
      updateEvent(editingEvent.id, eventData);
    } else {
      saveEvent(eventData);
    }
    setEvents(getEvents());
    setIsAddingEvent(false);
    setEditingEvent(null);
  };

  const convertEventToFormData = (event: Event): EventFormData => {
    return {
      title: event.title,
      description: event.description,
      imageUrl: event.imageUrl,
      artistImageUrl: event.artistImageUrl,
      coverImageUrl: event.imageUrl,
      price: event.price,
      date: event.date,
      time: event.time,
      endTime: event.endTime || event.time,
      location: event.location,
      capacity: event.capacity,
      category: event.category,
      benefits: [],
      language: 'es'
    };
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
        <h1 className="text-3xl font-bold text-white">Panel de Administración</h1>
      </div>

      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('events')}
              className={`${
                activeTab === 'events'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-300 hover:text-gray-200 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
            >
              Eventos
            </button>
            <button
              onClick={() => setActiveTab('rrpp')}
              className={`${
                activeTab === 'rrpp'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-300 hover:text-gray-200 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
            >
              RRPP
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`${
                activeTab === 'users'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-300 hover:text-gray-200 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
            >
              Usuarios
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'events' && (
        <div>
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setIsAddingEvent(true)}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
            >
              Nuevo Evento
            </button>
          </div>

          {isAddingEvent ? (
            <EventForm
              onSubmit={handleSaveEvent}
              onCancel={handleCancel}
              initialData={editingEvent ? convertEventToFormData(editingEvent) : undefined}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover"
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
      )}

      {activeTab === 'rrpp' && <RRPPManagement />}
      {activeTab === 'users' && <UserList />}
    </div>
  );
} 