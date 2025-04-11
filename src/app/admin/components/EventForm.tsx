import React from 'react';
import { EventFormData } from '../../types';
import ImageUpload from './ImageUpload';

interface EventFormProps {
  formData: EventFormData;
  setFormData: (data: EventFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function EventForm({ formData, setFormData, onSubmit }: EventFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Título del evento
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Descripción
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          rows={4}
          required
        />
      </div>

      <div>
        <ImageUpload
          imageUrl={formData.imageUrl}
          onImageChange={(url) => setFormData({ ...formData, imageUrl: url })}
          label="Imagen del evento"
        />
      </div>

      <div className="mt-6">
        <ImageUpload
          imageUrl={formData.artistImageUrl}
          onImageChange={(url) => setFormData({ ...formData, artistImageUrl: url })}
          label="Imagen del artista"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Precio
        </label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          required
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Fecha
        </label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Hora
        </label>
        <input
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Ubicación
        </label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Capacidad
        </label>
        <input
          type="number"
          value={formData.capacity}
          onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          required
          min="1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Categoría
        </label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          required
        >
          <option value="">Selecciona una categoría</option>
          <option value="Conciertos">Conciertos</option>
          <option value="Festivales">Festivales</option>
          <option value="Espectáculos">Espectáculos</option>
        </select>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Guardar Evento
        </button>
      </div>
    </form>
  );
} 