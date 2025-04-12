import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { tickets } from '../../data/tickets';
import { useState } from 'react';
import Image from 'next/image';

export default function TicketPurchase({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const ticket = tickets.find(t => t.id === params.id);

  if (!ticket) {
    notFound();
  }

  const total = ticket.price * quantity;

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [{
            title: ticket.title,
            quantity,
            unit_price: ticket.price,
          }],
          eventDetails: ticket,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      alert('Hubo un error al procesar el pago. Por favor, intenta nuevamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container py-8">
      <Link href="/" className="text-white mb-8 inline-block hover:underline">
        ← Volver a tickets
      </Link>
      
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">{ticket.title}</h1>
        <p className="text-gray-600 mb-6">{ticket.date}</p>
        
        <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-200">
          <div>
            <p className="text-gray-600 mb-2">Precio por ticket</p>
            <p className="text-4xl font-bold text-purple-600">
              <span className="text-2xl">$</span>{ticket.price}
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-4">
            <div className="flex items-center gap-4">
              <label className="text-gray-600">Cantidad:</label>
              <select 
                value={quantity} 
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded-lg px-3 py-2"
              >
                {[1,2,3,4,5,6,7,8].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            
            <div className="text-right">
              <p className="text-gray-600">Total a pagar:</p>
              <p className="text-2xl font-bold text-purple-600">
                <span className="text-xl">$</span>{total}
              </p>
            </div>

            <button 
              onClick={handlePayment}
              disabled={isProcessing}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              {isProcessing ? (
                <>
                  <span className="animate-spin">↻</span>
                  Procesando...
                </>
              ) : (
                <>
                  <Image
                    src="https://www.mercadopago.com/org-img/MP3/home/logomp-white.png"
                    alt="MercadoPago"
                    width={20}
                    height={20}
                  />
                  Pagar con MercadoPago
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Descripción</h2>
          <p className="text-gray-600">{ticket.description}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Beneficios incluidos</h2>
          <ul className="list-disc list-inside text-gray-600">
            {ticket.benefits.map((benefit, index) => (
              <li key={index} className="mb-2">{benefit}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Idioma del evento: </span>
            {ticket.language}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Proporcionaremos dispositivos de traducción si es necesario.
          </p>
        </div>
      </div>
    </div>
  );
} 