import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN!,
  options: { timeout: 5000 }
});

const payment = new Payment(client);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Verificar que sea una notificación de pago
    if (body.type === 'payment') {
      const paymentInfo = await payment.get({ id: body.data.id });
      
      if (paymentInfo.status === 'approved') {
        // Obtener los datos del external_reference
        const { userEmail, eventDetails, items } = JSON.parse(paymentInfo.external_reference);
        
        // Enviar el email con los tickets
        await sendTicketEmail(userEmail, eventDetails, items);
        
        return NextResponse.json({ message: 'Tickets enviados correctamente' });
      }
    }
    
    return NextResponse.json({ message: 'Notificación procesada' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Error procesando la notificación' },
      { status: 500 }
    );
  }
}

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