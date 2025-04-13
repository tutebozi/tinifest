'use client';

import React, { useState } from 'react';
import { EventFormData } from '../types';

interface EventFormProps {
  initialData?: EventFormData;
  onSubmit: (data: EventFormData) => void;
  onCancel: () => void;
}

const defaultFormData: EventFormData = {
  title: '',
  description: '',
  imageUrl: '',
  artistImageUrl: '',
  coverImageUrl: '',
  price: 0,
  date: '',
  time: '',
  endTime: '',
  location: '',
  capacity: 0,
  category: '',
  benefits: [],
  language: 'es'
};

export default function EventForm({ initialData = defaultFormData, onSubmit, onCancel }: EventFormProps) {
  const [formData, setFormData] = useState<EventFormData>(initialData);
  const [imagePreview, setImagePreview] = useState<string>(initialData.imageUrl);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'capacity' ? Number(value) : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setImagePreview(imageUrl);
        setFormData(prev => ({ ...prev, imageUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <div className="space-y-6">
        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">Título del Evento</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-lg"
            required
          />
        </div>

        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-lg"
            required
          />
        </div>

        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">Imagen del Evento</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-lg py-2"
          />
          {imagePreview && (
            <div className="mt-4 relative w-full h-80">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">Precio</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-lg"
              required
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">Capacidad</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              min="1"
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-lg"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">Fecha</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-lg"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-base font-medium text-gray-700 mb-1">Hora inicio</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-lg"
                required
              />
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-1">Hora fin</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-lg"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">Ubicación</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-lg"
            required
          />
        </div>

        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">Categoría</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-lg"
            required
          />
        </div>
      </div>

      <div className="flex justify-end space-x-6 mt-10">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-gray-300 rounded-md text-lg text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-8 py-3 bg-purple-600 text-white rounded-md text-lg font-medium hover:bg-purple-700"
        >
          {initialData === defaultFormData ? 'Crear Evento' : 'Actualizar Evento'}
        </button>
      </div>
    </form>
  );
} 