import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { tickets } from '../../data/tickets';

export default function TicketPurchase({ params }: { params: { ticketType: string } }) {
  const ticket = tickets.find(t => t.id === params.ticketType);

  if (!ticket) {
    notFound();
  }

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
            <p className="text-gray-600 mb-2">Precio</p>
            <p className="text-4xl font-bold text-purple-600">
              <span className="text-2xl">$</span>{ticket.price}
            </p>
          </div>
          <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">
            Proceder al pago
          </button>
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