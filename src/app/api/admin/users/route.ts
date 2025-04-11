import { NextResponse } from 'next/server';
import { getUsers } from '@/app/services/userService';

export async function GET() {
  try {
    const users = getUsers();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return NextResponse.json(
      { error: 'Error al obtener usuarios' },
      { status: 500 }
    );
  }
} 