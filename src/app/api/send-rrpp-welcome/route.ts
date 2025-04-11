import { Resend } from 'resend';
import { NextResponse } from 'next/server';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received request body:', body);
    
    const { name, email, code, commission } = body;

    if (!name || !email || !code || commission === undefined) {
      console.error('Missing required fields:', { name, email, code, commission });
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    console.log('Sending email with data:', { name, email, code, commission });

    try {
      const { data, error } = await resend.emails.send({
        from: 'Tinifest <no-reply@tinifest.com.ar>',
        to: email,
        subject: '¡Bienvenido al equipo de RRPP de Tinifest!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #6B46C1;">¡Bienvenido ${name}!</h1>
            <p>Gracias por unirte al equipo de RRPP de Tinifest.</p>
            <p>Aquí están tus datos:</p>
            <ul>
              <li><strong>Tu código de RRPP:</strong> ${code}</li>
              <li><strong>Tu comisión:</strong> ${commission}% por cada venta</li>
            </ul>
            <p>Para empezar a vender tickets:</p>
            <ol>
              <li>Comparte tu código con tus contactos</li>
              <li>Cuando compren tickets usando tu código, recibirás tu comisión</li>
              <li>Podrás ver todas tus ventas en tu panel de RRPP</li>
            </ol>
            <div style="margin-top: 20px; padding: 20px; background-color: #F3F4F6; border-radius: 8px;">
              <p style="margin: 0; color: #4B5563;">Si tienes alguna pregunta, no dudes en contactarnos.</p>
            </div>
            <p style="margin-top: 20px;">¡Saludos!</p>
            <p>El equipo de Tinifest</p>
          </div>
        `
      });

      if (error) {
        console.error('Error from Resend:', error);
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      console.log('Email sent successfully:', data);
      return NextResponse.json({ message: 'Email enviado correctamente', data });
    } catch (emailError: any) {
      console.error('Error sending email:', emailError);
      return NextResponse.json(
        { error: emailError.message || 'Error al enviar el email' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: error.message || 'Error al enviar el email' },
      { status: 500 }
    );
  }
} 