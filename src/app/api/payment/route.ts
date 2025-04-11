import { NextResponse } from 'next/server';
import mercadopago from 'mercadopago';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Configurar MercadoPago
mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN || ''
});

export async function POST(request: Request) {
  try {
    const { items, userEmail, eventDetails } = await request.json();

    // Crear preferencia de pago
    const preference = {
      items: items.map((item: any) => ({
        title: item.title,
        unit_price: item.price,
        quantity: item.quantity,
        currency_id: 'ARS'
      })),
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
        failure: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failure`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/pending`
      },
      auto_return: 'approved',
      notification_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/webhook`,
      external_reference: JSON.stringify({
        userEmail,
        eventDetails,
        items
      })
    };

    const response = await mercadopago.preferences.create(preference);

    return NextResponse.json({
      id: response.body.id,
      init_point: response.body.init_point
    });
  } catch (error) {
    console.error('Error creating payment:', error);
    return NextResponse.json(
      { error: 'Error al crear el pago' },
      { status: 500 }
    );
  }
}

// Función para enviar el email con los tickets
async function sendTicketEmail(userEmail: string, eventDetails: any, items: any[]) {
  try {
    await resend.emails.send({
      from: 'Tinifest <no-reply@tinifest.com.ar>',
      to: userEmail,
      subject: '¡Tus tickets para el evento!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #6B46C1;">¡Gracias por tu compra!</h1>
          <p>Aquí están tus tickets para el evento:</p>
          
          <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1F2937;">${eventDetails.title}</h2>
            <p><strong>Fecha:</strong> ${eventDetails.date}</p>
            <p><strong>Hora:</strong> ${eventDetails.time}</p>
            <p><strong>Lugar:</strong> ${eventDetails.location}</p>
          </div>

          <h3>Detalle de la compra:</h3>
          <ul>
            ${items.map(item => `
              <li>${item.quantity} x ${item.title} - $${item.price * item.quantity}</li>
            `).join('')}
          </ul>

          <div style="margin-top: 20px; padding: 20px; background-color: #F3F4F6; border-radius: 8px;">
            <p style="margin: 0; color: #4B5563;">
              Presenta este email en la entrada del evento.
              Los tickets también están adjuntos a este correo.
            </p>
          </div>
        </div>
      `
    });
  } catch (error) {
    console.error('Error sending ticket email:', error);
    throw error;
  }
} 