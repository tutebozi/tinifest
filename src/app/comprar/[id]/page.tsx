'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PublicEvent } from '../../types';
import { getPublicEventById } from '../../services/eventService';
import { createSale } from '../../services/rrppService';
import AuthModal from '../../components/AuthModal';

export default function ComprarPage() {
  const params = useParams();
  const [event, setEvent] = useState<PublicEvent | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [rrppCode, setRRPPCode] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const token = localStorage.getItem('userToken');
    const email = localStorage.getItem('userEmail');
    if (token && email) {
      setIsLoggedIn(true);
      setUserEmail(email);
    }

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

        // Obtener código RRPP de la URL si existe
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('rrpp');
        if (code) {
          setRRPPCode(code);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;

    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Crear la venta
      const saleData = {
        eventId: event.id,
        quantity,
        totalAmount: event.price * quantity,
        rrppCode: rrppCode || undefined,
        buyerEmail: userEmail,
        buyerName: '', // Se podría obtener del usuario si está logueado
        buyerPhone: '', // Se podría obtener del usuario si está logueado
        date: new Date().toISOString(),
        status: 'pending' as const
      };

      const sale = createSale(saleData);
      
      // Aquí iría la integración con MercadoPago
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
    } catch (err) {
      setError('Error al procesar el pago');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthSuccess = () => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setIsLoggedIn(true);
      setUserEmail(email);
      setShowAuthModal(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-white">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-8 rounded-xl text-center">
          <p className="text-red-600">{error}</p>
          <Link href="/" className="mt-4 text-purple-600 hover:text-purple-700 block">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  if (!event) {
    return null;
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-green-50 p-8 rounded-xl text-center max-w-md">
          <h2 className="text-2xl font-bold text-green-700 mb-4">¡Compra exitosa!</h2>
          <p className="text-green-600 mb-6">
            Tu compra se ha procesado correctamente. Recibirás un correo con los detalles.
          </p>
          <Link
            href="/"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-[1920px] mx-auto">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="md:flex min-h-[900px]">
              <div className="md:w-1/2 bg-gray-50">
                <div className="h-full flex items-center justify-center p-12">
                  <img
                    className="w-full h-auto max-h-[850px] object-contain rounded-lg shadow-lg"
                    src={event.imageUrl}
                    alt={event.title}
                  />
                </div>
              </div>
              <div className="p-12 md:p-16 md:w-1/2">
                <div className="uppercase tracking-wide text-lg text-purple-600 font-semibold">
                  {event.category}
                </div>
                <h1 className="mt-4 text-6xl font-bold text-gray-900">
                  {event.title}
                </h1>
                <p className="mt-8 text-2xl text-gray-600">{event.description}</p>
                
                <div className="mt-12 space-y-8">
                  <div className="flex items-center">
                    <span className="mr-6 text-4xl">📍</span>
                    <span className="text-2xl">{event.location}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-6 text-4xl">📅</span>
                    <span className="text-2xl">{event.date}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-6 text-4xl">⏰</span>
                    <span className="text-2xl">{event.time} a {event.endTime}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-16">
                  <div className="space-y-10">
                    <div>
                      <label className="block text-2xl font-medium text-gray-700 mb-4">
                        Cantidad de tickets
                      </label>
                      <select
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="mt-2 block w-full rounded-lg border-gray-300 py-4 pl-4 pr-10 text-xl focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'ticket' : 'tickets'}
                          </option>
                        ))}
                      </select>
                    </div>

                    {rrppCode && (
                      <div className="bg-purple-50 p-6 rounded-xl">
                        <p className="text-purple-700 text-lg">
                          Comprando con código de RRPP: {rrppCode}
                        </p>
                      </div>
                    )}

                    <div className="bg-gray-50 p-8 rounded-xl">
                      <div className="flex justify-between items-center text-2xl font-medium">
                        <span>Total:</span>
                        <span className="text-4xl font-bold text-purple-600">
                          ${event.price * quantity}
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#009ee3] text-white py-6 px-8 rounded-xl text-2xl font-semibold hover:bg-[#007eb5] transition-colors flex items-center justify-center gap-4"
                      disabled={isLoading}
                    >
                      <img 
                        src="https://www.mercadopago.com/org-img/MP3/home/logomp-white.png"
                        alt="MercadoPago"
                        className="h-8"
                      />
                      {isLoggedIn ? 'Pagar con MercadoPago' : 'Iniciar sesión para comprar'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
} 