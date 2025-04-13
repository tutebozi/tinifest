import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || ''
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, payer } = body;

    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: items.map((item: any) => ({
          title: item.title,
          unit_price: item.price,
          quantity: item.quantity,
          currency_id: 'ARS'
        })),
        payer: {
          email: payer.email,
          name: payer.name,
          identification: payer.identification
        },
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_BASE_URL}/compra-exitosa`,
          failure: `${process.env.NEXT_PUBLIC_BASE_URL}/compra-fallida`,
          pending: `${process.env.NEXT_PUBLIC_BASE_URL}/compra-pendiente`
        },
        auto_return: 'approved'
      }
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error creating preference:', error);
    return NextResponse.json(
      { error: 'Error creating payment preference' },
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