'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { PublicEvent } from '../../types';
import { getPublicEventById } from '../../services/eventService';

export default function ComprarPage() {
  const params = useParams();
  const [event, setEvent] = useState<PublicEvent | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<'mercadopago' | 'tarjeta'>('mercadopago');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        setIsLoading(true);
        setError(null);
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

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (event && newQuantity > event.availableTickets) {
      setError(`Solo hay ${event.availableTickets} tickets disponibles`);
      return;
    }
    setError(null);
    setQuantity(newQuantity);
  };

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Validaciones
      if (!event) {
        setError('Evento no encontrado');
        return;
      }
      if (quantity > event.availableTickets) {
        setError(`Solo hay ${event.availableTickets} tickets disponibles`);
        return;
      }

      // Simulación de pago
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
    } catch (err) {
      setError('Error al procesar el pago');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-red-50 p-8 rounded-xl">
          <div className="text-red-600 text-xl mb-4">❌</div>
          <h2 className="text-xl font-bold text-red-700">{error}</h2>
          <button
            onClick={() => window.history.back()}
            className="mt-4 text-red-600 hover:text-red-700"
          >
            Volver atrás
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-green-50 p-8 rounded-xl">
          <div className="text-green-600 text-xl mb-4">✅</div>
          <h2 className="text-xl font-bold text-green-700">¡Compra exitosa!</h2>
          <p className="mt-2 text-green-600">
            Recibirás un email con tus tickets en breve
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="mt-4 text-green-600 hover:text-green-700"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  if (!event) return null;

  const total = event.price * quantity;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="md:flex min-h-[800px]">
            <div className="md:w-1/2 bg-gray-50">
              <div className="h-full flex items-center justify-center p-8">
                <img
                  className="w-full h-auto max-h-[750px] object-contain rounded-lg shadow-lg"
                  src={event.imageUrl}
                  alt={event.title}
                />
              </div>
            </div>
            <div className="p-10 md:p-12 md:w-1/2">
              <div className="uppercase tracking-wide text-sm text-purple-600 font-semibold">
                {event.category}
              </div>
              <h1 className="mt-2 text-5xl font-bold text-gray-900">
                {event.title}
              </h1>
              <p className="mt-6 text-xl text-gray-600">{event.description}</p>
              
              <div className="mt-10 space-y-6">
                <div className="flex items-center">
                  <span className="mr-4 text-2xl">📍</span>
                  <span className="text-xl">{event.location}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-4 text-2xl">📅</span>
                  <span className="text-xl">{event.date}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-4 text-2xl">⏰</span>
                  <span className="text-xl">{event.time} a {event.endTime}</span>
                </div>
              </div>

              <div className="mt-12">
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-bold text-gray-900">${event.price}</span>
                </div>

                <div className="mt-10 space-y-10">
                  <div>
                    <label className="block text-lg font-medium text-gray-700">
                      Cantidad de tickets
                    </label>
                    <select
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="mt-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-xl p-4"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? 'ticket' : 'tickets'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-gray-700">
                      Método de pago
                    </label>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center space-x-4 p-5 border rounded-lg hover:bg-gray-50 cursor-pointer"
                           onClick={() => setSelectedPayment('mercadopago')}>
                        <input
                          type="radio"
                          name="payment"
                          value="mercadopago"
                          checked={selectedPayment === 'mercadopago'}
                          onChange={() => setSelectedPayment('mercadopago')}
                          className="h-6 w-6 text-purple-600 focus:ring-purple-500"
                        />
                        <div>
                          <label className="font-medium text-gray-900 text-xl">MercadoPago</label>
                          <p className="text-lg text-gray-500">Paga con tu cuenta de MercadoPago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-5 border rounded-lg hover:bg-gray-50 cursor-pointer"
                           onClick={() => setSelectedPayment('tarjeta')}>
                        <input
                          type="radio"
                          name="payment"
                          value="tarjeta"
                          checked={selectedPayment === 'tarjeta'}
                          onChange={() => setSelectedPayment('tarjeta')}
                          className="h-6 w-6 text-purple-600 focus:ring-purple-500"
                        />
                        <div>
                          <label className="font-medium text-gray-900 text-xl">Tarjeta de crédito/débito</label>
                          <p className="text-lg text-gray-500">Paga de forma segura con tu tarjeta</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-10">
                    <div className="flex justify-between text-2xl font-bold">
                      <span>Total</span>
                      <span>${total}</span>
                    </div>
                    <button
                      onClick={handlePayment}
                      disabled={isLoading}
                      className="mt-10 w-full bg-purple-600 text-white py-5 px-8 rounded-full text-xl font-semibold hover:bg-purple-700 disabled:opacity-50"
                    >
                      {isLoading ? 'Procesando...' : 'Comprar Tickets'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 