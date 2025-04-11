import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { saveUser, getUserByEmail } from '@/app/services/userService';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface User {
  id: string;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  password: string;
  createdAt: string;
}

export async function POST(request: Request) {
  try {
    const { nombre, apellido, telefono, email, password } = await request.json();

    // Validar campos requeridos
    if (!nombre || !apellido || !telefono || !email || !password) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'El formato del email no es válido' },
        { status: 400 }
      );
    }

    // Validar formato de teléfono (acepta números con o sin guiones/espacios)
    const phoneRegex = /^[\d\s-]+$/;
    if (!phoneRegex.test(telefono)) {
      return NextResponse.json(
        { error: 'El formato del teléfono no es válido' },
        { status: 400 }
      );
    }

    // Verificar si el usuario ya existe
    const existingUser = getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'El email ya está registrado' },
        { status: 400 }
      );
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear nuevo usuario
    const newUser: User = {
      id: Date.now().toString(),
      nombre,
      apellido,
      telefono,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    // Guardar usuario
    saveUser(newUser);

    // Generar token
    const token = jwt.sign(
      { 
        userId: newUser.id, 
        email: newUser.email,
        nombre: newUser.nombre,
        apellido: newUser.apellido
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return NextResponse.json({ 
      token,
      user: {
        email: newUser.email,
        nombre: newUser.nombre,
        apellido: newUser.apellido
      }
    });
  } catch (error) {
    console.error('Error en registro:', error);
    return NextResponse.json(
      { error: 'Error en el registro' },
      { status: 500 }
    );
  }
} 